import express from 'express';
import morgan from 'morgan';
import type { Request, Response } from 'express';

const app = express();

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

// handle route not found
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
  });
});

export default app;
