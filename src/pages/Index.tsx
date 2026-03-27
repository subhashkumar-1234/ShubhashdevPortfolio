import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <SectionDivider variant="wave" />
      <AboutSection />
      <SectionDivider variant="curve" flip />
      <ProjectsSection />
      <SectionDivider variant="wave" />
      <SkillsSection />
      <SectionDivider variant="gradient" flip />
      <ExperienceSection />
      <SectionDivider variant="curve" />
      <TestimonialsSection />
      <SectionDivider variant="zigzag" flip />
      <BlogSection />
      <SectionDivider variant="wave" />
      <ResumeSection />
      <SectionDivider variant="gradient" flip />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
