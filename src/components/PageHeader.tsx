import Eyebrow from "@/components/Eyebrow";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  className = "pt-16 pb-14",
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  /** Overrides the default vertical padding. */
  className?: string;
}) {
  return (
    <header className={`animate-fade-up border-b border-line ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-title mt-5 max-w-3xl font-display text-balance">{title}</h1>
      {intro && <p className="text-lead mt-6 max-w-2xl text-muted">{intro}</p>}
      {children}
    </header>
  );
}
