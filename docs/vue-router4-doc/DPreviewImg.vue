<template>
    <div class="d-preview-img">
        <div class="container">
            <div>点我试试</div>
            <div ref="swiperRef" class="swiper mySwiper2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item ,index) in cmsItems" :key="index">
                        <img v-bind="item.img" />
                    </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <div ref="swiperThumbRef" thumbsSlider="" class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item ,index) in cmsItems" :key="index">
                        <img v-bind="item.img" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script name="DPreviewImg" setup>
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'
import { onMounted, ref, toRefs } from 'vue';
let swiperRef = ref(null)
let swiperThumbRef = ref(null)


const props = defineProps({
    cmsItems : {
        type : Array ,
        default(){
            return []
        }
    }
})
onMounted(() => {
    var swiper = new Swiper(swiperThumbRef.value, {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(swiperRef.value, {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });
})
const { cmsItems } = toRefs(props)
</script>
<style>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}



.swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
}

.swiper-slide {
    background-size: cover;
    background-position: center;
}

.mySwiper2 {
    height: 80%;
    width: 100%;
}

.mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}

.mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
    opacity: 1;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>