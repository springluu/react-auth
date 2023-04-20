import { NavLink } from 'react-router-dom'

export { Menu }

function Menu() {
    return (
        <nav className="menu navbar-expand">
            <div className="navbar-nav">
                <NavLink to="/record" className="nav-item nav-link">自分の記録</NavLink>
                <NavLink to="/no" className="nav-item nav-link">体重グラフ</NavLink>
                <NavLink to="/no" className="nav-item nav-link">目標</NavLink>
                <NavLink to="/no" className="nav-item nav-link">選択中のコース</NavLink>
                <NavLink to="/columns" className="nav-item nav-link">コラム一覧</NavLink>
                <NavLink to="/no" className="nav-item nav-link">設定</NavLink>
            </div>
        </nav>
    )
}