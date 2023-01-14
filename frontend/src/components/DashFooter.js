import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const DashFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    /* const date = new Date()
    const today = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'full', timeStyle: 'long' }).format(date) */

    

    let goHomeButton = null
    if (pathname !== '/dash') {
        const onGoHomeClicked = () => navigate('/dash')
        goHomeButton = (
            <button
                className="dash-footer__button icon-button primary__button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    if (pathname === '/dash') {
        const onGoHomeClicked = () => navigate('/')
        goHomeButton = (
            <button
                className="dash-footer__button icon-button primary__button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            <div className='footer_wrapper'>
                {goHomeButton}
            </div>
            <div className='footer_wrapper'>
                <p className="footer__username">Kullanıcı: {username}</p>
            </div>
            {/* <p>{today}</p> */}
        </footer>
    )
    return content
}
export default DashFooter