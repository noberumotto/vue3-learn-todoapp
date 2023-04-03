export const getCreateTodoID = (): number => {
    const idIndex = localStorage.getItem('todo-id-index') ?? 0;
    let id = Number(idIndex) + 1;
    localStorage.setItem('todo-id-index', id.toString());
    return id;
}