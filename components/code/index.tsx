"use client";
import { Prism } from "prism-react-renderer";
import { useLayoutEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  defaultStyle,
  darcula,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";
import { getThemeConfig } from "../../lib/theme";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code: string;
  className?: string;
  language: number;
  overwriteTheme?: undefined | "light" | "dark";
  showLineNumbers?: boolean;
}

function getLanguage(lang: number) {
  switch (lang) {
    case 7:
      return "bash";
    case 8:
      return "csharp";
    case 28:
      return "json";
    case 30:
      return "jsx";
    case 63:
      return "ts";
    default:
      return "";
  }
}

export default function Code(props: CodeBlockProps) {
  const { theme } = useTheme();
  const { code } = props;

  const language = getLanguage(props.language);

  useLayoutEffect(() => {
    (typeof global !== "undefined" ? global : window).Prism = Prism;
    (async () => {
      switch (language) {
        case "csharp":
          await import("prismjs/components/prism-csharp");
          return;
        case "bash":
          await import("prismjs/components/prism-bash");
          return;
        case "json":
          await import("prismjs/components/prism-json");
          return;

        default:
          return;
      }
    })();
  }, [language]);

  return (
    <div className="relative my-2">
      <CopyButton code={code} />
      <SyntaxHighlighter
        language={language}
        style={getThemeConfig(theme, [defaultStyle, darcula])}
        className="rounded-lg"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
