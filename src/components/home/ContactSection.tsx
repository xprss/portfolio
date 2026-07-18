import type { Profile, SocialLink } from "../../models/portfolio";
import { Section } from "../common/Section";

interface ContactSectionProps {
  profile: Profile;
  socials: SocialLink[];
}

export function ContactSection({ profile, socials }: ContactSectionProps) {
  return (
    <Section
      id="contact"
      eyebrow="07 / contatti"
      title="Parliamone."
      intro="Nessun form complesso: contatto diretto via email e link ai profili principali."
    >
      <div className="contact-panel">
        <div>
          <p className="contact-panel__command">$ echo $COLLABORATION_STATUS</p>
          <p className="contact-panel__availability">{profile.availability}</p>
        </div>
        <a className="button button--primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-panel__links">
          {socials.map((social) => (
            <a
              key={social.label}
              className="social-chip social-chip--large"
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              <span aria-hidden="true">{social.icon}</span>
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
