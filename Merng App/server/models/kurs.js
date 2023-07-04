const mongoose = require('mongoose');

const KursSchema = new mongoose.Schema({
    isim:{
        type:String
    },
    aciklama:{
        type:String
    },
    durum:{
        type:String,
        enum:['Yayında','Oluşturuluyor', 'Planlanıyor']
    },
    egitmenId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Egitmen'
    }
});

module.exports = mongoose.model('Kurs', KursSchema);