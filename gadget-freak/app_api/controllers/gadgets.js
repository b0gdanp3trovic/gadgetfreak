var mongoose = require('mongoose');
require('../models/gadgets');
var Gadget = mongoose.model('Gadgets');


var vrniJsonOdgovor = function(odgovor, status, vsebina){
    odgovor.status(status);
    odgovor.json(vsebina);
}

module.exports.gadgetList = function(zahteva, odgovor){
    vrniJsonOdgovor(odgovor, 200, {"status" : "uspešno"});
}

module.exports.getGadgetById = function(zahteva, odgovor){
    if(zahteva.params && zahteva.params.gadgetId){
        Gadget
         .findById(zahteva.params.gadgetId)
         .exec(function(napaka, gadget){
             if(!gadget){
                 vrniJsonOdgovor(odgovor, 404, {
                     "Message" : "Gadget with id 'gadgetId' not found."
                 });
                 return;
             } else if(napaka){
                 vrniJsonOdgovor(odgovor, 500, napaka);
                 return;
             }
             vrniJsonOdgovor(odgovor, 200, gadget);
         })
    } else{
        vrniJsonOdgovor(odgovor, 400, {
            "Message" : "No gadgetId given."
        })
    }
}


module.exports.createGadget = function(zahteva, odgovor){
    vrniJsonOdgovor(odgovor, 200, {"status" : "uspešno"});
}




module.exports.updateGadget = function(zahteva, odgovor){
    vrniJsonOdgovor(odgovor, 200, {"status" : "uspešno"});
}

module.exports.deleteGadget = function(zahteva, odgovor){
    var idGadget = zahteva.params.gadgetId;
    if(idGadget){
        Gadget
        .findByIdAndRemove(idGadget)
        .exec(
            function(napaka, gadget){
                if(napaka){
                    vrniJsonOdgovor(odgovor, 404, napaka);
                    return;
                }
                vrniJsonOdgovor(odgovor, 204, null);
            })
    }else{
        vrniJsonOdgovor(odgovor, 400, {
        "Message" :
        "Gadget with the provided gadgetId is not found."
    });
    }  
}

module.exports.deleteAll = function(zahteva, odgovor){
    var idGadget = zahteva.params.gadgetId;
    
    Gadget
    .deleteMany({})
    .exec(function(napaka, gadget){
        if(napaka){
            vrniJsonOdgovor(odgovor, 404, napaka);
            return;
        }
    })
    vrniJsonOdgovor(odgovor, 204, null);
        
    
}

module.exports.addStartingData = function(zahteva, odgovor){
    Gadget.create({
    tip : 'Laptop',
    manufacturer : 'Dell',
    naziv : 'Alienware 17 r5',
    relDate : new Date(2018, 5 ,5),
    cena: 1200
}, {
    tip: 'Phone',
    manufacturer: 'Samsung',
    naziv : 'Galaxy S7 Edge',
    relDate: new Date(2016, 3, 11),
    cena: 300
}, {
    tip: 'Other',
    manufacturer: 'Casio',
    naziv : 'B640WB-1BVT',
    relDate: new Date(2017, 3, 5),
    cena: 65
});
vrniJsonOdgovor(odgovor, 204, null);
}

