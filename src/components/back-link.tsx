import Link from "next/link";
import { Icon } from "./icon";

/** Link de volta no topo das páginas internas. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-label-md tracking-wider text-outline uppercase hover:text-primary"
    >
      <Icon name="arrow_back" className="text-[18px] transition-transform group-hover:-translate-x-1" />
      <span>{label}</span>
    </Link>
  );
}
