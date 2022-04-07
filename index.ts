import express from 'express';
import morgan from 'morgan';
import contact from './routes/contact.routes';
import list from './routes/contactList.routes';
import models from './routes/models.routes';
import messageState from './routes/message.state.routes';
import message from './routes/message.routes';
import stats from './routes/stats.routes';
import auth from './routes/auth.routes';


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
app.use("/contact", contact);
app.use("/list", list);
app.use("/templates", models);
app.use("/status", messageState);
app.use("/message", message);
app.use("/stats", stats);
app.use("/auth", auth);

/**
 * POrt definition
 */
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});