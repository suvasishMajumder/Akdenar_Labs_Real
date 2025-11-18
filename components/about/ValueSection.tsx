import Image from "next/image";

export default function ValuesSection() {
    const values = [
        {
            title: "Integrity",
            description:
                "Upholding honesty and ethical conduct in everything we do, building trust with our stakeholders.",
            icon: "/about/value1.svg", // replace your icon
        },
        {
            title: "Innovation",
            description:
                "Embracing a culture of creativity and continuous improvement to drive groundbreaking solutions.",
            icon: "/about/value2.svg",
        },
        {
            title: "Collaboration",
            description:
                "Fostering a collaborative environment that encourages teamwork, diversity, and shared success.",
            icon: "/about/value3.svg",
        },
        {
            title: "Customer-centric",
            description:
                "Putting our customers at the heart of everything we do, delivering exceptional experiences and exceeding expectations.",
            icon: "/about/value4.svg",
        },
        {
            title: "Sustainability",
            description:
                "Operating with a focus on environmental and social responsibility, striving for a more sustainable future.",
            icon: "/about/value5.svg",
        },
        {
            title: "Excellence",
            description:
                "Pursuing excellence in all aspects of our work, setting high standards and striving for continuous growth and improvement.",
            icon: "/about/value6.svg",
        },
    ];

    return (
        <section className="bg-bg-primary w-full py-10 px-6 md:px-10 lg:px-20">

            {/* Pill */}
            <div className="flex justify-center mb-3">
                <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                    Our Values
                </span>
            </div>

            {/* Heading */}
            <h2 className="text-center text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
                Guided by Integrity and Purpose
            </h2>

            {/* Subheading */}
            <p className="text-center text-neutral-600 max-w-3xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
                At FutureSphere, we are driven by a strong set of values that shape every aspect of our business,
                ensuring transparency, ethical practices, and a shared commitment to making a positive impact.
            </p>

            {/* Value Cards Container */}
            <div className="bg-white border border-[#e6e9ff] rounded-3xl shadow-sm p-8 md:p-12 mt-12">

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                    {values.map((value, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center space-y-1">

                            <div className="spread-glow absolute top-14 bg-primary rounded-full"></div>


                            {/* Icon */}
                            <div className="w-12 h-12 relative flex items-center justify-center">
                                <Image
                                    src={value.icon}
                                    width={32}
                                    height={32}
                                    alt={value.title}
                                    className="object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-900">
                                {value.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-neutral-600 leading-relaxed px-2">
                                {value.description}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
