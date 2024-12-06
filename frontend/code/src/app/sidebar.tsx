import React from "react";
import { Type, Image as ImageIcon, File } from "lucide-react";

interface SidebarProps {
  expandedMenu: string | null;
  toggleMenu: (toolKey: string) => void;
}

const tools = [
  { icon: <Type className="w-6 h-6" />, name: "Texto", toolKey: "text" },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    name: "Imagem",
    toolKey: "upload",
  },
  { icon: <File className="w-6 h-6" />, name: "Modelos", toolKey: "templates" },
];

export const Sidebar: React.FC<SidebarProps> = ({
  expandedMenu,
  toggleMenu,
}) => (
  <div className="w-20 bg-gray-50 border-r shadow flex flex-col items-center py-4">
    {tools.map((tool) => (
      <button
        key={tool.name}
        onClick={() => toggleMenu(tool.toolKey)}
        className={`p-3 rounded-lg transition-all ${
          expandedMenu === tool.toolKey
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        title={tool.name}
      >
        {tool.icon}
      </button>
    ))}
  </div>
);
