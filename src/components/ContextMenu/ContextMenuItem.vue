
<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from "vue";
import IMenuItem from "../../interfaces/IMenuItem";
import BaseEmoji from "../Base/BaseEmoji.vue";
const props = defineProps<{ menu: IMenuItem }>()
const emit = defineEmits(['menuClick'])

const isShowSubmenu = ref(false);
const x = ref(0);
const y = ref(0);
const menuItem = ref(null);

const onMenuClick = (item: IMenuItem) => {

    emit('menuClick', item);
}

const onEnter = () => {
    if (!props.menu.menu || !menuItem.value) {
        return;
    }

    isShowSubmenu.value = true;

    const el: HTMLElement = menuItem.value;
    const rect = el.getBoundingClientRect();

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    let left = rect.left + rect.width;
    let top = rect.top;

    if (left + rect.width >= innerWidth) {
        left = innerWidth - rect.width * 2;
    }
    if (top > innerHeight) {
        top = innerHeight;
    }

    x.value = left;
    y.value = top;
}
</script>

<template>
    <div ref="menuItem" class="contextmenu-item" @mouseenter="onEnter" @mouseleave="isShowSubmenu = false"
        @click.stop="onMenuClick(menu)">
        <div class="icon">
            <BaseEmoji :emoji="menu.icon" />
        </div>
        <div class="title">{{ menu.title }}</div>
        <div class="more">
            <div class="more-icon" v-if="menu.menu">
                ➡
            </div>
            <div class="submenu" v-if="menu.menu && isShowSubmenu" :style="{ left: x + 'px', top: y + 'px' }">
                <ContextMenuItem @click.stop="onMenuClick(item)" v-for="(item, index) in menu.menu" :key="index"
                    :menu="item" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.contextmenu-item {
    padding: .6em 1em;
    display: flex;
    align-items: center;
    border-radius: .5em;

    .icon {
        margin-right: .5em;
        width: 1.5em;
        text-align: center;
        pointer-events: none;
    }

    .title {
        flex: 1;
        pointer-events: none;
    }

    .more {
        width: 2.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .more-icon {
            margin: 0;
            flex: 1;
            text-align: center;
        }

        .submenu {
            position: fixed;
            // left: 3.5em;
            // top: -.5em;
            // width: 12em;
            max-height: 15em;
            overflow-y: auto;
            top: 0;
            background: #fff;
            display: flex;
            border-radius: .5em;
            flex-direction: column;
            border: 1px solid #dfdfdf;
        }
    }
}

.contextmenu-item:hover {
    background: #f5f6f7;
}
</style>