import { defineStore } from "pinia";
import { ref } from "vue";
import cookies  from "vue-cookies";
import router from '../../router'
import { useApiStore } from "../helpers/api";
import { useTokenStore } from "./token";
import { VueCookies } from "vue-cookies";
import { ElMessage } from "element-plus";

export const useAuthStore = defineStore('auth', ()=> {
    const user = ref({})
    const apiStore = useApiStore()

    const tokenStore = useTokenStore()


    const setUser = (payload)=> {
        cookies.set('bogcha-user', payload)
        user.value = payload
    }


    const checkLogin = async (data) => {
        return await apiStore.postAxios({
            url: 'auth/checklogin',
            data,
        })
    }


    const registration = async (payload)=> {
        let res = await apiStore.postAxios({
            url: 'auth/reg',
            data: payload
        })
        if(res.status == 201) {
            ElMessage({
                type: 'success',
                message: "Ro'yxatdan o'tdingiz, login parol bilan kiring"
            })
            router.push({name: 'login'})
        }
    }


    const login = async (payload) => {
        let res = await apiStore.postAxios({
            url: 'auth/login',
            data: payload
        })
        if(res.status == 200) {
            setUser(res.data.user)
            tokenStore.setToken(res.data.token)
            router.push({name: 'dashboard'})
        }
    }


    const checkUser = async ()=> {
        if(cookies.isKey('bogcha-token')) {
            tokenStore.setToken(cookies.get('bogcha-token'))
        }
        let res = await apiStore.getAxios({
            url: 'auth/checkuser'
        })
        if (res.status == 200) {
            setUser(res.data)
        }
    }

    const logout = () => {
        tokenStore.setToken('')
        setUser('')
        cookies.remove('bogcha-token')
        cookies.remove('bogcha-user')
        ElMessage.warning('Tizimdan chiqdingiz')

        router.push({name: 'login'})
    }

    return {
        user,
        registration,
        login,
        checkUser,
        checkLogin,
        logout
    }
})