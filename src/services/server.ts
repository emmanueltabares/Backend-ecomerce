import Koa from 'koa';
import mainRouter from '../routes';
import koaBody from 'koa-body';
const app = new Koa();

app.use(koaBody());

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err) {
    const miError: any = err;
    console.log(`HUBO UN ERROR ${miError.message}`);
    ctx.status = 500;
    ctx.body = { error: miError.message };
    ctx.app.emit('error', err, ctx);
  }
});

app.use(mainRouter);

export default app;