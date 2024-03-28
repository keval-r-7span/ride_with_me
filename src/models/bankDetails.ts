import mongoose from 'mongoose';

interface User {
  _id: mongoose.Schema.Types.ObjectId;
  role: 'driver' | 'rider'; 
}

interface BankAccount extends mongoose.Document {
  user: User;
  bankName: string;
  lastFourDigits: string;
  token: string;
}

const bankAccountSchema = new mongoose.Schema<BankAccount>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  lastFourDigits: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model<BankAccount>('BankAccount', bankAccountSchema);