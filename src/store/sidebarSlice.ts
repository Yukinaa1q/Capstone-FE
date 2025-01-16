import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: {activeNav: string} = {
  activeNav: "ac"
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeNav(state, action: PayloadAction<string>) {
      state.activeNav = action.payload
    }
  }
})

export const { changeNav } = sidebarSlice.actions
export default sidebarSlice.reducer