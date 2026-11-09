import FooterSection from "@/components/LandingPage2/Footer/footer";
import FAQSection from "@/components/LandingPage2/Faq/Faq";
import HeroSection from "@/components/LandingPage2/HeroSection/HeroSection";
import Navbar from "@/components/LandingPage2/Navbar/Navbar";
import PreparationSection from "@/components/LandingPage2/Prepration/Prepration";
import TestimonialsPage from "@/components/LandingPage2/Testimonial/Testimonial";
import VisaTimeline from "@/components/LandingPage2/VisaTimeline/VisaTimeline";
import ProcessSection from "@/components/LandingPage2/VisaProcess/VisaProcess";
import WhySection from "@/components/WhySection/WhySection";
import CountryComparison from "@/components/LandingPage2/ComparisonSection/ComparisonSection";
import EligibilityAndCost from "@/components/LandingPage2/EligibilityAndCost/EligibilityAndCost";
import { 
  faqsData, 
  footerData, 
  heroSection, 
  testimonialsPage, 
  VisaTimelineData, 
  whySection,
  seo
} from "@/data/netherland";
import { navLinksData } from "@/data/navlinks";

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(seo);

export default function LandingPage() {
  
  return (
    <div className="bg-white">
    <Navbar navLinks={navLinksData} />
    <HeroSection 
    image={heroSection.image}
      heading={ 
        heroSection.heading
      } 
      imageClass={heroSection.imageClass}
      description={
      heroSection.description
      } 
    />
    
    <TestimonialsPage 
      sheet={process.env.NEXT_PUBLIC_NETHERLANDS_GOOGLE_SHEET_ID ?? ""}
      title={testimonialsPage.title}
      description={testimonialsPage.description}
    />


    <WhySection title={whySection.title} description={whySection.description}  features={whySection.features} badge={whySection.badge} />
    {/* <ProcessSection /> */}
    <VisaTimeline 
      steps={VisaTimelineData.steps} 
      title={VisaTimelineData.title}
      description={VisaTimelineData.description}
      badge={VisaTimelineData.badge}
    />
    <CountryComparison />
    {/* <PreparationSection /> */}
    <EligibilityAndCost />
    <FAQSection data={faqsData} />
    <FooterSection data={footerData} />
    </div>
  );
}