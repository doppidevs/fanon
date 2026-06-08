import app from "@/libs/hono-app";
import { config } from "@/helpers";


const PORT = config.PORT || 5500;

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});
