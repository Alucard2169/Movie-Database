import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.5rem",
      padding: "2rem",
    }}>
      <Head>
        <title>Movie Database | 404</title>
      </Head>
      <h1 style={{
        fontSize: "4rem",
        fontWeight: 800,
        color: "var(--accent)",
      }}>404</h1>
      <p style={{
        color: "var(--text-muted)",
        fontSize: "1.1rem",
      }}>This page does not exist.</p>
      <Link href="/" style={{
        background: "var(--accent)",
        color: "var(--bg-primary)",
        padding: "0.6rem 1.5rem",
        borderRadius: "8px",
        fontWeight: 700,
        fontSize: "0.95rem",
        transition: "var(--transition)",
      }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
