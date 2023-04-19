export { fakeBackend }

// array in local storage for registered users
const usersKey = 'liam-users'
const recordsKey = 'liam-records'
let users = JSON.parse(localStorage.getItem(usersKey)) || [{id: 1, username: 'test', password: 'test', noti: 1}]
let records = JSON.parse(localStorage.getItem(recordsKey)) || 
    [
        {id: 1, image: './images/m01.png', title: 'test1', content: '05.21.Morning'},
        {id: 2, image: './images/m01.png', title: 'test2', content: '05.21.Lunch'},
        {id: 3, image: './images/m01.png', title: 'test3', content: '05.21.Dinner'},
        {id: 4, image: './images/m01.png', title: 'test4', content: '05.21.Snack'},
        {id: 5, image: './images/m01.png', title: 'test5', content: '05.21.Morning'},
        {id: 6, image: './images/m01.png', title: 'test6', content: '05.21.Lunch'},
        {id: 7, image: './images/m01.png', title: 'test7', content: '05.21.Dinner'},
        {id: 8, image: './images/m01.png', title: 'test8', content: '05.21.Snack'},
        {id: 9, image: './images/m01.png', title: 'test9', content: '05.21.Morning'},
        {id: 10, image: './images/m01.png', title: 'test10', content: '05.21.Lunch'},
        {id: 11, image: './images/m01.png', title: 'test11', content: '05.21.Dinner'},
        {id: 12, image: './images/m01.png', title: 'test12', content: '05.21.Snack'},
    ]

function fakeBackend() {
    let realFetch = window.fetch
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500)
            // const regex = /page=(\d+)&size=(\d+)/
        
            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate()
                    case url.endsWith('/users/register') && opts.method === 'POST':
                        return register()
                    case url.endsWith('/records') && opts.method === 'GET':
                        return getRecords()
                    case url.match(/\/records\/page\/\d+$/) && opts.method === 'GET':
                        return getRecords()
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers()
                    case url.match(/\/users\/\d+$/) && opts.method === 'GET':
                        return getUserById()
                    case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
                        return updateUser()
                    case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
                        return deleteUser()
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error))
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body()
                const user = users.find(x => x.username === username && x.password === password)

                if (!user) return error('Username or password is incorrect')

                return ok({
                    ...basicDetails(user),
                    token: 'fake-jwt-token'
                })
            }

            function register() {
                const user = body()

                if (users.find(x => x.username === user.username)) {
                    return error('Username "' + user.username + '" is already taken')
                }

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1
                users.push(user)
                localStorage.setItem(usersKey, JSON.stringify(users))
                return ok()
            }

            function getRecords() {
                const page = idFromUrl() || 1
                if (!isAuthenticated()) return unauthorized()
                const start = (page - 1) * 8
                const end = start + 8
                const data = records.slice(start, end)
                return ok({data, page})
            }

            function getUsers() {
                console.log('getUsers')
                if (!isAuthenticated()) return unauthorized()
                return ok(users.map(x => basicDetails(x)))
            }

            function getUserById() {
                if (!isAuthenticated()) return unauthorized()

                const user = users.find(x => x.id === idFromUrl())
                return ok(basicDetails(user))
            }

            function updateUser() {
                if (!isAuthenticated()) return unauthorized()

                let params = body()
                let user = users.find(x => x.id === idFromUrl())

                // only update password if entered
                if (!params.password) {
                    delete params.password
                }

                // if username changed check if taken
                if (params.username !== user.username && users.find(x => x.username === params.username)) {
                    return error('Username "' + params.username + '" is already taken')
                }

                // update and save user
                Object.assign(user, params)
                localStorage.setItem(usersKey, JSON.stringify(users))

                return ok()
            }

            function deleteUser() {
                if (!isAuthenticated()) return unauthorized()

                users = users.filter(x => x.id !== idFromUrl())
                localStorage.setItem(usersKey, JSON.stringify(users))
                return ok()
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function basicDetails(user) {
                const { id, username, firstName, lastName, noti } = user
                return { id, username, firstName, lastName, noti }
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token'
            }

            function body() {
                return opts.body && JSON.parse(opts.body)
            }

            function idFromUrl() {
                const urlParts = url.split('/')
                return parseInt(urlParts[urlParts.length - 1])
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json']
                        }
                    }
                }
            }
        })
    }
}
