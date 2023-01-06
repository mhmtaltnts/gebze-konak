import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header className='header'>
                <h1>Gebze Konak Tır Parkı </h1>
                <Link to="/login">Sisteme Giriş</Link>
            </header>
            <main className="public__main">
                <h1>Hoşgeldiniz</h1>
            </main>
            <footer>
            <address className="public__addr">
                Kirazlıpınar Mah. Yeni Bağdat Cd. No:791 PK:41400 Gebze/ Kocaeli                
            </address>
            <a href="tel:+902627541406">+90 262 754 14 06</a>
            </footer>
        </section>

    )
    return content
}
export default Public