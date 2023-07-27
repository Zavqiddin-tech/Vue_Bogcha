import axios from "axios";
import { defineStore } from "pinia";
import { useHelperStore } from "./index";
import {useTokenStore}  from '../user/token'
import { ElMessage } from "element-plus";

export const useApiStore = defineStore('api', ()=> {

    const helperStore = useHelperStore()
    const {url} = helperStore

    const tokenStore = useTokenStore()
    const {token, header} = tokenStore







    const getAxios = (payload)=> {
        return axios.get(`${url}/${payload}`, {
            ...header
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data
            })
        })
    }

    const postAxios = (payload)=> {
        console.log(payload);
        return axios.post(`${url}/${payload.url}`,payload.data, {
            ...header
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response
            })
        })
    }

    const putAxios = ()=> {
        return axios.get(`${url}/${payload.url}`,payload.data, {
            ...header
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.message
            })
        })
    }

    const deleteAxios = ()=> {
        return axios.get(`${url}/${payload.url}`, {
            ...header
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.message
            })
        })
    }

    return {
        getAxios,
        postAxios,
        putAxios,
        deleteAxios,
    }

})