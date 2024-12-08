import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socketId: null, // Store only the socket ID or connection status
  isConnected: false, // Store connection status
};

const socketSlice = createSlice({
  name: 'socketio',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socketId = action.payload.socketId; // Store only socketId
      state.isConnected = action.payload.isConnected; // Store connection status
    },
    clearSocket: (state) => {
      state.socketId = null;
      state.isConnected = false;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
