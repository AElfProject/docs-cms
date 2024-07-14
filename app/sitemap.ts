import { getChildNodes } from "@/services/get-child-nodes";
import { getPath } from "@/services/get-path";
import { getTopLevelNodes } from "@/services/get-top-level-nodes";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const topLevelNodes = await getTopLevelNodes();

  const topNodes = topLevelNodes.data.items.filter(
    (i) => i.obj_type === "docx"
  );

  async function generateSiteMap(
    map: MetadataRoute.Sitemap,
    nodes?: typeof topNodes
  ): Promise<void> {
    if (nodes) {
      for (const node of nodes) {
        map.push({
          url: `${process.env.SITE_URL}${await getPath(node.node_token)}`,
          lastModified: new Date(Number(node.obj_edit_time) * 1000),
          changeFrequency: "weekly",
          priority: 0.5,
        });

        if (node.has_child) {
          await generateSiteMap(
            map,
            (
              await getChildNodes(node.node_token)
            ).data.items.filter((i) => i.obj_type === "docx")
          );
        }
      }
    }
  }

  const map: MetadataRoute.Sitemap = [];

  await generateSiteMap(map, topNodes);

  return map;
}
