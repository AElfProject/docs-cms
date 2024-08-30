import { Item } from "./common";
import CustomImage from "../customImage";
import { getLink } from "@/services/get-link";

export interface Image extends Item {
  block_type: 27;
  image: {
    align: number;
    height: number;
    token: string;
    width: number;
  };
}

export async function Image(props: Image) {
  const src = await getLink(props.image.token);

  if (!src) return <></>;

  return (
    <CustomImage
      src={src}
      alt=""
      width={props.image.width}
      height={props.image.height}
      className="my-[1rem]"
    />
  );
}
