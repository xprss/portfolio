import { useEffect, useState } from "react";
import { Section } from "../common/Section";
import type { CarouselItem } from "../../models/portfolio";

interface CarouselSectionProps {
  items: CarouselItem[];
}

export function CarouselSection({ items }: CarouselSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [items.length]);

  return (
    <Section
      id="highlights"
      eyebrow="01 / evidenza"
      title="Una panoramica in movimento dei progetti piu' rappresentativi."
      intro="Il carosello avanza automaticamente ogni cinque secondi e resta volutamente privo di controlli visibili."
    >
      <div className="carousel" aria-live="polite">
        <div
          className="carousel__track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {items.map((item) => (
            <article
              key={`${item.label}-${item.title}`}
              className={`carousel__slide carousel__slide--${item.variant}`}
            >
              <p className="carousel__label">{item.label}</p>
              <h3>{item.title}</h3>
              <p className="carousel__description">{item.description}</p>
              <ul className="carousel__meta" aria-label={`Dettagli di ${item.title}`}>
                {item.meta.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
