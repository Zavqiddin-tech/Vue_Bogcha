<template>
    <headpage :title="title" :excel="true" @excel="downloadExcel"/>
    <food-table @edit="edit"/>
    <food-dialog :title="title" :id="id"/>
</template>


<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue'
import Headpage from '@/components/usefull/headpage.vue';
import foodDialog from '@/components/dialog/food-dialog.vue'
import foodTable from '../../components/table/food-table.vue';
import { useFoodStore } from '../../stores/data/food'; 
import { usePriceprodStore } from '../../stores/data/priceprod';
import { useApiStore } from '../../stores/helpers/api';

const priceStore = usePriceprodStore()
const {get_all_priceprods} = priceStore 

const api = useApiStore()
const store = useFoodStore()


const title = ref('Ovqat')
const id = ref('')
const edit = (val) => {
    id.value = val
}


const downloadExcel = async()=> {
    let res = await store.excel_food()
    if (res.status == 200) {
        api.downloadFile(res.data)
    }
}

onMounted(()=> {
    store.get_all_foods()
    get_all_priceprods
})
</script>


<style lang="scss">
    
</style>