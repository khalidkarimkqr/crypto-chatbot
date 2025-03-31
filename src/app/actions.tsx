"use server";

import type { CoreMessage, ToolInvocation } from "ai";
import { env } from "@/env";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import type { ReactNode } from "react";
import { openai } from "@ai-sdk/openai";
import { BotCard, BotMessage } from "@/components/llm/message";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import KrakenClient from "kraken-api";
import { sleep } from "@/lib/utils";
import CryptoPriceCard from "@/components/llm/price";
import PriceSkeleton from "@/components/llm/price-skeleton";
import Stats from "@/components/llm/stats";

const kraken = new KrakenClient(env.KRAKEN_API_KEY, env.KRAKEN_API_SECRET);

// import { PriceSkeleton } from "@components/llm-crypto/price-skeleton";
//
// This is the system message we send to the LLM to instantiate it
// this gives the LLM the context for the tool calling

const content = `\
You are a crypto bot and you can help users get the prices of cryptocurrencies, and besides that you can also chat with users.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of BTC = 69000]" means that the interface of the cryptocurrency price of BTC is shown to the user
- "[Stats of BTC]" means that the interface of the cryptocurrency stats of BTC is shown to the user.

If the user wants the price, call \`get_crypto_price\` to show the price.
If the user wants the market cap or other stats of a given cryptocurrency, call \`get_crypto_stats\` to show the stats.
If the user wants a stock price, it is an impossible task, so you should respond that you are a demo and cannot do that.
If the user wants to do anything else, it is an impossible task, so you should respond that you are a demo and cannot do that.


`;

export const sendMessage = async (
  message: string
): Promise<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
}> => {
  const history = getMutableAIState<typeof AI>();

  history.update([
    ...history.get(),
    {
      role: "user",
      content: message,
    },
  ]);

  const reply = await streamUI({
    model: openai("gpt-4o"),
    messages: [
      {
        role: "system",
        content,
        toolInvocations: [],
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <BotMessage className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
      }
      return <BotMessage>{content}</BotMessage>;
    },

    temperature: 0,

    tools: {
      get_crypto_price: {
        description:
          "Get the current price of a given cryptocurrency. Use this to show the price to the user.",
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              "The name or symbol of the cryptocurrency. e.g. BTC/ETH/SOL."
            ),
        }),
        generate: async function* ({ symbol }: { symbol: string }) {
          console.log({ symbol });
          yield (
            <BotCard>
              <PriceSkeleton />
            </BotCard>
          );

          const url = `https://api.kraken.com/0/public/Ticker?pair=${symbol}USDT`;
          const response = await fetch(url);
          const data = await response.json();

          // Extract the result for the specific symbol
          const pairKey = Object.keys(data.result)[0]; // Kraken nests data under a dynamic key
          const pairData = data.result[pairKey];

          // Parse the last price and opening price
          const lastPrice = Number(pairData.c[0]); // 'c' is the last trade closed price
          const openingPrice = Number(pairData.o); // 'o' is the opening price
          const delta = Number((lastPrice - openingPrice).toFixed(2));

          await sleep(1000);

          // Update the history with the result
          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "get_crypto_price",
              content: `[Price of ${symbol} = ${lastPrice}]`,
            },
          ]);

          return (
            <BotCard>
              <CryptoPriceCard
                symbol={symbol}
                price={lastPrice}
                delta={delta}
                closeDate={new Date()}
              />
            </BotCard>
          );

          return null;
        },
      },
      get_crypto_stats: {
        description:
          "Get the current stats of a given cryptocurrency. Use this to show the stats to the user.",
        parameters: z.object({
          slug: z
            .string()
            .describe(
              "The name of the cryptocurrency in lowercase. e.g. bitcoin/ethereum/solana."
            ),
        }),
        generate: async function* ({ slug }: { slug: string }) {
          yield <BotCard>Loading...</BotCard>;

          const url = new URL(
            "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail"
          );

          // set the query params which are required
          url.searchParams.append("slug", slug);
          url.searchParams.append("limit", "1");
          url.searchParams.append("sortBy", "market_cap");

          const response = await fetch(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CMC_PRO_API_KEY": env.CMC_API_KEY,
            },
          });

          if (!response.ok) {
            history.done([
              ...history.get(),
              {
                role: "assistant",
                name: "get_crypto_stats",
                content: `Crypto not found`,
              },
            ]);
            return <BotMessage>Crypto not found!</BotMessage>;
          }

          const res = (await response.json()) as {
            data: {
              id: number;
              name: string;
              symbol: string;
              volume: number;
              volumeChangePercentage24h: number;
              statistics: {
                rank: number;
                totalSupply: number;
                marketCap: number;
                marketCapDominance: number;
              };
            };
          };
          const data = res.data;
          const stats = res.data.statistics;

          const marketStats = {
            name: data.name,
            volume: data.volume,
            volumeChangePercentage24h: data.volumeChangePercentage24h,
            rank: stats.rank,
            marketCap: stats.marketCap,
            totalSupply: stats.totalSupply,
            dominance: stats.marketCapDominance,
          };

          await sleep(1000);

          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "get_crypto_stats",
              content: `[Stats of ${data.symbol}]`,
            },
          ]);

          return (
            <BotCard>
              <Stats {...marketStats} />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: Date.now(),
    role: "assistant",
    display: reply.value,
  };
};

export type AIState = Array<{
  id?: number;
  name?: "get_crypto_price" | "get_crypto_stats";
  role: "user" | "assistant" | "system";
  content: string;
}>;

export type UIState = Array<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  toolInvocations?: ToolInvocation[];
}>;

export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});
