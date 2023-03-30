import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Return to <Link to="/">Home page</Link>
      </p>
    </div>
  );
};
