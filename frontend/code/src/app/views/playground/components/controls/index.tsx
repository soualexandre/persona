
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TwitterPicker } from 'react-color';
import { useFabricCanvas } from "../../useCanvas";
import useColorMapStore from "../../store/colorMapStore";

const SHIRT_PARTS = [
  { id: "chest", name: "Peito", icon: "/barra.svg", group: "front" },
  { id: "frontBody", name: "Corpo", icon: "/barra.svg", group: "front" },
  { id: "collar", name: "Gola", icon: "/barra.svg", group: "front" },
  {
    id: "manga-esquerda",
    name: "Manga Esquerda",
    icon: "/barra.svg",
    group: "front",
  },
  {
    id: "manga-direita",
    name: "Manga Direita",
    icon: "/barra.svg",
    group: "front",
  },
  { id: "body", name: "Costas", icon: "/barra.svg", group: "back" },
  { id: "collar", name: "Gola", icon: "/barra.svg", group: "back" },
  { id: "ombros", name: "Ombros", icon: "/barra.svg", group: "front" },
  { id: "laterais", name: "Laterais", icon: "/barra.svg", group: "front" },
];

const SHIRT_GROUP = [
  { id: "front", name: "Frente", icon: "/barra.svg" },
  { id: "back", name: "Costas", icon: "/barra.svg" },
];

interface ShirtPartsListProps {
  selectedPart: string | null;
  setSelectedPart: (part: string) => void;
}

const PartColorPicker: React.FC<{
  selectedPart: any;
  isExpanded: boolean;
}> = ({ selectedPart }) => {

  const [selectedColor, ] = useState();
  const { updateColor } = useColorMapStore();

  const handleUpdateColor = (color: any) => {
    updateColor(selectedPart, color.hex);
  };

  return (
    <div className="h-full flex items-center gap-3 p-2 bg-gray-50 rounded-b-lg border-t border-gray-200">
      <TwitterPicker
        color={selectedColor}
        onChange={handleUpdateColor}
      />
    </div>
  );
};

const ShirtPartsList: React.FC = ({ setNewColor }: any) => {

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set());


  const { selectedPart, setSelectedPart } = useFabricCanvas();




  const handleGroupClick = (groupId: string) => {
    setSelectedGroup(groupId === selectedGroup ? null : groupId);
    setExpandedParts(new Set());
  };

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    setExpandedParts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(partId)) {
        newSet.delete(partId);
      } else {
        newSet.add(partId);
      }
      return newSet;
    });
  };



  return (
    <div
      className="fixed top-16 right-0 h-[calc(100vh-4rem)] bg-white rounded-xl shadow-sm flex flex-col  w-[250px] absolute right-0 "
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Personalizar</h2>
      </div>

      <div className="p-6 flex flex-col flex-grow overflow-hidden">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {SHIRT_GROUP.map((group) => (
            <button
              key={group.id}
              onClick={() => handleGroupClick(group.id)}
              className={`flex flex-col items-center p-4 rounded-lg border border-gray-200 transition-all duration-200 ${selectedGroup === group.id
                ? "bg-blue-50 ring-2 ring-blue-500"
                : "hover:bg-gray-50"
                }`}
            >
              <Image
                src={group.icon}
                alt={group.name}
                width={32}
                height={32}
                className="mb-2"
              />
              <span className="text-sm font-medium text-gray-700">
                {group.name}
              </span>
            </button>
          ))}
        </div>
        {selectedGroup && (
          <div className="overflow-y-scroll pr-2 space-y-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
            {SHIRT_PARTS.filter((part) => part.group === selectedGroup).map(
              (part) => (
                <div key={part.id}>
                  <button
                    onClick={() => handlePartClick(part.id)}
                    className={`w-full flex items-center justify-between p-3 transition-all duration-200 ${expandedParts.has(part.id)
                      ? "bg-blue-50 border-blue-500 rounded-t-lg"
                      : "bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full border"
                      // style={{
                      //   backgroundColor:
                      //     colors.find((c) => c.selectedPart === part.id)
                      //       ?.color || "#ffffff",
                      // }}
                      />
                      <Image
                        src={part.icon}
                        alt={part.name}
                        width={24}
                        height={24}
                        className="opacity-75"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {part.name}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${expandedParts.has(part.id) ? "rotate-90" : ""
                        } ${expandedParts.has(part.id)
                          ? "text-blue-500"
                          : "text-gray-400"
                        }`}
                    />
                  </button>

                  <PartColorPicker
                    selectedPart={selectedPart}
                    isExpanded={expandedParts.has(part.id)}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};


export default ShirtPartsList;