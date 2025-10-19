import { create, StateCreator } from "zustand";

// Define types for our state
interface TypographyState {
    fontFamily: string;
    fontSizes: {
        heading: number;
        body: number;
        small: number;
        button: number;
    };
    selectedFontSizeType: 'heading' | 'body' | 'small' | 'button';
    fontWeight: number;
}

interface ButtonStyle {
    bgColor: string;
    textColor: string;
    radius: number;
    shadow: string;
    alignment: 'left' | 'center' | 'right';
}

interface ButtonState {
    buttons: {
        [key: string]: ButtonStyle;
    };
    selectedButton: string;
}

interface GalleryState {
    alignment: 'left' | 'center' | 'right';
    spacing: number;
    borderRadius: number;
}

export interface LayoutState {
    bgColor: string;
    padding: number;
    cardRadius: number;
    borderEnabled: boolean;
    borderWidth: number;
    borderColor: string;
}

interface MaterialState {
    color: string;
}

interface EditorState {
    typography: TypographyState;
    button: ButtonState;
    layout: LayoutState;
    gallery: GalleryState;
    theme: ThemeState;
    currentLayout: 'layout1' | 'layout2';
    materials: {
        leather: MaterialState;
        silicon: MaterialState;
        aluminum: MaterialState;
    };
    selectedMaterial: keyof EditorState["materials"];
    setTypography: <K extends keyof TypographyState>(
        key: K,
        value: TypographyState[K]
    ) => void;
    setButton: <K extends keyof ButtonStyle>(
        buttonId: string,
        key: K,
        value: ButtonStyle[K]
    ) => void;
    setSelectedButton: (buttonId: string) => void;
    getButtonStyle: (buttonId: string) => ButtonStyle;
    setLayout: (newLayout: Partial<LayoutState>) => void;
    setGallery: <K extends keyof GalleryState>(
        key: K,
        value: GalleryState[K]
    ) => void;
    setMaterialColor: (
        material: keyof EditorState["materials"],
        color: string
    ) => void;
    setSelectedMaterial: (material: keyof EditorState["materials"]) => void;
    setTheme: <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => void;
    setCurrentLayout: (layout: 'layout1' | 'layout2') => void;
}

export interface ThemeState {
    primaryColor: string;
    secondaryColor: string;
}

export interface LayoutSlice {
    layout: LayoutState;
    setLayout: (newLayout: Partial<LayoutState>) => void;
}

const createLayoutSlice: StateCreator<EditorState, [], [], LayoutSlice> = (
    set
) => ({
    layout: {
        bgColor: "#ffffff",
        padding: 0,
        cardRadius: 8,
        borderEnabled: true,
        borderWidth: 1,
        borderColor: "#d9d9d9",
    },
    setLayout: (newLayout) =>
        set((state) => ({ layout: { ...state.layout, ...newLayout } })),
});

export const useEditorStore = create<EditorState>()((set, get, api) => ({
    // Default values
    typography: {
        fontFamily: "Poppins, sans-serif",
        fontSizes: {
            heading: 18,
            body: 16,
            small: 14,
            button: 16,
        },
        selectedFontSizeType: 'body',
        fontWeight: 500,
    },
    button: {
        buttons: {
            'addToCart': {
                bgColor: "#C6614D",
                textColor: "#FFFFFF",
                radius: 8,
                shadow: "md",
                alignment: 'center',
            },
            'fixedArms': {
                bgColor: "#000000",
                textColor: "#FFFFFF",
                radius: 8,
                shadow: "none",
                alignment: 'center',
            },
            'movableArms': {
                bgColor: "#FFFFFF",
                textColor: "#000000",
                radius: 8,
                shadow: "none",
                alignment: 'center',
            },
            'viewInRoom': {
                bgColor: "#FFFFFF",
                textColor: "#000000",
                radius: 8,
                shadow: "sm",
                alignment: 'left',
            },
            'galleryThumbnail': {
                bgColor: "#FFFFFF",
                textColor: "#000000",
                radius: 4,
                shadow: "none",
                alignment: 'center',
            },
            'controlButton': {
                bgColor: "#FFFFFF",
                textColor: "#000000",
                radius: 4,
                shadow: "sm",
                alignment: 'center',
            },
        },
        selectedButton: 'addToCart',
    },
    gallery: {
        alignment: 'left',
        spacing: 8,
        borderRadius: 4,
    },
    theme: {
        primaryColor: '#C6614D',
        secondaryColor: '#ffdbd4',
    },
    currentLayout: 'layout1',
    ...createLayoutSlice(set, get, api),
    materials: {
        leather: { color: "#F5F5F5" },
        silicon: { color: "#5A5A5A" },
        aluminum: { color: "#D3D3D3" },
    },
    selectedMaterial: "leather",

    // Actions
    setTypography: (key, value) =>
        set((state) => ({
            typography: { ...state.typography, [key]: value },
        })),
    setButton: (buttonId, key, value) =>
        set((state) => ({
            button: {
                ...state.button,
                buttons: {
                    ...state.button.buttons,
                    [buttonId]: {
                        ...state.button.buttons[buttonId],
                        [key]: value,
                    },
                },
            },
        })),
    setSelectedButton: (buttonId) =>
        set((state) => ({
            button: { ...state.button, selectedButton: buttonId },
        })),
    getButtonStyle: (buttonId) => {
        const state = get();
        return state.button.buttons[buttonId] || state.button.buttons['addToCart'];
    },
    setGallery: (key, value) =>
        set((state) => ({
            gallery: { ...state.gallery, [key]: value },
        })),
    setMaterialColor: (material, color) =>
        set((state) => ({
            materials: {
                ...state.materials,
                [material]: { ...state.materials[material], color },
            },
        })),
    setSelectedMaterial: (material) => set({ selectedMaterial: material }),
    setTheme: (key, value) =>
        set((state) => ({
            theme: { ...state.theme, [key]: value },
        })),
    setCurrentLayout: (layout) => set({ currentLayout: layout }),
}));
