import Header from "../components/header";
import Sidebar from "../components/sidebar";

export const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full relative min-h-screen right-section">
        <Header />
        {children}
      </div>
    </div>
  );
};
