import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasById',
  async (params) => {
    const { sortBy, order, filterBlock, searchBlock, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64e6d034b0fd9648b78eeabd.mockapi.io/api/v1/items?page=${currentPage}&limit=6&${filterBlock}sortBy=${sortBy}&order=${order}${searchBlock}`,
    );
    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,

  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },

  //  extraReducers: {
  //    [fetchPizzas.fulfilled]: (state, action) => {
  //      console.log(state, 'fulfilled');
  //      state.items = action.payload;
  //    },
  //    [fetchPizzas.rejected]: (state) => {
  //      console.log(state, 'Error');
  //    },
  //    [fetchPizzas.pending]: (state) => {
  //      console.log(state, 'Pending');
  //    },
  //  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
