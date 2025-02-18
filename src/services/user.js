import axios from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async (resolve,reject) => {
    try {
        const response = await axios({
            method: 'GET',
            url: '/api/v1/user/get-current',
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateUser = (user) => new Promise(async (resolve,reject) => {
    try {
        const response = await axios({
            method: 'POST',
            url: '/api/v1/user/update-user',
            data: user
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdatePassword = (password) => new Promise(async (resolve,reject) => {
    try {
        const response = await axios({
            method: 'POST',
            url: '/api/v1/user/update-password',
            data: password
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})