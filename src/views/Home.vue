<script setup>
    import Gallery from "@/components/Global/Gallery.vue"
    import { useCollection } from "@/composables/getCollection"
    import { ref, onMounted } from "vue"

    const reactionsCollection = ref([])
    onMounted(async () => {
        reactionsCollection.value = await useCollection("reactions")
    })
</script>

<template>
    <Gallery v-if="reactionsCollection.length > 0" :reactionsRef="reactionsCollection" />
</template>
