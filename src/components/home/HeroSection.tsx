import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent
} from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import type { Profile } from "../../models/portfolio";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const dimTimerRef = useRef<number | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const aliasRef = useRef<HTMLSpanElement>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [glowStyle, setGlowStyle] = useState<CSSProperties | null>(null);
  const isDimmed = glowStyle !== null;

  const clearDimTimer = () => {
    if (dimTimerRef.current !== null) {
      window.clearTimeout(dimTimerRef.current);
      dimTimerRef.current = null;
    }
  };

  const updateGlowStyle = () => {
    if (!aliasRef.current) {
      return;
    }

    const rect = aliasRef.current.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(aliasRef.current);

    setGlowStyle({
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      color: computedStyle.color,
      fontFamily: computedStyle.fontFamily,
      fontSize: computedStyle.fontSize,
      fontWeight: computedStyle.fontWeight,
      lineHeight: computedStyle.lineHeight,
      letterSpacing: computedStyle.letterSpacing
    });
  };

  const startDimSequence = () => {
    clearDimTimer();
    dimTimerRef.current = window.setTimeout(() => {
      updateGlowStyle();
      document.body.classList.add("portfolio-dim-active");
    }, 3000);
  };

  const stopDimSequence = () => {
    clearDimTimer();
    setGlowStyle(null);
    document.body.classList.remove("portfolio-dim-active");
  };

  const resetTouchSequence = () => {
    setIsTouchActive(false);
    stopDimSequence();
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    if (event.pointerType === "mouse") {
      startDimSequence();
    }
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    if (event.pointerType === "mouse") {
      stopDimSequence();
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    if (event.pointerType === "mouse") {
      return;
    }

    event.preventDefault();

    if (isTouchActive) {
      resetTouchSequence();
      return;
    }

    setIsTouchActive(true);
    startDimSequence();
  };

  useEffect(() => {
    if (!isDimmed) {
      return;
    }

    const handleViewportChange = () => {
      updateGlowStyle();
    };

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange);
    };
  }, [isDimmed]);

  useEffect(() => {
    return () => {
      clearDimTimer();
      document.body.classList.remove("portfolio-dim-active");
    };
  }, []);

  useEffect(() => {
    if (!isTouchActive) {
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && nameRef.current?.contains(event.target)) {
        return;
      }

      resetTouchSequence();
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
    };
  }, [isTouchActive]);

  return (
    <section className="hero">
      <div className="hero__terminal">
        <div className="terminal__bar">
          <span />
          <span />
          <span />
        </div>
        <div className="hero__terminal-meta" aria-hidden="true">
          <span>bash --login</span>
          <span>xprss@arch</span>
        </div>
        <p className="terminal__line">$ whoami</p>
        <h1
          ref={nameRef}
          className={isTouchActive ? "hero__name hero__name--touch-active" : "hero__name"}
          aria-label={profile.name}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
        >
          <span className="hero__name-text hero__name-text--full" aria-hidden="true">
            {profile.name}
          </span>
          <span
            ref={aliasRef}
            className="hero__name-text hero__name-text--alias"
            aria-hidden="true"
          >
            @xprss
          </span>
        </h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__meta">
          <span>sede: {profile.location}</span>
          <span>profilo: {profile.availability}</span>
        </div>
        <div className="hero__command-cluster" aria-hidden="true">
          <span className="hero__command-chip">cat /etc/profile</span>
          <span className="hero__command-chip">tmux attach</span>
          <span className="hero__command-chip">git status -sb</span>
        </div>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            vedi i progetti
          </a>
          <a className="button button--secondary" href={`mailto:${profile.email}`}>
            scrivimi
          </a>
        </div>
      </div>
      <aside className="hero__panel">
        <p className="hero__panel-label">README.md</p>
        <p>{profile.tagline}</p>
        <div className="hero__branch-card">
          <span>branch attivo</span>
          <strong>feature/portfolio-personale</strong>
        </div>
        <div className="hero__status-grid" aria-hidden="true">
          <div>
            <span>shell</span>
            <strong>zsh + tmux</strong>
          </div>
          <div>
            <span>prompt</span>
            <strong>powerline</strong>
          </div>
        </div>
        <Link className="hero__project-link" to="/projects/recipe-scaler">
          apri il progetto in evidenza
        </Link>
      </aside>
      {glowStyle
        ? createPortal(
            <span className="portfolio-dim-glow" style={glowStyle} aria-hidden="true">
              @xprss
            </span>,
            document.body
          )
        : null}
    </section>
  );
}
