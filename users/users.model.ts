import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  gender: {
    type: String,
    required: false,
    enum: ['M', 'F']
  }
});

export const User = mongoose.model<User>('User', userSchema);
