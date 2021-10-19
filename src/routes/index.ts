import {Router} from 'express';
import productsRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import messagesRouter from './messages';
import { validateLogIn } from '../middleware/loginUser';
import args from 'args';
import { fork } from 'child_process';
import { Request, Response } from 'express'
import path from 'path';

const router = Router();

router.use('/products', validateLogIn, productsRouter);
router.use('/cart', validateLogIn, carritoRouter);
router.use('/messages', messagesRouter)
router.use('/', loginRouter)

router.use('/info', (req: Request, res: Response) => {
    const flags = args.parse(process.argv);
    const info = {
      args: flags,
      os: process.platform,
      nodeVersion: process.version,
      memory: process.memoryUsage(),
      processId: process.pid,
      folder: process.cwd(),
    };
  
    res.json({ data: info });
  });

router.use('/randoms', (req: Request, res: Response) => {
    const { cant } = req.query;
    const numberQty = cant || String(100000000);
    const scriptPath = path.resolve(
      __dirname,
      '../utils/calculo.ts',
    );
  
    const numData = fork(scriptPath, [numberQty as string]);
    numData.send('start');
    numData.on('message', result => {
      res.json({ data: result });
    });
  });
  

export default router;