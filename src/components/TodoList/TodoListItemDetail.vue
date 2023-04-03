<script setup lang="ts">

import { onMounted, ref, toRaw, watch } from "vue";
import ITodoGroupItem from "../../interfaces/ITodoGroup";
import { getGroup, getTodoList, setTodoList } from "../../utils/data";
import { EmojiType } from "../../enums/EmojiType";
import ITodoListItem from "../../interfaces/ITodoListItem";
import { timeStampToString } from "../../utils/time";
const props = defineProps<{ data: ITodoListItem }>()
const emit = defineEmits(['editChanged', 'onDelete'])
const mask = () => {
    props.data.isDone = !props.data.isDone;
    emit('editChanged');
}


const onDelete = () => {
    emit('onDelete', props.data);
}
</script>

<template>
    <div class="todo-detail">
        <div class="list">
            <div class="item">
                <div class="mark" @click="mask()">
                    <div class="done" v-if="data.isDone">✔</div>
                </div>
                <div class="edit">
                    <textarea placeholder="做点什么..." @blur="$emit('editChanged')" style="font-size: 1.5em;"
                        v-model="data.content" />
                </div>
            </div>
            <div class="item">
                <div class="edit">
                    <textarea @blur="$emit('editChanged')" placeholder="添加备注" v-model="data.remark" />
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="date" v-if="data.time">
                {{ timeStampToString(data.time, (data.isDone ? "完成于" : "更新于") + " y年m月d日 h时i分") }}
            </div>
            <div class="del" @click="onDelete()">🗑</div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.todo-detail {
    display: flex;
    flex-direction: column;
    flex: 1;

    .list {
        flex: 1;

        .item {
            border: 1px solid #ececec;
            border-radius: .4em;
            padding: 1em;
            margin-top: 1em;
            display: flex;
            background: #fdfdfd;

            .mark {
                width: 1.6em;
                height: 1.6em;
                background: #ececec;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 1.6em;
                margin-right: .5em;

                .done {
                    width: 1.6em;
                    height: 1.6em;
                    display: flex;

                    align-items: center;
                    justify-content: center;
                    border-radius: 1.6em;
                    font-size: .8em;
                    color: #fff;
                    background: #4da864;
                }
            }

            .mark:hover {
                background: #4da864;
            }

            .edit {
                display: flex;
                flex: 1;

                textarea {
                    outline: none;
                    flex: 1 1;
                    border: none;
                    background: none;
                    resize: none;
                }
            }
        }
    }

    .footer {
        border-top: 1px solid #ececec;
        padding-top: 1em;
        display: flex;
        justify-content: flex-end;
        position: relative;
        align-items: center;

        .date {
            position: absolute;
            left: 0;
            right: 0;
            text-align: center;
        }

        .del {
            z-index: 2;
            width: 2.5em;
            height: 2.5em;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: .4em;
            font-size: 1.2em;
        }

        .del:hover {
            background: #d43939;
            color: #ececec;
        }

    }


}
</style>