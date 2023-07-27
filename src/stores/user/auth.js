import { defineStore } from "pinia";
import { ref } from "vue";
import cookies from "vue-cookies";
import router from '../../router/index'
import {useApiStore} from '../helpers/api'



export const useAuthStore = defineStore('auth', ()=> {
    const user = ref({})
    const apiStore = useApiStore()

    const registration = async (payload) => {
        const res = await apiStore.postAxios({
            url: 'auth/reg',
            data: payload
        })
        if(res.status == 200) {
            console.log(res.data);
        }
    }

    const login = async (payload) => {
        const res = await apiStore.postAxios({
            url: 'auth/login',
            data: payload
        })
        if (res.data == 200) {
            console.log(res.data);
        }
    }

    return {
        login,
        registration,
        user
    }


})