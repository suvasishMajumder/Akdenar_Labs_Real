"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation"; // ⭐ ensures slug works in client component
import Image from "next/image";
import { services } from "@/data/services";
import Footer from "@/components/home/Footer";

export default function Page() {
  const { slug } = useParams() as { slug: string };

  const service = services.find((s) => s.link.endsWith(slug));

  /* ------------------------------------------------------
     ⭐ 1. Dynamic Title + Meta Description
  ------------------------------------------------------- */
  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Services | Akdenar Labs`;

      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", service.description);
    }
  }, [service]);

  /* ------------------------------------------------------
     ⭐ 2. JSON-LD: Breadcrumb + ProfessionalService Schema
  ------------------------------------------------------- */
  useEffect(() => {
    if (!service) return;

    // Breadcrumb Schema
    const breadcrumb = document.createElement("script");
    breadcrumb.type = "application/ld+json";
    breadcrumb.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://labs.akdenar.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://labs.akdenar.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: `https://labs.akdenar.com/services/${slug}`,
        },
      ],
    });

    // ProfessionalService Schema
    const serviceSchema = document.createElement("script");
    serviceSchema.type = "application/ld+json";
    serviceSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: service.title,
      description: service.description,
      serviceType: service.title,
      url: `https://labs.akdenar.com/services/${slug}`,
      provider: {
        "@type": "Organization",
        name: "Akdenar Labs",
        url: "https://labs.akdenar.com",
      },
    });

    document.head.appendChild(breadcrumb);
    document.head.appendChild(serviceSchema);

    return () => {
      document.head.removeChild(breadcrumb);
      document.head.removeChild(serviceSchema);
    };
  }, [service, slug]);

  /* ------------------------------------------------------
     NOT FOUND HANDLING
  ------------------------------------------------------- */
  if (!service) {
    return <div className="p-20 text-center text-xl">Service not found.</div>;
  }

  /* ------------------------------------------------------
     ⭐ 3. UI (same as your design)
  ------------------------------------------------------- */
  return (
    <>
      <section className="w-full px-5 md:px-10 lg:px-24 py-20 pt-22">
        <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
        <p className="text-gray-600 max-w-3xl mt-2">{service.description}</p>

        <div className="mt-12 w-full bg-bg-primary border border-box-border shadow-sm rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={service.path}
              alt={service.alt}
              width={350}
              height={350}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-xl md:text-2xl font-semibold">
              What We Provide
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
