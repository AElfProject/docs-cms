import { listFooterLinks } from "@/services/list-footer-links";
import { key } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
interface Props {
  baseConfig: { [key: string]: any };
}
export async function Footer({ baseConfig }: Props) {
  const footerData = await listFooterLinks();
  return (
    <footer className="bg-slate-100">
      <div className="container p-8 ">
        <div className="footer-links lg:grid grid-cols-5 gap-4">
          <div className="hidden lg:block">
            <Image
              src={baseConfig.logoLight}
              width={115}
              height={32}
              alt="logo"
            />
          </div>
          {Object.keys(footerData).map(category => (
            <div key={category} className="mb-4">
              <h3 className="font-bold mb-4">{category}</h3>
              <ul>
                {footerData[category].map(item => (
                  <li key={key()} className="leading-[32px]">
                    <Link
                      className="hover:underline text-[#606770]"
                      href={item.Link.link}
                    >
                      {item.Label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom flex justify-between">
          <span className="copyright">
            Copyright © {new Date().getFullYear()} {baseConfig.copyright}
          </span>
          <span className="social flex gap-3">
            <Link href={baseConfig.footerTwitter}>
              <Image src="./twitter.svg" alt="X" width={24} height={24}></Image>
            </Link>
            <Link href={baseConfig.footerTelegram}>
              <Image
                src="./telegram.svg"
                alt="telegram"
                width={24}
                height={24}
              ></Image>
            </Link>
            <Link href={baseConfig.footerDiscord}>
              <Image
                src="./discord.svg"
                alt="discord"
                width={24}
                height={24}
              ></Image>
            </Link>
            <Link href={baseConfig.footerGitHub}>
              <Image
                src="./github.svg"
                alt="github"
                width={24}
                height={24}
              ></Image>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
