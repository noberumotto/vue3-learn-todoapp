<script setup lang="ts">

import { computed, onMounted, ref, toRaw, watch } from "vue";
import ITodoGroupItem from "../../interfaces/ITodoGroup";
import { getGroup, getGroupData, getTodoList, setTodoList } from "../../utils/data";
import BaseEmoji from "../Base/BaseEmoji.vue";
import { EmojiType } from "../../enums/EmojiType";
import ITodoListItem from "../../interfaces/ITodoListItem";
import TodoListItem from "./TodoListItem.vue";
import TodoListItemDetail from "./TodoListItemDetail.vue";
import { getCreateTodoID } from "../../utils/todo";
import { TodoType } from "../../enums/TodoType";
import ContextMenu from "../ContextMenu/ContextMenu.vue";
import IMenuItem from "../../interfaces/IMenuItem";
import Modal from "../Modal/Modal.vue";

const props = defineProps<{ groupId: number }>()
const emit = defineEmits(['onUpdated'])

const value: ITodoGroupItem = { id: 1, name: "", icon: 1, count: 0, isEdit: false };

//  当前分组
const group = ref(value);

//  是否新增可视状态
const isAdd = ref(false);

//  新增输入内容
const addInputValue = ref('');

//  当前分组数据
const data: ITodoListItem[] = [];
const todoList = ref(data);

//  选中项
const selectedTodoItem = ref<ITodoListItem>();

const isShowDoneList = ref(false);
const isShowContextMenu = ref(false);
const contextMenuEvent = ref();
const isShowDelModal = ref(false);
const modalContent = ref('');

let groupMenuList: IMenuItem[] = [];

const menu = ref();
let menuSelectedItem: ITodoListItem;
let delSelectedItem: ITodoListItem;

onMounted(() => {
    loadData();
})
watch(
    () => props.groupId,
    (newValue, oldValue) => {
        selectedTodoItem.value = undefined;
        loadData();
    }
)
const doneCount = computed(() => {
    return todoList.value.filter(item => item.isDone).length;
})

const loadData = () => {
    const g = getGroup(props.groupId);
    if (g) {
        group.value = g;

        todoList.value = getTodoList(g.id);
    }
}

const addTask = () => {
    const content = addInputValue.value;
    if (content) {
        addInputValue.value = '';
        const todoId = getCreateTodoID();

        const item: ITodoListItem = {
            id: todoId,
            cid: props.groupId,
            content: content,
            isDone: false,
            time: new Date().getTime()
        };
        todoList.value.push(item);
        saveData();
    }
}

const saveData = () => {
    setTodoList(props.groupId, toRaw(todoList.value));
    emit('onUpdated');
    console.log("test")
}

const onDetailChanged = () => {
    selectedTodoItem.value!.time = new Date().getTime();
    saveData();
}

const onDelete = (data: ITodoListItem) => {
    delSelectedItem = data;
    showDelModal();
}



const onItemContextMenuOpen = (event: MouseEvent, item: ITodoListItem) => {
    contextMenuEvent.value = event;
    isShowContextMenu.value = true;

    menuSelectedItem = item;

    loadMenu();
}

const loadMenu = () => {
    const groupData = getGroupData();

    let mark: IMenuItem = {
        id: "mark",
        icon: menuSelectedItem.isDone ? EmojiType.Done : EmojiType.UnDone,
        title: menuSelectedItem.isDone ? "标记为未完成" : "标记为已完成",
        key: "mark"
    };

    groupMenuList = [];
    groupData.forEach((item) => {
        if (item.id != group.value.id) {
            groupMenuList.push({
                id: item.id.toString(),
                icon: item.icon,
                title: item.name,
                key: "group"
            });
        }
    });


    menu.value = [
        mark
        ,
        {
            id: "1",
            title: "移动到",
            icon: EmojiType.Add,
            menu: groupMenuList,
        },
        {
            id: "1",
            title: "删除任务",
            icon: EmojiType.Error,
            key: "del"
        },
    ];

    // console.log(groupMenuList,menu[0])
}

const onMenuClick = (item: IMenuItem) => {
    if (!menuSelectedItem) {
        return;
    }
    const index = todoList.value.findIndex(item => item.id == menuSelectedItem.id);

    switch (item.key) {
        case "mark":
            menuSelectedItem.isDone = !menuSelectedItem.isDone;
            saveData();

            break;
        case "group":
            if (item.id == group.value.id.toString()) {
                return;
            }
            menuSelectedItem.cid = Number(item.id);
            saveData();

            if (index != -1) {
                todoList.value.splice(index, 1);
            }
            break;
        case "del":
            delSelectedItem = menuSelectedItem;
            showDelModal();
            break;
    }

}
const onDelModalClosed = (confirm: boolean) => {
    if (confirm) {
        const index = todoList.value.findIndex(item => item.id == delSelectedItem.id);
        if (index != -1) {
            todoList.value.splice(index, 1);
            saveData();
        }
    }
}

