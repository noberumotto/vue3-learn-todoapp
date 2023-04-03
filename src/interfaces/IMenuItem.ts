import { EmojiType } from "../enums/EmojiType";

export default interface IMenuItem {
    id: string;
    title: string;
    icon: EmojiType;
    menu?: IMenuItem[];
    key: string;
}