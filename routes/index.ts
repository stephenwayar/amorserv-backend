import express, { Request, Response } from 'express';
const Router = express.Router();

Router.get('/', (_req: Request, res: Response) => {
  res.send(`
    <div style="padding: 5px; font-family: Sans-serif; color: #282A35">
      <h2>Amorserv API</h2>
    </div>
  `);
});

export default Router;