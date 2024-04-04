import { MainLayout } from "@/src/layouts/main.layout";
import { BalanceInfo } from "./components/balanceInfo";
import { VestedCard } from "./components/vestedCard";
import { StakeCard } from "./components/stakeCard";
import { StakeRewardsCard } from "./components/stakeRewardsCard";

export default function Dashboard() {
  return (
    <MainLayout className="w-full max-w-screen-2xl">
      <div className="pt-5 md:pt-10 flex flex-col gap-10">
        <BalanceInfo />

        <section className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-6">
            <StakeCard />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <StakeRewardsCard />
          </div>
        </section>
        <VestedCard />
      </div>
    </MainLayout>
  );
}
