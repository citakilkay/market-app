import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CommonStates {
    darkmode: boolean
}

const initialState: CommonStates = {
    darkmode: false
}

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {
        toggleDarkmode: (state, actions: PayloadAction<void>) => {
            state.darkmode = !state.darkmode
        }
    }
})

export default commonSlice.reducer
export const { toggleDarkmode } = commonSlice.actions