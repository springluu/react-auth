import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { history } from 'helper'
import { Header, Footer, Alert, PrivateRoute } from 'component'
import { Home } from 'page/home'
import { AccountLayout } from 'page/account'
import { RecordLayout } from 'page/record'
import { UserLayout } from 'page/user'

export { App }

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate()
    history.location = useLocation()

    return (
        <div className="app-container bg-light">
            <Header />
            <Alert />
            <div className="main">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UserLayout />} />
                        <Route path="records/*" element={<RecordLayout />} />
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
