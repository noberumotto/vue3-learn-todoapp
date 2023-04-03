import { EmojiType } from "../enums/EmojiType";

export default interface ITodoGroupItem {
    id: number;
    icon: EmojiType;
    name: string;
    count: number;
    isEdit: boolean;
}