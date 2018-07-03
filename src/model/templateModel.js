//
// template model
//
// REPLACE "MODEL" with the model name
//
import mongoose from 'mongoose';
import HttpErrors from 'http-errors';

const MODELSchema = mongoose.Schema({
  key1: {
    type:
    unique:
    etc:
  },
  key2: {

  }
}, { timestamps: true });

// schema methods
MODELSchema.method.someMethod = function someMethod() {

}

// static methods
MODELSchema.staticMethod = () => {

};

const skipInit = process.env.NODE_ENV === 'development';
// first arg to model is model name, typically "Model"
// third arg is collection name, typically "models"
const MODEL = mongoose.model('MODEL', accountSchema, 'MODELs', skipInit);