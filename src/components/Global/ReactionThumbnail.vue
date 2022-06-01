<script setup>
    import { onMounted, computed, defineProps, ref } from 'vue'

    const props = defineProps({
        reaction: Object,
        maxHeight: String,
        width: String,
        height: String,
        favorites: Array,
    })

    const isFavorited = ref(false)
    const toggleFavorited = () => (isFavorited.value = !isFavorited.value)

    const colorHeart = computed(() => {
        if (isFavorited.value) {
            return 'red'
        }
        return 'white'
    })

    onMounted(() => {
        if (props?.favorites?.includes(props?.reaction?.id)) {
            isFavorited.value = true
        }
    })
</script>

<template>
    <div>
        <div
            :style="{ width: width, height: height, 'max-height': maxHeight }"
            class="image-container is-clickable"
            ref="imageContainer"
        >
            <router-link :to="`/reaction/${reaction?.id}`">
                <img :src="reaction?.imagePath" alt="" class="image" />
            </router-link>
            <div @click="toggleFavorited" class="icon">
                <i class="icon--border fa-regular fa-heart"></i>
                <i class="icon--foreground fa-solid fa-heart is-clickable"></i>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .image-container {
        overflow: hidden;
        position: relative;
        width: 250px;
        height: 250px;
        max-height: v-bind(maxHeight);
        border-radius: 5px;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        transition: all 0.6s;
        .fa-heart {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.5rem;
        }
        .icon {
            &--border {
                color: rgba(0, 0, 0, 0.1);
                z-index: 500;
            }
            &--foreground {
                color: v-bind(colorHeart);
                z-index: 400;
            }
        }
        &:hover .image {
            transform: scale(1.02);
        }
        .image {
            border: solid 1px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }
    }
</style>
