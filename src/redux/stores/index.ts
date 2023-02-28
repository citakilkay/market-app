import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import myCartSlice from "../features/myCart/myCart.slice";
import myFavoritesSlice from "../features/myFavorites/myFavorites.slice";

const store = configureStore({
    reducer: {
        myCart: myCartSlice,
        myFavorites: myFavoritesSlice
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector