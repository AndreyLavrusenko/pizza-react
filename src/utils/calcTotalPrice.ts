import {IPizza} from "../models/IPizza";

export const calcTotalPrice = (items: IPizza[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
    }, 0)
}