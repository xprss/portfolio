import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollToTop() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo({ left: 0, top: 0 });
  root.style.scrollBehavior = previousScrollBehavior;
}

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.slice(1));
  const element = document.getElementById(id);

  element?.scrollIntoView();
}

export function ScrollRestoration() {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        scrollToHash(hash);
        return;
      }

      scrollToTop();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [hash, pathname, search]);

  return null;
}