const showDelModal = () => {
    modalContent.value = "将永久删除 “" + delSelectedItem.content + "”？";
    isShowDelModal.value = true;
}
</script>

<template>
    <div class="todo-container">
        <Modal title="删除任务" :content="modalContent" v-model="isShowDelModal" @close="onDelModalClosed" />

        <ContextMenu v-model:is-open="isShowContextMenu" :event="contextMenuEvent" :menu="menu" @menu-click="onMenuClick" />
        <div class="todo-list">
            <div class="title">
                <BaseEmoji :emoji="group?.icon" />
                {{ group?.name }}
            </div>

            <div class="list">
                <div class="normal-list">
                    <TodoListItem :data="item" v-for="(item, index) in todoList" :key="index"
                        @click="selectedTodoItem = item" :type="TodoType.Normal"
                        @click.right="($event: MouseEvent) => onItemContextMenuOpen($event, item)" @updated="saveData" />
                </div>
                <div class="btn" v-if="doneCount > 0">
                    <button @click="isShowDoneList = !isShowDoneList">
                        <div :class="{ icon: true, expand: isShowDoneList, unexpand: !isShowDoneList }">👉</div>已完成<span
                            class="count">{{ doneCount
                            }}</span>
                    </button>
                </div>
                <div class="done-list" v-if="isShowDoneList">

                    <TodoListItem :data="item" v-for="(item, index) in todoList" :key="index"
                        @click="selectedTodoItem = item" :type="TodoType.Done"
                        @click.right="($event: MouseEvent) => onItemContextMenuOpen($event, item)" @updated="saveData" />
                </div>
            </div>

            <div class="add-task" @click="isAdd = true">
                <BaseEmoji :emoji="EmojiType.Add" />
                <!-- <span v-if="!isAdd">{{ addInputValue ? addInputValue : '添加任务' }} </span> -->
                <input autofocus type="text" v-model="addInputValue" placeholder="添加任务" @keyup.enter="addTask()" />
            </div>
        </div>

        <div class="detail" v-if="selectedTodoItem">
            <div class="header">
                <div class="close" @click="selectedTodoItem = undefined">✖</div>
            </div>
            <TodoListItemDetail :data="selectedTodoItem" @edit-changed="onDetailChanged()" @on-delete="onDelete" />
        </div>

    </div>
</template>


<style lang="scss" scoped>
@keyframes expand {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(90deg)
    }
}

@keyframes unexpand {
    0% {
        transform: rotate(90deg)
    }

    100% {
        transform: rotate(0deg)
    }
}

.todo-container {
    display: flex;
    // flex-direction: column;
    flex: 1;

    .todo-list {
        display: flex;
        flex-direction: column;
        flex: 3;
        padding: 1em;

        .list {
            margin-top: 1.5em;
            flex: 1;

            .btn {
                .expand {
                    animation: expand .5s forwards;
                }

                .unexpand {
                    animation: unexpand .5s forwards;

                }

                button {
                    border: none;
                    padding: .6em;
                    border-radius: .4em;
                    background: rgba($color: #fff, $alpha: .6);
                    margin: .5em 0;
                    display: flex;
                    align-items: center;
                }

                button:hover {
                    background: rgba($color: #fff, $alpha: 1);
                }

                .icon {
                    margin-right: .5em;
                }

                .count {
                    margin: 0 .5em;
                }
            }
        }

        .title {
            font-size: 1.4em;
            font-weight: bold;
            color: #fff;
        }

        .add-task {
            // padding: .6em;
            border-radius: .4em;
            background: rgba($color: #f5f6fc, $alpha: .7);
            display: flex;
            align-items: center;
            padding-left: 1em;

            input {
                flex: 1;
                // margin-left: .5em;
                border: none;
                padding: 0;
                background: none;
                padding: 1em .5em;
            }

            // span {
            //     margin-left: .5em;
            //     padding: .5em;
            // }
        }

        .add-task:hover {
            background: rgba($color: #f5f6fc, $alpha: 1);

        }
    }

    .detail {
        flex: 1;
        background: #fafafa;
        padding: 1em;
        display: flex;
        flex-direction: column;
        border-left: 1px solid #ccc;

        .header {
            display: flex;
            justify-content: flex-end;

            .close {
                width: 3em;
                height: 3em;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: .5em;
            }

            .close:hover {
                background: #f5f6fc;
            }
        }
    }
}
</style>