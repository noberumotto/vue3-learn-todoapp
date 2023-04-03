<script setup lang="ts">
import { ref, toRaw } from 'vue';
import GroupList from './components/Group/GroupList.vue';
import TodoList from './components/TodoList/TodoList.vue';
import { getGroupData, getTodoList, setGroupData } from './utils/data';

const localData = getGroupData();

const group = ref(localData);
const selectedGroupId = ref(localData[0].id);

const onTodoUpdated = () => {
  updateGroupData();
}

const updateGroupData = () => {

  group.value.map((item) => {
    item.count = getTodoList(item.id).filter(item => !item.isDone).length;
    return item;
  });

  setGroupData(toRaw(group.value));
}
</script>

<template>
  <div class="todo" oncontextmenu="return false">
    <div class="nav">
      <GroupList :data="group" v-model:selected-group-id="selectedGroupId" class="group" />
    </div>

    <div class="list">
      <TodoList :group-id="selectedGroupId" @on-updated="onTodoUpdated()" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f3f3f3;
  display: flex;


  .nav {
    width: 20em;
    display: flex;
    padding: 1em;

    .group {
      flex: 1;
    }
  }

  .list {
    // padding: 1em;
    flex: 1;
    background: #5e72c0;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 1em;
  }
}
</style>
