import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#667BFF] text-white py-10 px-6 md:px-16">

            {/* Top Divider */}
            <div className="border-t border-white/20 pt-6">

                {/* Main Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6  pb-6">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        {/* Replace with your image */}
                        <Image
                            src="/home/whitelogo.svg"     // Insert your logo here
                            alt="Akdenar Labs Logo"
                            width={160}
                            height={50}
                            className="object-contain"
                        />
                    </div>

                    {/* Footer Navigation */}
                    <nav className="flex gap-6 text-sm opacity-90">
                        <a href="/about" className="hover:opacity-75">About</a>
                        <a href="/career" className="hover:opacity-75">Careers</a>
                        <a href="/services" className="hover:opacity-75">Services</a>
                        {/* <a href="/pricing" className="hover:opacity-75">Pricing</a> */}
                        <a href="/get-in-touch" className="hover:opacity-75">Contact Us</a>
                    </nav>

                </div>

                {/* Bottom Divider */}
                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center">

                    {/* Copyright */}
                    <p className="text-xs opacity-80">
                        © {new Date().getFullYear()} Akdenar Labs. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-5 mt-4 md:mt-0 z-50">
                        <a
                            href="https://www.linkedin.com/company/akdenar-labs/?viewAsMember=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer"
                        >
                            <Linkedin size={16} className="opacity-90 hover:opacity-75" />
                        </a>

                        <a
                            href="https://www.instagram.com/akdenarlabs/?utm_source=ig_web_button_share_sheet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer"
                        >
                            <Instagram size={16} className="opacity-90 hover:opacity-75" />
                        </a>

                        <a
                            href="https://www.facebook.com/profile.php?id=61583564085989"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer"
                        >
                            <Facebook size={16} className="opacity-90 hover:opacity-75" />
                        </a>
                    </div>


                </div>
            </div>
        </footer>
    );
}
