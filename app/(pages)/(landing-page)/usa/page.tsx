import { costAndRequirementData, faqsData, footerData, heroSection, visaProcessData, VisaTimelineUsaData, seo } from "@/data/usa";
import Navbar from "@/components/LandingPage2/Navbar/Navbar";
import HeroSection from "@/components/LandingPage2/HeroSection/HeroSection";
import PreparationSection from "@/components/LandingPage2/Prepration/Prepration";
import TestimonialsPage from "@/components/LandingPage2/Testimonial/Testimonial";
import VisaTimeline from "@/components/LandingPage2/VisaTimeline/VisaTimeline";
import ProcessSection from "@/components/LandingPage2/VisaProcess/VisaProcess";
import FAQSection from "@/components/LandingPage2/Faq/Faq";
import Footer from "@/components/LandingPage2/Footer/footer";
import { navLinksData } from "@/data/navlinks";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(seo);

export default function LandingPage() {
  
  return (
    <div className="bg-white">
    <Navbar navLinks={navLinksData} />
    <HeroSection 
          heading={heroSection.heading}
          description={heroSection.description}
          image={heroSection.image}
          imageClass={heroSection.imageClass} />

    <TestimonialsPage sheet={process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID ?? ""} title={<> Real Students. <span className="text-[#DC2626]">Real Results.</span>
          </>} description="Join thousands of successful applicants who navigated the F-1 process
          with our strategy." />
    <ProcessSection data={visaProcessData} />
    <PreparationSection data={costAndRequirementData} />
    <VisaTimeline 
      steps={VisaTimelineUsaData.steps} 
      title={VisaTimelineUsaData.title}
      description={VisaTimelineUsaData.description}
      badge={VisaTimelineUsaData.badge}
    />
    <FAQSection data={faqsData} />
    <Footer data={footerData}/>
    </div>
  );
}