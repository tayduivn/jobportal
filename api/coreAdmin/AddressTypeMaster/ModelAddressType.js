const mongoose = require('mongoose');

const addressTypeSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    addressType               : { type: String, index: true, unique: true  },
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
    fileName                  : String,
    updateLog                 : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('addresstypemaster',addressTypeSchema);