"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ContactForm from "@/components/Get-In-Touch/ContactForm";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/ui/ContactModal";
import { servicesInfo } from "@/data/servicesInfo";

export default function Page() {
  const { serviceSlug } = useParams() as { serviceSlug: string };
  const [isContactOpen, setContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const service = servicesInfo.find((item) => item.slug === serviceSlug);

  /* ------------------------------------------------------
     ⭐ 1. Dynamic Title + Meta Description
  ------------------------------------------------------- */
  useEffect(() => {
    if (!service) return;

    document.title = `${service.title} | Akdenar Labs`;

    let meta = document.querySelector(
      "meta[name='description']"
    ) as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = service.description;
  }, [service]);

  /* ------------------------------------------------------
     ⭐ 2. JSON-LD Schema (Breadcrumb + Service Schema)
  ------------------------------------------------------- */
  useEffect(() => {
    if (!service) return;

    // Breadcrumb
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
          item: `https://labs.akdenar.com/services/${serviceSlug}`,
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
      url: `https://labs.akdenar.com/services/${serviceSlug}`,
      areaServed: "Worldwide",
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
  }, [service, serviceSlug]);

  /* ------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */
  if (!service) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-xl font-semibold">Service Not Found</span>
      </div>
    );
  }

  /* ------------------------------------------------------
     UI (NOT MODIFIED AT ALL)
  ------------------------------------------------------- */
  return (
    <section className="pt-20 bg-bg-primary min-h-screen">
      <div className="p-3 md:p-6 max-w-6xl mx-auto ">
        <div className="flex items-center justify-between flex-col md:flex-row gap-6 bg-white p-8 rounded-xl shadow-sm">
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{service.title}</h1>
            <p className="mt-4 text-gray-600">{service.description}</p>

            <div className="mt-6">
              <h2 className="font-semibold text-xl">Tools:</h2>
              <p className="text-gray-700 mt-2">
                {service.techStack.join(", ")}
              </p>
            </div>
          </div>

          {/* Right Image */}
          <img
            src={service.img}
            alt={service.title}
            className="w-[420px] md:block hidden h-auto"
          />
        </div>

        {/* PACKAGES */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.packages.map((pkg, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {pkg.packageName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {pkg.packageDesc}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {pkg.price}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setContactOpen(true);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#7F56D9] text-white text-sm hover:bg-[#6b45cc] transition"
                    >
                      Contact
                    </button>
                  </div>
                </div>

                <div className="absolute right-4 top-4 text-xs text-gray-400">
                  Package #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        <ContactModal
          open={isContactOpen}
          onClose={() => {
            setContactOpen(false);
            setSelectedPackage(null);
          }}
          serviceTitle={service?.title}
          packageInfo={selectedPackage}
        />
      </div>

      <ContactForm />
      <Footer />
    </section>
  );
}
