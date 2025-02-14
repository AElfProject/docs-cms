import { Dark, Light } from "./theme";
import CustomImage from "../customImage";

interface Props {
  baseConfig: { [key: string]: any };
  className?: string;
  theme?: string;
}
export function Logo({ baseConfig, className }: Props) {
  console.log(baseConfig.logoLight, "baseConfig.logoLight");
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
            unoptimized={true}
          />
        </Light>
      ) : null}
      {baseConfig?.logoDark ? (
        <Dark>
          <CustomImage
            src={baseConfig.logoDark}
            width={115}
            height={32}
            alt="logo"
            className={className}
            unoptimized={true}
          />
        </Dark>
      ) : null}
    </>
  );
}
