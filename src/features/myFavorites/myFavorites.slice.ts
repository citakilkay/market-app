import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface myFavorites {
    productIds: number[]
    userId: number
}

const initialState: myFavorites = {
    productIds: [],
    userId: 0
}

const myFavoritesSlice = createSlice({
    name: 'myFavorites',
    initialState,
    reducers: {
        addToMyFavorites: (state, action: PayloadAction<number>) => {
            state.productIds.push(action.payload)
        },
        removeFromMyFavorites: (state, action: PayloadAction<number>) => {
            state.productIds = state.productIds.filter(i => i != action.payload)
        }
    }
})

export default myFavoritesSlice.reducer
export const { addToMyFavorites, removeFromMyFavorites } = myFavoritesSlice.actions