const Note = require('../models/Note')
const User = require('../models/User')

const rapor = async (req, res) => {
    // Get all notes from MongoDB
    const notes = await Note.find().lean()

    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }


    res.json(notes)
}


module.exports = {
    rapor    
}