import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication/AuthSlice";
import userReducer from "./authentication/UserSlice";
import rolesReducer from "./authentication/RoleSlice";
import foodTimingReducer from "./hostels/FoodTimingSlice";
import hostelPricingReducer from "./hostels/hostelPricingSlice";
import roomPricingReducer from "./rooms/roomPricingSlice";
import adminReducer from "./dashboard/AdminSlice";
import generalReducer from "./general/GeneralSlice";
import customerReducer from "./dashboard/CustomerSlice";

export const store = configureStore({
  reducer: {
      auth: authReducer,
      user: userReducer,
      roles: rolesReducer,
      foodTiming: foodTimingReducer,
      hostelPricing: hostelPricingReducer,
      roomPricing: roomPricingReducer,
      admin:adminReducer,
      general:generalReducer,
      customer:customerReducer

    //   hostel: hostelReducer,
  },
});
