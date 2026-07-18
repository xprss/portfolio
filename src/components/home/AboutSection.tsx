import { Section } from "../common/Section";

interface AboutSectionProps {
  paragraphs: string[];
}

export function AboutSection({ paragraphs }: AboutSectionProps) {
  return (
    <Section
      id="about"
      eyebrow="02 / chi sono"
      title="Costruisco software con intenzione chiara."
      intro="Il portfolio e' pensato come un repository leggibile: contenuti modulari, confini netti e progetti raccontati per quello che fanno davvero."
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
