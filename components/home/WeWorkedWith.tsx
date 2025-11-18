import Image from "next/image";

export default function WeWorkedWith() {
    const companies = [
        { name: "TechCorp", logo: "/home/client1.svg" },
        { name: "InnovateLabs", logo: "/home/client2.svg" },
        { name: "CloudFirst", logo: "/home/client3.svg" },
        { name: "DataDriven", logo: "/home/client4.svg" },
        { name: "FutureTech", logo: "/home/client5.svg" },
        { name: "DigitalPro", logo: "/home/client6.svg" },
    ];

    return (
        <section className="w-full py-10 px-6 md:px-10 lg:px-20">
            {/* Pill */}
            <div className="flex justify-center mb-3">
                <span className="px-5 py-1 rounded-full bg-[#EDEAFF] text-[#7F56D9] text-sm font-medium">
                    Companies
                </span>
            </div>

            {/* Heading */}
            <h2 className="text-center text-3xl md:text-5xl font-semibold text-gray-900 mb-10">
                We've Worked With
            </h2>

            {/* Companies Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
                {companies.map((company, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                        <Image
                            src={company.logo}
                            alt={company.name}
                            width={100}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}