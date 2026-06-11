import { Bot } from "grammy";

import { config } from "@/helpers";
const { BOT_TOKEN } = config;

export const bot = new Bot(BOT_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Welcome to the Fanon Bot! Use /help to see available commands.",
  );
});

export const startBot = () => {
  bot.start({
    onStart: (info) => {
      console.log(`Bot started as @${info.username}`);
    },
  });
};
