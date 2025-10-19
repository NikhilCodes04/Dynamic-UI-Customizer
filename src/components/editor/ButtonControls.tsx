'use client';

import { useEditorStore } from '@/store/storeEditor';

const buttonOptions = [
  { id: 'addToCart', label: 'Add to Cart Button' },
  { id: 'fixedArms', label: 'Fixed Arms Button' },
  { id: 'movableArms', label: 'Movable Arms Button' },
  { id: 'viewInRoom', label: 'View in Room Button' },
  { id: 'galleryThumbnail', label: 'Gallery Thumbnails' },
  { id: 'controlButton', label: 'Control Buttons' },
];

export function ButtonControls() {
  const { button, setButton, setSelectedButton, getButtonStyle } = useEditorStore();
  const currentStyle = getButtonStyle(button.selectedButton);

  return (
    <div className="space-y-4">
      {/* Button Selector */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Select Button to Customize
        </label>
        <select
          value={button.selectedButton}
          onChange={(e) => setSelectedButton(e.target.value)}
          className="w-full p-2 border rounded-md bg-white text-black"
        >
          {buttonOptions.map((option) => (
            <option key={option.id} value={option.id} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Border Radius: {currentStyle.radius}px
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={currentStyle.radius}
          onChange={(e) => setButton(button.selectedButton, 'radius', Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Shadow */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">Shadow</label>
        <select
          value={currentStyle.shadow}
          onChange={(e) => setButton(button.selectedButton, 'shadow', e.target.value)}
          className="w-full p-2 border rounded-md bg-white text-black"
        >
          <option value="none" className="text-black">None</option>
          <option value="sm" className="text-black">Small</option>
          <option value="md" className="text-black">Medium</option>
          <option value="lg" className="text-black">Large</option>
          <option value="xl" className="text-black">Extra Large</option>
        </select>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">Alignment</label>
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map((align) => (
            <button
              key={align}
              onClick={() => setButton(button.selectedButton, 'alignment', align)}
              className={`flex-1 p-2 rounded border ${
                currentStyle.alignment === align
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white border-gray-300 text-black'
              }`}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={currentStyle.bgColor}
            onChange={(e) => setButton(button.selectedButton, 'bgColor', e.target.value)}
            className="w-12 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={currentStyle.bgColor}
            onChange={(e) => setButton(button.selectedButton, 'bgColor', e.target.value)}
            className="flex-1 p-2 border rounded-md text-black"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Text Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={currentStyle.textColor}
            onChange={(e) => setButton(button.selectedButton, 'textColor', e.target.value)}
            className="w-12 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={currentStyle.textColor}
            onChange={(e) => setButton(button.selectedButton, 'textColor', e.target.value)}
            className="flex-1 p-2 border rounded-md text-black"
            placeholder="#FFFFFF"
          />
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">Preview</label>
        <div className={`flex justify-${currentStyle.alignment}`}>
          <button
            style={{
              backgroundColor: currentStyle.bgColor,
              color: currentStyle.textColor,
              borderRadius: `${currentStyle.radius}px`,
              padding: '10px 20px',
              boxShadow:
                currentStyle.shadow === 'none'
                  ? 'none'
                  : currentStyle.shadow === 'sm'
                  ? '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                  : currentStyle.shadow === 'md'
                  ? '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  : currentStyle.shadow === 'lg'
                  ? '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  : '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            }}
          >
            {buttonOptions.find((b) => b.id === button.selectedButton)?.label || 'Button'}
          </button>
        </div>
      </div>
    </div>
  );
}
