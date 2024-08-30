import { Dark, Light } from "./theme";
import CustomImage from "../customImage";

interface Props {
  baseConfig: { [key: string]: any };
  className?: string;
  theme?: string;
}
export function Logo({ baseConfig, className }: Props) {
  return (
    <>
      {baseConfig?.logoLight ? (
        <Light>
          <CustomImage
            src={baseConfig.logoLight}
            width={115}
            height={32}
            alt="logo"
            className={className}
          />
        </Light>
      ) : null}
      {baseConfig?.logoDark ? (
        <Dark>
          <CustomImage
            src={baseConfig.logoLight}
            width={115}
            height={32}
            alt="logo"
            className={className}
          />
        </Dark>
      ) : null}
    </>
  );
}
