# Dynamic UI Editor for Customizable Designs

A powerful, real-time UI customization platform built with Next.js 15 and React that enables dynamic modification of UI components without writing code. This project demonstrates advanced frontend architecture with state management, live preview, and modular component design.

![Dynamic UI Editor](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-orange?style=flat)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Component API](#component-api)
- [Editor Interface](#editor-interface)
- [Architecture](#architecture)
- [Customization Options](#customization-options)
- [State Management](#state-management)
- [Export/Import](#exportimport)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Design Decisions](#design-decisions)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## 🎯 Overview

This Dynamic UI Editor is designed for **real-world scenarios** where clients and designers frequently request UI tweaks without requiring code changes. The editor provides a comprehensive interface for customizing layouts, typography, colors, buttons, galleries, and more—all with real-time visual feedback.

### Real-Life Context

In modern applications like dashboards, admin panels, or SaaS platforms, design requirements constantly evolve. This project simulates that scenario by providing:
- **Code-free customization** for non-technical users
- **Live preview** of all changes in real-time
- **Export/Import functionality** for configuration reuse
- **Multiple layout switching** for different design variations
- **Modular component architecture** for easy maintenance

## ✨ Features

### Core Features (Based on Requirements)

#### 1. **Typography Controls**
- ✅ **Font Family Selection**: Choose from 6 pre-configured fonts (Roboto, Inter, Poppins, Montserrat, Open Sans, Lato)
- ✅ **Font Weight**: Adjustable from Light (300) to Bold (700)
- ✅ **Font Size**: Granular control for Heading, Body, Small, and Button text (10px - 60px range)
- ✅ **Real-time Preview**: Instant visual feedback across all text elements

#### 2. **Button Customization**
- ✅ **Border Radius**: Smooth to sharp corners (0-32px)
- ✅ **Shadow Options**: None, Small, Medium, Large, XL
- ✅ **Alignment**: Left, Center, Right
- ✅ **Background Color**: Full HEX/RGB color picker
- ✅ **Text Color**: Independent text color control
- ✅ **Multiple Button Types**: Separate customization for Add to Cart, Fixed/Movable Arms, View in Room, Gallery Thumbnails, and Control buttons

#### 3. **Gallery/Images**
- ✅ **Gallery Alignment**: Grid left, center, right
- ✅ **Image Spacing**: Adjustable gap between images (0-32px)
- ✅ **Image Border Radius**: Rounded corners for images (0-24px)
- ✅ **Vertical Thumbnail Gallery**: Side gallery with customizable button styles

#### 4. **General Layout**
- ✅ **Card Corner Radius**: Adjustable container border radius (0-32px)
- ✅ **Container Padding**: Dynamic padding control (0-64px)
- ✅ **Background Color**: Full color customization with HEX/RGB input
- ✅ **Responsive Design**: Mobile and desktop optimized

#### 5. **Stroke/Border**
- ✅ **Stroke Color**: Customizable border color with color picker
- ✅ **Stroke Weight**: Adjustable border width (1-8px)
- ✅ **Border Toggle**: Enable/disable borders dynamically

#### 6. **Layout Switching**
- ✅ **Two Layout Modes**: 
  - **Layout 1**: Tab-based category switching (compact view)
  - **Layout 2**: Stacked category view (expanded view)
- ✅ **Smooth Transitions**: Animated layout changes

#### 7. **Live Preview**
- ✅ **Real-time Updates**: All changes reflect immediately in the preview
- ✅ **3D Viewer Integration**: Interactive 3D model with Three.js
- ✅ **Responsive Preview**: Works seamlessly on different screen sizes

#### 8. **Output/Configuration Management**
- ✅ **JSON Export**: Export complete configuration as JSON file
- ✅ **JSON Import**: Import previously saved configurations
- ✅ **Reset to Default**: One-click reset to original settings
- ✅ **Timestamped Exports**: Auto-generated filenames with dates

### Additional Custom Features

#### 9. **Theme Management**
- ✅ **Primary Color**: Global primary color for UI elements
- ✅ **Secondary Color**: Accent color for selected states
- ✅ **Color Tooltips**: Hover tooltips showing color names and swatches

#### 10. **Advanced Materials**
- ✅ **Material Categories**: Leather, Silicone, Aluminum
- ✅ **Color Variations**: Multiple color options per material
- ✅ **Visual Feedback**: Selected color highlighting with theme colors

#### 11. **Enhanced UX**
- ✅ **Floating Editor Toggle**: Unobtrusive pencil icon to show/hide editor
- ✅ **Accordion Interface**: Organized controls in collapsible sections
- ✅ **Sticky Header**: Editor header stays visible during scroll
- ✅ **Smooth Animations**: Polished transitions and hover effects
- ✅ **Confirmation Dialogs**: Prevent accidental resets

#### 12. **3D Viewer**
- ✅ **Three.js Integration**: Interactive 3D chair model
- ✅ **Camera Controls**: Zoom, rotate, and pan capabilities
- ✅ **Control Buttons**: Fullscreen, screenshot, zoom in/out

## 🚀 Live Demo

🔗 **[View Live Demo](#)** _(Add your deployed link here)_

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NikhilCodes04/Dynamic-UI-Customizer.git
   cd dynamic-ui-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables (for 3D model hosting)**
   
   If you need to re-upload the 3D model to Vercel Blob:
   ```bash
   # Create .env.local file
   echo BLOB_READ_WRITE_TOKEN=your_vercel_blob_token > .env.local
   ```
   
   Get your token from [Vercel Dashboard](https://vercel.com/dashboard) → Storage → Blob

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

### 3D Model Hosting

The 3D chair model is hosted on **Vercel Blob Storage** for optimal performance and CDN delivery.



## 📦 Component API

### EditorStore API

The application uses Zustand for state management. Here are the main store methods:

```typescript
// Typography
setTypography(key: keyof TypographyState, value: any)

// Button
setButton(buttonId: string, key: keyof ButtonStyle, value: any)
getButtonStyle(buttonId: string): ButtonStyle

// Layout
setLayout(newLayout: Partial<LayoutState>)

// Gallery
setGallery(key: keyof GalleryState, value: any)

// Theme
setTheme(key: keyof ThemeState, value: any)

// Layout Switching
setCurrentLayout(layout: 'layout1' | 'layout2')

// Materials
setMaterialColor(material: MaterialType, color: string)
setSelectedMaterial(material: MaterialType)
```

### Configurable Props

#### Typography Configuration
```typescript
{
  fontFamily: string;          // Font family name
  fontSizes: {
    heading: number;           // 10-60px
    body: number;              // 10-60px
    small: number;             // 10-60px
    button: number;            // 10-60px
  };
  fontWeight: number;          // 300, 400, 500, 600, 700
}
```

#### Button Configuration
```typescript
{
  bgColor: string;             // HEX color
  textColor: string;           // HEX color
  radius: number;              // 0-32px
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  alignment: 'left' | 'center' | 'right';
}
```

#### Layout Configuration
```typescript
{
  bgColor: string;             // HEX color
  padding: number;             // 0-64px
  cardRadius: number;          // 0-32px
  borderEnabled: boolean;
  borderWidth: number;         // 1-8px
  borderColor: string;         // HEX color
}
```

#### Gallery Configuration
```typescript
{
  alignment: 'left' | 'center' | 'right';
  spacing: number;             // 0-32px
  borderRadius: number;        // 0-24px
}
```

## 🎨 Editor Interface

### Editor Panel Structure

The editor is organized into collapsible accordion sections:

1. **Layout** - Switch between Layout 1 and Layout 2
2. **Typography** - Font family, weight, and sizes
3. **Button** - Multi-button customization with preview
4. **Gallery** - Image gallery settings
5. **Theme Colors** - Primary and secondary colors
6. **General Layout** - Background, padding, border radius
7. **Stroke/Border** - Border styling and visibility

### Editor Features

- **Floating Toggle Button**: Click the pencil icon (bottom-right) to show/hide the editor
- **Real-time Preview**: All changes instantly reflect in the preview
- **Organized Controls**: Grouped by category for easy navigation
- **Visual Feedback**: Active states, hover effects, and tooltips
- **Responsive Design**: Works on mobile and desktop screens

## 🏗️ Architecture

### Component Structure

```
src/
├── app/
│   ├── page.tsx                    # Main application page
│   ├── layout.tsx                  # Root layout
│   └── api/configs/route.ts        # API routes (optional)
├── components/
│   ├── editor/
│   │   ├── EditorPanel.tsx         # Main editor interface
│   │   ├── ButtonControls.tsx      # Button customization panel
│   │   ├── MaterialControl.tsx     # Material selection
│   │   └── TypographyControls.tsx  # Typography controls
│   ├── preview/
│   │   ├── DynamicPreview.tsx      # Live preview component
│   │   └── ThreeDViewer.tsx        # 3D model viewer
│   └── ui/
│       └── accordion.tsx           # Reusable accordion component
├── store/
│   └── storeEditor.ts              # Zustand state management
└── types/
    └── index.ts                    # TypeScript definitions
```

### State Management Flow

```
User Interaction → EditorPanel → Zustand Store → DynamicPreview → Visual Update
```

1. User adjusts a control in `EditorPanel`
2. Change is dispatched to Zustand store
3. Store updates state immutably
4. `DynamicPreview` subscribes to state changes
5. Component re-renders with new styles

## 🎛️ Customization Options

### Typography Customization

- **6 Font Families**: Professional fonts for different brand identities
- **5 Font Weights**: From Light to Bold
- **4 Size Categories**: Heading, Body, Small, Button text
- **Range**: 10px to 60px with slider control

### Button Customization

The editor supports **6 different button types**:

1. **Add to Cart** - Primary action button
2. **Fixed Arms** - Product option selection
3. **Movable Arms** - Product option selection
4. **View in Room** - AR/3D viewer trigger
5. **Gallery Thumbnails** - Image gallery items
6. **Control Buttons** - Zoom, fullscreen controls

Each button can be customized independently for maximum flexibility.

### Color Customization

- **HEX Input**: Manual color code entry
- **Color Picker**: Visual color selection
- **Real-time Preview**: Instant color updates
- **Theme Integration**: Primary/secondary color support

### Layout Modes

#### Layout 1 (Tab-Based)
- Compact category display
- Tab navigation for materials
- Ideal for mobile devices
- Saves vertical space

#### Layout 2 (Stacked)
- All categories visible simultaneously
- Easier overview of all options
- Better for desktop screens
- No need to switch tabs

## 💾 State Management

### Zustand Store Structure

The application uses **Zustand** for lightweight, scalable state management:

```typescript
const useEditorStore = create<EditorState>((set, get) => ({
  typography: { /* ... */ },
  button: { /* ... */ },
  layout: { /* ... */ },
  gallery: { /* ... */ },
  theme: { /* ... */ },
  materials: { /* ... */ },
  // Actions
  setTypography: (key, value) => { /* ... */ },
  setButton: (buttonId, key, value) => { /* ... */ },
  // ... other actions
}))
```

### Why Zustand?

- ✅ **Minimal Boilerplate**: Simple API, less code
- ✅ **No Providers**: Direct store access without Context
- ✅ **TypeScript Support**: Full type safety
- ✅ **Small Bundle Size**: ~1KB gzipped
- ✅ **DevTools Integration**: Easy debugging

## 📤 Export/Import

### Export Configuration

Click **"Export Settings"** to download a JSON file containing all current customizations:

```json
{
  "typography": { /* ... */ },
  "layout": { /* ... */ },
  "button": { /* ... */ },
  "gallery": { /* ... */ },
  "theme": { /* ... */ },
  "materials": { /* ... */ }
}
```

### Import Configuration

1. Click **"Import Settings"**
2. Select a previously exported JSON file
3. Configuration applies instantly
4. Confirmation message appears

### Reset to Default

- Click **"Reset to Default"**
- Confirmation dialog prevents accidents
- All settings revert to initial state
- Useful for starting fresh

## 📁 Project Structure

```
dynamic-ui-editor/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API routes
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   ├── components/                 # React components
│   │   ├── editor/                 # Editor-related components
│   │   ├── preview/                # Preview components
│   │   └── ui/                     # Reusable UI components
│   ├── lib/                        # Utility functions
│   │   └── utils.ts                # Helper utilities
│   ├── store/                      # State management
│   │   └── storeEditor.ts          # Zustand store
│   └── types/                      # TypeScript types
├── public/                         # Static assets
│   ├── models/                     # 3D model files
│   └── gallery-image.png           # Gallery images
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Documentation
```

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.5.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **clsx & tailwind-merge** - Dynamic class management

### State Management
- **Zustand 5.0.8** - Lightweight state management

### 3D Rendering
- **Three.js 0.180.0** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### UI Components
- **Radix UI Accordion** - Accessible accordion component
- **Lucide React** - Beautiful icon library
- **react-colorful** - Lightweight color picker

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript linting
- **Turbopack** - Fast bundler for development

## 💡 Design Decisions

### 1. **Zustand over Redux**
- **Rationale**: Simpler API, less boilerplate, better performance
- **Benefit**: Faster development, smaller bundle size

### 2. **Component Modularity**
- **Rationale**: Separate concerns, easier maintenance
- **Benefit**: Reusable components, testable code

### 3. **Accordion Interface**
- **Rationale**: Organized controls, reduced visual clutter
- **Benefit**: Better UX, easier navigation

### 4. **Two Layout Modes**
- **Rationale**: Different use cases (mobile vs desktop)
- **Benefit**: Flexible presentation, improved UX

### 5. **Real-time Preview**
- **Rationale**: Immediate feedback is essential for design tools
- **Benefit**: Faster iteration, better user confidence

### 6. **JSON Export/Import**
- **Rationale**: Configuration portability and reuse
- **Benefit**: Save time, maintain consistency

### 7. **TypeScript Throughout**
- **Rationale**: Type safety prevents bugs
- **Benefit**: Better IDE support, fewer runtime errors

### 8. **Tailwind CSS**
- **Rationale**: Rapid styling, consistent design system
- **Benefit**: Faster development, smaller CSS bundle







