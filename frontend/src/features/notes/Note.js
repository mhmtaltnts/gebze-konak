import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    const navigate = useNavigate()

    if (note) {
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)
        const handleCikis = () => navigate(`/dash/cikis/${noteId}`)
        const handleGumruk = () => navigate(`/dash/gumruk/${noteId}`)

        return (
            <tr className="table__row">
                <td className="table__cell">{note.getiren}</td>
                <td className="table__cell">{note.dorse}</td>
                <td className="table__cell mobile">{note.firma}</td>
                <td className="table__cell mobile">{note.mal}</td>
                <td className="table__cell mobile">{note.gumruk}</td>
                
                <td className="table__cell">
                    <button
                        className="table__button"
                        onClick={handleGumruk}
                    >
                       <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
                
                <td className="table__cell">
                    <button
                        className="table__button"
                        onClick={handleCikis}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>

                <td className="table__cell">
                    <button
                        className="table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote