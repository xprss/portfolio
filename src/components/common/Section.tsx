import type { PropsWithChildren, ReactNode } from "react";

interface SectionProps extends PropsWithChildren {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
}

export function Section({ id, eyebrow, title, intro, aside, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section__header">
        <div>
          <p className="section__eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {intro ? <p className="section__intro">{intro}</p> : null}
        </div>
        {aside ? <div className="section__aside">{aside}</div> : null}
      </div>
      {children}
    </section>
  );
}
