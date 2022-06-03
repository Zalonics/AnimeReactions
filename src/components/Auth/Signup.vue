<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user.js'

    const router = useRouter()

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const userStore = useUserStore()

    const signUserUp = async () => {
        try {
            await userStore.signUp({
                email: email.value,
                password: password.value,
            })
            router.push('/')
        } catch (e) {
            error.value = e.message
        }
    }

    const signUp = async () => {
        if (await userStore.registerUserName(username.value, email.value)) {
            await signUserUp()
        }
    }
</script>

<template>
    <form class="form" @submit.prevent="signUp">
        <h2 class="is-size-5 mb-3">SignUp</h2>
        <input
            type="text"
            class="input mb-3"
            placeholder="username"
            v-model="username"
        />
        <input
            type="email"
            class="input mb-3"
            placeholder="email"
            v-model="email"
        />
        <input
            type="password"
            class="input mb-3"
            placeholder="password"
            v-model="password"
        />
        <button class="button is-primary mb-3" type="submit">Submit</button>
        <p v-if="error" class="form__error">{{ error }}</p>
    </form>
</template>
