import { ArrowLeftToLine, ArrowRightToLine, Trash } from "lucide-react";
import React from "react";
import { useFabricCanvas } from "../../useCanvas";
import ShirtPartsList from "../controls";

const Canvas: React.FC = () => {
  const { canvasRef } = useFabricCanvas();
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
