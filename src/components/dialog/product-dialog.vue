<template>
  <el-dialog
    v-model="toggle"
    :title="editToggle ? `${title}ni tahrirlash` : `Yangi ${title.toLowerCase()}`"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="productForm"
      :model="product"
      :rules="rules"
      label-position="top"
      @submit.prevent="add(productForm)"
    >
      <el-form-item label="Mahsulot nomi" prop="title">
        <el-input v-model="product.title" />
      </el-form-item>

      <el-form-item label="Mahsulot birligi" prop="unit">
        <el-select
          clearable
          v-model="product.unit"
          placeholder="Ro'yxatdan tanlang"
        >
          <el-option
            v-for="(item, index) in units"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-upload
          v-model:file-list="product.img"
          :action="`${url}/image/product`"
          list-type="picture-card"
          :limit="1"
          :before-upload="handleBefore"
          :on-preview="handlePreview"
          :headers="{
                'authorization': `Bearor ${token}`
            }"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img class="product-img" w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer" @click="handleClose">
        <el-button> Bekor qilish </el-button>
        <el-button @click="add(productForm)" type="primary"> Saqlash </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps(["title", "id"]);

import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDialogStore } from "../../stores/usefull/dialog";
import { useProductStore } from "../../stores/data/product.js";
import { useHelperStore } from "../../stores/helpers/index.js";
import {useTokenStore} from '../../stores/user/token'
import { ElMessage } from "element-plus";

const helperStore = useHelperStore();
const { url } = storeToRefs(helperStore);

const tokenStore = useTokenStore()
const {token} = storeToRefs(tokenStore)

const store = useProductStore();
const { products, productsCount,  units } = storeToRefs(store);
const { new_product, save_product, get_product } = store;



const productForm = ref()
const product = ref({});
const rules = ref({
  title: [
    {
      required: true,
      message: "Mahsulot nomini kiriting",
      trigger: "blur",
    },
  ],
  unit: [
    {
      required: true,
      message: "Mahsulot birligini kiriting",
      trigger: "change",
    },
  ],
  img: [
    {
      required: true,
      message: "Mahsulot rasmini yuklang",
      trigger: "blur",
    },
  ],
});

const dialogStore = useDialogStore();
const { toggle, editToggle } = storeToRefs(dialogStore);
const { setToggle, setEditToggle } = dialogStore;




const handleBefore = (file)=> {
  if (file.size / 1024 > 500) {
    ElMessage.warning('Yuklanayotgan fayl 500 kb dan oshmasin')
    return false
  }
}



const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleClose = () => {
  setToggle(false);
  setEditToggle(false)
};


const add = async (formEl) => {
  if(!formEl) return 
  await formEl.validate((valid) => {
    if(valid) {
      if (editToggle.value) {
        save_product(product.value)
      } else {
        new_product(product.value)
      }
      product.value = {}
      handleClose()
    } else {
      ElMessage.error("Barcha maydonlarni to'ldiring")
    }
  })
}




watch(editToggle, async ()=> {
  if (editToggle.value) {
   await get_product(props.id)
   .then(res => {
    product.value = {...res.data}
    if (product.value.img) {
      console.log(product.value.img[0].response);
      product.value.img[0].url = `${url.value}/${product.value.img[0].response}`
    }
   })
  }
})
</script>



<style lang="scss">
.product-img {
  width: 500px;
}
</style>
