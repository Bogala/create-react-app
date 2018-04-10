import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import App, { AppProps } from './App';
import * as moment from 'moment';
import { PLAY } from '../store/today';

type ComposeProps = { onInit: () => void };
export const DATE_FORMAT = 'MMMM Do YYYY, HH:mm:ss';

const mapStateToProps: MapStateToProps<{}, AppProps, { today: moment.Moment }> =
  ({ today }, ownProps) => ({
    title: `Today : ${today.format(DATE_FORMAT)}`
  });

const mapDispatchToProps: MapDispatchToProps<ComposeProps, AppProps> = (dispatch, ownProps) => ({
  onInit: () => {
    dispatch({type: PLAY});
  }
});

const enhance = compose<AppProps, {}>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<ComposeProps, {}>({
    componentWillMount() {
      this.props.onInit();
    }
  })
);

export default enhance(App);