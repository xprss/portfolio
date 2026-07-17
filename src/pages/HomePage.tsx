import type { SiteContent } from "../models/portfolio";
import { AboutSection } from "../components/home/AboutSection";
import { ContactSection } from "../components/home/ContactSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import { GitHighlightsSection } from "../components/home/GitHighlightsSection";
import { HeroSection } from "../components/home/HeroSection";
import { ProjectsSection } from "../components/home/ProjectsSection";
import { SkillsSection } from "../components/home/SkillsSection";

interface HomePageProps {
  siteContent: SiteContent;
}

export function HomePage({ siteContent }: HomePageProps) {
  return (
    <div className="page">
      <HeroSection profile={siteContent.profile} />
      <AboutSection paragraphs={siteContent.about} />
      <SkillsSection groups={siteContent.skills} />
      <ExperienceSection items={siteContent.experience} />
      <ProjectsSection projects={siteContent.projects} />
      <GitHighlightsSection highlights={siteContent.gitHighlights} />
      <ContactSection profile={siteContent.profile} socials={siteContent.socials} />
    </div>
  );
}
