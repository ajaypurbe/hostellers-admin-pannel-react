import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  faclitiesList: [],
  foodTimingFoodList: [],
  foodTimingFoodItem: {},
  foodTimingDay: "Sunday",
  foodTimingFrom: "",
  foodTimingTo: "",
  foodTimingFoodImages: [],
  foodTimings: [
    {
      day: 'Sunday',
      timing: [


      ],
    },

    {
      day: 'Monday',
      timing: [


      ],
    },
    {
      day: 'Tuesday',
      timing: [

      ],
    },
    {
      day: 'Wednesday',
      timing: [

      ],
    },
    {
      day: 'Thursday',
      timing: [

      ],
    },
    {
      day: 'Friday',
      timing: [

      ],
    },
    {
      day: 'Saturday',
      timing: [

      ],
    },

  ],
  foodTitle: "",
  foodMenuImages: [],
  foodMenus: [
    // {
    //   _id:"",
    //   title:"",
    //   images: []
    // }
  ],
  stringFoodTimings : [
    {
      day: 'Sunday',
      timing: [


      ],
    },

    {
      day: 'Monday',
      timing: [


      ],
    },
    {
      day: 'Tuesday',
      timing: [

      ],
    },
    {
      day: 'Wednesday',
      timing: [

      ],
    },
    {
      day: 'Thursday',
      timing: [

      ],
    },
    {
      day: 'Friday',
      timing: [

      ],
    },
    {
      day: 'Saturday',
      timing: [

      ],
    },
  ]
}
const foodTimingSlice = createSlice({
  name: "foodTiming",
  initialState,
  reducers: {
    setFoodTimingDay: (state, action) => {
      state.foodTimingDay = action.payload;

    },
    setFoodTimings: (state, action) => {
      state.foodTimings = action.payload;

    },
    setFoodTimingTo: (state, action) => {
      state.foodTimingTo = action.payload;

    },
    setFoodTimingFrom: (state, action) => {
      state.foodTimingFrom = action.payload;

    },
    setFaclitiesList: (state, action) => {
      state.faclitiesList = action.payload;

    },
    setFoodTimingFoodList: (state, action) => {
      state.foodTimingFoodList = action.payload;

    },
    setFoodTimingFoodItem: (state, action) => {
      state.foodTimingFoodItem = action.payload;

    },
    setFoodTimingFoodImages: (state, action) => {
      state.foodTimingFoodImages = action.payload;

    },
    addFoodTimingFoodItemToFoodTimingFoodList: (state, action) => {
      console.log(action.payload);
      let oldArray = [...action.payload.foodTimingsData];
      let oldStringArray = [...action.payload.stringFoodTimingData];
      oldArray.forEach((item, index) => {
        if (item.day === action.payload.foodTimingDay) {
          console.log(action.payload.foodItem, "Cheeck Item");
          const stringImage = JSON.stringify(action.payload.foodItem.foodImages)
          const stringFood = JSON.stringify(action.payload.foodItem.foods)
          const newStringItem = [...oldStringArray[index].timing,JSON.stringify({...action.payload.foodItem, foodImages:stringImage, foods:stringFood})];
          const newItem = [...oldArray[index].timing, action.payload.foodItem];
          console.log("New Item", newItem);
          const newStringDay = {...oldStringArray[index], timing:newStringItem}
          const newDay = { ...oldArray[index], timing: newItem }
          console.log("New Day", newDay);
          oldArray[index] = newDay;
          oldStringArray[index]=newStringDay
          console.log("Old Array new", oldArray);

        }
      });
      state.foodTimings = oldArray;
      state.stringFoodTimings = oldStringArray;
    },
    setFoodMenu: (state, action) => {
      const _iid = action.payload._tid;
      const ft = action.payload.foodMenuTitle;
      const fi = action.payload.foodMenuImages;
      const oldtiming = action.payload.oldtiming;
      let itemObj = {
        "_tid": _iid,
        "title": ft,
        "images": fi
      }
      let newtiming = [...oldtiming, itemObj];
      console.log("New timing menu", newtiming);
      state.foodMenus = newtiming;

    },
    setFoodMenuImages: (state, action) => {
      state.foodMenuImages = action.payload;
    },
    setFoodMenuTitle: (state, action) => {
      state.foodMenuTitle = action.payload;
    },

  },
  extraReducers: {

  }
})


export const getFaclitiesList = (state) => state.foodTiming.faclitiesList;
export const getFoodTimingFoodList = (state) => state.foodTiming.foodTimingFoodList;
export const getFoodTimingFoodItem = (state) => state.foodTiming.foodTimingFoodItem;
export const getFoodTimingDay = (state) => state.foodTiming.foodTimingDay;
export const getFoodTimingFrom = (state) => state.foodTiming.foodTimingFrom;
export const getFoodTimingTo = (state) => state.foodTiming.foodTimingTo;
export const getFoodTimings = (state) => state.foodTiming.foodTimings;
export const getStringFoodTimings = (state) => state.foodTiming.stringFoodTimings;
export const getFoodTimingFoodImages = (state) => state.foodTiming.foodTimingFoodImages;
export const getFoodMenus = (state) => state.foodTiming.foodMenus;
export const getFoodMenuImages = (state) => state.foodTiming.foodMenuImages;
export const getFoodMenuTitle = (state) => state.foodTiming.foodMenuTitle;
export const { setFoodMenu, setFoodMenuImages, setFoodMenuTitle
  , addFoodTimingFoodItemToFoodTimingFoodList, setFoodTimingFoodImages, setFoodTimings, setFoodTimingTo, setFoodTimingFrom, setFoodTimingDay, setFaclitiesList, setFoodTimingFoodList, setFoodTimingFoodItem } = foodTimingSlice.actions;

export default foodTimingSlice.reducer;