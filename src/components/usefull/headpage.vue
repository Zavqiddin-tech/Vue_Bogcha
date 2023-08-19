<template>
    <div class="headpage">
        <h1>{{ title }}lar</h1>
        <div>
            <el-button
            v-if="excel"
            @click="getexcel"
                type="success"
            >
                <el-icon>
                    <document />
                </el-icon>
                Excel
            </el-button>
            <el-button 
            type="primary"
            @click="setToggle(true)"
            >
            <el-icon><plus /></el-icon>
            Yangi {{ title.toLowerCase() }}
        </el-button>
        </div>
    </div>
</template>


<script setup>
import { useDialogStore } from '../../stores/usefull/dialog';

const dialogStore = useDialogStore()
const {setToggle} = dialogStore


defineProps([
    'title',
    'excel'
])


const emit = defineEmits([
    'excel'
])


const getexcel = ()=> {
    emit('excel')
}

</script>



<style lang="scss">
    .headpage {
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>