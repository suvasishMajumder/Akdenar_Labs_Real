"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { projects } from "@/data/projects";
import Footer from "@/components/home/Footer";

export default function Page() {
  const { projectSlug } = useParams();

  const project = projects.find((p) => p.slug === projectSlug);

  /* Prevent conditional hook error */
  useEffect(() => {
    if (!project) return;

    document.title = `${project.title} | Project | Akdenar Labs`;

    let meta = document.querySelector(
      "meta[name='description']"
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = project.description;
  }, [project]);

  if (!project)
    return <div className="p-20 text-center text-xl">Project not found.</div>;

  return (
    <>
      <section className="px-8 py-20">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p className="text-gray-600 mt-4 max-w-2xl">{project.description}</p>
      </section>

      <Footer />
    </>
  );
}
