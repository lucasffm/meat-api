import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { env } from '../common/environment';
import { validateCPF } from '../common/validators';

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
  },
  cpf: {
    type: String,
    required: false,
    validate: {
      validator: validateCPF,
      message: '{PATH}: Invalid CPF ({VALUE})'
    }
  }
});

userSchema.pre('save', function(next) {
  const user: User = this;
  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt
      .hash(user.password, env.security.saltRounds)
      .then(result => {
        user.password = result;
        next();
      })
      .catch(next);
  }
});

export const User = mongoose.model<User>('User', userSchema);
