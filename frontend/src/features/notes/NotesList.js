import {useState} from "react";
import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import SearchBar from "../../components/SearchBar/SearchBar"


const NotesList = () => {
    useTitle('Kayıtları Listele');  
        
    const { isManager, isAdmin } = useAuth()
    

    const [search, setSearch] = useState("")
    
    const calClass = !isAdmin || !isManager ? "calisan" : "";

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
        let filteredIds
        const { ids, entities } = notes
        let count = ids.length
        if(!search){
            filteredIds = [...ids]
        } else{
            filteredIds = ids.filter(noteId => { return entities[noteId].dorse.toLowerCase().includes(search.toLowerCase())})
        }
               

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)
    
        content = (<>
            <h2 className="aracsayisi">Parkta mevcut araç sayısı: {count}</h2>
            <SearchBar setSearch={setSearch}/>

            <table className={`table table--notes ${calClass}`}>
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th mobile_sm" >Getiren Çekici</th>
                        <th scope="col" className="table__th">Dorse Plakası</th>
                        <th scope="col" className="table__th mobile">Firma</th>
                        <th scope="col" className="table__th mobile">Malın Cinsi</th>
                        <th scope="col" className="table__th mobile">Gümrük Bilgi</th>
                        <th scope="col" className="table__th">Gümrük İşlem</th>  
                        <th scope="col" className="table__th">Çıkış Yap</th>
                        {(isAdmin || isManager) && <th scope="col" className="table__th">Düzenle</th>}
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </>
        )
    
        }
    return content
}
export default NotesList