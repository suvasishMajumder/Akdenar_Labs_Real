'use client'
import ContactForm from "@/components/Get-In-Touch/ContactForm";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/ui/ContactModal";
import { servicesInfo } from "@/data/servicesInfo";
import { use, useState } from "react";

type paramsProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export default function page({ params }: paramsProps) {
  const { serviceSlug } = use(params);
  const [isContactOpen, setContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const service = servicesInfo.find(
    (item) => item.slug === serviceSlug
  );

  if (!service) return <div className="h-screen flex items-center justify-center">
    <span className="text-xl font-semibold">Service Not Found</span>
  </div>;

  return (
    < section className="pt-20 bg-bg-primary min-h-screen" >
      <div className="p-6 max-w-6xl mx-auto ">
        <div className="flex items-center gap-6 bg-white p-8 rounded-xl shadow-sm ">

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
            className="w-[420px] h-auto"
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
                      <h3 className="text-lg font-semibold">{pkg.packageName}</h3>
                      <p className="text-sm text-gray-500 mt-1">{pkg.packageDesc}</p>
                    </div>
                    <div className="text-right">
                      {/* <div className="text-xs text-gray-400">Starting</div> */}
                      <div className="text-2xl font-bold text-gray-900">{pkg.price}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button onClick={() => { setSelectedPackage(pkg); setContactOpen(true); }} className="px-4 py-2 rounded-lg bg-[#7F56D9] text-white text-sm hover:bg-[#6b45cc] transition">Contact</button>
                  </div>
                </div>
                <div className="absolute right-4 top-4 text-xs text-gray-400">Package #{index + 1}</div>
              </div>
            ))}
          </div>
        </section>
        <ContactModal open={isContactOpen} onClose={() => { setContactOpen(false); setSelectedPackage(null); }} serviceTitle={service?.title} packageInfo={selectedPackage} />
      </div>

      <ContactForm />
      <Footer />
    </section>
  );
}
