import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const userSlice = createSliceWithThunks({
  name: "user",
  initialState,
  reducers: (create) => ({
    clearErrors: create.reducer((state) => {
      state.error = null;
    }),

    // async thunk
    loadUser: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(`${server}/user/getuser`, {
            withCredentials: true,
          });
          return data.user;
        } catch (error) {
          return rejectWithValue(error.response.data.message);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.user = action.payload;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.error = action.payload;
        },
      }
    ),

    // update user information
    updateUserInformation: create.asyncThunk(
      async ({ name, email, password, phoneNumber }, { rejectWithValue }) => {
        try {
          const { data } = await axios.put(
            `${server}/user/update-user-info`,
            {
              name,
              email,
              password,
              phoneNumber,
            },
            { withCredentials: true }
          );
          console.log(data.user);
          return data.user;
        } catch (error) {
          return rejectWithValue(error.response.data.message);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      }
    ),
  }),
});

export const { clearErrors, loadUser, updateUserInformation } =
  userSlice.actions;

export default userSlice.reducer;
