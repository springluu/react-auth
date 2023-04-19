import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWrapper } from 'helpers'

// create slice

const name = 'records'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const slice = createSlice({ name, initialState, extraReducers })

// exports

export const recordActions = { ...slice.actions, ...extraActions }
export const recordsReducer = slice.reducer

// implementation

function createInitialState() {
    return {
        list: [],
        item: null,
        more: true
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/records`

    return {
        getAll: getAll(),
        getById: getById()
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async (page) => await fetchWrapper.get(baseUrl+`/page/${page}`)
        )
    }

    function getById() {
        return createAsyncThunk(
            `${name}/getById`,
            async (id) => await fetchWrapper.get(`${baseUrl}/${id}`)
        )
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll()
        getById()

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true, ...state.list }
                })
                .addCase(fulfilled, (state, action) => {
                    state.more = {value: (action.payload.data.length > 0)}
                    const xxx = state?.list?.value || []
                    action.payload.page === 1 ?
                    state.list = { value: action.payload.data }
                    : state.list = { value: [...xxx, ...action.payload.data] }
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error }
                })
        }

        function getById() {
            var { pending, fulfilled, rejected } = extraActions.getById
            builder
                .addCase(pending, (state) => {
                    state.item = { loading: true }
                })
                .addCase(fulfilled, (state, action) => {
                    state.item = { value: action.payload }
                })
                .addCase(rejected, (state, action) => {
                    state.item = { error: action.error }
                })
        }
    }
}
