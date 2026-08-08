"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="state-page container">
      <span>Page error</span>
      <h1>This page could not be displayed.</h1>
      <p>Please try loading the page again.</p>
      <button className="button primary" type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
