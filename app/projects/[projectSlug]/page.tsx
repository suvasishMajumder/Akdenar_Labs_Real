import { projects } from '@/lib/data';

export default function Page({ params }: { params: { projectSlug: string } }) {
  const project = projects.find((p) => p.slug === params.projectSlug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
}
