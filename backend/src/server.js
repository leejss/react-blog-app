import app from './express';
import mongoose from 'mongoose';
import config from './config';

const server = () => {
  mongoose
    .connect(config.mongoUriCloud, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to Mongodb Atlas`);
      // fakeData();
    });
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
};

export default server;
