import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../button";
import { VESTING_ABI, VESTING_ADDRESS } from "@/src/lib/constants";
import { getMonthsAndDays, timeConverter } from "@/src/lib/dateTimeHelper";
import { getPlural } from "@/src/lib/utils";

const PAGE_SIZE = 10;

const vestingContract = {
  abi: VESTING_ABI,
  address: VESTING_ADDRESS,
};

export const VestingTable = ({ vestingCount = 0 }) => {
  const publicClient = usePublicClient();
  const { address } = useAccount();

  const [{ currentPage, vestingSchedulesInfo, onLoading }, setState] = useState(
    {
      currentPage: 0,
      vestingSchedulesInfo: [],
      onLoading: false,
    }
  );

  const loadVestingScheulesInfo = async (to = 0) => {
    setState((p) => ({ ...p, onLoading: true }));
    try {
      const contracts = [];

      for (let i = vestingCount; i > to; i--) {
        contracts.push({
          ...vestingContract,
          functionName: "getVestingScheduleByBeneficiaryAndIndex",
          args: [address, i - 1],
        });
      }

      const results = await publicClient.multicall({
        contracts: contracts,
      });

      const vestingSchedulesInfo = [];

      results.forEach(({ status, result }) => {
        if (status === "success") {
          const startDateInUnix = parseInt(result.start);
          const durationInUnix = parseInt(result.duration);
          const cliff = parseInt(result.cliff);

          const { monthsCount: cliffMoths, daysCount: cliffDays } =
            getMonthsAndDays(cliff - startDateInUnix);

          vestingSchedulesInfo.push({
            amountTotalEth: formatEther(result.amountTotal),
            released: formatEther(result.released),
            startDate: timeConverter(startDateInUnix),
            endDate: timeConverter(Number(cliff) + Number(durationInUnix)),
            cliff: { cliffMoths, cliffDays },
          });
        }
      });

      setState((p) => ({
        ...p,
        vestingSchedulesInfo,
        currentPage: vestingCount - PAGE_SIZE,
      }));
    } catch (e) {
      console.log({ e });
    }

    setState((p) => ({ ...p, onLoading: false }));
  };

  useEffect(() => {
    const initialPages =
      vestingCount > PAGE_SIZE ? vestingCount - PAGE_SIZE : 0;
    address && vestingCount && loadVestingScheulesInfo(initialPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, vestingCount]);

  // pagination loadMore
  const onLoadMore = async () => {
    let newPage = currentPage - PAGE_SIZE;

    const toPage = newPage < 0 ? 0 : newPage;

    await loadVestingScheulesInfo(toPage);
    setState((p) => ({
      ...p,
      currentPage: newPage,
    }));
  };

  return (
    <>
      <table className="grid grid-cols-12 gap-4 text-white whitespace-nowrap overflow-x-auto">
        <thead className="col-span-12">
          <tr className="grid grid-cols-12 gap-20 font-semibold text-lg pb-5">
            <th className="col-span-1 text-center">VS#</th>
            <th className="col-span-3 text-center">
              Released/Total
              <br /> (vTUSK)
            </th>
            <th className="col-span-3 text-center">Vesting Start date</th>
            <th className="col-span-2 text-center">Cliff</th>
            <th className="col-span-3 text-center">Vesting End date</th>
          </tr>
        </thead>

        <tbody className="col-span-12 text-lg">
          {vestingSchedulesInfo.map(
            (
              { amountTotalEth, cliff, released, startDate, endDate },
              index
            ) => (
              <tr className="grid grid-cols-12 gap-20 py-5" key={index}>
                <td className="col-span-1 text-center">{index + 1})</td>
                <td className="col-span-3  text-center">
                  {parseInt(released).toFixed(2)} /{" "}
                  {parseInt(amountTotalEth).toFixed(2)}
                </td>
                <td className="col-span-3 text-center">{startDate}</td>
                <td className="col-span-2 text-center">
                  {cliff.cliffMoths ? cliff.cliffMoths : cliff.cliffDays}&nbsp;
                  {cliff.cliffMoths
                    ? getPlural(cliff.cliffMoths, "Month")
                    : getPlural(cliff.cliffDays, "Day")}
                  &nbsp;
                </td>
                <td className="col-span-3 text-center">{endDate}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {!onLoading && currentPage > 0 && (
        <div className="text-center mt-10">
          <Button onClick={onLoadMore} variant="secondary" className="w-20">
            <FaPlus />
          </Button>
        </div>
      )}
    </>
  );
};
