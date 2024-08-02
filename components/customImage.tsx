"use client";
import Image from "next/image";
import type { ImageLoader } from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width?: number | `${number}` | undefined;
  height?: number;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  loader?: ImageLoader;
  quality?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  objectFit?: string;
  className?: string;
  sizes?: string;
}

export default function CustomImage(props: ImageProps) {
  return (
    <Image
      {...props}
      src={`https://res.cloudinary.com/${
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      }/image/fetch/${encodeURIComponent(props.src)}`}
    />
  );
}
