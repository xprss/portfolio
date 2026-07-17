import { Section } from "../common/Section";

interface AboutSectionProps {
  paragraphs: string[];
}

export function AboutSection({ paragraphs }: AboutSectionProps) {
  return (
    <Section
      id="about"
      eyebrow="01 / about"
      title="Built with engineering discipline."
      intro="The portfolio is meant to read like a clean repository: deliberate structure, clear boundaries, and visible intent."
    >
      <div className="copy-grid">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="copy-grid__item">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
