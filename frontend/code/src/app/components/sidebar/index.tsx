import React from "react";
import { Type, Image as ImageIcon, File } from "lucide-react";
import { ToolOptions } from "./toolOptions";
import { useFabricCanvas } from "@/app/views/playground/useCanvas";



const tools = [
    { icon: <Type className="w-6 h-6" />, name: "Texto", toolKey: "text" },
    {
        icon: <ImageIcon className="w-6 h-6" />,
        name: "Imagem",
        toolKey: "upload",
    },
    { icon: <File className="w-6 h-6" />, name: "Modelos", toolKey: "templates" },
];

export const Sidebar: React.FC = () => {
    const { expandedMenu, toggleMenu } = useFabricCanvas();
    return (
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 bg-gray-50 border-r shadow">
            <div className="flex flex-col items-center">
                {tools.map((tool) => (
                    <button
                        key={tool.name}
                        onClick={() => toggleMenu(tool.toolKey)}
                        className={`rounded-lg w-20 transition-all ${expandedMenu === tool.toolKey
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100 text-gray-700"
                            }`}
                        title={tool.name}
                    >
                        <div className="flex flex-col items-center gap-2 py-3">
                            {tool.icon}
                            {tool.name}
                        </div>
                    </button>
                ))}
            </div>
            {expandedMenu && (
                <ToolOptions
                    expandedMenu={expandedMenu}
                //   addText={addText}
                //   addImage={addImage}
                //   positionImage={positionImage}
                //   removeSelectedObject={removeSelectedObject}
                //   textProperties={textProperties}
                //   setTextProperties={setTextProperties}
                />
            )}
        </div>

    )
};
