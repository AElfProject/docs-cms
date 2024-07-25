import GithubSlugger from "github-slugger";
import { AnyItem } from "./renderer";
import clsx from "clsx";
import { HighlightLink } from "./highlight-link";

export default function TableOfContents({
  allItems,
  level = 3, // display up to h3
}: {
  allItems: AnyItem[];
  level?: number;
}) {
  const slugger = new GithubSlugger();

  return (
    <ul className="list-none sm:p-4 p-1 sm:border-l-2 ml-8">
      {allItems
        .filter(i =>
          [3, 4, 5, 6, 7, 8, 9, 10, 11]
            .filter(i => (level ? i < level + 3 : true))
            .includes(i.block_type)
        )
        .map(i => {
          let anchor = "";

          switch (i.block_type) {
            case 3:
              anchor = i.heading1.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 4:
              anchor = i.heading2.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 5:
              anchor = i.heading3.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 6:
              anchor = i.heading4.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 7:
              anchor = i.heading5.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 8:
              anchor = i.heading6.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 9:
              anchor = i.heading7.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 10:
              anchor = i.heading8.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
            case 11:
              anchor = i.heading9.elements
                .map(i => i.text_run.content)
                .join(" ");
              break;
          }

          const title = anchor;

          anchor = slugger.slug(anchor);

          return (
            <HighlightLink
              key={anchor}
              className={clsx(
                {
                  "ml-[8px]": i.block_type === 4,
                  "ml-[16px]": i.block_type === 5,
                  "ml-[24px]": i.block_type === 6,
                  "ml-[32px]": i.block_type === 7,
                  "ml-[40px]": i.block_type === 8,
                  "ml-[48px]": i.block_type === 9,
                  "ml-[56px]": i.block_type === 10,
                  "ml-[64px]": i.block_type === 11,
                },
                "text-[13px] leading-[21px]"
              )}
              title={title}
              anchor={anchor}
            />
          );
        })}
    </ul>
  );
}
