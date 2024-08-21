const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    qualification: {
        type: String,
    },
    contact_no: {
        type: String,
    },
    classes: {
        type: String,
    },
    fees: {
        type: String,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

 let Register= mongoose.model( 'register',fileSchema);
 module.exports = Register