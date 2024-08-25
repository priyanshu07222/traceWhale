import FAQSection from "@/components/FAQ";
import FeaturesSection from "@/components/Feature";
import { Footer } from "@/components/Footer";
import { Landing } from "@/components/Landing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">

      <Landing/>
      <FeaturesSection/>
      <FAQSection/>
      <Footer/>
    </main>
  );
}
