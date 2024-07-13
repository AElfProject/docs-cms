import { clsx } from "clsx";
import Link from "next/link";

export interface Element {
  text_run: {
    content: string;
    text_element_style: {
      bold: boolean;
      inline_code: boolean;
      italic: boolean;
      link?: {
        url?: string;
      };
      strikethrough: boolean;
      underline: boolean;
    };
  };
}

export function Element(props: Element) {
  const { content, text_element_style } = props.text_run;
  const { bold, italic, strikethrough, underline, inline_code, link } =
    text_element_style;

  if (inline_code)
    return (
      <span className="inline p-1 bg-slate-300 rounded-md">{content}</span>
    );

  if (link && link?.url) {
    return (
      <Link
        href={decodeURIComponent(link.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      className={clsx({
        "font-bold": bold,
        italic: italic,
        "line-through": strikethrough,
        underline: underline,
        inline: true,
      })}
    >
      {content}
    </span>
  );
}
