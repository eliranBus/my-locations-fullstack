import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
}
)

const Location = mongoose.model('Location', locationSchema);

export default Location