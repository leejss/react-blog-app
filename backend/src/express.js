import express from 'express';
import morgan from 'morgan';
import api from './api';
import validateJwt from './lib/validateJwt';
import cookieParser from 'cookie-parser';


const app = express();

// set logger
app.use(morgan('dev'));

// set body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// ste cookie-parser
app.use(cookieParser());

// validate jwt => login 상태 유지
app.use(validateJwt);

// mount router
app.use('/api', api);

export default app;
