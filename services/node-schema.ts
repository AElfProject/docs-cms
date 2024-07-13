import { z } from "zod";

export const nodeSchema = z.object({
  space_id: z.string(),
  node_token: z.string(),
  obj_token: z.string(),
  obj_type: z.enum(["doc", "sheet", "mindnote", "bitable", "file", "docx"]),
  parent_node_token: z.string(),
  node_type: z.enum(["origin", "shortcut"]),
  origin_node_token: z.string(),
  origin_space_id: z.string(),
  has_child: z.boolean(),
  title: z.string(),
  obj_create_time: z.string(),
  obj_edit_time: z.string(),
  node_create_time: z.string(),
  creator: z.string(),
  owner: z.string(),
});
