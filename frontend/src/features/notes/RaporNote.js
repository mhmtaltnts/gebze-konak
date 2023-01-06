
import { useGetRaporQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {

    const { note } = useGetRaporQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })


    if (note) {
        const created = new Date(note.createdAt).toLocaleString('tr-TR', { dateStyle: "medium", timeStyle: "short" })

        const cikisTarihi = new Date(note.cikisTarihi).toLocaleString('tr-TR', { dateStyle: "medium", timeStyle: "short" })

        const kaldigiGun = Math.ceil( (new Date(note.cikisTarihi).getTime() - new Date(note.createdAt).getTime())/(1000 * 3600 * 24))

        return (
            <tr className="table__row">
                <td className="table__cell">{note.dorse}</td>
                <td className="table__cell">{note.getiren}</td>
                <td className="table__cell">{note.goturen}</td>
                <td className="table__cell">{note.firma}</td>
                <td className="table__cell">{note.mal}</td>
                <td className="table__cell">{note.gumruk}</td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{cikisTarihi}</td>
                <td className="table__cell">{kaldigiGun}</td>
            </tr>
        )

    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote