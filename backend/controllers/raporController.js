const Note = require('../models/Note')
const User = require('../models/User')

const NOTES_PER_PAGE = 10

const rapor = async (req, res) => {

    const page = req.query.page || 1

    const query = {}

    try {
        const skip = (page-1) * NOTES_PER_PAGE
        const count = await Note.estimatedDocumentCount(query)
        const notes = await Note.find(query)
            .skip(skip)
            .limit(NOTES_PER_PAGE)
            
        const pageCount = count / NOTES_PER_PAGE
        return res.json({
            pagination: {
                count,
                pageCount
            },
            notes
        })

        
    } catch (error) {
        res.json({error})
        
    }
    // Get all notes from MongoDB
    

    // If no notes 
    


    
}


module.exports = {
    rapor    
}