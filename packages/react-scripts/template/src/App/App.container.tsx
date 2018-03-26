import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import App, { AppProps } from './App';
import { Action } from 'redux';
import * as moment from 'moment';
import { PLAY } from '.';

type ComposeProps = {onInit: () => void};

const mapStateToProps: MapStateToProps<{}, AppProps, {App: moment.Moment}> = (state: {App: moment.Moment}, props) => ({
    title: `Today : ${state.App.format('llll')}`
});

const mapDispatchToProps: MapDispatchToProps<ComposeProps, AppProps> = (dispatch, ownProps) => ({
    onInit: () => {
        dispatch({type: PLAY});
    }
});

const enhance = compose<AppProps, ComposeProps>(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle<AppProps, {}>({
      componentWillMount() {
        if (!this.props.agreement) {
          this.props.onInit();
        }
      }
    })
  );

export default enhance(App);