import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
// ElMessage
import { ElMessage } from "element-plus";
// ElMessage


import { useHelperStore } from ".";
import { useTokenStore } from "../user/token";
import router from "../../router";



export const useApiStore = defineStore('api', ()=> {

    const helperStore = useHelperStore()
    const {url} = helperStore

    const tokenStore = useTokenStore()
    const {header} = storeToRefs(tokenStore)

    const getAxios = (payload)=> {
        return axios.get(`${url}/${payload.url}`, {
            ...header.value,
            params: {...payload.search}
        }).catch(e => {
            if (e.response.status == 401) {
                ElMessage({
                    type: 'error',
                    message: 'Sizga bu sahifaga ruxsat yo`q'
                })
                router.push({name: 'login'})
                return fasle
            }

            ElMessage({
                type: 'error',
                message: e.response.data
            })
        })
    }


    const postAxios = (payload)=> {
        return axios.post(`${url}/${payload.url}`, payload.data, {
            ...header.value
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.message || 'Login yoki parol xato'
            })
        })
    }


    const putAxios = (payload)=> {
        return axios.put(`${url}/${payload.url}`, payload.data, {
            ...header.value
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.message
            })
        })
    }


    const deleteAxios = (payload)=> {
        return axios.delete(`${url}/${payload.url}`, {
            ...header.value
        }).catch(e => {
            ElMessage({
                type: 'error',
                message: e.response.data?.message
            })
        })
    }


    const downloadFile = (link) => {
        axios({
            url: `${url}/${link}`,
            method: 'GET',
            responseType: 'blob'
        }).then(response => {
            let fileUrl = window.URL.createObjectURL(new Blob([response.data]))
            let fileLink = document.createElement('a')
            fileLink.href = fileUrl
            fileLink.setAttribute('download', link)
            document.body.appendChild(fileLink)

            fileLink.click()
        }).catch(e => {
            console.log(e.response);
        })
    }




    return {
        getAxios,
        postAxios,
        putAxios,
        deleteAxios,
        downloadFile,
    }

})