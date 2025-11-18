import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#667BFF] text-white py-10 px-6 md:px-16">

            {/* Top Divider */}
            <div className="border-t border-white/20 pt-6">

                {/* Main Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        {/* Replace with your image */}
                        <Image
                            src="/home/logoInWhite.svg"     // ⭐ Insert your logo here
                            alt="Akdenar Labs Logo"
                            width={160}
                            height={50}
                            className="object-contain"
                        />
                    </div>

                    {/* Footer Navigation */}
                    <nav className="flex gap-6 text-sm opacity-90">
                        <a href="/about" className="hover:opacity-75">About</a>
                        <a href="/careers" className="hover:opacity-75">Careers</a>
                        <a href="/services" className="hover:opacity-75">Services</a>
                        <a href="/pricing" className="hover:opacity-75">Pricing</a>
                        <a href="/contact" className="hover:opacity-75">Contact Us</a>
                    </nav>

                </div>

                {/* Bottom Divider */}
                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center">

                    {/* Copyright */}
                    <p className="text-xs opacity-80">
                        © {new Date().getFullYear()} Akdenar Labs. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-5 mt-4 md:mt-0">
                        <Twitter size={16} className="opacity-90 hover:opacity-75 cursor-pointer" />
                        <Facebook size={16} className="opacity-90 hover:opacity-75 cursor-pointer" />
                        <Linkedin size={16} className="opacity-90 hover:opacity-75 cursor-pointer" />
                    </div>

                </div>

            </div>
        </footer>
    );
}
