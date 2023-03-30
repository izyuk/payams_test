import { Link } from "react-router-dom";
import { idGenerator } from "../components/id-generator";

export const Home = () => {
  return (
    <div className="home">
      <h1>Welcome at meeting app Home page.</h1>

      <Link to={`meeting/${idGenerator(3)}-${idGenerator(3)}`}>Join meeting</Link>
    </div>
  );
};
