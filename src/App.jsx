import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { history } from 'helpers'
import { Header, Footer, BackToTop, PrivateRoute } from 'components'
import { Home } from 'pages/Home'
import { AccountLayout } from 'pages/account'
import { Record } from 'pages/Record'
import { Column } from 'pages/Column'
import { UserLayout } from 'pages/user'

export { App }

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate()
    history.location = useLocation()

    return (
        <div className="app-container bg-light">
            <Header />
            <BackToTop />
            <div className="main">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UserLayout />} />
                        <Route path="records" element={<Record />} />
                        <Route path="columns" element={<Column />} />
                    </Route>
                    {/* public */}
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}
