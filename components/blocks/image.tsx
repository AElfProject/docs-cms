import { default as NxImage } from "next/image";

import { Item } from "./common";

export interface Image extends Item {
  block_type: 27;
  image: {
    align: number;
    height: number;
    token: string;
    width: number;
  };
}

async function getLink(token: string) {
  const res = await fetch(
    `https://open.larksuite.com/open-apis/drive/v1/medias/batch_get_tmp_download_url?file_tokens=${token}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      },
    }
  );

  const {
    data,
  }: {
    code: number;
    data: {
      tmp_download_urls?: {
        file_token: string;
        tmp_download_url?: string;
      }[];
    };
  } = await res.json();

  return data?.tmp_download_urls?.[0]?.tmp_download_url;
}

export async function Image(props: Image) {
  const src = await getLink(props.image.token);

  if (!src) return <></>;

  return (
    <NxImage
      src={src}
      alt=""
      width={props.image.width}
      height={props.image.height}
    />
  );
}
