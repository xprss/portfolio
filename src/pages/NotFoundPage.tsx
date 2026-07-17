import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="page page--narrow">
      <section className="project-detail">
        <p className="section__eyebrow">404</p>
        <h1>Route not found.</h1>
        <p>The branch you tried to checkout does not exist in this portfolio.</p>
        <Link className="text-link" to="/">
          return to HEAD
        </Link>
      </section>
    </div>
  );
}
