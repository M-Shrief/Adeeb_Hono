import mongoose from 'mongoose';
// config
import { DB_URL } from './config/index';
// Utils
import { logger } from './utils/logger';

mongoose.set('strictQuery', true);

// Create the database connection
const options = {
  // autoIndex: true,
  minPoolSize: 5, // Maintain up to x socket connections
  maxPoolSize: 10, // Maintain up to x socket connections
  connectTimeoutMS: 10 * 1000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45 * 1000, // Close sockets after 45 seconds of inactivity
};
export const connectDB = async () => await mongoose.connect(DB_URL, options);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info('Mongoose default connection open to: ' + DB_URL);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error(`can't connect to: ${DB_URL}`);
  logger.error('error: ' + err);
  // exit(1) to have PM2 start it again
  process.exit(1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await mongoose.connection.close(true);
  logger.info(
    'Mongoose default connection disconnected through app termination',
  );

  process.exit(0);
});

export const connection = mongoose.connection;
