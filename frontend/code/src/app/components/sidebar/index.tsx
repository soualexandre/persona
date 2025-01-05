import React from "react";
import { Type, Image as ImageIcon, File } from "lucide-react";
import { ToolOptions } from "./toolOptions";
import { useFabricCanvas } from "@/app/views/playground/useCanvas";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "../tooltip";

interface Tool {
  icon: React.ReactNode;
  name: string;
  toolKey: string;
  description: string;
  shortcut?: string;
}

const tools: Tool[] = [
  {
    icon: <Type className="w-6 h-6" />,
    name: "Texto",
    toolKey: "text",
    description: "Adicione e edite texto no canvas",
    shortcut: "T"
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    name: "Imagem",
    toolKey: "upload",
    description: "Faça upload de imagens",
    shortcut: "I"
  },
  {
    icon: <File className="w-6 h-6" />,
    name: "Modelos",
    toolKey: "templates",
    description: "Escolha entre modelos predefinidos",
    shortcut: "M"
  }
];

export const Sidebar: React.FC = () => {
  const { expandedMenu, toggleMenu } = useFabricCanvas();

  // Keyboard shortcuts handler
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const tool = tools.find(
        t => t.shortcut?.toLowerCase() === e.key.toLowerCase()
      );
      if (tool && !e.ctrlKey && !e.metaKey && !e.altKey) {
        toggleMenu(tool.toolKey);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleMenu]);

  return (
    <nav
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-50 border-r shadow-lg transition-all duration-300 ease-in-out"
      aria-label="Ferramentas de edição"
    >
      <div className="flex flex-col items-center py-4 space-y-2">
        {tools.map((tool) => (
          <Tooltip
            key={tool.toolKey}
            content={
              <div className="text-sm">
                <p>{tool.description}</p>
                {tool.shortcut && (
                  <p className="mt-1 text-xs text-gray-400">
                    Atalho: {tool.shortcut}
                  </p>
                )}
              </div>
            }
            side="right"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleMenu(tool.toolKey)}
              className={`
                relative w-16 h-16 rounded-xl transition-all
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${expandedMenu === tool.toolKey
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
                }
              `}
              aria-label={tool.name}
              aria-pressed={expandedMenu === tool.toolKey}
              aria-description={tool.description}
              role="button"
            >
              <div className="flex flex-col items-center gap-1">
                {tool.icon}
                <span className="text-xs font-medium">{tool.name}</span>
              </div>
            </motion.button>
          </Tooltip>
        ))}
      </div>

      <AnimatePresence>
        {expandedMenu && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-20 top-0 h-full"
          >
            <ToolOptions
              expandedMenu={expandedMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Sidebar;