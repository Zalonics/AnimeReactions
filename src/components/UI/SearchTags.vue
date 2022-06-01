<script setup>
    import { computed, onMounted } from "vue"
    import { storeToRefs } from "pinia"
    import { useMainStore } from "@/stores/main"
    import { useRoute } from "vue-router"

    const store = useMainStore()
    const { reactions } = storeToRefs(store)

    const route = useRoute()

    /**
     * @returns {Array<String>}
     */
    const allTags = computed(() => {
        const uniqueTags = new Set()
        reactions.value.forEach((_reaction) => {
            _reaction.tags.forEach((tag) => {
                uniqueTags.add(tag)
            })
        })
        return [...uniqueTags].sort()
    })

    const pathToRouteTo = computed(() => {
        if (!route.path.includes("/dashboard")) {
            return "/"
        }
        return route.path
    })
    onMounted(async () => {
        await store.populateReactions()
    })
</script>

<template>
    <form :action="pathToRouteTo" class="search">
        <input
            autocomplete="off"
            list="tags"
            name="tags"
            class="input mb-4"
            type="text"
            placeholder="Search by Tag ex:(happy_crying)"
        />

        <datalist id="tags">
            <option v-for="tag in allTags" :key="tag" :value="tag"></option>
        </datalist>
    </form>
</template>

<style lang="scss">
    .search {
        margin-top: 20px;
        @media (min-width: $desktop) {
            margin-top: 0;
        }
    }
</style>
