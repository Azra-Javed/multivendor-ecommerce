import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { server } from "../../server";
import axios from "axios";

const initialState = {
  isLoading: true,
  event: null,
  allEvents: [],
  events: [],
  success: false,
  message: null,
  error: null,
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const eventSlice = createSliceWithThunks({
  name: "events",
  initialState,

  reducers: (create) => ({
    // create event
    createEvent: create.asyncThunk(
      async (newForm, { rejectWithValue }) => {
        try {
          const config = { headers: { "Content-Type": "multipart/form-data" } };

          const { data } = await axios.post(
            `${server}/event/create-event`,
            newForm,
            config
          );

          return data;
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || error.message
          );
        }
      },

      {
        pending: (state) => {
          state.isLoading = true;
        },

        fulfilled: (state, action) => {
          state.isLoading = false;
          state.event = action.payload.event;
          state.success = true;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.success = false;
        },
      }
    ),

    // get all events of a shop
    getAllEventsShop: create.asyncThunk(
      async (id, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(
            `${server}/event/get-all-events/${id}`
          );

          return data;
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || error.message
          );
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },

        fulfilled: (state, action) => {
          state.isLoading = false;
          state.events = action.payload.events;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),

    // delete event
    deleteEvent: create.asyncThunk(
      async (id, { rejectWithValue }) => {
        try {
          const { data } = await axios.delete(
            `${server}/event/delete-shop-event/${id}`,
            { withCredentials: true }
          );
          return data;
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || error.message
          );
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },

        fulfilled: (state, action) => {
          state.isLoading = false;
          state.message = action.payload.message;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),

    // get all events

    getAllEvents: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(`${server}/event/get-all-events`);

          return data;
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || error.message
          );
        }
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },

        fulfilled: (state, action) => {
          state.isLoading = false;
          state.allEvents = action.payload.events;
        },

        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      }
    ),
  }),
});

export const { createEvent, getAllEventsShop, deleteEvent, getAllEvents } =
  eventSlice.actions;
export default eventSlice.reducer;
