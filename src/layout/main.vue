<template>
  <div class="main">
    <header-vue />
    <div class="wrapper">
      <aside-vue />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import headerVue from "../components/layout/header.vue";
import asideVue from "../components/layout/aside.vue";
</script>

<style lang="scss">
@import "../styles/main.scss";
</style>
