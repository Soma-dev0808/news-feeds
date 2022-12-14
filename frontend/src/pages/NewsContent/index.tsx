import { connect } from "react-redux";
import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from "../../app/configureStore";
import NewsContent from "./NewsContent";
import * as NewsContentActions from '../../actions/newsContentActions';

import type { NewsContentData } from "../../utils/types";

const NewsContentContainer = ({
    isFetching,
    newsContent,
    newsContentActions,
}: {
    isFetching: boolean;
    newsContent: NewsContentData | null;
    newsContentActions: typeof NewsContentActions;

}) => <NewsContent
        isFetching={isFetching}
        newsContent={newsContent}
        fetchNewsContentAction={newsContentActions.handleFetchNewsContent}
    />;

const mapStateToProps = (state: RootState) => {
    return ({
        isFetching: state.newsContentState.isFetching,
        newsContent: state.newsContentState.newsContent,
    });
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return ({
        newsContentActions: bindActionCreators(NewsContentActions, dispatch)
    });
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsContentContainer);