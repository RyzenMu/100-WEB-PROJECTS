import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username:'',
    password1:'',
    password2: ''
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        createUser(state, action){
            state.username = action.payload.username;
            state.password1 = action.payload.password1;
            state.password2 = action.payload.password2;
        },
        updateUser(state, action){},
        deleteUser(state, action){}
    }
});

export const {createUser, updateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;