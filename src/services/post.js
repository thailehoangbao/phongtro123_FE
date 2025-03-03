import axios from 'axios'
import axiosConfig from '../axiosConfig'

export const apiGetPosts = () => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: '/api/v1/post/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostsLimit = (query) => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/v1/post/limit`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPostsLimitAdmin = (query) => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/v1/post/limit-admin`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiNewPosts = () => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/v1/post/new-post`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUploadImages = (images) => new Promise(async (resolve,reject) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            data: images
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiCreateNewPost = (payload) => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: `/api/v1/post/create-new`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdatePost = (payload) => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: `/api/v1/post/update-post`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeletePost = (payload) => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/v1/post/delete-post`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDetailPost= (id) => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/v1/post/detail-post?id=${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiRelativeAddressPost = (address) => new Promise(async (resolve,reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: `/api/v1/post/relative-address-post`,
            data: address
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})