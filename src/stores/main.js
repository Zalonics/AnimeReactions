import { defineStore } from "pinia"
import { useCollection } from "../composables/getCollection"

export const useMainStore = defineStore("main", {
    state() {
        return {
            reactions: [],
        }
    },
    actions: {
        async populateReactions() {
            this.reactions = await useCollection("reactions")
        },
    },
})
