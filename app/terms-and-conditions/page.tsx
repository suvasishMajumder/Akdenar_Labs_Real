export default function page() {
    return (
        <div className="min-h-screen w-full  max-w-6xl mx-auto mt-12 bg-white text-gray-800 px-6 md:px-16 py-12">

            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
                Terms and Conditions – Akdenar Labs
            </h1>

            <div className="space-y-8 text-[15px] leading-relaxed">

                {/* Overview */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Overview</h2>
                    <p>
                        This website and the information, tools, and materials contained in it
                        (“Site”) are not intended for use by any person or entity in any
                        jurisdiction where such use would violate law or regulation or impose
                        any registration or licensing requirements on AKDENAR PRIVATE LIMITED
                        (“Akdenar Labs”) or its affiliates.
                    </p>
                    <p className="mt-2">
                        This Site may be updated periodically. Materials should be considered
                        current only as of their initial publication date. Akdenar Labs may
                        modify or delete content without notice.
                    </p>
                    <p className="mt-2">
                        Past performance of services delivered by Akdenar Labs does not
                        guarantee future outcomes. No express or implied warranty is made.
                    </p>
                </section>

                {/* Limited License */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Limited License</h2>
                    <p>
                        Subject to these Terms and Conditions, Akdenar Labs grants you a
                        non-exclusive, non-transferable, limited right to access this Site and
                        the materials available on it.
                    </p>

                    <div className="mt-3 space-y-2">
                        <p>By accessing this Site, you confirm that:</p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Your access is not unlawful under your jurisdiction’s laws.</li>
                            <li>This Site does not constitute an offer to buy or sell securities.</li>
                            <li>No regulatory authority has approved the content on this Site.</li>
                            <li>You will not copy, reproduce, or distribute any content from the Site.</li>
                            <li>You will not broadcast, share, or republish the Site’s materials.</li>
                        </ul>
                    </div>
                </section>

                {/* Restrictions */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Restrictions</h2>
                    <p>You agree not to:</p>

                    <ul className="list-disc ml-6 space-y-1 mt-2">
                        <li>Interrupt or attempt to disrupt the operation of the Site.</li>
                        <li>Intrude into the Site, servers, or networks.</li>
                        <li>Post obscene, defamatory, offensive, or illegal content.</li>
                        <li>Remove or obscure notices already posted on the Site.</li>
                        <li>Use the Site to harass or violate the rights of others.</li>
                    </ul>

                    <p className="mt-4">
                        Akdenar Labs authorizes viewing and downloading materials (“Materials”)
                        only for personal, non-commercial use. This is not a transfer of title.
                    </p>

                    <ul className="list-disc ml-6 space-y-1 mt-2">
                        <li>You must retain all copyright and proprietary notices.</li>
                        <li>You may not modify, reproduce, or distribute Materials commercially.</li>
                        <li>You may not transfer Materials to others without these Terms.</li>
                    </ul>

                    <p className="mt-3">
                        All Materials are protected by global copyright laws. No rights to
                        trademarks, patents, or trade secrets are granted.
                    </p>
                </section>

                {/* Disclaimer */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
                    <p>
                        The information, materials, and services on this Site may contain errors
                        or inaccuracies. Akdenar Labs may modify the Site and its content at any
                        time.
                    </p>
                    <p className="mt-2">
                        Information on this Site should not be used for legal, financial, medical,
                        or business decisions. Consult qualified professionals.
                    </p>

                    <p className="mt-4">You agree that Akdenar Labs is not liable for:</p>
                    <ul className="list-disc ml-6 space-y-1 mt-2">
                        <li>Unauthorized access to your data</li>
                        <li>Data not sent, received, or transmitted properly</li>
                        <li>Transactions conducted through the Site</li>
                        <li>Offensive or illegal third-party content</li>
                        <li>Intellectual property infringement by others</li>
                        <li>Any third-party content displayed on the Site</li>
                    </ul>

                    <p className="mt-4">
                        Akdenar Labs is not liable for direct, indirect, incidental, punitive, or
                        consequential damages—including loss of profits, data, or business
                        interruption—arising from the use or inability to use the Site.
                    </p>

                    <p className="mt-3 font-medium">
                        If you are dissatisfied with the Site or these Terms, your only remedy is
                        to stop using the Site.
                    </p>
                </section>

                {/* Governing Law */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Governing Law & Jurisdiction</h2>
                    <p>
                        These Terms and Conditions are governed by the laws of the Republic of India.
                        The courts located in Mumbai, India have exclusive jurisdiction over disputes
                        arising from the use of this Site.
                    </p>
                </section>

                {/* Consent */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Consent</h2>
                    <p>
                        Please proceed only if you accept all the Terms and Conditions listed above,
                        voluntarily and without coercion.
                    </p>
                </section>
            </div>
        </div>
    );
}