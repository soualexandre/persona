"use client";
import { ClotchesService } from "@/app/core/services/clotches";
import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";

export type ColorMap = {
  selectedPart: string;
  color: string;
};

export const useFabricCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [clotche, setClotche] = useState<any>(null); // Store the response object
  const [idColorMap, setIdColorMap] = useState<{ [key: string]: string }>({
    "manga-esquerda": "red",
    "manga-direita": "gray",
  });
  const [textProperties, setTextProperties] = useState({
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "",
    textAlign: "left",
    letterSpacing: 0,
    fill: "#000000",
  });

  const getClotches = async () => {
    const clotches = new ClotchesService();
    const response = await clotches.findAll();
    if (!response) {
      return new Error("Erro ao Obter Roupa");
    }
    setClotche(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getClotches();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        selection: true,
        preserveObjectStacking: true,
        hoverCursor: "move",
        moveCursor: "move",
        interactive: true,
      });

      setFabricCanvas(canvas);
      canvas.renderAll();
    }

    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    };
  }, [fabricCanvas]);

  const addSVG = (svgString: string) => {
    if (fabricCanvas) {
      fabric.loadSVGFromString(svgString, (objects: any, options) => {
        if (!objects || objects.length === 0) {
          console.error("Erro ao carregar o SVG: Objetos inválidos ou vazios.");
          return;
        }

        const svgGroup = fabric.util.groupSVGElements(objects, options);
        svgGroup.set({
          scaleX: 0.5,
          scaleY: 0.5,
        });

        fabricCanvas.add(svgGroup);
        updateCanvasColors();
      });
    } else {
      console.error("Canvas não inicializado.");
    }
  };

  const updateCanvasColors = () => {
    if (fabricCanvas) {
      fabricCanvas.getObjects().forEach((obj: any) => {
        if (obj instanceof fabric.Group) {
          obj.forEachObject((child: any) => {
            if (child.id && idColorMap[child.id]) {
              child.set({ fill: idColorMap[child.id] });
            }
          });
        } else if (obj.id && idColorMap[obj.id]) {
          obj.set({ fill: idColorMap[obj.id] });
        }
      });
      fabricCanvas.renderAll();
    }
  };

  useEffect(() => {
    updateCanvasColors();
  }, [idColorMap]);

  useEffect(() => {
    if (clotche && fabricCanvas) {
      const svgString = clotche[0].clotcheImage;
      addSVG(svgString);
    }
  }, [clotche, fabricCanvas]);

  return {
    idColorMap,
    setIdColorMap,
    canvasRef,
    fabricCanvas,
    expandedMenu,
    toggleMenu: (toolKey: string) =>
      setExpandedMenu((prev) => (prev === toolKey ? null : toolKey)),
    textProperties,
    setTextProperties,
  };
};
