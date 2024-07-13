import { listFooterLinks } from "@/services/list-footer-links";
import { key } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export async function Footer() {
  const footerData = await listFooterLinks();

  return (
    <footer className="bg-slate-100">
      <div className="container p-8 lg:grid grid-cols-5 gap-4">
        <div className="hidden lg:block">
          <Image src="/aelf-logo.svg" width={115} height={32} alt="logo" />
        </div>
        {Object.keys(footerData).map((category) => (
          <div key={category} className="mb-4">
            <h3 className="font-bold">{category}</h3>
            <ul>
              {footerData[category].map((item) => (
                <li key={key()}>
                  <Link className="hover:underline" href={item.Link.link}>
                    {item.Label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
