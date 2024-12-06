import { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";

export const useFabricCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
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

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 380,
        height: 680,
        backgroundColor: "transparent",
      });

      setFabricCanvas(canvas);

      const handleObjectMovement = (
        e: fabric.TPointerEvent | fabric.TEvent<fabric.TPointerEvent>,
        canvas: fabric.Canvas
      ) => {
        const object = e.target;
        if (object) {
          const canvasWidth = canvas.getWidth();
          const canvasHeight = canvas.getHeight();
          const objectWidth = object.width! * object.scaleX!;
          const objectHeight = object.height! * object.scaleY!;

          if (object.left! < 0) {
            object.set({ left: 0 });
          } else if (object.left! + objectWidth > canvasWidth) {
            object.set({ left: canvasWidth - objectWidth });
          }

          if (object.top! < 0) {
            object.set({ top: 0 });
          } else if (object.top! + objectHeight > canvasHeight) {
            object.set({ top: canvasHeight - objectHeight });
          }

          object.setCoords();
        }
      };

      canvas.on("object:moving", (e) => handleObjectMovement(e, canvas));

      // Adicionar o listener de teclado para DELETE e BACKSPACE
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          const activeObject = canvas.getActiveObject();
          if (activeObject) {
            canvas.remove(activeObject);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        canvas.dispose();
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  const toggleMenu = (toolKey: string) =>
    setExpandedMenu((prev) => (prev === toolKey ? null : toolKey));

  const addText = () => {
    if (fabricCanvas) {
      const text = new fabric.IText("Clique para editar", {
        left: 100,
        top: 100,
        ...textProperties,
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      text.enterEditing();
    }
  };

  const addImage = (file: File) => {
    if (fabricCanvas) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          const fabricImage = new fabric.Image(imgObj, {
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          fabricCanvas.add(fabricImage);
          fabricCanvas.setActiveObject(fabricImage);
        };
        imgObj.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const positionImage = (position: string) => {
    if (fabricCanvas) {
      const activeObject = fabricCanvas.getActiveObject() as fabric.Image;
      if (activeObject) {
        const canvasWidth = fabricCanvas.getWidth();
        const canvasHeight = fabricCanvas.getHeight();
        const objectWidth = activeObject.width! * activeObject.scaleX!;
        const objectHeight = activeObject.height! * activeObject.scaleY!;

        switch (position) {
          case "top-left":
            activeObject.set({ left: 0, top: 80 });
            break;
          case "top-right":
            activeObject.set({ left: canvasWidth - objectWidth, top: 80 });
            break;
          case "center":
            activeObject.set({
              left: (canvasWidth - objectWidth) / 2,
              top: (canvasHeight - objectHeight) / 2,
            });
            break;
          case "bottom-left":
            activeObject.set({ left: 0, top: canvasHeight - objectHeight });
            break;
          case "bottom-right":
            activeObject.set({
              left: canvasWidth - objectWidth,
              top: canvasHeight - objectHeight,
            });
            break;
        }
        activeObject.setCoords();
        fabricCanvas.renderAll();
      }
    }
  };

  const removeSelectedObject = () => {
    if (fabricCanvas) {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject) fabricCanvas.remove(activeObject);
    }
  };

  return {
    canvasRef,
    fabricCanvas,
    expandedMenu,
    toggleMenu,
    addText,
    addImage,
    positionImage,
    removeSelectedObject,
    textProperties,
    setTextProperties,
  };
};
