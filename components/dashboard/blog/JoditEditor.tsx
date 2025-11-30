"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Jodit must be loaded dynamically (SSR OFF)
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

type EditorPropsType = {
  value: string,
  onChange: (value: string) => void
}

export default function JoditEditorComponent({ value, onChange }: EditorPropsType) {
  const [content, setContent] = useState(value || "");

  const config = {
    readonly: false,
    height: 400,
    placeholder: "Start writing here..."
  };

  return (
    <div className="border rounded-md p-2 bg-white">
      <JoditEditor
        value={content}
        config={config}
        onBlur={(newContent) => {
          setContent(newContent);
          onChange && onChange(newContent);
        }}
      />
    </div>
  );
}
