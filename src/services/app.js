import axios from '../axiosConfig'
import axiosDefault from 'axios'

export const apiGetPrice = () => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            method: 'GET',
            url: '/api/v1/price/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAreas = () => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            method: 'GET',
            url: '/api/v1/area/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetProvinces = () => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            method: 'GET',
            url: '/api/v1/province/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicProvince = () => new Promise(async(resolve,reject) => {
    try {
        const response = await axiosDefault({
            method: 'GET',
            url: 'https://provinces.open-api.vn/api/p/'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicDetailProvince = (code) => new Promise(async(resolve,reject) => {
    try {
        const response = await axiosDefault({
            method: 'GET',
            url: `https://provinces.open-api.vn/api/p/${code}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicDictricts = () => new Promise(async(resolve,reject) => {
    try {
        const response = await axiosDefault({
            method: 'GET',
            url: 'https://provinces.open-api.vn/api/d/'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicDetailDictrict = (code) => new Promise(async(resolve,reject) => {
    try {
        const response = await axiosDefault({
            method: 'GET',
            url: `https://provinces.open-api.vn/api/d/${code}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})