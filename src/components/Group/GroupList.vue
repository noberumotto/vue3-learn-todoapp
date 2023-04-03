<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { EmojiType } from '../../enums/EmojiType';
import ITodoGroupItem from '../../interfaces/ITodoGroup';
import { delTodoList, getGroupData, setGroupData } from '../../utils/data';
import { getCreateID, getDefaultGroupName } from '../../utils/group';
import GroupListItem from './GroupListItem.vue';
import ContextMenu from '../ContextMenu/ContextMenu.vue';
import IMenuItem from '../../interfaces/IMenuItem';
import ITodoListItem from '../../interfaces/ITodoListItem';
import Modal from '../Modal/Modal.vue';

const props = defineProps<{ data: ITodoGroupItem[], selectedGroupId: number }>()
const emit = defineEmits(['update:selectedGroupId'])

const isShowContextMenu2 = ref(false);
const contextMenuEvent = ref();
const menu = ref();
const isShowDelModal = ref(false);
const modalContent = ref('');

let menuSelectedItem: ITodoGroupItem;
let delSelectedItem: ITodoGroupItem;

const editDone = (item: ITodoGroupItem) => {
    item.isEdit = false;
    saveData();
}

const addGroup = () => {
    const name = getDefaultGroupName();
    const id = getCreateID();
    const newGroup: ITodoGroupItem = {
        id: id,
        name: name,
        count: 0,
        isEdit: true,
        icon: EmojiType.List
    };

    props.data.push(newGroup);

    saveData();
}

const saveData = () => {
    setGroupData(props.data);
}

const updateGroupId = (id: number) => {
    emit('update:selectedGroupId', id);
}

const onMenuClick = (item: IMenuItem) => {
    if (!menuSelectedItem) {
        return;
    }
    switch (item.key) {
        case "rename":
            menuSelectedItem.isEdit = true;
            break;
        case "del":
            delSelectedItem = menuSelectedItem;
            showDelModal();
            break;
    }
}

const delGroup = (groupId: number) => {
    const index = props.data.findIndex(item => item.id == groupId);
    if (index != -1) {
        props.data.splice(index, 1);

        delTodoList(groupId);
        saveData();

        if (groupId == props.selectedGroupId) {
            updateGroupId(props.data[0].id);
        }
    }
}

const onItemContextMenuOpen = (event: PointerEvent, item: ITodoGroupItem) => {
    contextMenuEvent.value = event;
    isShowContextMenu2.value = true;

    menuSelectedItem = item;

    loadMenu();
}

const loadMenu = () => {
    menu.value = [

        {
            id: "1",
            title: "重命名",
            icon: EmojiType.Write,
            key: "rename"
        },
        {
            id: "1",
            title: "删除列表",
            icon: EmojiType.Error,
            key: "del"
        },
    ];
}

const onDelGrupModalClosed = (confirm: boolean) => {
    if (confirm) {
        delGroup(delSelectedItem.id);
    }
}

const showDelModal = () => {
    isShowDelModal.value = true;
    modalContent.value = "将永久删除列表 “" + delSelectedItem.name + "” 及列表中所有任务？";
}
</script>

<template>
    <div class="group-list">
        <Modal title="删除列表" :content="modalContent" v-model="isShowDelModal" @close="onDelGrupModalClosed" />

        <ContextMenu v-model:is-open="isShowContextMenu2" :event="contextMenuEvent" :menu="menu"
            @menu-click="onMenuClick" />

        <div class="list">
            <GroupListItem @click="updateGroupId(item.id)" @edit-done="editDone(item)" v-for="(item, index) in data"
                :key="index" :item="item" :selected="selectedGroupId == item.id"
                @click.right="$event => onItemContextMenuOpen($event, item)" />
        </div>
        <div class="action">
            <div class="add" @click="addGroup()">
                <span>➕</span>
                <span class="name">新建列表</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.group-list {
    cursor: default;
    display: flex;
    flex-direction: column;
    user-select: none;

    .list {
        flex: 1;
        overflow-y: scroll;
        padding-right: 1em;
    }

    .action {
        justify-self: flex-end;
        .add{
            padding: .6em .4em;
            border-radius: .4em;
            .name{
                margin-left: .5em;
            }
        }
        .add:hover{
            background: #eaeaea;
        }
    }
}
</style>