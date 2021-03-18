import { addProduct, removeProduct } from '../action/storageAction'

export const orderLocalStorage = store => next => action => {

    if ([addProduct.type, removeProduct.type].includes(action.type)) {
        next(action);
        const nextState = store.getState();
        try {
            localStorage.setItem('orderList', JSON.stringify(nextState.storage));
        } catch (e) {
            console.log('ERROR SAVING STATE')
        }
        return;
    }
    return next(action);
};