"use server";

import type { CoreMessage, ToolInvocation } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import type { ReactNode } from "react";
import { openai } from "@ai-sdk/openai";

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
    model: openai("gpt-4o-2024-05-13"),
    messages: [
      {
        role: "system",
        content,
        toolInvocations: [],
      },
      ...history.get(),
    ] as CoreMessage[],
  });

  return {
    id: Date.now(),
    role: "assistant",
    display: <p>Hello!</p>,
  };
};

export type AIState = Array<{
  id?: number;
  name?: "get_crypto_price" | "get_cryto_stats";
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
