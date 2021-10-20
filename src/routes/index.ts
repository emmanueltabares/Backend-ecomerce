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
import { getRandomNums } from '../utils/calculo';

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
      '../../src/utils/getRandomNums.js',
    );
  
    const flags = args.parse(process.argv);
  
    if (flags.mode !== 'cluster') {
      console.log('on fork mode');
      const numData = fork(scriptPath, [numberQty as string]);
      numData.send('start');
      numData.on('message', result => {
        res.json({
          data: {
            processId: process.pid,
            result,
          },
        });
      });
    } else {
      console.log('on cluster mode');
      const result = getRandomNums(Number(numberQty));
      res.json({
        data: {
          processId: process.pid,
          result,
        },
      });
    }
  });
  
  router.use('/muerte', (req, res) => {
    res.json({ msg: 'OK' });
    console.log(`PID => ${process.pid} will die`);
    process.exit(0);
  });
  
export default router;