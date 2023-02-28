import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MyFavorites {
    productIds: number[]
    userId: number
}

const initialState: MyFavorites = {
    productIds: JSON.parse(localStorage.getItem('myFavoritesProcuductIds') || "[]"),
    userId: 0
}

const myFavoritesSlice = createSlice({
    name: 'myFavorites',
    initialState,
    reducers: {
        addToMyFavorites: (state, action: PayloadAction<number>) => {
            state.productIds.push(action.payload)
            localStorage.setItem('myFavoritesProcuductIds', JSON.stringify(state.productIds))
        },
        removeFromMyFavorites: (state, action: PayloadAction<number>) => {
            state.productIds = state.productIds.filter(i => i != action.payload)
            localStorage.setItem('myFavoritesProcuductIds', JSON.stringify(state.productIds))
        }
    }
})

export default myFavoritesSlice.reducer
export const { addToMyFavorites, removeFromMyFavorites } = myFavoritesSlice.actions