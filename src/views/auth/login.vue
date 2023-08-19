<template>
    <div class="reg">
        <div class="title">Tizimga kirish</div>
      <el-form
        ref="regForm"
        :model="user"
        :rules="rules"
        label-position="top"
        @submit.prevent="toLogin(regForm)"
      >
        <el-form-item label="Loginni kiriting" prop="login">
          <el-input 
              @keypress.enter="toLogin(regForm)" 
              v-model="user.login" 
              />
        </el-form-item>
  
        <el-form-item label="Parolni kiriting" prop="password">
          <el-input
            @keypress.enter="toLogin(regForm)"
            v-model="user.password"
            type="passwrod"
            show-password
          />
        </el-form-item>
        <router-link to="/reg">Akkautingiz yo'qmi? Ro'yxatdan o'ting</router-link>
        <el-button type="success" @click="toLogin(regForm)">Kirish</el-button>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from "../../stores/user/auth";
  import { useApiStore } from "../../stores/helpers/api";

  const authStore = useAuthStore()
  const apiStore = useApiStore()

  
  
  import { ref } from "vue";
  const regForm = ref()
  const user = ref({});
  
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
      }
    ],
  });


  
  const toLogin = async (regForm) => {
    if (!regForm) return;
    await regForm.validate((valid, fields) => {
      if (valid) {
        authStore.login({
          login: user.value.login,
          password: user.value.password
        })
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  </script>
  <style lang="scss"></style>
  