import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <strong>{SITE_NAME}</strong>
        <span>Early childhood educator preparing for U.S. MAT study and teaching licensure</span>
      </div>
    </footer>
  );
}
