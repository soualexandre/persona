"use client";
import { getClothes, getClothesById } from "@/app/core/services/clotches";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import useColorMapStore from "./store/colorMapStore";

export type ColorMap = {
  selectedPart: string;
  color: string;
};

export const useFabricCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [clotche, setClotche] = useState<any>(null);
  const [colorInput, setColorInput] = useState<any>(null);
  const { idColorMap } = useColorMapStore();
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

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
    const response = await getClothesById();
    if (!response) {
      throw new Error("Erro ao obter roupa");
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
    if (typeof window !== "undefined" && canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        selection: true,
        preserveObjectStacking: true,
        hoverCursor: "move",
        moveCursor: "move",
        interactive: true,
        backgroundColor: "#f0f0f0",
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

  const isValidSVG = (str: string) => {
    const svgPattern = /^<svg[^>]*>[\s\S]*<\/svg>/i;
    return svgPattern.test(str);
  };

  const addSVG = async (svgString: string) => {
    if (!isValidSVG(svgString)) {
      console.error("Erro: A string não é um SVG válido.");
      return;
    }

    if (!fabricCanvas) {
      console.error("Canvas não inicializado.");
      return;
    }

    fabric.loadSVGFromString(svgString, (objects, options) => {
      if (!objects || objects.length === 0) {
        console.error("Erro ao carregar o SVG: Objetos inválidos ou vazios.");
        return;
      }

      const svgGroup = new fabric.Group(objects, {
        ...options,
        originX: "center",
        originY: "center",
      });

      const canvasWidth = fabricCanvas.width || 0;
      const canvasHeight = fabricCanvas.height || 0;
      const svgWidth = options.width || svgGroup.width || 0;
      const svgHeight = options.height || svgGroup.height || 0;

      const scaleX = canvasWidth / svgWidth;
      const scaleY = canvasHeight / svgHeight;

      const scale = Math.min(scaleX, scaleY);

      svgGroup.set({
        scaleX: scale,
        scaleY: scale,
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        selectable: false, 
        evented: false,   
        hasControls: false, 
        lockMovementX: true, 
        lockMovementY: true,
        lockRotation: true,  
        lockScalingX: true,  
        lockScalingY: true, 
      });

      fabricCanvas.add(svgGroup);
      fabricCanvas.renderAll();
    });
  }

  useEffect(() => {
    if (canvasRef.current && fabricCanvas) {
      const parentWidth = canvasRef.current.clientWidth;
      const parentHeight = canvasRef.current.clientHeight;
      fabricCanvas.setWidth(parentWidth);
      fabricCanvas.setHeight(parentHeight);
      fabricCanvas.renderAll();
    }
  }, [fabricCanvas]);


  const updateCanvasColors = () => {
    console.log("Entrou na atualização")
    if (fabricCanvas) {
      fabricCanvas.getObjects().forEach((obj) => {
        if (obj instanceof fabric.Group) {
          obj.forEachObject((child: fabric.Object) => {
            console.log("id any ", child )
            console.log("id map color ", idColorMap )
            if ((child as any).id && idColorMap[(child as any).id]) {
              child.set({ fill: idColorMap[(child as any).id] });
              child.setCoords();
            }
          });
        } else if ((obj as any).id && idColorMap[(obj as any).id]) {
          obj.set({ fill: idColorMap[(obj as any).id] });  // Atualiza a cor do objeto
          obj.setCoords();  // Atualiza as coordenadas do objeto
        }
      });
      fabricCanvas.renderAll();  // Renderiza novamente o canvas para refletir a mudança
    }
  };


  useEffect(() => {
    updateCanvasColors();
  }, [idColorMap]);

  useEffect(() => {
    const handleSvg = async () => {
      if (clotche && clotche.clotcheImageFront) {
        await addSVG(clotche.clotcheImageFront);
      }
    };

    if (fabricCanvas) {
      handleSvg();
    }
  }, [clotche, fabricCanvas]);


  return {
    colorInput,
    setColorInput,
    updateCanvasColors,
    selectedPart,
    setSelectedPart,
    idColorMap,
    canvasRef,
    fabricCanvas,
    expandedMenu,
    toggleMenu: (toolKey: string) =>
      setExpandedMenu((prev) => (prev === toolKey ? null : toolKey)),
    textProperties,
    setTextProperties,
  };
};
