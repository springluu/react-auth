import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Menu } from './Menu'
import { ReactComponent as Logo } from '../assets/svgs/logo.svg'
import { ReactComponent as Memo } from '../assets/svgs/icon_memo.svg'
import { ReactComponent as Challenge } from '../assets/svgs/icon_challenge.svg'
import { ReactComponent as Info } from '../assets/svgs/icon_info.svg'
import { ReactComponent as IconMenu } from '../assets/svgs/icon_menu.svg'
import { ReactComponent as Close } from '../assets/svgs/icon_close.svg'

export { Header }

function Header() {
    const [menu, setMenu] = useState();
    const auth = useSelector(x => x.auth.value)
    const openMenu = () => {
        setMenu(!menu)
    }

    // only show nav when logged in
    if (!auth) return null
    
    return (
        <nav className="header navbar-expand px-3">
            <div className="navbar-nav container">
                <NavLink to="/" className="nav-item nav-link logo"><Logo/></NavLink>
                <NavLink to="/records" className="nav-item nav-link ml-auto"><Memo/>自分の記録</NavLink>
                <NavLink to="/no" className="nav-item nav-link"><Challenge/>チャレンジ</NavLink>
                <NavLink to="/no" className="nav-item nav-link"><Info/>お知らせ<span className='count'>{auth.noti || 0}</span></NavLink>
                <button onClick={openMenu} className="btn btn-menu nav-item nav-link">
                    {menu ? <Close/> : <IconMenu/>}
                </button>
                {menu ? <Menu/> : ''}
            </div>
        </nav>
    )
}