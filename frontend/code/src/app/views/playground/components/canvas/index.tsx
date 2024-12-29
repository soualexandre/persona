import { ArrowLeftToLine, ArrowRightToLine, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useFabricCanvas } from "../../useCanvas";

const Canvas: React.FC = () => {
  const { idColorMap, canvasRef, setIdColorMap } = useFabricCanvas();

  const setNewColor = () => {
    setIdColorMap((prev) => ({
      ...prev,
      "manga-esquerda": "blue",
      "manga-direita": "green",
    }));
  };

  useEffect(() => {
    console.log("IdColorMap atualizado:", idColorMap);
  }, [idColorMap]);

  return (
    <>
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
      <button
        onClick={setNewColor}
        className="text-gray-600 hover:text-black hover:bg-red-200"
      >
        Alterar Cor
      </button>
      <canvas
        ref={canvasRef}
        className="flex justify-center items-center bg-transparent inset-0 w-full h-full z-20"
      ></canvas>
    </>
  );
};

export default Canvas;
