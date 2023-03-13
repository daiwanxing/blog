<template>
    <el-card>
       <div class="block">
          <div>
             <Transition name="scale">
                <div class="circle" v-if="state"></div>
             </Transition>
          </div>
          <el-switch
             v-model="state"
             size="large"
          />
       </div>
    </el-card>
 </template>
 
 <script setup>
 import { useToggle } from "@vueuse/core";
 
 const [state] = useToggle();
 </script>
 
 <style lang="scss" scoped>
 .block {
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
 }
 .circle {
    height: 80px;
    width: 80px;
    background-color: #f5222d;
    border-radius: 0;
    transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
 }
 
 .scale-enter-from,
 .scale-leave-to {
    transform: translate3d(0, -100%, 0);
    border-radius: 50%;
 }
 
 .scale-enter-to {
    transform: scaleX(2);
 }
 .scale-enter-active,
 .scale-leave-active {
    transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
 }
 </style>
 