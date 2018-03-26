import { combineEpics } from 'redux-observable';

// tslint:disable-next-line:no-any
const requireAll = (requireContext: any) =>  {
    return requireContext.keys().map(requireContext);
};

export default combineEpics(
    ...requireAll(require.context('../', true, /\.epic\.ts$/))
);