import { defineStore } from "pinia";
import { ref } from "vue";

import {useApiStore} from '../helpers/api'
import { ElMessage } from "element-plus";

export const useFoodStore = defineStore('food', ()=> {
    const foods = ref([])
    const foodsCount = ref(0)

    const api = useApiStore()


    // barcha mahsulotni olib beruvchi
    const get_all_foods = async ()=> {
        let res = await api.getAxios({
            url: 'food'
        })
        if (res.status == 200) {
            foods.value = [...res.data.foods]
            foodsCount.value = res.data.count
        }
    }

    // mahsulot qo'shish
    const new_food = async (data)=> {
         await api.postAxios({
            url: 'food',
            data
        }).then(res => {
            foods.value = [res.data, ...foods.value]
            foodsCount.value += 1
            ElMessage({
                type: 'success',
                message: 'Yangi mahsulot narhi qo`shildi'
            })
        })
    }


    // bitta mahsulotni olish
    const get_food = async (_id)=> {
        return await api.getAxios({
            url: `food/${_id}`
        })
    }


    // mahsulotni yangilash
    const save_food = async (data) => {
         await api.putAxios({
            url: 'food',
            data
        })
        .then(res => {
            foods.value = foods.value.map(food => {
                if (food._id === res.data._id) return res.data
                return food
            })
        })
        ElMessage({
            type: 'success',
            message: 'mahsulot narhi yangilandi'
        })
    }


    // mahsulotni delete qilish
    const delete_food = async(_id) => {
        await api.deleteAxios({
            url: `food/${_id}`
        })
        .then(()=> {
            foods.value = foods.value.filter(food => {
                if (food._id == _id) return false
                return food
            })
            foodsCount.value -= 1
        })
        ElMessage.warning('Mahsulot narhi o`chirildi')
    }


    // mahsulot holatini o'zgartirish
    const status_food = async (_id) => {
        await api.getAxios({
            url: `food/change/${_id}`
        })
        .then(()=> {
            foods.value = foods.value.map(food => {
                if (food._id == _id) return {
                    ...food,
                    status: food.status == 0 ? 1 : 0
                }
                return food
            })
            ElMessage.success('Mahsulot narhi holati yangilandi')
        })
    }


    const excel_food = async ()=> {
        return await api.getAxios({url: 'food/excel'})
    }


    return {
        foods,
        foodsCount,
        get_food,
        get_all_foods,
        save_food, 
        status_food,
        delete_food,
        new_food,
        excel_food,
    }
})