const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({        
    username: {
        type: String, 
        unique: true,
        require: true,
    },

    password: {
        type: String,
    },

    walletAdress: {
        type: String,
        unique: true,
        require: true,
    },  

    depositHashTransactions: [String],

    totalAmountInvested: {
        type: Number,
        default: 0,
    },   
    
    userKind: {
        type: String,
        default: "User",
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);