<script setup lang="ts">
import { EmojiType } from '../../enums/EmojiType';


defineProps<{ emoji: EmojiType }>()

</script>

<template>
    <span v-if="emoji == EmojiType.Star">✨</span>
    <span v-if="emoji == EmojiType.Coffee">☕</span>
    <span v-if="emoji == EmojiType.List">📋</span>
    <span v-if="emoji == EmojiType.Capsule">💊</span>
    <span v-if="emoji == EmojiType.Pin">📌</span>
    <span v-if="emoji == EmojiType.Add">➕</span>
    <span v-if="emoji == EmojiType.Music">🎶</span>
    <span v-if="emoji == EmojiType.UnDone">✔</span>
    <span v-if="emoji == EmojiType.Done">🔘</span>
    <span v-if="emoji == EmojiType.Error">❌</span>
    <span v-if="emoji == EmojiType.Remove">🗑</span>
    <span v-if="emoji == EmojiType.Write">✍</span>
</template>

<style lang="scss" scoped></style>