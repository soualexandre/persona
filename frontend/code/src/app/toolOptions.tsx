import React from "react";

interface ToolOptionsProps {
  expandedMenu: string | null;
  addText: () => void;
  addImage: (file: File) => void;
  removeSelectedObject: () => void;
  positionImage: (position: string) => void;
  textProperties: Record<string, any>;
  setTextProperties: React.Dispatch<React.SetStateAction<any>>;
}

export const ToolOptions: React.FC<ToolOptionsProps> = ({
  expandedMenu,
  addText,
  addImage,
  removeSelectedObject,
  positionImage,
  textProperties,
  setTextProperties,
}) => {
  console.log("expandedMenu", expandedMenu);
  if (expandedMenu === "text") {
    return (
      <div className="w-64 bg-white border-r p-4 space-y-4">
        <button
          onClick={addText}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Adicionar Texto
        </button>
        <label>Cor do Texto</label>
        <input
          type="color"
          value={textProperties.fill}
          onChange={(e) =>
            setTextProperties((prev: any) => ({
              ...prev,
              fill: e.target.value,
            }))
          }
          className="w-full"
        />
      </div>
    );
  }

  if (expandedMenu === "upload") {
    return (
      <div className="w-64 bg-white border-r p-4 space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              Array.from(e.target.files).forEach(addImage);
            }
          }}
          className="w-full border rounded p-2"
        />
      </div>
    );
  }

  return null;
};
