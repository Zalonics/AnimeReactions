<script setup>
    import Navigation from "@/components/Layout/Navigation.vue"
</script>

<template>
    <div class="container">
        <Navigation />
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
    * {
        box-sizing: border-box;
    }
    .container {
        padding: 10px;
    }
</style>
