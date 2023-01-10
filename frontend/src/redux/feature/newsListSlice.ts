import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/configureStore';
import { backend } from '../../repositories';

import type { GetQueryParamsObj, News } from '../../utils/types';

interface NewsListState {
    isFetching: boolean,
    newsList: News[] | null;
    error: any;
};

const initialState: NewsListState = {
    isFetching: false,
    newsList: null,
    error: null,
};

const fetchNewsList = createAsyncThunk<{ newsList: News[]; }, { searchParamObj: GetQueryParamsObj; }>(
    'newsList/FetchNewsList',
    async ({ searchParamObj }) => {
        const res = await backend.news.fetchNews(searchParamObj);
        return { newsList: res.articles };
    }
);

const newsListAsyncActions = { fetchNewsList };

export const newsListSlice = createSlice({
    name: 'newsList',
    initialState,
    reducers: {},
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

export { selectNewsList, newsListAsyncActions };
export default newsListSlice.reducer;