import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

import {
  generateProfits,
  getInvestmentStats,
} from "@/api/services/admin-general.service";

import {
  IGenerateProfitsResponse,
  IGetInvestmentStatsResponse,
} from "@/interface/response/admin-general";

const ADMIN_KEYS = {
  INVESTMENT_STATS: "investmentStats",
};

export const useGenerateProfits = (): UseMutationResult<IGenerateProfitsResponse, Error, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateProfits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_KEYS.INVESTMENT_STATS] });
    },
  });
};

export const useGetInvestmentStats = (): UseQueryResult<IGetInvestmentStatsResponse> => {
  return useQuery({
    queryKey: [ADMIN_KEYS.INVESTMENT_STATS],
    queryFn: getInvestmentStats,
  });
}; 