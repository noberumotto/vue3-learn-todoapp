<script setup lang="ts">
import { ref } from 'vue';
import ITodoGroupItem from '../../interfaces/ITodoGroup';
import BaseEmoji from '../Base/BaseEmoji.vue';
import { getGroupData, setGroupData } from '../../utils/data';

const props = defineProps<{ item: ITodoGroupItem, selected: boolean }>()

</script>

<template>
    <div :class="{ active: selected, 'group-list-item': true }" class="group-list-item">
        <div class="active-mark" :style="{
            opacity: selected ? 100 : 0
        }"></div>
        <div class="icon">
            <BaseEmoji :emoji="item.icon" />
        </div>
        <div class="name" v-if="!item.isEdit">
            {{ item.name }}
        </div>
        <div class="edit" v-if="item.isEdit">
            <input type="text" autofocus v-model="item.name" @blur="$emit('editDone')" @keyup.enter="$emit('editDone')" />
        </div>
        <div class="count" v-if="item.count > 0">{{ item.count }}</div>
    </div>
</template>

<style lang="scss" scoped>
.active {
    background: #eaeaea;
}

.group-list-item {
    display: flex;
    align-items: center;
    padding: .8em 0;
    border-radius: .4em;
    cursor: default;
    margin: .2em 0;

    .active-mark {
        width: .2em;
        height: 1em;
        background: #5e72c0;
        margin-right: .3em;
        border-radius: .4em;

    }

    .icon {
        margin-right: .5em;
    }

    .edit {
        flex: 1;
        display: flex;

        input {
            flex: 1;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: .4em;
            padding: 0;
            padding: .4em .3em;
        }
    }

    .count {
        margin-left: 2em;
        background: #e4e4e4;
        border-radius: 10em;
        padding: 0 .5em;
        font-size: .8em;
    }
}

.group-list-item:hover {
    background: #e9e9e9;
}
</style>