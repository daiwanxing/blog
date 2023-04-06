<template>
   <div class="vip-list">
      <div class="vip-card">
         <figure>
            <img src="https://avatars.githubusercontent.com/u/11247099?v=4" />
         </figure>
         <h4 class="big-bro">Anthony Fu</h4>
         <p class="bro-resume">
            Vuejs 和 Vite 的核心成员，写过很多牛逼的工具，Vitest 和 Vueuse
            就是他写的，巨佬一枚
         </p>
      </div>
      <div class="vip-card">
         <figure>
            <img src="https://avatars.githubusercontent.com/u/499550?v=4" />
         </figure>
         <h4 class="big-bro">Evan You</h4>
         <p class="bro-resume">
            Vue 和 Vite
            之父，其他的不用多说。我能有这份工作拜他所赐。亲和力很强的大佬。
         </p>
      </div>
      <div class="vip-card">
         <figure>
            <img src="https://avatars.githubusercontent.com/u/8554143?v=4" />
         </figure>
         <h4 class="big-bro">chokcoco</h4>
         <p class="bro-resume">
            第一个让我觉得 CSS 还能这么玩的大佬，目前是虾皮的 SSE，读过他的很多
            CSS 文章，对我 CSS 技能的提升有着很大的助推作用。
         </p>
      </div>
      <div class="vip-card">
         <figure>
            <img
               src="https://p3-passport.byteimg.com/img/user-avatar/68f821ace988798ce6767903eb8731e7~180x180.awebp"
            />
         </figure>
         <h4 class="big-bro">张鑫旭</h4>
         <p class="bro-resume">
            阅文集团的前端专家，买过他的 CSS
            三部曲，真的是强烈推荐。从入门到进阶安排的明明白白，也让我对自己掌握的
            CSS 知识起到巩固作用
         </p>
      </div>
      <div class="vip-card">
         <figure>
            <img src="https://avatars.githubusercontent.com/u/159840?v=4" />
         </figure>
         <h4 class="big-bro">贺师俊</h4>
         <p class="bro-resume">
            hex 是
            TC39（ECMAScript技术委员会）的成员之一，在知乎读过关于他回答的很多JS相关的答案，受益匪浅
         </p>
      </div>
      <div class="vip-card">
         <figure>
            <img src="https://avatars.githubusercontent.com/u/19424274?v=4" />
         </figure>
         <h4 class="big-bro">严文彬</h4>
         <p class="bro-resume">
           阅文集团前端大佬，主营公众号 - 前端侦探，有多篇优质的 CSS 内容产出
         </p>
      </div>
   </div>
</template>

<script setup></script>

<style lang="scss">
.vip-list {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   gap: 15px;

   .vip-card {
      padding: 32px;
      max-width: 300px;
      min-width: 300px;
      background-color: var(--vp-c-bg-soft);
      border-radius: 12px;
      text-align: center;

      figure {
         width: 64px;
         height: 64px;
         border-radius: 50%;
         overflow: hidden;
         margin: 0 auto;

         img {
            max-width: 100%;
         }
      }

      .bro-resume {
         margin: 0;
         font-size: 14px;
      }

      .big-bro {
         margin: 6px 0;
      }
   }
}
</style>
