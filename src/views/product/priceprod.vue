<template>
    <headpage :title="title" :excel="true" @excel="downloadExcel"/>
    <priceprod-table @edit="edit"/>
    <priceprod-dialog :title="title" :id="id"/>
</template>


<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue'
import Headpage from '@/components/usefull/headpage.vue';
import priceprodDialog from '@/components/dialog/priceprod-dialog.vue'
import priceprodTable from '../../components/table/priceprod-table.vue';
import { usePriceprodStore } from '../../stores/data/priceprod'; 
import { useProductStore } from '../../stores/data/product';
import { useApiStore } from '../../stores/helpers/api';
const api = useApiStore()
const store = usePriceprodStore()
const {get_all_active_products} = useProductStore()

const title = ref('Narh')
const id = ref('')
const edit = (val) => {
    id.value = val
}


const downloadExcel = async()=> {
    let res = await store.excel_priceprod()
    if (res.status == 200) {
        api.downloadFile(res.data)
    }
}

onMounted(()=> {
    store.get_all_priceprods()
    get_all_active_products()
})
</script>


<style lang="scss">
    
</style>