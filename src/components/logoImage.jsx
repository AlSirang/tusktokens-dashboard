import logo from "@/src/assets/TUSK-logo.png";
import { Link } from "react-router-dom";

export const LogoImage = ({ className = "" }) => {
  return (
    <Link to="/">
      <img src={logo} alt="tusk tokens logo" className={className} />
    </Link>
  );
};
