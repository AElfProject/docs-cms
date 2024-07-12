import GithubSlugger from "github-slugger";
import { AnyItem } from "./renderer";
import Link from "next/link";
import clsx from "clsx";

export default function TableOfContents(props: { allItems: AnyItem[] }) {
  const slugger = new GithubSlugger();

  return (
    <ul className="list-none p-8 absolute">
      {props.allItems
        .filter((i) => [3, 4, 5, 6, 7, 8, 9, 10, 11].includes(i.block_type))
        .map((i) => {
          let anchor = "";

          switch (i.block_type) {
            case 3:
              anchor = i.heading1.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 4:
              anchor = i.heading2.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 5:
              anchor = i.heading3.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 6:
              anchor = i.heading4.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 7:
              anchor = i.heading5.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 8:
              anchor = i.heading6.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 9:
              anchor = i.heading7.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 10:
              anchor = i.heading8.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
            case 11:
              anchor = i.heading9.elements
                .map((i) => i.text_run.content)
                .join(" ");
              break;
          }

          const title = anchor;

          anchor = slugger.slug(anchor);

          return (
            <li
              key={anchor}
              className={clsx({
                "ml-2": i.block_type === 4,
                "ml-4": i.block_type === 5,
                "ml-6": i.block_type === 6,
                "ml-8": i.block_type === 7,
                "ml-10": i.block_type === 8,
                "ml-12": i.block_type === 9,
                "ml-14": i.block_type === 10,
                "ml-16": i.block_type === 11,
              })}
            >
              <Link href={`#${anchor}`}>{title}</Link>
            </li>
          );
        })}
    </ul>
  );
}
