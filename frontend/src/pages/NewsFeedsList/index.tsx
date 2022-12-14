import { AppDispatch, RootState } from "../../app/configureStore";
import { connect } from "react-redux";
import { bindActionCreators } from '@reduxjs/toolkit';
import NewsFeedsList from "./NewsFeedsList";
import * as NewsListActions from '../../actions/newsListActions';
import { News } from "../../utils/types";

const NewsFeedsListContainer = ({
    isFetching,
    newsList,
    newsListActions,
}: {
    isFetching: boolean;
    newsList: News[] | null;
    newsListActions: typeof NewsListActions;
}) =>
    <NewsFeedsList
        isFetching={isFetching}
        newsList={newsList}
        fetchNewsListAction={newsListActions.handleFetchNewsList}
    />;


const mapStateToProps = (state: RootState) => {
    return ({
        isFetching: state.newsListState.isFetching,
        newsList: state.newsListState.newsList,
    });
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return ({
        newsListActions: bindActionCreators(NewsListActions, dispatch)
    });
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsFeedsListContainer);