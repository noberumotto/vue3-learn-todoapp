<script setup lang="ts">

import { onMounted, ref, toRaw, watch } from "vue";
import ITodoGroupItem from "../../interfaces/ITodoGroup";
import { getGroup, getTodoList, setTodoList } from "../../utils/data";
import { EmojiType } from "../../enums/EmojiType";
import ITodoListItem from "../../interfaces/ITodoListItem";
import { TodoType } from "../../enums/TodoType";

const props = defineProps<{ data: ITodoListItem, type: TodoType }>()
const emit = defineEmits(['updated'])

//  是否新增可视状态
const isEdit = ref(false);

const mask = () => {
    props.data.isDone = !props.data.isDone;
    emit('updated');
}



</script>

<template>
    <div :class="{ item: true, done: data.isDone }"
        v-if="(type == TodoType.Normal && !data.isDone) || (type == TodoType.Done && data.isDone)">
        <div class="mark" @click="mask()">
            <div class="normal" v-if="!data.isDone"></div>

            <div class="done" v-if="data.isDone">✔</div>
        </div>
        <div class="text">{{ data.content }}</div>
    </div>
</template>


<style lang="scss" scoped>
.done {
    .text {
        text-decoration-line: line-through;
    }
}

.item {
    padding: .6em;
    border-radius: .4em;
    background: rgba($color: #fff, $alpha: .85);
    margin: .5em 0;
    display: flex;
    align-items: center;
    .text{
        margin-left: 1em;
    }
    .mark {
        // width: 1.6em;
        // height: 1.6em;

        // border-radius: 1.6em;
        margin-right: .5em;
        cursor: pointer;

        .normal {
            width: 1.2em;
            height: 1.2em;
            border-radius: 1.6em;
            border: .2em solid #5e5f60;
            font-size: .8em;
        }

        .normal:hover {
            border-color: #4da864;
        }

        .done {
            width: 1.2em;
            height: 1.2em;
            border-radius: 1.6em;
            border: .2em solid #4da864;
            background: #4da864;
            font-size: .8em;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    // .mark:hover {
    //     background: #4da864;
    // }
}

.item:hover {
    background: rgba($color: #fff, $alpha: 1);
}
</style>