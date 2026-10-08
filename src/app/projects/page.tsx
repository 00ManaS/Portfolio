import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import PageHeader from "@/components/PageHeader";
import ProjectGallery from "@/components/ProjectGallery";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="wrap flex-1">
      <PageHeader
        eyebrow="Projects"
        title="Things I’ve built"
        intro="A selection of work. Open any project to watch its demo and see the details."
      />

      <div className="py-14">
        <ProjectGallery projects={projects} />
      </div>
    </div>
  );
}
