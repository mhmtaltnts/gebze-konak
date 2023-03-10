import { useRef, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'

const Login = () => {
    useTitle('Kullanıcı Girişi')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)
    const onGoHomeClicked = () => navigate('/')

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <section className="wrapper">
            <header className='dash-header'>
                <div className='dash-header__container'>
                <div className='logo__text' onClick={onGoHomeClicked}>
                        <h1 className="dash-header__title">Gebze Konak</h1>
                        <p style={{fontSize:"1rem", textAlign: "center", fontWeight:"bold"  }}>Tır Parkı</p>
                    </div>
                </div>
            </header>
            <main className="dash-container">
                <div className='form_wrapper'>               

                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <h1>Sisteme Giriş</h1>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Kullanıcı Adı:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Şifre:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Giriş Yap</button>


                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Bu cihaza güven
                    </label>
                </form>
                </div>
            </main>
            <footer className='dash-footer'>
                
                    <div className='footer_wrapper'>
                        <address className="public__addr">
                            Kirazlıpınar Mah. Yeni Bağdat Cd. No:791 PK:41400 Gebze/ Kocaeli                
                        </address>
                    </div>
                    <div className='footer_wrapper'>
                        <a href="tel:+902627541406">tel: +90 262 754 14 06</a>
                    </div>
                
            </footer>
        </section>
    )

    return content
}
export default Login