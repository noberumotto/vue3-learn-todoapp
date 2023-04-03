
<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from "vue";
import IMenuItem from "../../interfaces/IMenuItem";
import ContextMenuItem from "./ContextMenuItem.vue";
const props = defineProps<{ isOpen: boolean, event: PointerEvent, menu?: IMenuItem[] }>()
const emit = defineEmits(['update:isOpen', 'menuClick'])

const contextMenu = ref(null);

const left = ref(0);
const top = ref(0);
const opacity = ref(0);

watch(
    () => props.isOpen, () => {
        if (props.isOpen) {
            const innerWidth = window.innerWidth;
            const innerHeight = window.innerHeight;

            let x = props.event.clientX;
            let y = props.event.clientY;

            opacity.value = 0;

            setTimeout(() => {
                const el: any = contextMenu.value;
                const width = el.offsetWidth;
                const height = el.offsetHeight;

                if (width + x > innerWidth) {
                    x = innerWidth - width;
                }
                if (height + y > innerHeight) {
                    y = innerHeight - height;
                }



                left.value = x;
                top.value = y;
                opacity.value = 100;

                window.addEventListener('mousedown', onMouseDown);
            }, 1);


        }
    }
)

const onMenuClick = (menu: IMenuItem) => {
    emit('menuClick', menu);
    close();
}
const close = () => {
    emit('update:isOpen', false);
    window.removeEventListener('mousedown', onMouseDown);
}

const onMouseDown = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    if (event.target instanceof HTMLElement) {
        const className = event.target.className;

        if (className.indexOf("contextmenu-item") != -1) {

        }
        else {
            close();
        }
    }
    else {
        close();

    }
}
// window.onmousedown = (event) => {

// }


</script>

<template>
    <div ref="contextMenu" v-if="isOpen" class="context-menu"
        :style="{ left: left + 'px', top: top + 'px', opacity: opacity }">
        <ContextMenuItem v-for="(item, index) in menu" :menu="item" :key="index" @menu-click="onMenuClick" />

    </div>
</template>

<style lang="scss" scoped>
.context-menu {
    position: fixed;
    background: #fff;
    z-index: 9999;
    display: flex;
    border-radius: .5em;
    flex-direction: column;
    border: 1px solid #ccc;
    box-shadow: rgba($color: #000000, $alpha: .1) 0 0 .5em .2em;
}
</style>