'use client'
import Image from "next/image";
import { notFound } from "next/navigation";
import { industriesData } from "@/data/Industries"
import { use } from "react";
import Footer from "@/components/home/Footer";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const data = industriesData.find((item) => item.slug === slug);

  if (!data) return notFound();


  return (
    <>
      <section className="w-full px-5 md:px-10 lg:px-24 py-20 pt-22">

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold">{data.title}</h1>
        <p className="text-gray-600 max-w-3xl mt-2">{data.tagline}</p>

        {/* Sections */}
        <div className="mt-12 flex flex-col gap-10  ">
          {data.sections.map((section, idx) => (
            <div
              key={section.id}
              className={`
    w-full bg-bg-primary border border-box-border shadow-sm rounded-2xl 
    p-6 md:p-10 flex flex-col md:flex-row 
    ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""} 
    gap-6 items-center
  `}>
              {/* Image */}
              <div
                className={`
      w-full md:w-1/2 flex justify-center
      ${idx % 2 !== 0 ? "order-1 md:order-none" : "order-1"}
    `}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover opacity-95 transition-all duration-300 ease-in-out"
                  loading="eager"
                  priority={true}
                />
              </div>

              {/* Content */}
              <div
                className={`
      w-full md:w-1/2 flex flex-col justify-center
      ${idx % 2 !== 0 ? "order-2 md:order-none" : "order-2"}
    `}
              >
                <h2 className="text-xl md:text-2xl font-semibold">{section.title}</h2>
                <p className="text-gray-600 mt-3 leading-relaxed">{section.description}</p>
              </div>
            </div>

          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
