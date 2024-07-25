import NextImage, { ImageProps } from "next/image";
import path from "path";
import getConfig from "next/config";
import download from "./download";
import { v4 as uuid } from "uuid";

export default async function Image(props: ImageProps) {
  if (typeof props.src !== "string") return null;
  const { serverRuntimeConfig } = getConfig();

  const targetDirectory = path.join(
    serverRuntimeConfig.projectRoot,
    "public/uploads"
  );

  const url = `${uuid()}.jpg`;
  const filename = path.basename(url);
  const targetFilePath = `${targetDirectory}/${filename}`;

  await download(props.src, targetFilePath);

  return <NextImage {...props} src={`/uploads/${filename}`} />;
}
