<script setup lang="ts">

const props = defineProps<{ title: string, content: string, confirmText?: string, cancelText?: string, modelValue: boolean }>()

const emit = defineEmits(['update:modelValue', 'close'])

const action = (isConfirm: boolean) => {

    emit('update:modelValue', false);
    emit('close', isConfirm);
}
</script>

<template>
    <div class="modal" v-if="modelValue">
        <div class="masklayer"></div>
        <div class="main">
            <div class="title">{{ title }}</div>
            <div class="content">{{ content }}</div>

            <div class="action">
                <button @click="action(true)" class="confirm">{{ confirmText ?? "确定" }}</button>
                <button @click="action(false)">{{ cancelText ?? "取消" }}</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .masklayer {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        background: rgba($color: #000000, $alpha: .5);


    }

    .main {
        flex: .5;
        background: #f3f3f3;
        border-radius: .5em;
        padding: 1em;

        .title {
            font-size: 1.5em;
            font-weight: bold;
        }

        .content {
            margin-top: 1em;
        }

        .action {
            margin-top: 1em;
            text-align: right;

            button {
                background: #fbfbfb;
                outline: none;
                border: 1px solid #ccc;
                border-radius: .4em;
                padding: .5em 3em;
                margin: 0 .5em;
            }

            button:hover {
                background: #f6f6f6;
            }

            button:active {
                background: #ccc;
            }

            .confirm {
                background: #5e72c0;
                color: #fff;
                border: 1px solid #5263aa;

            }

            .confirm:hover {
                background: #4d5ea0;
            }

            .confirm:active {
                background: #3f4d85;
            }
        }
    }
}
</style>