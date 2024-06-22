import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

function main() {
  try {
    // mongoose.connect(
    //   'mongodb+srv://Hafejia-Travel-Tours:3zzwkF4c39lL3Mpp@cluster0.mlxcjcs.mongodb.net/Hafejia-Travel-Tours?retryWrites=true&w=majority&appName=Cluster0',
    // );
    mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
