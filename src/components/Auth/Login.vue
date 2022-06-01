<script setup>
    import { useUserStore } from "@/stores/user"
    import { ref } from "vue"
    import { useRouter } from "vue-router"
    // DATA
    const router = useRouter()
    const email = ref("")
    const password = ref("")
    const error = ref(null)
    // COMPUTED
    const userStore = useUserStore()
    // METHODS
    const loginUser = async () => {
        try {
            await userStore.login({
                email: email.value,
                password: password.value,
            })
            router.push("/")
        } catch (e) {
            error.value = e.message
        }
    }
</script>

<template>
    <form class="form" @submit.prevent="loginUser">
        <h2 class="is-size-5 mb-3">Login</h2>
        <input type="email" class="input mb-3" placeholder="email" v-model="email" />
        <input type="password" class="input mb-3" placeholder="password" v-model="password" />
        <button class="button is-primary" type="submit">Submit</button>
        <p v-if="error" class="form__error">{{ error }}</p>
    </form>
</template>
