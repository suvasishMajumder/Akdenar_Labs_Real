"use client";

import { useState } from "react";
import Image from "next/image";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubscribe = async () => {
        if (!email) {
            setMessage("Please enter a valid email");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Something went wrong");
                return;
            }

            setMessage("Subscribed successfully!");
            setEmail("");

        } catch (err) {
            setMessage("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full py-10 px-6 md:px-10 lg:px-20 z-40">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-md border border-[#dfe3ff]">

                {/* Background Image */}
                <div className="absolute inset-0 z-10">
                    <Image
                        src="/home/newsletter.svg"
                        alt="Newsletter Background"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

                {/* Content */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center py-20 px-6 md:px-12">

                    {/* Icon */}
                    <Image
                        src={"/home/messageIcon.svg"}
                        width={32}
                        height={32}
                        alt="message icon"
                    />

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
                        Do cool things with us.
                    </h2>

                    {/* Subheading */}
                    <p className="text-neutral-200 max-w-lg text-sm md:text-base mb-8 leading-relaxed">
                        Stay in the loop with updates from our team and community. Once a month.
                    </p>

                    {/* Input + Button */}
                    <div className="flex w-full max-w-lg bg-white rounded-md overflow-hidden p-1 shadow-sm">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 text-sm outline-none"
                        />

                        <button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="px-5 py-3 bg-[#7F56D9] text-white text-sm font-medium hover:bg-[#6b45cc] transition rounded-md flex"
                        >
                            {loading ? "Please wait..." : "Subscribe"}
                        </button>
                    </div>

                    {/* Message */}
                    {message && (
                        <p className="mt-3 text-sm text-white bg-black/40 px-4 py-2 rounded-lg">
                            {message}
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
