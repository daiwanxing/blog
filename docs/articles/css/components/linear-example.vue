<script setup>
defineProps({
  show1: {
    type: Boolean
  },
  show2: {
    type: Boolean
  },
  show3: {
    type: Boolean
  },
})
</script>

<template>
   <div class="linear-example">
      <div class="box" v-if="show1"></div>
      <div class="box-2" v-if="show2"></div>
      <div class="box-3" v-if="show3"></div>
   </div>
</template>

<style lang="scss">
.linear-example {

    :is(div) {
        margin: 10px 0;
    }

   .box {
      height: 40px;
      background: linear-gradient(to bottom, blue, yellow);
   }

   .box-2 {
      height: 40px;
      background: linear-gradient(3.3deg, blue 50%, gray calc(50% + 1px));
   }

   .box-3 {
      height: 100px;
      width: 100px;
      background: linear-gradient(45deg, blue 69px, gray 70px);
   }
}
</style>
