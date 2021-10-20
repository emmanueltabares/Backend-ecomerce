import { Request, Response } from 'express';

declare module 'express-session' {
    interface SessionData {
      loggedIn: boolean;
    }
  }

const user = "Manu";
const pass = 1234;

export const loginUser = (req: Request, res: Response): void => {

    const { username, password } = req.body;
  
    if (username == user && password == pass) {

      let session = req.session.loggedIn
      session = true;
        return res.render('index.pug', { username })
    
    } else {
      res.status(401).json({
        error: `Error`,
        message: 'No Autorizado',
      });
    }
  };
  
  export const logoutUser = (req: Request, res: Response): void => {
    req.session.destroy(err => {
      if (err) res.status(500).json({ msg: 'Ocurrió un error' });
      else {
        res.json({msg: "Hasta pronto!"})
      }
    });
  };

  export const singUpUser = (req: Request, res: Response): void => {
    res.json({ data: { message: 'Registro exitoso' } });
  };