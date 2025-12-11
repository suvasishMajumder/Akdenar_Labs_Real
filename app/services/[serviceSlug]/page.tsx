"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ContactForm from "@/components/Get-In-Touch/ContactForm";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/ui/ContactModal";
import { servicesInfo } from "@/data/servicesInfo";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PackageTooltip {
  desc: string;
  l1: string;
  l2: string;
  l3: string;
}

interface Package {
  packageName: string;
  packageDesc: string;
  price: string;
  toolTip?: PackageTooltip | string;
}

export default function Page() {
  const { serviceSlug } = useParams() as { serviceSlug: string };
  const [isContactOpen, setContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showTooltipIndex, setShowTooltipIndex] = useState<number | null>(null);

  // Define the type for the service object from servicesInfo
  interface ServiceInfo {
    slug: string;
    title: string;
    img: string;
    description: string;
    techStack: string[];
    packages: Package[];
  }

  const service = servicesInfo.find((item) => item.slug === serviceSlug) as
    | ServiceInfo
    | undefined;

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
      <Link
        href="/services"
        className="ml-6 md:ml-13 mt-4 inline-block mb-4 text-sm text-primary hover:underline"
      >
        &larr; Back to Services
      </Link>
      <div className="p-3 md:p-6 max-w-6xl mx-auto">
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
          <Image
            src={service.img}
            alt={service.title}
            width={420}
            height={280}
            className="w-[420px] md:block hidden h-auto"
          />
        </div>

        {/* PACKAGES */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service?.packages?.map((pkg: Package, index: number) => (
              <div
                key={index}
                className="relative px-4 py-2 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="">
                  <h2 className="text-lg font-semibold">{pkg.packageName}</h2>

                  <p className="text-xs text-gray-600">{pkg.packageDesc}</p>
                </div>

                <div className="border-1 border-gray-200 rounded-xl py-4 px-2 my-3">
                  <p className="text-xs text-gray-600">Starting from</p>
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {pkg.price}
                    </div>

                    <div className="">
                      <button
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setContactOpen(true);
                        }}
                        className="px-5 py-2 rounded-lg bg-[#7F56D9] text-white text-sm hover:bg-[#6b45cc] transition"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-3 right-2 cursor-pointer"
                  onClick={() =>
                    setShowTooltipIndex(
                      showTooltipIndex === index ? null : index
                    )
                  }
                  onMouseEnter={() => setShowTooltipIndex(index)}
                  onMouseLeave={() => setShowTooltipIndex(null)}
                >
                  <Info className="w-5 h-5 text-primary" />

                  {/* Tooltip Box */}
                  {showTooltipIndex === index && (
                    <div
                      className="
        absolute right-[-4px] top-[-90px] md:right-[-22px] md:top-[-100px]
        flex bg-primary/95 px-2 py-1 rounded-md
        shadow-lg  w-[300px] md:w-[305px]
        z-50 transition-all duration-300 ease-in
      "
                    >
                      {!pkg.toolTip ? (
                        <p className="text-xs text-white italic">
                          No additional information available
                        </p>
                      ) : typeof pkg.toolTip === "string" ? (
                        <p className="text-xs text-white italic">
                          {pkg.toolTip}
                        </p>
                      ) : (
                        <div className="text-xs text-white px-[1px] font-medium">
                          <p className="italic mb-[6px]">{pkg.toolTip.desc}</p>
                          {pkg.toolTip.l1 && (
                            <p className="italic mt-1">• {pkg.toolTip.l1}</p>
                          )}
                          {pkg.toolTip.l2 && (
                            <p className="italic mt-[2px]">
                              • {pkg.toolTip.l2}
                            </p>
                          )}
                          {pkg.toolTip.l3 && (
                            <p className="italic mt-[2px]">
                              • {pkg.toolTip.l3}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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
