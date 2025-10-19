'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/store/storeEditor';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { ButtonControls } from './ButtonControls';

export function EditorPanel() {
  const { 
    typography, 
    layout, 
    gallery,
    theme,
    currentLayout,
    setTypography, 
    setLayout,
    setGallery,
    setTheme,
    setCurrentLayout
  } = useEditorStore();

  const [openSection, setOpenSection] = useState<string>('typography');

  // Export settings to JSON
  const handleExport = () => {
    const settings = {
      typography,
      layout,
      gallery,
      theme,
      currentLayout,
      button: useEditorStore.getState().button,
      materials: useEditorStore.getState().materials,
      selectedMaterial: useEditorStore.getState().selectedMaterial,
    };

    const jsonString = JSON.stringify(settings, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ui-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import settings from JSON
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        
        // Apply imported settings with proper typing
        if (settings.typography) {
          Object.entries(settings.typography).forEach(([key, value]) => {
            setTypography(key as keyof typeof typography, value as never);
          });
        }
        if (settings.layout) {
          setLayout(settings.layout);
        }
        if (settings.gallery) {
          Object.entries(settings.gallery).forEach(([key, value]) => {
            setGallery(key as keyof typeof gallery, value as never);
          });
        }
        if (settings.theme) {
          Object.entries(settings.theme).forEach(([key, value]) => {
            setTheme(key as keyof typeof theme, value as never);
          });
        }
        if (settings.currentLayout) {
          setCurrentLayout(settings.currentLayout);
        }
        if (settings.button) {
          useEditorStore.setState({ button: settings.button });
        }
        if (settings.materials) {
          useEditorStore.setState({ materials: settings.materials });
        }
        if (settings.selectedMaterial) {
          useEditorStore.getState().setSelectedMaterial(settings.selectedMaterial);
        }

        alert('Settings imported successfully!');
      } catch (error) {
        alert('Error importing settings. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input value so the same file can be imported again
    event.target.value = '';
  };

  // Reset to default settings
  const handleReset = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.');
    if (!confirmReset) return;

    // Reset to default values from store
    const defaultSettings = {
      typography: {
        fontFamily: "Poppins, sans-serif",
        fontSizes: {
          heading: 18,
          body: 16,
          small: 14,
          button: 16,
        },
        selectedFontSizeType: 'body' as const,
        fontWeight: 500,
      },
      layout: {
        bgColor: "#ffffff",
        padding: 0,
        cardRadius: 8,
        borderEnabled: true,
        borderWidth: 1,
        borderColor: "#d9d9d9",
      },
      gallery: {
        alignment: 'left' as const,
        spacing: 8,
        borderRadius: 4,
      },
      theme: {
        primaryColor: '#C6614D',
        secondaryColor: '#ffdbd4',
      },
      currentLayout: 'layout1' as const,
      button: {
        buttons: {
          'addToCart': {
            bgColor: "#C6614D",
            textColor: "#FFFFFF",
            radius: 8,
            shadow: "md",
            alignment: 'center' as const,
          },
          'fixedArms': {
            bgColor: "#000000",
            textColor: "#FFFFFF",
            radius: 8,
            shadow: "none",
            alignment: 'center' as const,
          },
          'movableArms': {
            bgColor: "#FFFFFF",
            textColor: "#000000",
            radius: 8,
            shadow: "none",
            alignment: 'center' as const,
          },
          'viewInRoom': {
            bgColor: "#FFFFFF",
            textColor: "#000000",
            radius: 8,
            shadow: "sm",
            alignment: 'left' as const,
          },
          'galleryThumbnail': {
            bgColor: "#FFFFFF",
            textColor: "#000000",
            radius: 4,
            shadow: "none",
            alignment: 'center' as const,
          },
          'controlButton': {
            bgColor: "#FFFFFF",
            textColor: "#000000",
            radius: 4,
            shadow: "sm",
            alignment: 'center' as const,
          },
        },
        selectedButton: 'addToCart',
      },
      materials: {
        leather: { color: "#F5F5F5" },
        silicon: { color: "#5A5A5A" },
        aluminum: { color: "#D3D3D3" },
      },
      selectedMaterial: 'leather' as const,
    };

    // Apply default settings
    Object.entries(defaultSettings.typography).forEach(([key, value]) => {
      setTypography(key as keyof typeof typography, value as never);
    });
    setLayout(defaultSettings.layout);
    Object.entries(defaultSettings.gallery).forEach(([key, value]) => {
      setGallery(key as keyof typeof gallery, value as never);
    });
    Object.entries(defaultSettings.theme).forEach(([key, value]) => {
      setTheme(key as keyof typeof theme, value as never);
    });
    setCurrentLayout(defaultSettings.currentLayout);
    useEditorStore.setState({ 
      button: defaultSettings.button,
      materials: defaultSettings.materials,
      selectedMaterial: defaultSettings.selectedMaterial,
    });

    alert('All settings have been reset to default!');
  };

  const fontFamilies = [
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Poppins, sans-serif', label: 'Poppins' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans' },
    { value: 'Lato, sans-serif', label: 'Lato' },
  ];

  const fontWeights = [
    { value: 300, label: 'Light (300)' },
    { value: 400, label: 'Regular (400)' },
    { value: 500, label: 'Medium (500)' },
    { value: 600, label: 'Semi Bold (600)' },
    { value: 700, label: 'Bold (700)' },
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-white" style={{ fontFamily: typography.fontFamily }}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <h2 className="text-xl font-semibold text-black">UI Customizer</h2>
        <p className="text-sm text-gray-500 mt-1">Customize your design</p>
      </div>

      {/* Content */}
      <div className="p-4">
        <Accordion 
          type="single" 
          collapsible 
          value={openSection} 
          onValueChange={setOpenSection}
          className="space-y-2"
        >
          {/* Layout Switching */}
          <AccordionItem value="layout-switch" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">Layout</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                <label className="block text-xs font-medium text-black uppercase tracking-wide">
                  Switch Layout
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCurrentLayout('layout1')}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      currentLayout === 'layout1'
                        ? 'bg-black text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Layout 1
                  </button>
                  <button
                    onClick={() => setCurrentLayout('layout2')}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      currentLayout === 'layout2'
                        ? 'bg-black text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Layout 2
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Typography */}
          <AccordionItem value="typography" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">Typography</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* Font Family */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Font Family
                  </label>
                  <select
                    value={typography.fontFamily}
                    onChange={(e) => setTypography('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                  >
                    {fontFamilies.map((font) => (
                      <option 
                        key={font.value} 
                        value={font.value} 
                        className="text-black"
                        style={{ fontFamily: font.value }}
                      >
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Weight */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Font Weight
                  </label>
                  <select
                    value={typography.fontWeight}
                    onChange={(e) => setTypography('fontWeight', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                  >
                    {fontWeights.map((weight) => (
                      <option key={weight.value} value={weight.value} className="text-black">
                        {weight.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Font Size Type
                  </label>
                  <select
                    value={typography.selectedFontSizeType}
                    onChange={(e) => setTypography('selectedFontSizeType', e.target.value as 'heading' | 'body' | 'small' | 'button')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black mb-3"
                  >
                    <option value="heading" className="text-black">Heading</option>
                    <option value="body" className="text-black">Body Text</option>
                    <option value="small" className="text-black">Small Text</option>
                    <option value="button" className="text-black">Button Text</option>
                  </select>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    {typography.selectedFontSizeType.charAt(0).toUpperCase() + typography.selectedFontSizeType.slice(1)} Size: {typography.fontSizes[typography.selectedFontSizeType]}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={typography.fontSizes[typography.selectedFontSizeType]}
                    onChange={(e) => {
                      const newSizes = { ...typography.fontSizes, [typography.selectedFontSizeType]: Number(e.target.value) };
                      setTypography('fontSizes', newSizes);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10px</span>
                    <span>60px</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Button */}
          <AccordionItem value="button" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">Button</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ButtonControls />
            </AccordionContent>
          </AccordionItem>

          {/* Gallery/Images */}
          <AccordionItem value="gallery" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">Gallery</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* Gallery Alignment */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Gallery Alignment
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {alignmentOptions.map((align) => (
                      <button
                        key={align.value}
                        onClick={() => setGallery('alignment', align.value as 'left' | 'center' | 'right')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          gallery.alignment === align.value
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {align.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Spacing */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Image Spacing: {gallery.spacing}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={gallery.spacing}
                    onChange={(e) => setGallery('spacing', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0px</span>
                    <span>32px</span>
                  </div>
                </div>

                {/* Image Border Radius */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Image Border Radius: {gallery.borderRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={gallery.borderRadius}
                    onChange={(e) => setGallery('borderRadius', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0px</span>
                    <span>24px</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Theme Colors */}
          <AccordionItem value="theme" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">Theme Colors</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* Primary Color */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme('primaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => setTheme('secondaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.secondaryColor}
                      onChange={(e) => setTheme('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* General Layout */}
          <AccordionItem value="general-layout" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">General Layout</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* Background Color */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={layout.bgColor}
                      onChange={(e) => setLayout({ bgColor: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={layout.bgColor}
                      onChange={(e) => setLayout({ bgColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Card Corner Radius */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Card Corner Radius: {layout.cardRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={layout.cardRadius}
                    onChange={(e) => setLayout({ cardRadius: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0px</span>
                    <span>32px</span>
                  </div>
                </div>

                {/* Container Padding */}
                <div>
                  <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                    Container Padding: {layout.padding}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="64"
                    value={layout.padding}
                    onChange={(e) => setLayout({ padding: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0px</span>
                    <span>64px</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Stroke/Border */}
          <AccordionItem value="border" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">Stroke/Border</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* Enable Border */}
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-black uppercase tracking-wide">
                    Enable Border
                  </label>
                  <button
                    onClick={() => setLayout({ borderEnabled: !layout.borderEnabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      layout.borderEnabled ? 'bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        layout.borderEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {layout.borderEnabled && (
                  <>
                    {/* Border Color */}
                    <div>
                      <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                        Border Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={layout.borderColor}
                          onChange={(e) => setLayout({ borderColor: e.target.value })}
                          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={layout.borderColor}
                          onChange={(e) => setLayout({ borderColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    {/* Border Width */}
                    <div>
                      <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
                        Border Width: {layout.borderWidth}px
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={layout.borderWidth}
                        onChange={(e) => setLayout({ borderWidth: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1px</span>
                        <span>8px</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Export/Import Section - At the bottom */}
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-black mb-3 uppercase tracking-wide">
            Settings Management
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Export Settings
            </button>
            <label className="px-4 py-2 bg-white border-2 border-black text-black rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer text-center">
              Import Settings
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleReset}
              className="col-span-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}