'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Fullscreen, RulerDimensionLine, Plus, Minus, Expand, Box } from 'lucide-react';
import { ThreeDViewer } from './ThreeDViewer';
import { useEditorStore } from '@/store/storeEditor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Modular data for finish options
const finishCategories = [
  {
    name: "LEATHER",
    colors: [
      { name: "Charcoal Brown", hex: "#58504A" },
      { name: "Olive Green", hex: "#5C6B52" },
      { name: "Forest Green", hex: "#4F6456" },
      { name: "Sage Green", hex: "#637662" },
      { name: "Slate Gray", hex: "#615D67" },
      { name: "Dusty Purple", hex: "#7D6D7E" },
      { name: "Steel Blue", hex: "#4D6073" },
      { name: "Burgundy Red", hex: "#A1545C" },
      { name: "Deep Wine", hex: "#6B3E3E" },
      { name: "Teal Green", hex: "#4A7065" },
    ],
  },
  {
    name: "SILICONE",
    colors: [
      { name: "Charcoal Brown", hex: "#58504A" },
      { name: "Olive Green", hex: "#5C6B52" },
      { name: "Forest Green", hex: "#4F6456" },
      { name: "Sage Green", hex: "#637662" },
      { name: "Slate Gray", hex: "#615D67" },
    ],
  },
  {
    name: "ALUMINUM",
    colors: [{ name: "Silver", hex: "#C0C0C0" }],
  },
];

// Modular data for legs finish options
const legsFinishCategories = [
  {
    name: "Steel",
    colors: [
      { name: "Polished Steel", hex: "#C0C0C0" },
      { name: "Brushed Steel", hex: "#A8A8A8" },
      { name: "Black Steel", hex: "#2C2C2C" },
      { name: "Gold Steel", hex: "#D4AF37" },
    ],
  },
  {
    name: "Wood",
    colors: [
      { name: "Oak", hex: "#D2B48C" },
      { name: "Walnut", hex: "#5C4033" },
      { name: "Mahogany", hex: "#C04000" },
      { name: "Birch", hex: "#F5E6D3" },
    ],
  },
];

