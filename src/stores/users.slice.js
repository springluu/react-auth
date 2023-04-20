import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWrapper } from 'helpers'

// create slice

const name = 'users'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const slice = createSlice({ name, initialState, extraReducers })

// exports

export const userActions = { ...slice.actions, ...extraActions }
export const usersReducer = slice.reducer

// implementation

function createInitialState() {
    return {
        list: null,
        item: null
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`

    return {
        register: register(),
        getAll: getAll(),
        getById: getById()
    }

    function register() {
        return createAsyncThunk(
            `${name}/register`,
            async (user) => await fetchWrapper.post(`${baseUrl}/register`, user)
        )
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(baseUrl)
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
                    state.list = { loading: true }
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload }
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
