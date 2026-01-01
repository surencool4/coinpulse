"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base url");
if (!API_KEY) throw new Error("Could not get api key");

const SEARCH_LIMIT = 10;

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  if (!query) return [];

  try {
    const searchData = await fetcher<{
      coins: {
        id: string;
        name: string;
        symbol: string;
        thumb: string;
      }[];
    }>("search", { query }, 30);

    const coins = searchData.coins?.slice(0, SEARCH_LIMIT) ?? [];
    if (coins.length === 0) return [];

    const ids = coins.map((coin) => coin.id).join(",");

    const marketData = await fetcher<
      {
        id: string;
        current_price: number;
        price_change_percentage_24h: number | null;
      }[]
    >(
      "coins/markets",
      {
        vs_currency: "usd",
        ids,
        price_change_percentage: "24h",
      },
      30,
    );

    const marketMap = new Map(marketData.map((coin) => [coin.id, coin]));

    return coins.map((coin) => {
      const market = marketMap.get(coin.id);

      return {
        ...coin,
        data: {
          price: market?.current_price ?? 0,
          price_change_percentage_24h: market?.price_change_percentage_24h ?? 0,
        },
      };
    });
  } catch (error) {
    console.error("Coin search failed:", error);
    return [];
  }
}

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText} `,
    );
  }

  return response.json();
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null,
): Promise<PoolData> {
  const fallback: PoolData = {
    id: "",
    address: "",
    name: "",
    network: "",
  };

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`,
      );

      return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>(
      "/onchain/search/pools",
      { query: id },
    );

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}
