<template>
  <el-dialog
    v-model="toggle"
    :title="
      editToggle ? `${title}ni tahrirlash` : `Yangi ${title.toLowerCase()}`
    "
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="foodForm"
      :model="food"
      :rules="rules"
      label-position="top"
      @submit.prevent="add(foodForm)"
    >
      <el-form-item label="Ovqat nomi" prop="title">
        <el-input v-model="food.title" placeholder="Ovqat nomini kiriting" />
      </el-form-item>

      <el-row :gutter="30" v-for="(item, index) of food.products" :key="index">
        <el-col :span="12">
          <el-form-item label="Mahsulotni tanlang">
            <el-select
              filterable
              class="el-full"
              @change="set_append(item.product, index)"
              v-model="item.product"
              placeholder="Ro'yxatdan tanlang"
            >
              <el-option
                v-for="item in priceprods"
                :key="item._id"
                :label="item.product.title"
                :value="item.product._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Mahsulot nettosi">
            <el-input
              v-maska
              @input="calc"
              data-maska="######"
              v-model="item.netto"
            >
              <template #append>
                <div>
                  {{ item.append }}
                </div>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 v-if="food.price">
        Umumiy narh {{ food.price?.toLocaleString() }} so'm
      </h3>
      <!-- <el-form-item label="Mahsulot" prop="product">
          <el-select 
            class="el-full"
            clearable
            v-model="food.product"
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
            v-model="food.price" />
        </el-form-item> -->
    </el-form>

    <template #footer>
      <span class="dialog-footer" @click="handleClose">
        <el-button> Bekor qilish </el-button>
        <el-button @click="add(foodForm)" type="primary"> Saqlash </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps(["title", "id"]);

import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDialogStore } from "../../stores/usefull/dialog";
import { useFoodStore } from "../../stores/data/food.js";
import { usePriceprodStore } from "../../stores/data/priceprod";
import { ElMessage, vLoading } from "element-plus";

const priceStore = usePriceprodStore();
const { priceprods } = storeToRefs(priceStore);

const store = useFoodStore();
const { new_food, save_food, get_food } = store;

const foodForm = ref();
const food = ref({
  products: [
    {
      product: "",
      netto: '',
    },
  ],
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
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      if (editToggle.value) {
        save_food(food.value);
      } else {
        new_food(food.value);
      }
      food.value = { data: new Date() };
      handleClose();
    } else {
      ElMessage.error("Barcha maydonlarni to'ldiring");
    }
  });
};

const calc = () => {
  food.value.products = food.value.products.filter((item, index) => {
    if (item.product && item.netto > 0) return item;

    return false;
  });

  food.value.price = 0;
  food.value.products.forEach((item) => {
    console.log(item);
    console.log(food.value);
    food.value.price += item.price = item.netto;
  });

  if (
    food.value.products.at(-1).product &&
    food.value.products.at(-1).netto > 0
  ) {
    food.value.products.push({
      product: "",
      netto: 0,
    });
  }
};

const set_append = (_id, index) => {
  let item = priceprods.value.find((item) => item.product._id == _id);
  console.log(item);
  food.value.products[index].append = item.product.miniunit;
  console.log(food.value);
  food.value.products[index].price =
    item.product.miniunit == item.product.unit
      ? item.product.price
      : item.product.price / 1000;
};


const handleClose = () => {
  setToggle(false);
  setEditToggle(false);
};

onMounted(() => {
  priceprods;
});

watch(editToggle, async () => {
  if (editToggle.value) {
    await get_food(props.id).then((res) => {
      console.log(res.data);
      food.value = { ...res.data };
      food.value.products = res.data.products._id;
    });
  }
});
</script>

<style lang="scss"></style>
