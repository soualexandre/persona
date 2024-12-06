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
  // AlignBottom,
  // AlignTop,
} from "lucide-react";

import CamisaFrenteBranca, { CamisaPolo } from "./clotches/CamisaFrenteBranca";

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
    mangas: "#fff",
    mangaEsquerda: "#fff",
    cls5Fill: "#fff",
    gola: "#000",
    golaFina: "#000",
    botoes: "#000",
    contornosBotoes: "#fff",
    barraInferior: "#000",
    bordaMangaDireita: "#000",
    corpo: "#fff",
    ranhuras: "#fff",
    interior: "#fff",
  });

  const colorInputClasses = "w-full h-10 p-1 border border-gray-300 rounded-md";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const sectionClasses = "bg-white p-4 rounded-lg shadow-md";

  const handleColorChange = (color: string, part: keyof CamisaPolo) => {
    setCamisaColors((prevColors) => ({
      ...prevColors,
      [part]: color,
    }));
  };

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
        className="flex h-screen w-screen justify-center items-center gap-4 "
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
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <CamisaFrenteBranca {...camisaColors} />
          </div>
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
        <div className="  bg-white p-6 rounded-xl shadow-2xl">
          {/* Positioning Section */}
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
                  // className={`p-2 ${
                  //   imagePosition === position ? "bg-blue-100" : "bg-gray-100"
                  // } hover:bg-gray-200 rounded-full transition-colors duration-200`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-black" />
                </button>
              ))}
            </div>
          </section>

          {/* Color Customization Section */}
          <section className={sectionClasses}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Personalização de Cores
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "gola", label: "Gola" },
                { id: "mangas", label: "Mangas" },
                { id: "delineado", label: "Delineado" },
                { id: "botoes", label: "Botões" },
                { id: "barraInferior", label: "Barra Inferior" },
                { id: "bordaMangaDireita", label: "Barra Manga" },
                { id: "corpo", label: "Corpo" },
                { id: "ranhuras", label: "Ranhuras" },
              ].map(({ id, label }) => (
                <div key={id} className="flex flex-col">
                  <label htmlFor={id} className={labelClasses}>
                    {label}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id={id}
                      value={camisaColors[id]}
                      onChange={(e) => handleColorChange(e.target.value, id)}
                      className={colorInputClasses}
                    />
                    <div
                      className="w-10 h-10 rounded-md border border-gray-300"
                      // style={{ backgroundColor: camisaColors[id] }}
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
