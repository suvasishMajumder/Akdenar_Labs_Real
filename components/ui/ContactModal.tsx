"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SpecificServiceWithPackageSchema,
  SpecificServiceWithPackageType,
} from "@/validations/specificServiceWithPackage";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  serviceTitle?: string | undefined;
  packageInfo?: {
    packageName?: string;
    price?: string;
  } | null;
};

export default function ContactModal({
  open,
  onClose,
  serviceTitle,
  packageInfo,
}: ContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SpecificServiceWithPackageType>({
    resolver: zodResolver(SpecificServiceWithPackageSchema),
  });

  if (!open) return null;

  // handleSubmit fn
  const onSubmit = async (values: SpecificServiceWithPackageType) => {
    setLoading(true);
    setResponse("");

    const payload = {
      formType: "quick-contact",
      name: values.name,
      email: values.email,
      message: values.message,
      services: serviceTitle || "",
      package: {
        name: packageInfo?.packageName || "",
        price: packageInfo?.price || "",
      },
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.message || "Failed to send message");
        return;
      }

      setResponse("Message sent successfully!");
      reset();

      setTimeout(() => {
        setResponse("");
        onClose();
      }, 800);

    } catch (error) {
      setResponse("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">
              Contact Us {serviceTitle ? `— ${serviceTitle}` : ""}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Fill this quick form and we'll get back shortly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {/* Package Info */}
          {packageInfo && (
            <div className="p-3 rounded-md bg-gray-50 border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Selected Package</div>
                  <div className="font-medium">{packageInfo.packageName}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Price</div>
                  <div className="font-semibold">{packageInfo.price}</div>
                </div>
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-sm block text-gray-700">Name</label>
            <input
              {...register("name")}
              className="mt-2 w-full px-3 py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-2 w-full px-3 py-2 border rounded-md
              focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-sm block text-gray-700">Message</label>
            <textarea
              {...register("message")}
              rows={4}
              className="mt-2 w-full px-3 py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="px-4 py-2 rounded-md bg-[#7F56D9] text-white"
            >
              {isSubmitting || loading ? "Sending..." : "Send"}
            </button>
          </div>

          {response && (
            <p className="text-sm text-green-600 mt-2">{response}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
