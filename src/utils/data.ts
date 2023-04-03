import ITodoGroupItem from "../interfaces/ITodoGroup";
import ITodoListItem from "../interfaces/ITodoListItem";

export const getGroupData = (): ITodoGroupItem[] => {
    const dataStr = localStorage.getItem('group-data') ?? '[{"id":1,"name":"任务","icon":1,"count":0,"isEdit":false}]';
    let data: ITodoGroupItem[] = JSON.parse(dataStr);
    data.map((item) => {
        item.isEdit = false;
        return item;
    });

    return data;
}

export const setGroupData = (data: ITodoGroupItem[]) => {
    localStorage.setItem('group-data', JSON.stringify(data));
}

export const getGroup = (id: number) => {
    const data = getGroupData();
    const result = data.find((item) => {
        return item.id == id;
    });

    return result;
}

export const getTodoList = (cid: number): ITodoListItem[] => {
    const dataStr = localStorage.getItem('todolist-data') ?? '[]';
    let data: ITodoListItem[] = JSON.parse(dataStr);
    data = data.filter(item => item.cid == cid);
    return data;
}

export const setTodoList = (cid: number, data: ITodoListItem[]) => {
    const dataStr = localStorage.getItem('todolist-data') ?? '[]';
    let localData: ITodoListItem[] = JSON.parse(dataStr);
    localData = localData.filter(item => item.cid != cid);
    localData = localData.concat(data);
    localStorage.setItem('todolist-data', JSON.stringify(localData));
}

export const delTodoList = (cid: number) => {
    const dataStr = localStorage.getItem('todolist-data') ?? '[]';
    let data: ITodoListItem[] = JSON.parse(dataStr);
    data = data.filter(item => item.cid != cid);
    localStorage.setItem('todolist-data', JSON.stringify(data));

}