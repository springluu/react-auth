import { Routes, Route } from 'react-router-dom'
import { List, AddEdit } from '../record'

export { UserLayout }

function UserLayout() {
    return (
        <div className="users">
                <Routes>
                    <Route index element={<List />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                </Routes>
        </div>
    )
}
