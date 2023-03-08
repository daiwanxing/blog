<template>
    <div class="code-block">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.code-block {
    margin-top: 20px;
    padding: 22px 24px;
    border-radius: 6px;
    background-color: var(--vp-custom-block-info-bg);
    box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
}
</style>