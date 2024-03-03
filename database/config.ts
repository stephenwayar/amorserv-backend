import mongoose from 'mongoose';
import { info, error } from '../utils/logger';
import { MONGODB_URI } from '../utils/config';

const url: string | undefined = MONGODB_URI;

if (!url) {
  error("MONGODB_URI is not defined");
  process.exit(1); // Exit the process if MONGODB_URI is not defined
}

info("Connecting to database...");

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    info("Successfully connected to database ✅");
  }).catch(err => {
    error("Failed to connect to database ❌: ", err.message);
  });
