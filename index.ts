import app from './app';
import http from 'http';
import { PORT } from './utils/config';
import { info } from './utils/logger';

const server = http.createServer(app);

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});