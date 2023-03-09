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

<style lang="scss">
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
   border-radius: 50%;
}

.scale-enter-from,
.scale-leave-to {
   transform: scale(2);
   opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
   transition: 0.5s linear;
}
</style>
