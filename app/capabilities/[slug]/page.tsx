// app/capabilities/[slug]/page.tsx
"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Footer from "@/components/home/Footer";
import { capabilitiesData } from "@/data/capabilities";
import { useParams } from "next/navigation";

export default function CapabilityPage() {
  const { slug } = useParams() as { slug?: string };
  const data = capabilitiesData.find((item) => item.slug === slug);

  if (!data) {
    return <div className="p-20 text-center text-xl">Capability not found.</div>;
  }

  // Build a friendly meta description (keep it short and targeted)
  const metaDescription = `${data.title} — ${data.tagline} Explore solutions, use cases, and expert services for ${data.title.toLowerCase()}.`;

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
      <Head>
        <title>{data.title} | Akdenar Labs</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://labs.akdenar.com/capabilities/${data.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

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
                  className="rounded-lg object-cover"
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
