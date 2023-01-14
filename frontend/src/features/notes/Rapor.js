import {useState} from "react"
import { useGetRaporQuery } from "./notesApiSlice"
import RaporNote from "./RaporNote"
/* import useAuth from "../../hooks/useAuth" */
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import SearchBar from "../../components/SearchBar/SearchBar"

const Rapor = () => {
    useTitle('Kayıt Listesi')
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    /* const { username, isManager, isAdmin } = useAuth() */
    const [search, setSearch] = useState("")

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRaporQuery("raporList", page)

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
            filteredIds = ids.filter(noteId => { return entities[noteId].dorse.toLowerCase().includes(search)})
        }

        const handlePrevious = () => {
            setPage((pre) => { 
            if(pre === 1) return pre
            return pre - 1} )
        
        }
        const handleNext = () => {
            setPage(
                (pre) => {
                    if(pre === pageCount)return pre
                    return pre + 1
                }
            )
        }
           console.log(page)  

    
        const tableContent = ids?.length && filteredIds.map(noteId => <RaporNote key={noteId} noteId={noteId} />)

        content = (<>
            <h2 className="aracsayisi">Toplam araç sayısı: {count}</h2>
            <div>
                <SearchBar setSearch={setSearch}/>
                <div>
                    <button disabled={page === 1} onClick={handlePrevious}>Önceki</button>
                    <button disabled={page === pageCount} onClick={handleNext}>Sonraki</button>
                </div>
            </div>
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
        </>
        )
    }

    return content
}
export default Rapor