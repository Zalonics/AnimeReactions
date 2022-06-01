<script setup>
    import { defineProps } from 'vue'
    defineProps({
        tags: Array,
    })
</script>

<template>
    <div class="tags block">
        <router-link
            :to="`/?tags=${tag}`"
            v-for="tag in tags"
            :key="tag"
            class="tag is-clickable is-size-6"
        >
            {{ tag.toString().toLowerCase() }}
        </router-link>
    </div>
</template>

<style lang="scss">
    .tags {
        margin-top: 20px;
    }
    @media (min-width: $tablet) {
        .tags {
            margin-top: 0px;
        }
    }
</style>
