import React, { useState } from "react";
import Canvas from "./components/canvas";
import ShirtPartsList from "./components/controls";

export type ColorMap = {
  selectedPart: string;
  color: string;
};

const Playground: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorMap[]>([
    { selectedPart: "sleeve", color: "#ffffff" },
    { selectedPart: "frontBody", color: "#ffffff" },
    { selectedPart: "body", color: "#ffffff" },
    { selectedPart: "collar", color: "#ffffff" },
    { selectedPart: "buttons", color: "#ffffff" },
    { selectedPart: "contour", color: "#000000" },
    { selectedPart: "manga-esquerda", color: "#000000" },
    { selectedPart: "manga-direita", color: "#000000" },
    { selectedPart: "cls10", color: "#000000" },
  ]);

  return (
    <div className="flex gap-10  w-full">
      <Canvas
        colors={colors}
        setColors={setColors}
        selectedPart={selectedPart}
      />
      {/* <ShirtPartsList
        colors={colors}
        setColors={setColors}
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
      /> */}
    </div>
  );
};

export default Playground;