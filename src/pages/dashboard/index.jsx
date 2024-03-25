import { MainLayout } from "@/src/layouts/main.layout";
import { BalanceInfo } from "./components/balanceInfo";
import { VestedCard } from "./components/vestedCard";

export default function Dashboard() {
  return (
    <MainLayout className="w-full py-10 px-0">
      <div className="px-5 md:px-10 flex flex-col gap-10">
        <BalanceInfo />

        <VestedCard />
      </div>
    </MainLayout>
  );
}
