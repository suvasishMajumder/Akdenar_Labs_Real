// app/capabilities/[slug]/page.tsx
import React from "react";
import Image from "next/image";
import Footer from "@/components/home/Footer";
import { capabilitiesData } from "@/data/capabilities";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = capabilitiesData.find((item) => item.slug === slug);

  if (!data) {
    return {
      title: "Capability Not Found | Akdenar Labs",
      description: "The requested capability page could not be found.",
      robots: "noindex, nofollow",
    };
  }

  // Build a friendly meta description
  const metaDescription = `${data.title} — ${
    data.tagline
  } Explore solutions, use cases, and expert services for ${data.title.toLowerCase()}.`;

  // Compose keywords from frequentlySearched if present
  const keywords = Array.isArray(data.frequentlySearched)
    ? Array.from(new Set(data.frequentlySearched)).slice(0, 50).join(", ")
    : data.title;

  return {
    title: `${data.title} | Akdenar Labs`,
    description: metaDescription,
    keywords: keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://labs.akdenar.com/capabilities/${data.slug}`,
    },
    openGraph: {
      title: `${data.title} | Akdenar Labs`,
      description: metaDescription,
      url: `https://labs.akdenar.com/capabilities/${data.slug}`,
      type: "website",
    },
  };
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const data = capabilitiesData.find((item) => item.slug === slug);

  if (!data) {
    notFound();
  }

  // Compose keywords from frequentlySearched if present
  const keywords = Array.isArray(data.frequentlySearched)
    ? Array.from(new Set(data.frequentlySearched)).slice(0, 50).join(", ")
    : data.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.tagline,
    provider: {
      "@type": "Organization",
      name: "Akdenar Labs",
      url: "https://labs.akdenar.com",
    },
    areaServed: "IN",
    keywords: keywords,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ⭐ UI completely unchanged */}
      <section className="w-full px-5 md:px-10 lg:px-24 py-20 pt-22">
        <h1 className="text-3xl md:text-4xl font-bold">{data.title}</h1>
        <p className="text-gray-600 max-w-3xl mt-2">{data.tagline}</p>

        <div className="mt-12 flex flex-col gap-10">
          {data.sections.map((section, idx) => (
            <div
              key={section.id}
              className={`w-full bg-bg-primary border border-box-border shadow-sm rounded-2xl p-6 md:p-10 flex flex-col md:flex-row ${
                idx % 2 !== 0 ? "md:flex-row-reverse" : ""
              } gap-6 items-center`}
            >
              <div
                className={`w-full md:w-1/2 flex justify-center ${
                  idx % 2 !== 0 ? "order-1 md:order-0" : "order-1"
                }`}
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

              <div
                className={`w-full md:w-1/2 flex flex-col justify-center ${
                  idx % 2 !== 0 ? "order-2 md:order-0" : "order-2"
                }`}
              >
                <h2 className="text-xl md:text-2xl font-semibold">
                  {section.title}
                </h2>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
