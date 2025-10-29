"use client";

export default function ErrorBoundary({ reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2>Algo salió mal</h2>
      <button type="button" onClick={reset}>
        Intentar de nuevo
      </button>
    </div>
  );
}
