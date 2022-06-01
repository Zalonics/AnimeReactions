<script setup>
    import { ref } from "vue"

    const fileName = ref(null)
    const previewFiles = (e) => {
        fileName.value = e.target.files[0].name
    }
</script>

<template>
    <div class="upload">
        <div class="file has-name is-boxed">
            <label class="file-label">
                <input class="file-input" type="file" name="resume" @change="previewFiles" />
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                </span>
                <span v-if="fileName" class="file-name">{{ fileName }}</span>
            </label>
        </div>
    </div>
</template>
