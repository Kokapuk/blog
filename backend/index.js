import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import { handleValidationErrors, postCreationValidation, signInValidation, signUpValidation } from './utils/validator.js';
import checkAuth from './utils/checkAuth.js';
import checkOwner from './utils/checkOwner.js';

dotenv.config();

try {
  await mongoose.connect(process.env.DB_URI);
  console.log('DB Connected');
} catch (err) {
  console.error(err);
  process.exit(err.code);
}

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/signup', signUpValidation, handleValidationErrors, UserController.signUp);
app.post('/auth/signin', signInValidation, handleValidationErrors, UserController.signIn);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreationValidation, handleValidationErrors, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/myPosts', checkAuth, PostController.getMine);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, checkOwner, PostController.remove);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at port ${process.env.PORT}...`);
});
