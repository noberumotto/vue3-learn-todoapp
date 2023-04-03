
export default interface ITodoListItem {
    id: number;
    /**
     * 分组id
     */
    cid: number;
    content: string;
    isDone: boolean;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 更新时间
     */
    time?: number;
}