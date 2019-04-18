var mongoose = require('mongoose');

var bookModel = mongoose.model("Book", {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    count: { type: Number, required: true },
    author: { type: String, require: true },
    created: { type: Date, require:true},
    lastUpdated: { type: Date, default: Date.now },
});

module.exports = bookModel;