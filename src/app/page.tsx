'use client';
import {Pencil,X} from "lucide-react";
import { DynamicPreview } from "@/components/preview/DynamicPreview";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { useState } from "react";

export default function Home() {
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  return (
    <main className="h-screen bg-gray-100">
      <div className="w-full h-full relative">
        <DynamicPreview />
      </div>
      <button 
        onClick={() => setIsEditorVisible(!isEditorVisible)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-900 transition-colors"
        aria-label="Toggle Editor"
      >
        {isEditorVisible ? <X /> : <Pencil />}
      </button>
      {isEditorVisible && (
        <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-gray-200 shadow-2xl z-40 overflow-hidden">
          <EditorPanel />
        </div>
      )}
    </main>
  );
}