"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CodeBlock } from "react-code-block";
import { Prism } from "prism-react-renderer";
import { useLayoutEffect } from "react";

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
  const [state, copyToClipboard] = useCopyToClipboard();

  const { code } = props;

  const language = getLanguage(props.language);

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(props.code);
  };

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
    <CodeBlock code={code} language={language}>
      <div className="relative my-4">
        <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg overflow-auto">
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
            <CodeBlock.LineContent className="table-cell text-wrap">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>

        <button
          className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          onClick={copyCode}
        >
          {state ? "Copied!" : "Copy code"}
        </button>
      </div>
    </CodeBlock>
  );
}
