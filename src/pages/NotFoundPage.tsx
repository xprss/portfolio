import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page page--narrow">
      <section className="project-detail">
        <p className="section__eyebrow">404</p>
        <h1>Pagina non trovata.</h1>
        <p>Il branch che hai provato a fare checkout non esiste in questo portfolio.</p>
        <Link className="text-link" to="/">
          torna a HEAD
        </Link>
      </section>
    </div>
  );
}
