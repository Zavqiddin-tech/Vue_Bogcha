import { defineStore } from "pinia";
import { ref } from "vue";

import {useApiStore} from '../helpers/api'
import { ElMessage } from "element-plus";
import { convertDate } from "../../func/date";

export const usePriceprodStore = defineStore('priceprod', ()=> {
    const priceprods = ref([])
    const priceprodsCount = ref(0)

    const api = useApiStore()


    const units = {
        'kg': 'gr',
        'l': 'ml'
    }


    // barcha mahsulotni olib beruvchi
    const get_all_priceprods = async (search)=> {
        let res = await api.getAxios({
            url: 'priceprod',
            search,
        })
        if (res.status == 200) {
            priceprods.value = [...res.data.priceProducts.map(price => {
                price.data = convertDate(price.data)
                price.product.miniunit = units[price.product.unit] || price.product.unit
                return price
            })]
            priceprodsCount.value = res.data.count
        }
    }

    // mahsulot qo'shish
    const new_priceprod = async (data)=> {
         await api.postAxios({
            url: 'priceprod',
            data
        }).then(res => {
            priceprods.value = [res.data, ...priceprods.value]
            priceprodsCount.value += 1
            ElMessage({
                type: 'success',
                message: 'Yangi mahsulot narhi qo`shildi'
            })
        })
    }


    // bitta mahsulotni olish
    const get_priceprod = async (_id)=> {
        return await api.getAxios({
            url: `priceprod/${_id}`
        })
    }


    // mahsulotni yangilash
    const save_priceprod = async (data) => {
         await api.putAxios({
            url: 'priceprod',
            data
        })
        .then(res => {
            priceprods.value = priceprods.value.map(priceprod => {
                if (priceprod._id === res.data._id) return res.data
                return priceprod
            })
        })
        ElMessage({
            type: 'success',
            message: 'mahsulot narhi yangilandi'
        })
    }


    // mahsulotni delete qilish
    const delete_priceprod = async(_id) => {
        await api.deleteAxios({
            url: `priceprod/${_id}`
        })
        .then(()=> {
            priceprods.value = priceprods.value.filter(priceprod => {
                if (priceprod._id == _id) return false
                return priceprod
            })
            priceprodsCount.value -= 1
        })
        ElMessage.warning('Mahsulot narhi o`chirildi')
    }


    // mahsulot holatini o'zgartirish
    const status_priceprod = async (_id) => {
        await api.getAxios({
            url: `priceprod/change/${_id}`
        })
        .then(()=> {
            priceprods.value = priceprods.value.map(priceprod => {
                if (priceprod._id == _id) return {
                    ...priceprod,
                    status: priceprod.status == 0 ? 1 : 0
                }
                return priceprod
            })
            ElMessage.success('Mahsulot narhi holati yangilandi')
        })
    }


    const excel_priceprod = async ()=> {
        return await api.getAxios({url: 'priceprod/excel'})
    }


   


    return {
        priceprods,
        priceprodsCount,
        get_priceprod,
        get_all_priceprods,
        save_priceprod, 
        status_priceprod,
        delete_priceprod,
        new_priceprod,
        excel_priceprod,
    }
})