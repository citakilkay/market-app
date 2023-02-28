import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MyCart {
    productIds: number[]
    userId: number
    cartTotalPrice: number
}

interface productData {
    id: number
    price: number
}

const initialState: MyCart = {
    productIds: JSON.parse(localStorage.getItem('myCartProcuductIds') || "[]"),
    userId: 0,
    cartTotalPrice: JSON.parse(localStorage.getItem('cartTotalPrice') || "0")
}

const myCartSlice = createSlice({
    name: 'myCart',
    initialState,
    reducers: {
        addToMyCart: (state, action: PayloadAction<productData>) => {
            state.productIds.push(action.payload.id)
            state.cartTotalPrice = state.cartTotalPrice + action.payload.price
            localStorage.setItem('cartTotalPrice', JSON.stringify(state.cartTotalPrice))
            localStorage.setItem('myCartProcuductIds', JSON.stringify(state.productIds))
        },
        removeFromMyCart: (state, action: PayloadAction<productData>) => {
            state.productIds = state.productIds.filter(i => i != action.payload.id)
            state.cartTotalPrice = state.cartTotalPrice - action.payload.price
            localStorage.setItem('cartTotalPrice', JSON.stringify(state.cartTotalPrice))
            localStorage.setItem('myCartProcuductIds', JSON.stringify(state.productIds))
        }
    }
})

export default myCartSlice.reducer
export const { addToMyCart, removeFromMyCart } = myCartSlice.actions