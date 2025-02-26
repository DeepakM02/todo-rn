import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Task Slice ---
const taskSlice = createSlice({
  name: 'tasks',
  initialState: [] as any[], // Initial state for tasks (an empty array)
  reducers: {
    setTasks(state, action: PayloadAction<any[]>) {
      return action.payload; // Set tasks
    },
    addTask(state, action: PayloadAction<any>) {
      state.push(action.payload); // Add a new task
    },
    deleteTask(state, action: PayloadAction<string>) {
      return state.filter((task) => task.id !== action.payload); // Delete task by id
    },
  },
});

// --- Auth Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null as string | null,
    user: null as any | null,
    isAuthenticated: false,
  },
  reducers: {
    login(state, action: PayloadAction<{ token: string; user: any }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { setTasks, addTask, deleteTask } = taskSlice.actions;
export const { login, logout } = authSlice.actions;

// Export reducers
export default {
  tasks: taskSlice.reducer,
  auth: authSlice.reducer,
};
