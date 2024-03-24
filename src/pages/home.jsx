import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "../components/button";
import { MainLayout } from "../layouts/main.layout";

import logo from "@/src/assets/TUSK-logo.png";
export default function Home() {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    window.open(
      "https://pancakeswap.finance/swap?outputCurrency=0x5aecCb66a800e94E78f054e6258Ff7AfAe8b7957",
      "_blank"
    );
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <MainLayout className="flex items-center lg:-mt-32">
      <section className="grid grid-cols-12 gap-10 h-full">
        <div className="col-span-12 lg:col-span-6">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <h2 className="text-white">Introducing</h2>
            <h1 className="text-yellow-200">TUSK Token</h1>
          </div>

          <p className="mt-5 text-white text-base font-semibold">
            Taking The Financial Industry By Storm
          </p>

          <p className="text-white text-base mt-5">
            Powered by AI and blockchain technology, Tusk Token is leading the
            way in creating a dynamic ecosystem that combines cutting-edge tools
            and P2P lending to build powerful tools for the finance industry.
          </p>

          <div className="flex items-center gap-5 mt-10">
            <Button
              onClick={handleBuyNow}
              className="rounded-full flex items-center gap-2 max-w-60"
            >
              <span className="text-lg font-semibold">Buy Now</span>
              <FaArrowRight />
            </Button>
            <Button
              onClick={handleDashboard}
              className="rounded-full flex items-center gap-2 max-w-72"
              variant="secondary"
            >
              <span className="text-lg font-semibold">Dashboard</span>
              <FaArrowRight />
            </Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="flex justify-center">
            <img src={logo} alt="tusk tokens logo" />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
