import React, { useState } from "react";
import Canvas from "./components/canvas";

export type ColorMap = {
  selectedPart: string;
  color: string;
};

const Playground: React.FC = () => {

  return (
    <div className="flex justify-center items-center gap-10 w-full">
      <Canvas/>
    </div>
  );
};

export default Playground;