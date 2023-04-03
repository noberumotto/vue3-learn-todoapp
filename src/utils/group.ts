import { getGroupData, getTodoList, setGroupData } from "../utils/data";

const defaultTitleRegex = /无标题列表\(([0-9]*)\)/;

export const getDefaultGroupName = (): string => {
    const data = getGroupData();
    let maxNumber = 1;
    let numberArr: number[] = [];
    data.forEach((item) => {
        if (defaultTitleRegex.test(item.name)) {
            const regexArr = defaultTitleRegex.exec(item.name);
            const number = regexArr ? Number(regexArr[1]) : 1;
            if (numberArr.indexOf(number) == -1) {
                numberArr.push(number);
                maxNumber = maxNumber < number ? number : maxNumber;
            }
        }
    });

    let id = 1;
    maxNumber = maxNumber <= 1 ? 2 : maxNumber;

    for (let i = 1; i < maxNumber + 1; i++) {
        if (numberArr.indexOf(i) == -1) {
            id = i;
            break;
        }
    }
    if (numberArr.indexOf(id) != -1) {
        id = maxNumber + 1;
    }

    return "无标题列表(" + id + ")";

}

export const getCreateID = (): number => {
    const data = getGroupData();
    return Math.max(...data.map(o => o.id)) + 1;
}
