import { useQuery } from "@tanstack/react-query";
import { getGraph } from "../api/mockApi";

export function useGraph(
  appId: string | null
) {
  return useQuery({
    queryKey: ["graph", appId],

    queryFn: () => getGraph(appId!),

    enabled: !!appId,
  });
}