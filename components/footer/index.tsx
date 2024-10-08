"use client";
import { key } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, ReactNode } from "react";

interface CategoryItem {
  Category: string;
  Label: string;
  Link: {
    link: string;
    text: string;
  };
}
interface Props {
  baseConfig: { [key: string]: any };
  footerData: { [key in string]: CategoryItem[] };
  logo: ReactNode;
}
export function Footer({ baseConfig, footerData, logo }: Props) {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="bg-footer-background">
      <div className="container p-8 ">
        <div className="footer-links lg:grid grid-cols-5 gap-4">
          <div className="hidden lg:block">{logo}</div>
          {Object.keys(footerData).map((category) => (
            <div key={category} className="mb-4">
              <h3 className="font-bold mb-4">{category}</h3>
              <ul>
                {footerData[category].map((item) => (
                  <li key={key()} className="leading-[32px]">
                    <Link
                      className="hover:underline text-link"
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
          <span className="copyright hidden sm:inline-block">
            Copyright © {new Date().getFullYear()} {baseConfig?.copyright}
          </span>
          <span className="social gap-3 hidden sm:flex">
            {baseConfig?.footerTwitter && (
              <Link href={baseConfig.footerTwitter} className="text-link">
                <Image
                  src="/twitter.svg"
                  alt="X"
                  width={24}
                  height={24}
                ></Image>
              </Link>
            )}
            {baseConfig?.footerTelegram && (
              <Link href={baseConfig.footerTelegram}>
                <Image
                  src="/telegram.svg"
                  alt="telegram"
                  width={24}
                  height={24}
                ></Image>
              </Link>
            )}
            {baseConfig?.footerDiscord && (
              <Link href={baseConfig.footerDiscord}>
                <Image
                  src="/discord.svg"
                  alt="discord"
                  width={24}
                  height={24}
                ></Image>
              </Link>
            )}
            {baseConfig?.footerGitHub && (
              <Link href={baseConfig.footerGitHub}>
                <Image
                  src="/github.svg"
                  alt="github"
                  width={24}
                  height={24}
                ></Image>
              </Link>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}
