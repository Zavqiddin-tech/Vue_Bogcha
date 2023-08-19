<template>
  <div class="reg">
    <div class="title">Ro'yxatdan o'tish</div>
    <el-form
      ref="regForm"
      :model="user"
      :rules="rules"
      label-position="top"
      @submit.prevent="regis(regForm)"
    >
      <el-form-item label="Loginni kiriting" prop="login">
        <el-input 
          @keypress.enter="regis(regForm)" 
          v-model="user.login" 
          @blur="loginCheck"
        />
      </el-form-item>

      <el-form-item label="Parolni kiriting" prop="password">
        <el-input
          @keypress.enter="regis(regForm)"
          v-model="user.password"
          type="passwrod"
          show-password
        />
      </el-form-item>
      <router-link to="/login">Akkautingiz bormi? Tizimga kiring</router-link>
      <el-button type="success" @click="regis(regForm)" :disabled="status">Kirish</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/user/auth";
import { useApiStore } from "../../stores/helpers/api";
const authStore = useAuthStore();
const apiStore = useApiStore()


import { ref } from "vue";
import { ElMessage } from "element-plus";
const regForm = ref();
const user = ref({});
const status = ref(false)

const rules = ref({
  login: [
    {
      required: true,
      message: "Loginni kiriting",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Parolni kiriting",
      trigger: "blur",
    },
    {
      min: 3,
      max: 15,
      message: "Eng kami bilan 3 ta simvol bolsin",
      trigger: "blur",
    },
  ],
});

const loginCheck = async () => {
  let res = await authStore.checkLogin({
    login: user.value.login
  })
  if (res.status === 200) {
    if (res.data == 'yes') {
      status.value = true
      ElMessage({
        type: 'warning',
        message: 'Bu logindagi foydalanuvchi mavjud'
      })
    } else {
      status.value = false
    }
  }
};

const regis = async (regForm) => {
  if (!regForm) return;
  await regForm.validate((valid, fields) => {
    if (valid) {
      authStore.registration({
        login: user.value.login,
        password: user.value.password,
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
<style lang="scss"></style>
