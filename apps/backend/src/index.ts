import app from "@/libs/hono-app";
import { config } from "@/helpers";

const PORT = config.PORT || 5500;

const bootstrap = async () => {
  const server = Bun.serve({
    port: PORT,
    fetch: app.fetch,
  });
  console.log(`Server is running on http://localhost:${server.port}`);
};

bootstrap();
