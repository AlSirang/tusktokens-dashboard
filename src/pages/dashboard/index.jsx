import { MainLayout } from "@/src/layouts/main.layout";
import { BalanceInfo } from "@/src/components/dashboard/balanceInfo";
import { VestingInfo } from "@/src/components/dashboard/vestingInfo";
import { StakeCard } from "@/src/components/dashboard/stakeCard";
import { StakeRewardsCard } from "@/src/components/dashboard/stakeRewardsCard";
import { StakeContextProvider } from "@/src/context/stakeContext";
import { TuskBalanceContextProvider } from "@/src/context/tuskBalanceContext";

export default function Dashboard() {
  return (
    <MainLayout className="w-full max-w-screen-2xl pb-10">
      <div className="pt-5 md:pt-10 flex flex-col gap-10">
        <TuskBalanceContextProvider>
          <BalanceInfo />

          <StakeContextProvider>
            <section className="grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-6">
                <StakeCard />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <StakeRewardsCard />
              </div>
            </section>
          </StakeContextProvider>
        </TuskBalanceContextProvider>

        <VestingInfo />
      </div>
    </MainLayout>
  );
}
