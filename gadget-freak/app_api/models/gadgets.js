var mongoose = require('mongoose');


var gadgetsScheme = new mongoose.Schema({
    tip: {type: String, required : true},
    manufacturer: {type: String},
    naziv: {type: String, required : true},
    relDate: {type: Date},
    cena : {type: Number}
})

mongoose.model('Gadgets', gadgetsScheme, 'Gadgets');
