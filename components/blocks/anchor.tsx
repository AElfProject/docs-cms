import Link from "next/link";

export function Anchor(props: { anchor: string }) {
  return (
    <Link
      className="ml-3 text-gray-400 hover:text-black"
      href={`#${props.anchor}`}
    >
      #
    </Link>
  );
}
