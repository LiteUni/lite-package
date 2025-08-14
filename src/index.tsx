import { Hono } from 'hono';
import { renderer } from './renderer';

const app = new Hono();

app.use(renderer);

app.get('/', (c) => {
  // return c.render(<h1></h1>)
  return c.redirect(`https://github.com/LiteUni/lite-package`);
});

app.get('/archlinux/chaotic-aur/*', async (c) => {
  const url = new URL(c.req.url);
  const path = url.pathname.replace('/archlinux/chaotic-aur/', '');

  const response = await fetch(`https://geo-mirror.chaotic.cx/${path}`);
  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
});

app.get('/archlinux/apeiria/*', async (c) => {
  const url = new URL(c.req.url);
  const path = url.pathname.replace('/archlinux/apeiria/', '');

  const response = await fetch(`https://repo.apeiria.net/${path}`);
  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
});

export default app;
