import express from 'express';
import morgan from 'morgan';


const PORT = process.env.PORT || 3000;
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan('dev'));

/**
 * Route initialization
 */

/**
 * POrt definition
 */
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
