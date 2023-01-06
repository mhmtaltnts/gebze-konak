import NewNoteForm from './NewNoteForm'

import useTitle from '../../hooks/useTitle'

const NewNote = () => {
    useTitle('Yeni Park Girişi')   


    const content = <NewNoteForm />

    return content
}
export default NewNote