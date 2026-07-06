"use client";

export default function ServerError() {
  return (
    <div style={{ padding: "4rem", textAlign: "center", background: "#fff", color: "crimson" }}>
      <h1 style={{ fontSize: "2.5rem" }}>🚫 Server Error</h1>
      <p>We couldn&apos;t load the page right now. Please try again later.</p>
    </div>
  );
}
