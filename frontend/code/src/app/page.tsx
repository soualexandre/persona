"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { ToolOptions } from "./toolOptions";
import { useFabricCanvas } from "./useCanvas";
import {
  AlignCenter,
  AlignEndVertical,
  AlignLeft,
  AlignRight,
  AlignStartVertical,
} from "lucide-react";
import { CamisaPolo } from "./clotches/CamisaFrenteBranca";
import DynamicSvg from "./clotches/dynamicSvg";

const Home: React.FC = () => {
  const {
    canvasRef,
    expandedMenu,
    positionImage,
    toggleMenu,
    addText,
    addImage,
    removeSelectedObject,
    textProperties,
    setTextProperties,
  } = useFabricCanvas();

  const [camisaColors, setCamisaColors] = useState<CamisaPolo>({
    delineado: "#000",
    mangas: "blue",
    mangaEsquerda: "#fff",
    cls5Fill: "#fff",
    gola: "blue",
    golaFina: "#000",
    botoes: "#000",
    contornosBotoes: "#fff",
    barraInferior: "#000",
    bordaMangaDireita: "#000",
    corpo: "blue",
    ranhuras: "#fff",
    interior: "#fff",
  });

  const handleColorChange = (color: string, part: keyof CamisaPolo) => {
    setCamisaColors((prevColors) => ({
      ...prevColors,
      [part]: color,
    }));
  };

  const colorInputClasses = "w-full h-10 p-1 border border-gray-300 rounded-md";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const sectionClasses = "bg-white p-4 rounded-lg shadow-md";

  return (
    <div className="flex h-screen" style={{ background: "grey" }}>
      {/* Sidebar */}
      <Sidebar expandedMenu={expandedMenu} toggleMenu={toggleMenu} />

      {/* Tool Options */}
      {expandedMenu && (
        <ToolOptions
          expandedMenu={expandedMenu}
          addText={addText}
          addImage={addImage}
          positionImage={positionImage}
          removeSelectedObject={removeSelectedObject}
          textProperties={textProperties}
          setTextProperties={setTextProperties}
        />
      )}

      {/* Canvas Area */}
      <div
        className="flex h-screen w-screen justify-center items-center gap-4"
        style={{ background: "#fafafa" }}
      >
        <div
          style={{
            background: "#fff",
            width: 800,
            height: 800,
            position: "relative",
          }}
        >
          {/* SVG Display */}
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <DynamicSvg {...camisaColors} />
          </div>

          {/* Canvas */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: "6rem",
              height: "100%",
            }}
          >
            <canvas
              ref={canvasRef}
              className="group border-2 border-transparent hover:border-gray-300 hover:border-dashed"
            ></canvas>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="bg-white p-6 rounded-xl shadow-2xl">
          {/* Object Positioning */}
          <section className={`${sectionClasses} mb-6`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Posicionamento da Objeto
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {[
                {
                  icon: AlignStartVertical,
                  position: "top-left",
                  label: "Top Left",
                },
                { icon: AlignRight, position: "top-right", label: "Top Right" },
                { icon: AlignCenter, position: "center", label: "Center" },
                {
                  icon: AlignLeft,
                  position: "bottom-left",
                  label: "Bottom Left",
                },
                {
                  icon: AlignEndVertical,
                  position: "bottom-right",
                  label: "Bottom Right",
                },
              ].map(({ icon: Icon, position, label }) => (
                <button
                  key={position}
                  onClick={() => positionImage(position)}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-black" />
                </button>
              ))}
            </div>
          </section>

          {/* Color Customization */}
          <section className={sectionClasses}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Personalização de Cores
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(camisaColors).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className={labelClasses}>
                    {key}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id={key}
                      value={value}
                      onChange={(e) =>
                        handleColorChange(
                          e.target.value,
                          key as keyof CamisaPolo
                        )
                      }
                      className={colorInputClasses}
                    />
                    <div
                      className="w-10 h-10 rounded-md border border-gray-300"
                      style={{ backgroundColor: value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
