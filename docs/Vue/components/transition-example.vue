<template>
   <CodeBox>
      <div class="block">
         <div>
            <Transition name="scale">
               <div class="circle" v-if="visible"></div>
            </Transition>
         </div>
         <button class="button" @click="toggle">toggle</button>
      </div>
   </CodeBox>
</template>

<script setup>
import CodeBox from "../../components/code-example.vue";
import { ref } from "vue";

const visible = ref(false);

const toggle = function () {
   visible.value = !visible.value;
};
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

.button {
   color: var(--vp-c-brand);
   background-color: #f1f1f1;
   padding: 5px 12px;
   font-size: 1em;
   font-weight: 600;
   border: 1px solid rgba(60, 60, 60, 0.29);

   &:hover {
      filter: brightness(0.9);
   }
}
</style>
