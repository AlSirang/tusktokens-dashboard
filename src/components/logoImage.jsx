import logo from "@/src/assets/TUSK-logo.png";

export const LogoImage = ({ className = "" }) => {
  return <img src={logo} alt="tusk tokens logo" className={className} />;
};
