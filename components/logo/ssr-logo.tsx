import CustomImage from "@/components/customImage";

interface Props {
  src: string;
  className?: string;
}
export function SsrLogo({ src, className }: Props) {
  return (
    <CustomImage
      src={src}
      width={115}
      height={32}
      alt="logo"
      className={className}
    />
  );
}
