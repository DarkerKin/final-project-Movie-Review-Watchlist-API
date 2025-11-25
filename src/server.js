import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import userRoutes from './routes/userRoutes.js'
import watchlistRoutes from './routes/watchlistRoutes.js'

const swaggerDocument = YAML.load('./openapi.yaml');
import reviewRoutes from './routes/reviewRoutes.js'
import watchlistRoutes from './routes/watchlistRoutes.js'


const swaggerDocument = YAML.load('./docs/openapi.yaml');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('tiny'));

app.use(express.json());

// To check the Health of the api
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// This all the movies api are
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/genres', genreRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);
app.use('/watchlist', watchlistRoutes);

app.use('/users',userRoutes);

app.use('/reviews', reviewRoutes);

// need to make sure the user are only ones that can change the watchlist
app.use('/watchlists', watchlistRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
