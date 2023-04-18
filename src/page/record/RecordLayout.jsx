import { Routes, Route } from 'react-router-dom'
import { List, AddEdit } from '../record'

export { RecordLayout }

function RecordLayout() {
    return (
        <div className="records">
            <Routes>
                <Route index element={<List />} />
                <Route path="add" element={<AddEdit />} />
                <Route path="edit/:id" element={<AddEdit />} />
            </Routes>
        </div>
    )
}
