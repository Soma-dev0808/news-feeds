import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/app/configureStore';
import { backend } from 'repositories';

import type { NewsContentData, GetQueryParamsObj } from 'utils/types';

interface NewsContentState {
    isFetching: boolean,
    newsContent: NewsContentData | null;
    error: any;
}

const initialState: NewsContentState = {
    isFetching: false,
    newsContent: null,
    error: null,
};

const fetchNewsContent = createAsyncThunk<{ newsContent: NewsContentData | null; }, { searchParamObj: GetQueryParamsObj; }>(
    'newsContent/FetchNewsContent',
    async ({ searchParamObj }) => {
        const res = await backend.news.fetchNewsContent(searchParamObj);
        return { newsContent: res.newsContent };
    }
);

const newsContentAsyncActions = {
    fetchNewsContent
};

export const newsContentSlice = createSlice({
    name: 'newsContent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsContent.pending, (state) => {
                state.isFetching = true;
                state.newsContent = null;
                state.error = null;
            })
            .addCase(fetchNewsContent.fulfilled, (state, action) => {
                state.isFetching = false;
                state.newsContent = action.payload.newsContent;
            })
            .addCase(fetchNewsContent.rejected, (state, action) => {
                state.isFetching = false;
                state.error = action.error;
            });
    }
});

const selectNewsContent = (state: RootState) => state.newsContentState;

export { selectNewsContent, newsContentAsyncActions };
export default newsContentSlice.reducer;
