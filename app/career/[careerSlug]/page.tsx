'use client'
export interface JobSection {
  education_experience: string[];
  technical_skills: string[];
  core_competencies: string[];
  desired_qualities: string[];
  [key: string]: string[];
}

export interface JobType {
  id: string;
  title: string;
  type: string;
  location: string;
  tags?: string[];
  city: string;
  address?: string;
  phone?: string;
  description: string;
  sections: JobSection;
}

import React, { use, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { infoAboutJobs } from "@/data/infoAboutJobs";
import Footer from "@/components/home/Footer";
import ApplyForm from "@/components/ApplyForm";
import Image from "next/image";


type paramsProps = {
  params: Promise<{
    careerSlug: string;
  }>;
};


export default function page({ params }: paramsProps) {
  const { careerSlug } = use(params);
  const job = infoAboutJobs.find((job) => {
    console.log(job.slug, careerSlug)
    return job.slug == careerSlug;
  });

  // not found page
  if (!job) return <div className="h-screen flex items-center justify-center">
    <span className="text-xl font-semibold">Service Not Found</span>
  </div>;

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen  p-6 bg-bg-primary flex justify-center">
        <div className="w-full container mx-auto border-none">
          <div className="p-8 w-full relative space-y-8">
            {/* Header */}
            <div className="flex justify-between px-10 mt-16 bg-white rounded-xl min-h-[330px] items-center gap-10 md:gap-6 flex-col md:flex-row">

              <div className="flex-[1.2]">
                {job.tags && (
                  <span className="inline-block bg-purple-100 text-purple-700 text-sm px-4 py-1 rounded-full mb-4">
                    {job.tags[0]}
                  </span>
                )}

                <h1 className="text-3xl font-bold">{job.title}</h1>

                <p className="text-blue-500 font-medium mt-1">
                  {job.type} - {job.location}
                </p>

                <div className="flex items-center gap-2 text-gray-600 mt-3">
                  <MapPin size={22} />
                  <p>{job.city}</p>
                </div>

                {job.address && <p className="text-gray-500 mt-1">{job.address}</p>}
                {job.phone && <p className="text-gray-500">{job.phone}</p>}
              </div>

              <div className="flex-[1.5] rounded-xl flex justify-end">
                <Image
                  src="/global-mask.png"
                  alt="global mask"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>

            </div>


            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{job.description}</p>

            {/* Dynamic Sections */}
            {Object.entries(job.sections).map(([key, list]) => (
              <Section key={key} title={formatTitle(key)}>
                {list.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </Section>
            ))}

            <div className="pt-6">
              <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => setOpen(true)}>
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Apply Form Modal */}
      <ApplyForm jobTitle={job.title} open={open} setOpen={setOpen} />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <ul className="list-disc ml-6 text-gray-600 space-y-1">{children}</ul>
      <div className="border-b border-gray-200 pt-4"></div>
    </div>
  );
}

function formatTitle(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
