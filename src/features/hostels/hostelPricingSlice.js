import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../helpers/Api";

const pricingUrl = "/dashboard/admin/pricing";

// add

export const addHostelPricing = createAsyncThunk(
  "hostelPricing/addHostelPricing",
  async (payload) => {
    const response = await Api.post(pricingUrl, payload);
    return response.data;
  }
)


const initialState = {
  hostelPricings: [
    {
      "id": "2",
      "title": "Premium",
      "description": "You will get these benefits",
      "rate": "10000",
      "duration": "Month",
      "currency": "NPR",
      "features": ["Two time khana", "Garam Pani se nahahna", "Fir Sone k liye chadar or Tanna"]
    }
  ],
  title: "",
  description: "",
  rate: "",
  duration: "Month",
  currency: "NPR",
  features: [],
  multiplePricingIds: []

}
const hostelPricingSlice = createSlice({
  name: "hostelPricing",
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
      state.hostelPricings = newData;

    },
    setFeatures: (state, action) => {
      state.features = action.payload;
    },
  },
  extraReducers: {

    [addHostelPricing.pending]: (state) => {
      console.log("Pending");

    },
    [addHostelPricing.fulfilled]: (state, { payload }) => {
      console.log("Success");
      return {...state, multiplePricingIds: [...state.multiplePricingIds, payload.data._id]}

    },
    [addHostelPricing.rejected]: (state, { payload }) => {
      console.log("Rejected");

    },
  }
})

export const getTitle = (state) => state.hostelPricing.title;
export const getDescription = (state) => state.hostelPricing.description;
export const getRate = (state) => state.hostelPricing.rate;
export const getDuration = (state) => state.hostelPricing.duration;
export const getCurrency = (state) => state.hostelPricing.currency;
export const getFeatures = (state) => state.hostelPricing.features;
export const getHostelPricings = (state) => state.hostelPricing.hostelPricings;
export const getMultiplePricingIds = (state) => state.hostelPricing.multiplePricingIds;

export const { setPricing, setTitle, setDescription, setDuration, setFeatures, setRate, setCurrency } = hostelPricingSlice.actions;

export default hostelPricingSlice.reducer;