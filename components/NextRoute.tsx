import Link from "next/link";

type NextRouteProps = {
  href: string;
  label: string;
  title: string;
};

export function NextRoute({ href, label, title }: NextRouteProps) {
  return (
    <aside className="next-route" aria-label="Continue through the portfolio">
      <div className="next-route-inner container">
        <span>{label}</span>
        <Link href={href}>{title}</Link>
      </div>
    </aside>
  );
}
