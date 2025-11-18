import ContactForm from "@/components/Get-In-Touch/ContactForm";
import FAQSection from "@/components/Get-In-Touch/FAQ";
import Footer from "@/components/home/Footer";

export default function page() {
  return (
    <>
      {/* Contact Form */}
      <ContactForm />

      {/* FAQ section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </>
  )
}