import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const pricingUrl = "/dashboard/admin/pricing";

// add

export const addRoomPricing = createAsyncThunk(
  "roomPricing/addRoomPricing",
  async (payload) => {
    const response = await Api.post(pricingUrl, payload);
    return response.data;
  }
)


const initialState = {
  roomPricings: [
    // {
    //   "id": "1",
    //   "title": "Premium",
    //   "description": "You will get these benefits",
    //   "rate": "10000",
    //   "duration": "Month",
    //   "currency": "NPR",
    //   "features": ["Two time khana", "Garam Pani se nahahna", "Fir Sone k liye chadar or Tanna"]
    // }
  ],
  title: "",
  description: "",
  rate: "",
  duration: "Month",
  currency: "NPR",
  features: [],
  singlePricingId: "",

}


const roomPricingSlice = createSlice({
  name: "roomPricing",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;

    },
    setDescription: (state, action) => {
      state.description = action.payload;

    },
    setRate: (state, action) => {
      state.rate = action.payload;

    },
    setCurrency: (state, action) => {
      state.currency = action.payload;

    },
    setDuration: (state, action) => {
      state.duration = action.payload;

    },
    setPricing: (state, action) => {
      const newData = [...action.payload.oldPricingData, action.payload.pricingData];
      state.roomPricings = newData;

    },
    setFeatures: (state, action) => {
      state.features = action.payload;
    },
    clearSinglePricingId: (state) => {
      state.singlePricingId ="";
    },
  },
  extraReducers: {
    [addRoomPricing.pending]: (state) => {
      console.log("Pending");

    },
    [addRoomPricing.fulfilled]: (state, { payload }) => {
      console.log("Success");
      return { ...state, singlePricingId: payload.data._id }

    },
    [addRoomPricing.rejected]: (state, { payload }) => {
      console.log("Rejected");

    },

  }
})

export const getTitle = (state) => state.roomPricing.title;
export const getDescription = (state) => state.roomPricing.description;
export const getRate = (state) => state.roomPricing.rate;
export const getDuration = (state) => state.roomPricing.duration;
export const getCurrency = (state) => state.roomPricing.currency;
export const getFeatures = (state) => state.roomPricing.features;
export const getroomPricings = (state) => state.roomPricing.roomPricings;
export const getsinglePricingId = (state) => state.roomPricing.singlePricingId;

export const { setPricing,clearSinglePricingId, setTitle, setDescription, setDuration, setFeatures, setRate, setCurrency } = roomPricingSlice.actions;

export default roomPricingSlice.reducer;