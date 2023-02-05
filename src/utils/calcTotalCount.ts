import {IPizza} from "../models/IPizza";

export const calcTotalCount = (items: IPizza[]) => {
    return items.reduce((sum, obj) => {
        // @ts-ignore
        return obj.count + sum
    }, 0)
}