import Link from "next/link";

export default function NotFound() {
  return (
    <section className="state-page container page-enter">
      <span>404</span>
      <h1>Page not found.</h1>
      <p>The page you requested is not part of this educator portfolio.</p>
      <Link className="button primary" href="/">
        Return home
      </Link>
    </section>
  );
}
