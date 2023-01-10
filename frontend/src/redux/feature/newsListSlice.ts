import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/app/configureStore';
import { backend } from 'repositories';

import type { GetQueryParamsObj, News } from 'utils/types';

interface NewsListState {
    isFetching: boolean,
    newsList: News[] | null,
    isSearchFormOpen: boolean,
    error: any,
};

const initialState: NewsListState = {
    isFetching: false,
    newsList: null,
    isSearchFormOpen: false,
    error: null,
};

const fetchNewsList = createAsyncThunk<{ newsList: News[]; }, { searchParamObj: GetQueryParamsObj; }>(
    'newsList/FetchNewsList',
    async ({ searchParamObj }) => {
        const res = await backend.news.fetchNews(searchParamObj);
        return { newsList: res.articles };
    }
);

export const newsListSlice = createSlice({
    name: 'newsList',
    initialState,
    reducers: {
        toggleSearchForm: (state, action: PayloadAction<boolean | undefined>) => {
            if (!action.payload) state.isSearchFormOpen = !state.isSearchFormOpen;
            else {
                state.isSearchFormOpen = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsList.pending, (state) => {
                state.isFetching = true;
                state.newsList = [];
                state.error = null;
            })
            .addCase(fetchNewsList.fulfilled, (state, action) => {
                state.isFetching = false;
                state.newsList = action.payload.newsList;
            })
            .addCase(fetchNewsList.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.error;
            });
    }
});

const selectNewsList = (state: RootState) => state.newsListState;

const { toggleSearchForm } = newsListSlice.actions;
const newsListReducerActions = { fetchNewsList, toggleSearchForm };
export { selectNewsList, newsListReducerActions };
export default newsListSlice.reducer;