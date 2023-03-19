<template>
   <div data-page="home">
      <div class="greet-container">
         <h1 class="greet-title">你好 <span class="wave">🖐️</span>，</h1>
         <h1 class="greet-title">
            这里是 <i class="name">Wonder Dai</i> 的个人博客
         </h1>
         <h2 class="greet-subtitle typing">
            <span>我喜欢在这里分享朴素、实用的前端技术。</span>
         </h2>
         <div class="discover-btn">
            <a href="/blog/content/js/requestAnimationFrame">
               <el-button
                  type="primary"
                  size="large"
                  color="#4f46e5"
                  class="float-btn"
               >
                  <span class="material-symbols-outlined material-icon">
                     visibility
                  </span>
                  <span>&nbsp;立即探索</span>
               </el-button>
            </a>
         </div>
      </div>
   </div>
</template>

<script setup></script>

<style lang="scss">
@keyframes animationFloat {
   100% {
      transform: translateY(-50%);
   }
}

@keyframes finger {
   0% {
      transform: rotate(-30deg);
      transform-origin: center;
   }
   100% {
      transform: rotate(30deg);
      transform-origin: center;
   }
}

[data-page="home"] {
   min-height: calc(100vh - 64px);
   background-position-y: -38vh;
   background-size: 100%;
   background-repeat: no-repeat;
   background-image: url("https://www.yushi.dev/static/media/background.57250e55467d6b9da119.png");

   @media (max-width: 640px) {
      & {
         background-image: url("https://www.yushi.dev/static/media/background2.e118b43af5b1a42dd49b.png");
         background-position: center right -2.5rem;
         background-size: cover;
      }
      .greet-container {
         text-align: center;
      }
   }

   @media (min-width: 640px) {
      .greet-container {
         padding: calc(
               var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
            )
            48px 64px;
      }
   }

   @media (min-width: 768px) {
      .greet-container {
         padding: 0 32px;
      }
   }

   @media (min-width: 960px) {
      .greet-container {
         padding: calc(
               var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
            )
            64px 64px;
      }
   }

   .greet-container {
      max-width: calc(var(--vp-layout-max-width) - 64px);
      margin: 0 auto;

      .greet-title {
         font-weight: 700;
         line-height: 2;
         font-size: 3em;
      }

      .greet-subtitle {
         line-height: 2;
         font-size: 2em;
      }

      .name {
         color: #4f46e5;
      }

      .discover-btn {
         margin: 3vh 0;
      }
   }

   .typing {
      position: relative;
      width: 19em;
      white-space: nowrap;
      overflow: hidden;
      animation: typing 3s steps(20, end) infinite alternate forwards;

      &::after {
         content: "";
         position: absolute;
         right: 0;
         top: 0;
         bottom: 0;
         width: 3px;
         border-radius: 2px;
         height: 60%;
         margin: auto 0;
         background-color: #000;
         animation: blink-1 1s both infinite;
      }
   }

   .wave {
      display: inline-block;
      animation: finger 1.4s linear alternate infinite;
   }

   @keyframes typing {
      from {
         width: 0;
      }
      100% {
         width: 20em;
      }
   }

   @keyframes blink-1 {
      0%,
      50%,
      100% {
         opacity: 1;
      }
      25%,
      75% {
         opacity: 0;
      }
   }

   .material-icon {
      font-size: 1.5em;
   }

   .float-btn {
      animation: animationFloat 3s alternate both infinite;
   }
}
</style>
