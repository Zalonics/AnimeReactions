<script setup>
    import SearchTags from "@/components/UI/SearchTags.vue"
    import Tags from "@/components/ReactionPage/Tags.vue"
    import ReactionThumbnail from "@/components/Global/ReactionThumbnail.vue"

    import { defineProps, ref, onMounted } from "vue"
    import { saveAs } from "file-saver"

    import { useGetDocById } from "../composables/getDocumentById"

    const props = defineProps({
        id: String,
    })

    const reaction = ref(null)
    onMounted(async () => {
        reaction.value = await useGetDocById(props.id)
    })

    const downloadImage = (url, id) => {
        saveAs(url, `${id}.jpg`)
    }
</script>

<template>
    <SearchTags />
    <div v-if="reaction" class="layout layout--sidebar">
        <section class="main">
            <ReactionThumbnail :reaction="reaction" :maxHeight="'70vh'" :height="'auto'" :width="'100%'" />
            <p class="favorite-text">Press [<span class="has-text-danger"> f </span>] to toggle Favorite</p>
            <button
                @click="downloadImage(reaction?.imagePath, reaction?.id)"
                class="button button--download is-normal is-success block"
            >
                Download
            </button>
        </section>
        <section class="sidebar">
            <Tags :tags="reaction?.tags" />
            <p class="uploader block is-size-6">
                Uploader: <span class="has-text-link is-clickable">{{ reaction?.uploader }}</span>
            </p>
        </section>
    </div>
    <div v-else>
        <progress class="progress is-small is-primary" max="100">15%</progress>
    </div>
</template>

<style lang="scss" scoped>
    .favorite-text {
        color: rgba(0, 0, 0, 0.6);
    }
    .button--download {
        margin-top: 20px;
    }
    .layout {
        @media (min-width: $tablet) {
            display: flex;
            .main {
                padding: 10px;
                margin: 0 auto;
                max-width: 70%;
            }
            .sidebar {
                position: relative;
                padding: 10px;
                flex-basis: 100%;
            }
        }
    }
</style>
