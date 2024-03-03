import mongoose, { Document, Model } from 'mongoose';

interface UserType extends Document {
  fullName?: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<UserType>({
  fullName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 4,
    required: true
  },
}, { timestamps: true });

UserSchema.set('toJSON', {
  transform: function (
    doc: Document<any, any, any>,
    ret: Record<string, any>,
    _options: mongoose.ToObjectOptions
  ) {
    const { __v, password, ...object } = ret;
    delete object.__v;
    delete object.password;
    return object;
  }
});

const User: Model<UserType> = mongoose.model<UserType>('User', UserSchema);

export default User