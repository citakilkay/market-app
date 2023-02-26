import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MyCart {
    productIds: number[]
    userId: number
}

const initialState: MyCart = {
    productIds: [],
    userId: 0
}

const myCartSlice = createSlice({
    name: 'myCart',
    initialState,
    reducers: {
        addToMyCart: (state, action: PayloadAction<number>) => {
            state.productIds.push(action.payload)
        },
        removeFromMyCart: (state, action: PayloadAction<number>) => {
            state.productIds = state.productIds.filter(i => i != action.payload)
        }
    }
})

export default myCartSlice.reducer
export const { addToMyCart, removeFromMyCart } = myCartSlice.actions