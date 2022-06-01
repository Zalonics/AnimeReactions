<script setup>
    import { useUserStore } from '@/stores/user.js'

    const userStore = useUserStore()
    console.log(userStore)
</script>

<template>
    <div class="user">
        <div class="user__image-container">
            <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ff4.bcbits.com%2Fimg%2Fa3533263101_10.jpg&f=1&nofb=1"
                alt=""
                class="user__image"
            />
        </div>
        <p class="user__name my-2">{{ userStore.userName }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (min-width: $desktop) {
            align-items: flex-start;
        }
        &__image-container {
            border: solid 1px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            position: relative;
            width: 250px;
            height: 250px;
            border-radius: 5px;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE10+/Edge */
            user-select: none; /* Standard */
            transition: all 0.6s;
        }
        &__image {
            border-radius: 5px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }
        &__name {
            font-weight: 550;
        }
    }
</style>
