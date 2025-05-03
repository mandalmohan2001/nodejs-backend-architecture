import express from 'express';
import { config } from './config/config';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb'}));

app.use(cors({ origin: '*' }));

app.listen(config.port, () => {
  console.info(`Server is running on port ${config.port}`);
});

export default app;