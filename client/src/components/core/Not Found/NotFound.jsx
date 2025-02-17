import { Link } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  return (
    <div className="not_found_container">
      <p>Page Not Found</p>
      <p>Return to <Link to={"/"}>Home Page</Link></p>
    </div>
  );
}
