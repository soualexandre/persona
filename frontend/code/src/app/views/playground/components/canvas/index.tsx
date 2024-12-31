import { ArrowLeftToLine, ArrowRightToLine, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFabricCanvas } from "../../useCanvas";
import { TwitterPicker } from "react-color";
import ShirtPartsList from "../controls";
import useColorMapStore from "../../store/colorMapStore";

const Canvas: React.FC = () => {
  const { idColorMap, canvasRef, selectedPart } = useFabricCanvas();

  
  useEffect(() => {
    console.log("IdColorMap atualizado:", idColorMap);
  }, [idColorMap]);

  useEffect(() => {
    console.log("selectedPart atualizads:", selectedPart);
  }, [selectedPart]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <button
          className="text-gray-600 hover:text-black hover:bg-gray-200"
        >
          <Trash />
        </button>
        <button
          className="text-gray-600 hover:text-black"
        >
          <ArrowLeftToLine />
        </button>
        <button
          className="text-gray-600 hover:text-black"
        >
          <ArrowRightToLine />
        </button>
        {/* <button
          onClick={handleUpdateColor}
          className="text-gray-600 hover:text-black hover:bg-red-200"
        >
          Alterar Cor
        </button> */}
        <ShirtPartsList />
      </div>
      <canvas
        ref={canvasRef}
        className="flex justify-center  items-center bg-transparent inset-0 w-[500] h-[500] z-20"
      ></canvas>
    </div>
  );
};

export default Canvas;
