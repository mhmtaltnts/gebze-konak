const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {   
        
        getiren: {
            type: String,
            required: true
        },
        dorse: {
            type: String,
            required: true
        },
        firma: {
            type: String,
        },
        mal: {
            type:String
        },
        gumruk: {
            type: String,
            
        },
        gumrukGirisiYapan: {
            type: String,
            
        },
        gumrukGirisTarihi: {
            type: Date,
        },
        cikisTarihi: {
            type: Date,
        },        
        goturen: {
            type: String,
        },
        girisYapan: {
            type: String,
        },
        cikisYapan: {
            type: String,
        },
        
        guncelleyen: {
            type: String,
            },
        },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Note', noteSchema)