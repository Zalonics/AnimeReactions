<script setup>
    import Upload from "@/components/Dashboard/Upload.vue"
    import UserInfo from "@/components/Dashboard/UserInfo.vue"
    import Gallery from "@/components/Global/Gallery.vue"

    import { ref, onMounted, computed } from "vue"
    import { useCollection } from "@/composables/getCollection"
    import { useUserStore } from "@/stores/user"

    const userStore = useUserStore()
    const { fetchFavorites, fetchMyUploads } = userStore

    const upload = ref(false)
    const favorites = ref(false)
    const myUploads = ref(false)
    const isUploading = ref(false)

    // The gallery component takes in an array of reactions, so we have to query the results we want beforehand.
    const reactionsCollection = ref([])

    const fetchAllPersonalReactions = () => {
        let reactions = reactionsCollection.value
        const reactionsA = reactions.filter((reaction) => {
            return userStore.favorites.includes(reaction.id)
        })
        const reactionsB = reactions.filter((reaction) => {
            return userStore.uploads.includes(reaction.id)
        })
        return [...reactionsA, ...reactionsB]
    }

    const reactionsToShow = computed(() => {
        let reactions = reactionsCollection.value
        if (favorites.value) {
            reactions = reactions.filter((reaction) => {
                return userStore.favorites.includes(reaction.id)
            })
        }
        if (myUploads.value) {
            reactions = reactions.filter((reaction) => {
                return userStore.uploads.includes(reaction.id)
            })
        }
        if (!favorites.value && !myUploads.value) {
            reactions = fetchAllPersonalReactions()
        }
        return reactions
    })

    onMounted(async () => {
        reactionsCollection.value = await useCollection("reactions")
        await fetchFavorites()
        await fetchMyUploads()
    })
</script>

<template>
    <div class="layout">
        <div class="sidebar">
            <UserInfo />
            <div class="my-buttons">
                <button
                    @click=";(isUploading = !isUploading), (upload = !upload)"
                    :class="{ 'is-primary': upload }"
                    class="button"
                >
                    Upload a reaction <i class="fa-regular fa-folder"></i>
                </button>
                <Upload v-if="isUploading" />
                <button @click="favorites = !favorites" :class="{ 'is-primary': favorites }" class="button">
                    Favorites <i class="fa-regular fa-heart"></i>
                </button>
                <button @click="myUploads = !myUploads" :class="{ 'is-primary': myUploads }" class="button">
                    My Uploads <i class="fa-regular fa-user"></i>
                </button>
            </div>
        </div>
        <div class="main">
            <Gallery v-if="reactionsToShow.length > 0" :reactionsRef="reactionsToShow" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .fa-folder,
    .fa-heart,
    .fa-user {
        padding-left: 10px;
    }

    @media (min-width: $desktop) {
        .layout {
            display: flex;
            gap: 20px;

            .main {
                flex-basis: 100%;
            }
        }
    }

    .my-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        .button {
            max-width: 250px;
        }
        @media (min-width: $desktop) {
            align-items: flex-start;
        }
        *:not(:last-child) {
            margin-bottom: 10px;
        }
    }
</style>
