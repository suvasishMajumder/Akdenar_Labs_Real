"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactSchema, ContactFormType } from "@/validations/get-in-touch"

export default function ContactForm() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const form = useForm<ContactFormType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      services: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormType) => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        body: JSON.stringify({
          formType: "get-in-touch",
          ...values,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.message || "Something went wrong");
        return;
      }

      setResponse("Message sent successfully!");
      form.reset();
    } catch (err) {
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

      <div className="mt-14 flex flex-col md:flex-row gap-36 items-start">
        {/* Left Form */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="text-sm text-gray-700">First Name</label>
                <input
                  {...form.register("firstName")}
                  type="text"
                  placeholder="John"
                  className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="text-sm text-gray-700">Last Name</label>
                <input
                  {...form.register("lastName")}
                  type="text"
                  placeholder="Doe"
                  className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Email */}
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder="john@gmail.com"
                  className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-700">Phone No.</label>
                <input
                  {...form.register("phone")}
                  type="text"
                  placeholder="+91"
                  className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Services */}
            <div className="mt-6">
              <label className="text-sm text-gray-700">Services</label>
              <Controller
                name="services"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    >
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
                )}
              />
              {form.formState.errors.services && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.services.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mt-6">
              <label className="text-sm text-gray-700">Message</label>
              <textarea
                {...form.register("message")}
                rows={4}
                placeholder="Add Text"
                className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none"
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end">
              <button
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white transition shadow-sm ${loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#7F56D9] hover:bg-[#6b45cc]"
                  }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {/* Response */}
            {response && (
              <p
                className={`mt-4 text-sm ${response.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {response}
              </p>
            )}
          </form>
        </div>

        {/* Right Image */}
        <div className="hidden nd:flex justify-center lg:justify-end">
          <Image
            src="/getintouch/heroimg.svg"
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
              <Image src="/getintouch/icon1.svg" width={40} height={40} alt="" />
              <h3 className="mt-3 font-medium text-gray-900">Sales and Business</h3>
              <p className="text-sm text-gray-600">akdenarlabs@gmail.com</p>
            </div>

            <div className="flex flex-col items-center">
              <Image src="/getintouch/icon2.svg" width={40} height={40} alt="" />
              <h3 className="mt-3 font-medium text-gray-900">Partners</h3>
              <p className="text-sm text-gray-600">partners1234@gmail.com</p>
            </div>

            <div className="flex flex-col items-center">
              <Image src="/getintouch/icon3.svg" width={40} height={40} alt="" />
              <h3 className="mt-3 font-medium text-gray-900">Customer Support</h3>
              <p className="text-sm text-gray-600">support@akdenar.com</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
