"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// shadcn imports — adjust paths if your project uses different wrappers
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { navigationData } from "@/data/navigationData";

export default function Navbar() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header
      className={` ${
        pathname.split("/").includes("dashboard") && "hidden"
      } w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm border-b border-slate-100`}
    >
      <div className="mx-auto w-full container px-4  sm:px-6  lg:px-8">
        <div className="flex w-full items-center justify-between h-16">
          {/* Logo + mobile menu trigger */}
          <div className="flex w-full md:w-auto items-center gap-4">
            <div className="items-center flex flex-1">
              <Link href="/" aria-label="Home">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={160}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {/* Mobile sheet trigger */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  {/* menu icon */}
                  <button
                    aria-label="Open menu"
                    className="p-2 rounded-md hover:bg-gray-100 bg-white/0 shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-[280px] h-full overflow-y-auto bg-white p-6 shadow-xl 
             animate-[slideIn_0.35s_ease-out]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 animate-fadeIn">
                    <Link href="/" onClick={() => setIsSheetOpen(false)}>
                      <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={130}
                        height={40}
                      />
                    </Link>
                  </div>

                  {/* Menu */}
                  <nav className="space-y-4">
                    {/* WHAT WE DO */}
                    <Accordion type="single" collapsible>
                      <AccordionItem value="what-we-do">
                        <AccordionTrigger className="text-gray-700 hover:text-gray-900">
                          What We Do
                        </AccordionTrigger>

                        <AccordionContent className="animate-slideDown">
                          <div className="space-y-3">
                            {/* Capabilities */}
                            <details>
                              <summary className="font-medium text-gray-700 cursor-pointer">
                                Capabilities
                              </summary>
                              <ul className="mt-2 ml-4 list-disc text-sm space-y-2 animate-fadeIn">
                                {navigationData.capabilities.map((c, i) => (
                                  <li key={i}>
                                    <Link
                                      href={`/capabilities/${slugify(c)}`}
                                      onClick={() => setIsSheetOpen(false)}
                                      className="text-gray-700 hover:text-primary transition"
                                    >
                                      {c}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>

                            {/* Industries */}
                            <details>
                              <summary className="font-medium text-gray-700 cursor-pointer">
                                Industries
                              </summary>
                              <ul className="mt-2 ml-4 list-disc text-sm space-y-1 animate-fadeIn">
                                {navigationData.industries.map((i, x) => (
                                  <li key={x}>
                                    <Link
                                      href={`/industries/${slugify(i)}`}
                                      onClick={() => setIsSheetOpen(false)}
                                      className="text-gray-700 hover:text-primary transition"
                                    >
                                      {i}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Normal Links */}

                    <Link
                      href="/services"
                      onClick={() => setIsSheetOpen(false)}
                      className="block text-gray-700 hover:text-primary animate-stagger"
                    >
                      Services
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => setIsSheetOpen(false)}
                      className="block text-gray-700 hover:text-primary animate-stagger"
                    >
                      About
                    </Link>
                    <Link
                      href="/projects"
                      onClick={() => setIsSheetOpen(false)}
                      className="block text-gray-700 hover:text-primary animate-stagger"
                    >
                      Projects
                    </Link>

                    <Link
                      href="/career"
                      onClick={() => setIsSheetOpen(false)}
                      className="block text-gray-700 hover:text-primary animate-stagger"
                    >
                      Careers
                    </Link>

                    <div className="pt-4 animate-stagger-delayed">
                      <Button
                        onClick={() => {
                          setIsSheetOpen(false);
                          router.push("/enquiry-form");
                        }}
                        className="w-full"
                      >
                        Enquire Now
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center md:gap-4 lg:gap-6"
            onClick={() => setMegaOpen(false)}
          >
            <div className="relative">
              <button
                onClick={(e) => {
                  setMegaOpen((s) => !s);
                  e.stopPropagation();
                }}
                className={`flex items-center gap-2 py-2 px-3  rounded-md ${
                  megaOpen ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
                aria-expanded={megaOpen}
              >
                <span
                  className={`text-sm ${
                    isActive("/services") ? "font-semibold" : "font-medium"
                  }`}
                >
                  What We Do
                </span>

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    megaOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {megaOpen && (
                <div
                  className={`absolute top-full 
      left-0 md:left-1/2 md:ml-6 
      md:-translate-x-1/2
      w-[90vw] md:w-[75vw] lg:w-[60vw] xl:w-[50vw]
      bg-white p-6 mt-3 shadow-lg z-50 animate-dropdown rounded-b-md`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {" "}
                    {/* Changed from grid-cols-2 to grid-cols-1 */}
                    <div>
                      <h4 className="font-semibold mb-3 text-black">
                        Capabilities
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                        {" "}
                        {/* Changed from grid-cols-2 to grid-cols-1 */}
                        {navigationData.capabilities.map((c) => (
                          <li key={c}>
                            <Link
                              href={`/capabilities/${slugify(c)}`}
                              className="hover:underline text-gray-700 hover:text-gray-900"
                            >
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-black">
                        Industries
                      </h4>
                      <ul className="grid grid-cols-2 gap-y-2 text-sm">
                        {navigationData.industries.map((i) => (
                          <li key={i}>
                            <Link
                              href={`/industries/${slugify(i)}`}
                              className="hover:underline text-gray-700 hover:text-gray-900"
                            >
                              {i}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={
                isActive("/services")
                  ? "font-semibold text-primary"
                  : "text-md text-gray-700 hover:text-gray-900"
              }
            >
              Services
            </Link>
            <Link
              href="/about"
              className={
                isActive("/about")
                  ? "font-semibold text-primary"
                  : "text-md text-gray-700 hover:text-gray-900"
              }
            >
              About
            </Link>
            <Link
              href="/projects"
              className={
                isActive("/projects")
                  ? "font-semibold text-primary"
                  : "text-md text-gray-700 hover:text-gray-900"
              }
            >
              Projects
            </Link>
            <Link
              href="/career"
              className={
                isActive("/career")
                  ? "font-semibold text-primary"
                  : "text-md text-gray-700 hover:text-gray-900"
              }
            >
              Careers
            </Link>
          </nav>

          {/* CTA on right */}
          <div className="hidden md:flex items-center md:ml-4">
            <Button
              onClick={() => router.push("/enquiry-form")}
              className="text-white"
            >
              Enquire Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* simple slug helper */
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
