import { useGetNotesQuery } from "./notesApiSlice"
import RaporNote from "./RaporNote"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const NotesList = () => {
    useTitle('Kayıt Listesi')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <RaporNote key={noteId} noteId={noteId} />)

        content = (
            <table className="table table_rapor">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th">Dorse Plakası</th>
                        <th scope="col" className="table__th">Getiren Çekici</th>
                        <th scope="col" className="table__th">Götüren Çekici</th>
                        <th scope="col" className="table__th">Firma</th>
                        <th scope="col" className="table__th ">Malın Cinsi</th>
                        <th scope="col" className="table__th">Gümrük Kayıt</th>
                        <th scope="col" className="table__th note__created">Giriş Tarihi</th>
                        <th scope="col" className="table__th note__updated">Çıkış Tarihi</th>
                        <th scope="col" className="table__th">Kaldığı Gün</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default NotesList