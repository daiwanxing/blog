<template>
   <div>
      <div class="has_div">
         <p v-if="visible"></p>
         <article v-else></article>
      </div>
      <el-row style="margin-top: 10px">
        <el-button @click="() => toggle()">切换</el-button>
      </el-row>
   </div>
</template>

<script setup>
import { useToggle } from "@vueuse/core";

const [visible, toggle] = useToggle();
</script>

<style>
.has_div {
    height: 50px;
    border-radius: 6px;
    transition: .3s all;
}
.has_div:has(p) {
    background-color: blue;
}

.has_div:has(article) {
    background-color: rgb(219, 58, 58);
}
</style>
