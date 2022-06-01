<script setup>
    import { storeToRefs } from "pinia"
    import { useUserStore } from "../../stores/user"

    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <h1 class="logo is-clickable">AnimeReactions.moe</h1>
            </router-link>

            <a
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link v-if="user" to="/dashboard" class="navbar-item"> Dashboard </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div v-if="!user" class="buttons">
                        <router-link to="/auth?isLogin=false" class="button is-primary">
                            <strong>Sign up</strong>
                        </router-link>
                        <router-link to="/auth?isLogin=true" class="button is-light"> Log in </router-link>
                    </div>
                    <div v-else class="buttons">
                        <button @click="userStore.logout" class="button">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
    .logo {
        font-weight: bold;
    }
</style>
