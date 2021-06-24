import express  from 'express';
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(
  cors({
    origin: '*', // process.env.NODE_ENV === 'development' ? '*' : process.env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use('/apidoc', express.static(process.cwd() + '/doc'))

export default app;