export function DynamicPreview() {
  const { getButtonStyle, typography, layout, theme, currentLayout } = useEditorStore();
  const [activeCategory, setActiveCategory] = useState(finishCategories[0].name);
  const [selectedFinish, setSelectedFinish] = useState(finishCategories[0].colors[0]);
  const [activeLegsCategory, setActiveLegsCategory] = useState(legsFinishCategories[0].name);
  const [selectedLegsFinish, setSelectedLegsFinish] = useState(legsFinishCategories[0].colors[0]);
  const [selectedArmType, setSelectedArmType] = useState<"fixed" | "movable">("fixed");
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const [hoveredColor, setHoveredColor] = useState<{ name: string; hex: string } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Helper function to create button style
  const createButtonStyle = (buttonId: string) => {
    const btnStyle = getButtonStyle(buttonId);
    return {
      backgroundColor: btnStyle.bgColor,
      color: btnStyle.textColor,
      borderRadius: `${btnStyle.radius}px`,
      boxShadow:
        btnStyle.shadow === 'none'
          ? 'none'
          : btnStyle.shadow === 'sm'
          ? '0 1px 2px 0 rgb(0 0 0 / 0.05)'
          : btnStyle.shadow === 'md'
          ? '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          : btnStyle.shadow === 'lg'
          ? '0 10px 15px -3px rgb(0 0 0 / 0.1)'
          : '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      padding: '10px 20px',
      fontFamily: typography.fontFamily,
      fontSize: `${typography.fontSizes.button}px`,
      fontWeight: typography.fontWeight,
    };
  };

  const layoutStyle = {
    backgroundColor: layout.bgColor,
    padding: `${layout.padding}px`,
    borderRadius: `${layout.cardRadius}px`,
    border: layout.borderEnabled ? `${layout.borderWidth}px solid ${layout.borderColor}` : 'none',
  };

  const handleColorHover = (color: { name: string; hex: string }, event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredColor(color);
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleColorLeave = () => {
    setHoveredColor(null);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-200">
      <ThreeDViewer />

      {/* Color Tooltip */}
      {hoveredColor && (
        <div 
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-1 border border-gray-200 min-w-[80px]">
            <div 
              className="w-full h-16 rounded-md mb-2"
              style={{ backgroundColor: hoveredColor.hex }}
            />
            <p 
              className="text-xs text-center text-black font-medium whitespace-nowrap"
              style={{ fontFamily: typography.fontFamily }}
            >
              {hoveredColor.name}
            </p>
          </div>
        </div>
      )}

      {/* Vertical Gallery - Left Side */}
      <div className="absolute left-10 top-1/4 -translate-y-1/2 flex flex-col gap-2 z-10">
        {[1, 2, 3, 4, 5, 6].map((index) => {
          const galleryStyle = getButtonStyle('galleryThumbnail');
          return (
            <button
              key={index}
              className="w-10 h-10 overflow-hidden hover:opacity-80 transition-all"
              style={{
                backgroundColor: galleryStyle.bgColor,
                borderRadius: `${galleryStyle.radius}px`,
                boxShadow:
                  galleryStyle.shadow === 'none'
                    ? 'none'
                    : galleryStyle.shadow === 'sm'
                    ? '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    : galleryStyle.shadow === 'md'
                    ? '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    : galleryStyle.shadow === 'lg'
                    ? '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    : '0 20px 25px -5px rgb(0 0 0 / 0.1)',
              }}
            >
              <Image
                src="/gallery-image.png"
                alt={`Gallery ${index}`}
                width={40}
                height={40}
                unoptimized
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* View in your room button - Bottom Left */}
      <button 
        className="absolute left-10 bottom-10 px-4 py-3 border border-gray-300 flex items-center gap-2 hover:opacity-90 transition-all z-10"
        style={createButtonStyle('viewInRoom')}
      >
        <Box stroke={getButtonStyle('viewInRoom').textColor} />
        <span className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>View in your room</span>
      </button>

      {/* Control Buttons */}
      <div className="absolute lg:right-[400px] right-4 bottom-4 lg:bottom-auto lg:top-2/3 lg:-translate-y-1/2 flex flex-col gap-2 z-10">
        {[
          { icon: Fullscreen, title: 'Settings' },
          { icon: RulerDimensionLine, title: 'Screenshot' },
          { icon: Expand, title: 'Fullscreen' },
          { icon: Plus, title: 'Zoom In' },
          { icon: Minus, title: 'Zoom Out' },
        ].map((btn, idx) => {
          const controlStyle = getButtonStyle('controlButton');
          const Icon = btn.icon;
          return (
            <button
              key={idx}
              className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:opacity-80 transition-all"
              title={btn.title}
              style={{
                backgroundColor: controlStyle.bgColor,
                borderRadius: `${controlStyle.radius}px`,
                boxShadow:
                  controlStyle.shadow === 'none'
                    ? 'none'
                    : controlStyle.shadow === 'sm'
                    ? '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    : controlStyle.shadow === 'md'
                    ? '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    : controlStyle.shadow === 'lg'
                    ? '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    : '0 20px 25px -5px rgb(0 0 0 / 0.1)',
              }}
            >
              <Icon size={16} color={controlStyle.textColor} />
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-10 p-4 lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto w-[90%] lg:w-[350px]  " style={layoutStyle}>
        <div className="p-4">
          <h1 className="text-lg font-medium text-black " style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.heading}px` }}>Gaming Chair</h1>
          <p className="text-sm text-gray-500 mb-4 font-normal" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>By Mittal Furniture</p>
          <h2 className="text-md text-black font-normal" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>Customize your Chair</h2>
        </div>
        <div>

          <div className="overflow-y-auto max-h-[calc(100vh-450px)] lg:max-h-[calc(100vh-250px)]">
            <Accordion type="single" collapsible className="w-full border-t border-gray-200" value={openAccordion} onValueChange={setOpenAccordion}>
              <AccordionItem value="arms" style={{ backgroundColor: openAccordion === 'arms' ? theme.secondaryColor : 'transparent' }}>
                <AccordionTrigger className="p-4 text-left" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>
                  <div className="flex items-center gap-4">
                    <Image src="/gallery-image.png" alt="shape" width={40} height={40} unoptimized className="rounded-md" />
                    <div>
                      <h3 className="font-medium text-black" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>1. Arms</h3>
                      <p className="text-sm text-[#AAAAAA]" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>
                        {selectedArmType === "fixed" ? "Fixed Arms" : "Movable Arms"}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-50">
                  <div className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedArmType("fixed")}
                        className="flex-1 px-2 py-3 text-sm font-medium transition-all"
                        style={
                          selectedArmType === "fixed" 
                            ? createButtonStyle('fixedArms')
                            : {
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                                borderRadius: `${getButtonStyle('fixedArms').radius}px`,
                                border: '1px solid #d1d5db',
                                fontFamily: typography.fontFamily,
                                fontSize: `${typography.fontSizes.button}px`,
                                fontWeight: typography.fontWeight,
                              }
                        }
                      >
                        Fixed Arms
                      </button>
                      <button
                        onClick={() => setSelectedArmType("movable")}
                        className="flex-1 px-2 py-3 text-sm font-medium transition-all"
                        style={
                          selectedArmType === "movable" 
                            ? createButtonStyle('fixedArms')
                            : {
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                                borderRadius: `${getButtonStyle('fixedArms').radius}px`,
                                border: '1px solid #d1d5db',
                                fontFamily: typography.fontFamily,
                                fontSize: `${typography.fontSizes.button}px`,
                                fontWeight: typography.fontWeight,
                              }
                        }
                      >
                        Movable Arms
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="arms-finish" style={{ backgroundColor: openAccordion === 'arms-finish' ? theme.secondaryColor : 'transparent' }}>
                <AccordionTrigger className="p-4 text-left" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>
                  <div className="flex items-center gap-4">
                    <Image src="/gallery-image.png" alt="shape" width={40} height={40} unoptimized className="rounded-md" />
                    <div>
                      <h3 className="font-medium text-black" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>2. Arms Finish</h3>
                      <p className="text-sm text-[#AAAAAA] font-medium" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>{selectedFinish.name}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-white">
                  <div className="p-4">
                    {currentLayout === 'layout1' ? (
                      <>
                        {/* Layout 1: Tab-based switching */}
                        <div className="flex space-x-1 border-b mb-4">
                          {finishCategories.map((category) => (
                            <button
                              key={category.name}
                              onClick={() => setActiveCategory(category.name)}
                              style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}
                              className={`px-3 py-2 text-sm font-medium transition-colors ${activeCategory === category.name
                                ? "border-b-2 border-black text-black"
                                : "text-gray-500 hover:text-black"
                                }`}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                          {finishCategories
                            .find((cat) => cat.name === activeCategory)
                            ?.colors.map((color) => (
                              <button
                                key={color.name}
                                title={color.name}
                                onClick={() => setSelectedFinish(color)}
                                onMouseEnter={(e) => handleColorHover(color, e)}
                                onMouseLeave={handleColorLeave}
                                className={`w-8 h-8 rounded-full transition-all duration-200 ${selectedFinish.hex === color.hex
                                  ? "scale-110"
                                  : "hover:scale-105"
                                  }`}
                                style={{
                                  backgroundColor: color.hex,
                                  boxShadow: selectedFinish.hex === color.hex
                                    ? `0 0 0 2px white, 0 0 0 4px ${theme.primaryColor}`
                                    : 'none'
                                }}
                              />
                            ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Layout 2: All categories stacked */}
                        <div className="space-y-4">
                          {finishCategories.map((category) => (
                            <div key={category.name}>
                              <h4 className="text-sm font-medium text-gray-500 mb-3" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>
                                {category.name}
                              </h4>
                              <div className="grid grid-cols-5 gap-3">
                                {category.colors.map((color) => (
                                  <button
                                    key={color.name}
                                    title={color.name}
                                    onClick={() => setSelectedFinish(color)}
                                    onMouseEnter={(e) => handleColorHover(color, e)}
                                    onMouseLeave={handleColorLeave}
                                    className={`w-8 h-8 rounded-full transition-all duration-200 ${selectedFinish.hex === color.hex
                                      ? "scale-110"
                                      : "hover:scale-105"
                                      }`}
                                    style={{
                                      backgroundColor: color.hex,
                                      boxShadow: selectedFinish.hex === color.hex
                                        ? `0 0 0 2px white, 0 0 0 4px ${theme.primaryColor}`
                                        : 'none'
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legs-finish" style={{ backgroundColor: openAccordion === 'legs-finish' ? theme.secondaryColor : 'transparent' }}>
                <AccordionTrigger className="p-4 text-left" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>
                  <div className="flex items-center gap-4">
                    <Image src="/gallery-image.png" alt="shape" width={40} height={40} unoptimized className="rounded-md" />
                    <div>
                      <h3 className="font-medium text-black" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>3. Legs Finish</h3>
                      <p className="text-sm text-[#AAAAAA]" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>{selectedLegsFinish.name}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-white">
                  <div className="p-4">
                    {currentLayout === 'layout1' ? (
                      <>
                        {/* Layout 1: Tab-based switching */}
                        <div className="flex space-x-1 border-b mb-4">
                          {legsFinishCategories.map((category) => (
                            <button
                              key={category.name}
                              onClick={() => setActiveLegsCategory(category.name)}
                              style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}
                              className={`px-3 py-2 text-sm font-medium transition-colors ${activeLegsCategory === category.name
                                ? "border-b-2 border-black text-black"
                                : "text-gray-500 hover:text-black"
                                }`}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                          {legsFinishCategories
                            .find((cat) => cat.name === activeLegsCategory)
                            ?.colors.map((color) => (
                              <button
                                key={color.name}
                                title={color.name}
                                onClick={() => setSelectedLegsFinish(color)}
                                onMouseEnter={(e) => handleColorHover(color, e)}
                                onMouseLeave={handleColorLeave}
                                className={`w-8 h-8 rounded-full transition-all duration-200 ${selectedLegsFinish.hex === color.hex
                                  ? "scale-110"
                                  : "hover:scale-105"
                                  }`}
                                style={{
                                  backgroundColor: color.hex,
                                  boxShadow: selectedLegsFinish.hex === color.hex
                                    ? `0 0 0 2px white, 0 0 0 4px ${theme.primaryColor}`
                                    : 'none'
                                }}
                              />
                            ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Layout 2: All categories stacked */}
                        <div className="space-y-4">
                          {legsFinishCategories.map((category) => (
                            <div key={category.name}>
                              <h4 className="text-sm font-semibold text-gray-500 mb-3" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>
                                {category.name}
                              </h4>
                              <div className="grid grid-cols-5 gap-3">
                                {category.colors.map((color) => (
                                  <button
                                    key={color.name}
                                    title={color.name}
                                    onClick={() => setSelectedLegsFinish(color)}
                                    onMouseEnter={(e) => handleColorHover(color, e)}
                                    onMouseLeave={handleColorLeave}
                                    className={`w-8 h-8 rounded-full transition-all duration-200 ${selectedLegsFinish.hex === color.hex
                                      ? "scale-110"
                                      : "hover:scale-105"
                                      }`}
                                    style={{
                                      backgroundColor: color.hex,
                                      boxShadow: selectedLegsFinish.hex === color.hex
                                        ? `0 0 0 2px white, 0 0 0 4px ${theme.primaryColor}`
                                        : 'none'
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Price and Add to Cart Section */}
        <div className=" p-4 border-t border-gray-200 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>Product Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-md  font-semibold text-black" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.body}px` }}>$ 200</span>
              <span className="text-sm text-gray-400 line-through" style={{ fontFamily: typography.fontFamily, fontSize: `${typography.fontSizes.small}px` }}>$ 245</span>
            </div>
          </div>
          <button className="px-6 py-3 w-[50%]" style={createButtonStyle('addToCart')}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}