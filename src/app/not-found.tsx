import Link from "next/link";

// Fallback for requests the proxy does not localize (there is no root layout above [locale]).
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1rem", textAlign: "center" }}>
        <h1>404</h1>
        <p>
          <Link href="/">Kovelia</Link>
        </p>
      </body>
    </html>
  );
}
