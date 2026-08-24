import type { ReactNode } from "react";

export function PageMain({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <main className={`mx-auto w-full px-6 py-16 sm:py-20 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
      {children}
    </main>
  );
}

export function SketchBox({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`vv-box ${className}`}>{children}</div>;
}

export function PageKicker({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-hand text-base text-muted">{children}</p>;
}
