import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      console.log('action setCategoryId', action);
      state.categoryId = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      console.log('action setCategoryId', action);
      state.searchValue = action.payload;
    },

    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.category);
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export const selectSort = (state: RootState) => state.filter.sort;
export default filterSlice.reducer;
