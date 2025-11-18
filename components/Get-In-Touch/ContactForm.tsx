"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

export default function ContactForm() {
  const pathname = usePathname();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    services: "all",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        body: JSON.stringify({
          formType: "get-in-touch",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          services: form.services,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.message || "Something went wrong");
        return;
      }

      setResponse("Message sent successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        services: "all",
        message: "",
      });
    } catch (error) {
      setResponse("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`${pathname !== "/get-in-touch" ? "pt-1 pb-20" : "py-20"
        } mt-6 px-6 md:px-10 lg:px-24 bg-bg-primary`}
    >
      {/* Heading */}
      {pathname === "/get-in-touch" && (
        <>
          <h2 className="text-center text-3xl md:text-5xl tracking-tight text-gray-900">
            Get in touch
          </h2>
          <p className="text-center text-neutral-600 mt-3 max-w-3xl mx-auto leading-relaxed">
            At FutureSphere our mission is to empower individuals and businesses
            through innovative technology solutions that enrich lives.
          </p>
        </>
      )}

      {/* Layout */}
      <div className="mt-14 flex flex-col md:flex-row gap-36 items-start">
        {/* Left Form */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-8">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                placeholder="John"
                className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Doe"
                className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="john@gmail.com"
                className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Phone No.</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="text"
                placeholder="+91"
                className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Services */}
          <div className="mt-6">
            <label className="text-sm text-gray-700">Services</label>
            <Select
              value={form.services}
              onValueChange={(value) => setForm({ ...form, services: value })}
            >
              <SelectTrigger className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="w-full bg-white">
                <SelectItem value="web">Website Development</SelectItem>
                <SelectItem value="app">App Development</SelectItem>
                <SelectItem value="uiux">UI/UX Design</SelectItem>
                <SelectItem value="ai">AI Automation</SelectItem>
                <SelectItem value="devops">Cloud & DevOps</SelectItem>
                <SelectItem value="marketing">Digital Marketing</SelectItem>
                <SelectItem value="custom">Custom Software</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="mt-6">
            <label className="text-sm text-gray-700">Messages</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Add Text"
              className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none"
            />
          </div>

          {/* Checkbox + Submit */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4">

            <button
              onClick={handleSubmit}
              className={`px-6 py-2 rounded-lg text-white transition shadow-sm ${loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#7F56D9] hover:bg-[#6b45cc]"
                }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {response && (
            <p className="mt-4 text-sm text-green-600">{response}</p>
          )}
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/get-in-touch/heroImg.svg"
            alt="Get in touch illustration"
            width={315}
            height={400}
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Footer Blocks */}
      {pathname === "/get-in-touch" && (
        <div className="mt-10 bg-white border border-gray-200 shadow-sm rounded-2xl py-8 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8">

            <div className="flex flex-col items-center">
              <Image src="/get-in-touch/icon1.svg" width={40} height={40} alt="" />
              <h3 className="mt-3 font-medium text-gray-900">Sales and Business</h3>
              <p className="text-sm text-gray-600">akdenarlabs@gmail.com</p>
            </div>

            <div className="flex flex-col items-center">
              <Image src="/get-in-touch/icon2.svg" width={40} height={40} alt="" />
              <h3 className="mt-3 font-medium text-gray-900">Partners</h3>
              <p className="text-sm text-gray-600">partners1234@gmail.com</p>
            </div>

            <div className="flex flex-col items-center">
              <Image src="/get-in-touch/icon3.svg" width={40} height={40} alt="" />
              <h3 className="mt-3 font-medium text-gray-900">Customer Support</h3>
              <p className="text-sm text-gray-600">support1234@gmail.com</p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
