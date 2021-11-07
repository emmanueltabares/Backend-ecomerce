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
import config from '../config';
import { EmailService } from '../services/email';
import { SmsService } from '../services/twilio';

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

  router.post('/send-email', async (req, res) => {
    const { body } = req;
  
    const destination = config.ETHEREAL_EMAIL;
    const subject = 'Hola Juan Carlos2!';
    const content = `
    <h1>HOLAAAA</h1>
    <p> Te queriamos dar la bienvenida a este mundo de nodemailer</p>
    `;
  
    try {
      const response = await EmailService.sendEmail(
        destination,
        subject,
        content
      );
  
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/send-message', async (req, res) => {
    const { body } = req;
  
    if (!body || !body.destination || !body.content)
      return res.status(400).json({
        msg: "mandame en el body el 'destination' y el 'content'",
        body,
      });
  
    try {
      const response = await SmsService.sendMessage(
        body.destination,
        body.content
      );
  
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
export default router;