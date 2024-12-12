import { parse } from "svg-parser";
import { ElementNode } from "svg-parser";

export interface SvgColorMap {
  [key: string]: string;
}

export function processSvg(svgContent: string): {
  processedSvg: string;
  colorClasses: string[];
} {
  // Parseia o SVG
  const parsed = parse(svgContent);
  const colorClasses: string[] = [];

  // Função recursiva para extrair classes de preenchimento
  function extractFillClasses(node: any) {
    if (node && typeof node === "object") {
      // Verifica propriedades de classe
      const className = node.properties?.className;

      if (Array.isArray(className)) {
        const fillClasses = className.filter(
          (cls: string) =>
            cls.includes("fill") ||
            cls.includes("cls") ||
            cls.startsWith("cls-")
        );
        colorClasses.push(...fillClasses);
      } else if (typeof className === "string") {
        if (
          className.includes("fill") ||
          className.includes("cls") ||
          className.startsWith("cls-")
        ) {
          colorClasses.push(className);
        }
      }

      // Recursivamente processa os filhos
      if (node.children) {
        node.children.forEach((child: any) => {
          if (typeof child === "object") {
            extractFillClasses(child);
          }
        });
      }
    }
  }

  // Extrai as classes de preenchimento
  if (parsed.type === "root" && parsed.children) {
    parsed.children.forEach((child) => {
      if (typeof child === "object") {
        extractFillClasses(child);
      }
    });
  }

  // Remove duplicatas e filtra classes vazias
  const uniqueColorClasses = [...new Set(colorClasses)].filter(Boolean);

  // Modifica o SVG original para preparar substituição de cores
  let processedSvg = svgContent;

  // Adiciona um estilo dinâmico para as classes encontradas
  const styleTag = `<style>
    ${uniqueColorClasses
      .map((cls, index) => `.${cls} { fill: \${color${index}}; }`)
      .join("\n")}
  </style>`;

  // Adiciona o estilo antes do fechamento da tag <svg>
  processedSvg = processedSvg.replace(/<svg[^>]*>/, `$&${styleTag}`);

  return {
    processedSvg,
    colorClasses: uniqueColorClasses,
  };
}

export function replaceSvgColors(
  svgContent: string,
  colorMap: SvgColorMap
): string {
  let modifiedSvg = svgContent;

  // Substituir cores com base no mapa de cores
  Object.entries(colorMap).forEach(([className, color]) => {
    // Substituir no estilo embutido (inline style)
    const styleRegex = new RegExp(`\\.${className}\\s*{[^}]*fill:[^;]*;?`, "g");
    modifiedSvg = modifiedSvg.replace(
      styleRegex,
      `.${className} { fill: ${color}; }`
    );

    // Substituir atributos `fill` diretamente ligados a classes
    const fillRegex = new RegExp(
      `class="[^"]*${className}[^"]*"\\s+fill="[^"]*"`,
      "g"
    );
    modifiedSvg = modifiedSvg.replace(fillRegex, (match) =>
      match.replace(/fill="[^"]*"/, `fill="${color}"`)
    );
  });

  return modifiedSvg;
}
