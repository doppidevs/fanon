import {Hono} from "hono";

const app = new Hono();

app.get('/', (ctx) => {
  return ctx.json({
    message: "hello from fanon!"
  });
});

export default app;
