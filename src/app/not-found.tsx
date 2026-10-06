import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { ArrowLeft } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="wrap flex flex-1 items-center justify-center py-32 text-center">
      <div className="animate-fade-up">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-hero mt-6 font-display">Page not found</h1>
        <p className="text-lead mx-auto mt-6 max-w-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist, or it moved somewhere else.
        </p>
        <Link href="/" className="btn btn-primary group mt-10">
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>
      </div>
    </div>
  );
}
