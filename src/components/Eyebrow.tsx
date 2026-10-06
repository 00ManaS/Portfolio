export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
