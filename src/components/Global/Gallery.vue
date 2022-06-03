<script setup>
    import ReactionThumbnail from '@/components/Global/ReactionThumbnail.vue'
    import SearchTags from '@/components/UI/SearchTags.vue'

    import { ref, onMounted, computed, watch, defineProps } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user.js'

    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()

    const props = defineProps({
        reactionsRef: Array,
    })

    const reactions = ref([])
    const imagesPerPage = ref(5)
    const pageNumber = ref(+(route.query.page ?? 1))
    const tagsToFilter = ref(route.query.tags?.split(' ') ?? [])

    /**
     * Filters through reactions array fetched from Database and gets the correct images
     * @returns {Array<Object>}
     */
    const reactionsOnPage = computed(() => {
        if (!isValidPage(pageNumber.value)) return []
        const start = (pageNumber.value - 1) * imagesPerPage.value
        const end =
            start + imagesPerPage.value > reactions.value.length
                ? start + (reactions.value.length - start)
                : start + imagesPerPage.value
        const reactionsToShow = []
        for (let i = start; i < end; i++) {
            reactionsToShow.push(reactions.value[i])
        }
        return reactionsToShow
    })

    /**
     * @param {Number} pageNum
     * @returns {Boolean}
     */
    const isValidPage = (pageNum) => {
        const totalPagesPossible = Math.ceil(
            reactions.value.length / imagesPerPage.value
        )
        if (pageNum <= 0 || pageNum > totalPagesPossible) return false
        return true
    }

    /**
     * @param {Number} pageNum
     */
    const fetchPage = (pageNum) => {
        if (!isValidPage(pageNum)) return
        router.push({ query: { ...route.query, page: pageNum } })
        pageNumber.value = pageNum
    }

    /**
     * @param {Array} tagsToFilter
     * @param {Array} tagsInReaction
     */
    const hasTags = (tagsToFilter, tagsInReaction) => {
        let matchingTags = 0
        for (let i = 0; i < tagsInReaction.length; i++) {
            for (let j = 0; j < tagsToFilter.length; j++) {
                if (tagsInReaction[i] == tagsToFilter[j]) matchingTags++
            }
        }
        return matchingTags === tagsToFilter.length ? true : false
    }

    watch(tagsToFilter, async () => {
        if (tagsToFilter.value.length > 0) {
            reactions.value = props.reactionsRef.filter((reaction) =>
                hasTags(tagsToFilter.value, reaction.tags)
            )
        } else {
            reactions.value = props.reactionsRef
        }
    })

    watch(route, async () => {
        if (!route.query.page || route.fullPath === '/') {
            pageNumber.value = 1
            tagsToFilter.value = []
        }
    })

    onMounted(async () => {
        reactions.value = props.reactionsRef.map((reaction) => reaction)
        if (tagsToFilter.value.length > 0 && tagsToFilter.value[0] !== '') {
            reactions.value = reactions.value.filter((reaction) =>
                hasTags(tagsToFilter.value, reaction.tags)
            )
        }
        if (!isValidPage(pageNumber.value)) fetchPage(1)
    })
</script>

<template>
    <section class="gallery">
        <SearchTags />
        <h2 v-show="route.query.tags">
            Now Filtering For:
            <span class="" v-for="tag in route.query.tags" :key="tag"
                >{{ tag }}
            </span>
        </h2>
        <div v-if="reactions.length !== 0" class="grid">
            <ReactionThumbnail
                v-for="reaction in reactionsOnPage"
                :key="reaction?.id"
                class="grid__item"
                :reaction="reaction"
                :favorites="userStore.favorites"
            />
        </div>
        <div v-else>
            <progress class="progress is-small is-primary" max="100">
                15%
            </progress>
        </div>
        <nav class="pagination my-5" role="navigation" aria-label="pagination">
            <a
                @click="fetchPage(pageNumber - 1)"
                class="pagination-previous is-disabled"
                title="This is the first page"
                >Previous</a
            >
            <a @click="fetchPage(pageNumber + 1)" class="pagination-next"
                >Next page</a
            >
            <ul class="pagination-list">
                <li>
                    <button
                        v-show="isValidPage(pageNumber - 2)"
                        @click="fetchPage(pageNumber - 2)"
                        class="pagination-link"
                        aria-label="Page 1"
                        aria-current="page"
                    >
                        {{ pageNumber - 2 }}
                    </button>
                </li>
                <li>
                    <button
                        v-show="isValidPage(pageNumber - 1)"
                        @click="fetchPage(pageNumber - 1)"
                        class="pagination-link"
                    >
                        {{ pageNumber - 1 }}
                    </button>
                </li>
                <li>
                    <button
                        v-show="isValidPage(pageNumber)"
                        class="pagination-link has-background-primary has-border-primary has-text-white"
                    >
                        {{ pageNumber }}
                    </button>
                </li>
                <li>
                    <button
                        v-show="isValidPage(pageNumber + 1)"
                        @click="fetchPage(pageNumber + 1)"
                        class="pagination-link"
                    >
                        {{ pageNumber + 1 }}
                    </button>
                </li>
                <li>
                    <button
                        v-show="isValidPage(pageNumber + 2)"
                        @click="fetchPage(pageNumber + 2)"
                        class="pagination-link"
                    >
                        {{ pageNumber + 2 }}
                    </button>
                </li>
            </ul>
        </nav>
    </section>
</template>

<style lang="scss">
    .pagination-list {
        * {
            cursor: pointer;
        }
        .pagination-link {
            background: white;
        }
    }
    .grid {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, 200px);
        @media (min-width: $desktop) {
            grid-template-columns: repeat(auto-fit, 240px);
        }
        &__item {
            display: flex;
            justify-content: start;
        }
    }
</style>
