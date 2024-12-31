import React, { useState, useEffect } from "react";
import {
  processSvg,
  replaceSvgColors,
  SvgColorMap,
} from "../utils/svgProcessor";
export type CamisaPolo = {
  delineado: string;
  mangas: string;
  mangaEsquerda: string;
  cls5Fill: string;
  gola: string;
  golaFina: string;
  botoes: string;
  contornosBotoes: string;
  barraInferior: string;
  bordaMangaDireita: string;
  corpo: string;
  interior: string;
  ranhuras: string;
};
const DynamicSvg: React.FC<CamisaPolo> = (props) => {
  const [processedSvg, setProcessedSvg] = useState<string>("");

  useEffect(() => {
    async function loadAndProcessSvg() {
      try {
        const response = await fetch("/camisa_polo_grande.svg");
        const svgContent = await response.text();

        const { processedSvg } = processSvg(svgContent);
        setProcessedSvg(processedSvg);
      } catch (error) {
        console.error("Erro ao carregar SVG:", error);
      }
    }

    loadAndProcessSvg();
  }, []);

  useEffect(() => {
    // Evita o loop de atualizações, só atualiza se necessário
    if (processedSvg) {
      const colorMap: SvgColorMap = { ...props };
      const updatedSvg = replaceSvgColors(processedSvg, colorMap);

      // Verifique se a alteração real ocorreu
      if (updatedSvg !== processedSvg) {
        setProcessedSvg(updatedSvg);
      }
    }
  }, [props, processedSvg]); // Dependências podem ser ajustadas se necessário

  if (!processedSvg) {
    return <div>Carregando...</div>;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: processedSvg,
      }}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default DynamicSvg;
