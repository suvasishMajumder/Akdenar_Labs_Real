import Image from "next/image";

export default function OurStorySection() {
    return (
        <section className="w-full py-20 px-6 md:px-10 lg:px-20">
            <div className="bg-bg-primary rounded-3xl border border-box-border shadow-sm p-6 md:p-12">

                {/* Pill */}
                <span className="inline-block px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                    Our Story
                </span>

                {/* Row 1 — TEXT LEFT, IMAGE RIGHT (mobile = column) */}
                <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16 mt-8 items-center">

                    {/* LEFT TEXT */}
                    <div className="text-neutral-700 flex-1 leading-relaxed space-y-4 text-sm md:text-base order-1 md:order-none">
                        <p>
                            Akdenar Labs is a global technology and SaaS innovation company
                            dedicated to transforming businesses through intelligent, scalable,
                            and secure digital solutions. We specialize in Full-Stack Development,
                            Cloud & DevOps, AI Automation, UI/UX Design, and Digital Marketing,
                            empowering brands to stay ahead in a fast-evolving digital landscape.
                        </p>
                        <p>
                            With a team of passionate innovators and industry experts, we combine
                            cutting-edge technology with human-centered design to create products
                            that are not only functional but future-ready. Our goal is to help
                            organizations accelerate growth, enhance efficiency, and build meaningful
                            digital experiences.
                        </p>
                        <p>
                            At Akdenar Labs, we don’t just deliver projects — we build long-term
                            partnerships, ensuring our clients achieve measurable success and
                            sustained digital transformation.
                        </p>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex-1 w-full min-h-[240px] h-[260px] md:h-[320px] rounded-2xl overflow-hidden">
                        <Image
                            src="/about/ourstory1.png"
                            alt="Our Story"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Row 2 — IMAGE LEFT, TEXT RIGHT (mobile = column REVERSED) */}
                <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16 mt-12 items-center">

                    {/* LEFT IMAGE */}
                    <div className="relative flex-1 w-full min-h-60 h-[260px] md:h-80 rounded-2xl overflow-hidden">
                        <Image
                            src="/about/ourstory2.svg"
                            alt="Team Workspace"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* RIGHT TEXT */}
                    <div className="text-neutral-700 flex-1 leading-relaxed space-y-4 text-sm md:text-base">
                        <p>
                            Backed by a strong culture of innovation, collaboration, and excellence,
                            Akdenar Labs continues to redefine how businesses leverage technology
                            for growth. We are driven by the belief that great ideas deserve powerful
                            execution — and that’s exactly what we deliver. Our agile methodology
                            ensures seamless communication, faster delivery cycles, and unmatched
                            quality across all projects, from concept to completion.
                        </p>

                        <p>
                            At Akdenar Labs, we don’t just build software — we build experiences that
                            empower organizations to scale efficiently and stay future-ready.
                        </p>

                        <p>
                            Our vision is to be a long-term technology partner that helps clients
                            innovate faster, reduce costs, and stay ahead in an ever-evolving digital
                            landscape. At Akdenar Labs, your growth is our mission, and your success
                            defines our legacy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
