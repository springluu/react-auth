import { NavLink } from 'react-router-dom'
export { Footer }

function Footer() {
    return (
        <nav className="footer navbar-expand px-3 py-4">
            <div className="navbar-nav container">
                <NavLink to="/no" className="nav-item nav-link">会員登録</NavLink>
                <NavLink to="/no" className="nav-item nav-link">運営会社</NavLink>
                <NavLink to="/no" className="nav-item nav-link">利用規約</NavLink>
                <NavLink to="/no" className="nav-item nav-link">個人情報の取扱について</NavLink>
                <NavLink to="/no" className="nav-item nav-link">特定商取引法に基づく表記</NavLink>
                <NavLink to="/no" className="nav-item nav-link">お問い合わせ</NavLink>
            </div>
        </nav>
    )
}