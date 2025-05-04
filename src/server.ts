import express from 'express';
import { config } from './config/config';
import cors from 'cors';
import logger from './utils/logger';
import './database/index'; // Import the database connection

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb'}));

app.use(cors({ origin: '*' }));

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});

export default app;
