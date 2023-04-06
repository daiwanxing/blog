<template>
    <div class="radial-gradient">
        <div class="child-1"></div>
    </div>
</template>

<style lang="scss">
.radial-gradient {

    :where(div) {
        border-radius: 4px;
    }

    :is(.child-1) {
        height: 150px;
        background: radial-gradient(#000 0%, #ff9800 100%);
    }
}
</style>