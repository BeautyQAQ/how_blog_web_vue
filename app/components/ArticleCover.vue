<template><img v-if="src && !failed" :src="src" :alt="alt" loading="lazy" decoding="async" @error="failed = true" /></template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ src?: string | null; alt?: string }>(), { src: '', alt: '' })
const failed = ref(false)
watch(() => props.src, () => { failed.value = false })
</script>
