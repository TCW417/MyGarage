'use strict';

import mongoose from 'mongoose';

const garageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'profiles',    
  },
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicles',
  }],
  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'attachments',
  }],
}, { timestamps: true });


const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('Garage', garageSchema, 'garages', skipInit);
