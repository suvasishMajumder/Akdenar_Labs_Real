type ProjectCardProps =
  {
    project: {
      image: string;
      tag: string;
      title: string;
      description: string;
      link: string;
    };
    index: number;
  };
import Image from "next/image";

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      key={index}
      className="bg-white border border-[#e6e9ff] rounded-2xl shadow-sm p-4 pb-6 hover:shadow-md transition"
    >

      {/* Image */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Tag */}
      <span className="inline-block mb-2 px-3 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-xs font-medium">
        {project.tag}
      </span>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-700 leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Read More */}
      <a
        href={project.link}
        className="text-sm font-medium text-[#7F56D9] hover:underline"
      >
        Read more.
      </a>

    </div>
  )
}