<script setup>
    import Login from "../components/Auth/Login.vue"
    import Signup from "../components/Auth/Signup.vue"
    import { ref, watch, onMounted } from "vue"
    import { useRoute } from "vue-router"

    const route = useRoute()

    const isSignUpMode = ref(false)
    watch(route, () => {
        isSignUpMode.value = route.query.isLogin == "true" ? false : true
    })
    onMounted(() => {
        isSignUpMode.value = route.query.isLogin == "true" ? false : true
    })
</script>

<template>
    <div class="my-container">
        <Login v-if="isSignUpMode === false" />
        <Signup v-else />
    </div>
</template>

<style lang="scss">
    .my-container {
        max-width: 500px;
    }
</style>
