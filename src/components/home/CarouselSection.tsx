import { useEffect, useMemo, useState } from "react";
import { Section } from "../common/Section";
import type { CarouselItem } from "../../models/portfolio";

interface CarouselSectionProps {
  items: CarouselItem[];
}

export function CarouselSection({ items }: CarouselSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const renderedItems = useMemo(
    () => (items.length > 1 ? [...items, ...items] : items),
    [items]
  );

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIsTransitionEnabled(true);
      setActiveIndex((current) => current + 1);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [items.length]);

  useEffect(() => {
    setActiveIndex(0);
    setIsTransitionEnabled(true);
  }, [items]);

  useEffect(() => {
    if (items.length <= 1 || activeIndex !== items.length) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsTransitionEnabled(false);
      setActiveIndex(0);
    }, 520);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, items.length]);

  useEffect(() => {
    if (isTransitionEnabled) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isTransitionEnabled]);

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
          style={{
            transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
            transition: isTransitionEnabled ? undefined : "none"
          }}
        >
          {renderedItems.map((item, index) => (
            <article
              key={`${item.label}-${item.title}-${index}`}
              className={`carousel__slide carousel__slide--${item.variant}`}
              aria-hidden={index >= items.length}
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
