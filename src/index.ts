import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import route from './routes';

export const app: express.Application = express();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

io.on('connection', client => {
  console.log('socket connected.')
  app.set('client', client);
});

io.listen(5001);

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (_, res) => {
  return res.json({
    status: true,
    data: {
      msg: 'API is up and running.'
    }
  });
});

app.use('/api/v1', route());
if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => {
    console.log('Success running 5000');
  })
}
