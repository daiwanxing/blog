<template>
   <div data-page="home">
      <div class="home-page">
         <div class="greet-container">
            <h1 class="greet-title">你好 <span class="wave">🖐️</span>，</h1>
            <h1 class="greet-title">
               这里是 <i class="name">Wonder Dai</i> 的个人博客
            </h1>
            <h2 class="greet-subtitle typing">
               <span>我喜欢在这里分享朴素、实用的前端技术。</span>
            </h2>
            <div class="discover-btn">
               <a href="/blog/articles/javascript/time-slice">
                  <el-button plain size="large" color="#4f46e5" round>
                     <span>&nbsp;立即探索</span>
                  </el-button>
               </a>
               <a href="https://github.com/daiwanxing/blog">
                  <el-button plain size="large" color="#4f46e5" round>
                     <span>View On GitHub</span>
                  </el-button>
               </a>
            </div>
         </div>
         <div class="landing-page">
            <div class="blog-log"></div>
            <img src="/logo.svg" />
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

   .home-page {
      display: flex;
      justify-content: space-between;
      max-width: calc(var(--vp-layout-max-width) - 64px);
      margin: 0 auto;
   }

   .landing-page {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      .blog-log {
         position: absolute;
         inset: 0;
         margin: auto;
         width: 360px;
         height: 360px;
         border-radius: 50%;
         background-image: linear-gradient(
            45deg,
            rgba(250, 184, 43, 0.5) 30%,
            rgba(1, 51, 255, 0.65) 30%
         );
         filter: blur(72px);
         z-index: -1;
      }

      img {
         width: 360px;
         animation: vibrate-2 4s infinite both;
      }
      @keyframes vibrate-2 {
         0% {
            transform: translate(0) rotate(0deg);
         }
         20% {
            transform: translate(4px, -4px);
         }
         40% {
            transform: translate(4px, 4px);
         }
         60% {
            transform: translate(-4px, 4px);
         }
         80% {
            transform: translate(-4px, -4px);
         }
         100% {
            transform: translate(0) rotate(1turn);
         }
      }
   }

   @media (max-width: 640px) {
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
            0 64px;
      }
   }

   .greet-container {
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
         display: flex;
         gap: 20px;
      }
   }

   .typing {
      position: relative;
      width: 19em;
      white-space: nowrap;
      overflow: hidden;
      color: var(--vp-c-text-1);
      animation: typing 3.5s steps(20, end) infinite alternate forwards;

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
         color-scheme: dark;
         background-color: currentColor;
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
