<template>
    <el-dialog
      v-model="toggle"
      :title="editToggle ? `${title}ni tahrirlash` : `Yangi ${title.toLowerCase()}`"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="priceprodForm"
        :model="priceprod"
        :rules="rules"
        label-position="top"
        @submit.prevent="add(priceprodForm)"
      >

      <el-form-item label="Mahsulot" prop="product">
        <el-select 
            class="el-full"
            clearable
            v-model="priceprod.product"
            placeholder="Ro'yxatdan tanlang"
          >
            <el-option
              v-for="item in products"
              :key="item._id"
              :label="item.title"
              :value="item._id"
            />
          </el-select>
        </el-form-item>


        <el-form-item label="Mahsulot narhi" prop="price">
          <el-input-number 
            class="el-full text-left"
            :controls="false" 
            v-model="priceprod.price" />
        </el-form-item>
  
        <el-form-item label="Narh sanasini belgilang">
          <el-date-picker 
            class="el-full"
            v-model="priceprod.data"
            type="date"
            placeholder="Sanani tanlang"
          />
        </el-form-item>
      </el-form>
  
      <template #footer>
        <span class="dialog-footer" @click="handleClose">
          <el-button> Bekor qilish </el-button>
          <el-button @click="add(priceprodForm)" type="primary"> Saqlash </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  const props = defineProps(["title", "id"]);
  
  import { ref, watch } from "vue";
  import { storeToRefs } from "pinia";
  import { useDialogStore } from "../../stores/usefull/dialog";
  import { usePriceprodStore } from "../../stores/data/priceprod.js";
  import { useProductStore } from "../../stores/data/product";
  import { ElMessage } from "element-plus";
  

  const productStore = useProductStore()
  const {products} = storeToRefs(productStore)  
  
  const store = usePriceprodStore();
  const { new_priceprod, save_priceprod, get_priceprod } = store;
  
  
  
  const priceprodForm = ref()
  const priceprod = ref({
    data: new Date()
  });
  const rules = ref({
    product: [
      {
        required: true,
        message: "Mahsulot tanlang",
        trigger: "blur",
      },
    ],
    price: [
      {
        required: true,
        message: "Mahsulot narhini kiriting",
        trigger: "change",
      },
    ],
  });
  
  const dialogStore = useDialogStore();
  const { toggle, editToggle } = storeToRefs(dialogStore);
  const { setToggle, setEditToggle } = dialogStore;
  

  
  
  const add = async (formEl) => {
    if(!formEl) return 
    await formEl.validate((valid) => {
      if(valid) {
        if (editToggle.value) {
          save_priceprod(priceprod.value)
        } else {
          new_priceprod(priceprod.value)
        }
        priceprod.value = {data: new Date()}
        handleClose()
      } else {
        ElMessage.error("Barcha maydonlarni to'ldiring")
      }
    })
  }
  

  const handleClose = () => {
    setToggle(false);
    setEditToggle(false)
  };
  
  
  
  watch(editToggle, async ()=> {
    if (editToggle.value) {
     await get_priceprod(props.id)
     .then(res => {
      priceprod.value = {...res.data}
      priceprod.value.product = res.data.product._id
     })
    }
  })
  </script>
  
  
  
  <style lang="scss">

  </style>
  