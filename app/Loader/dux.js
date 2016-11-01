import { Dux, defineAction } from '../lib/dx';

export const loadSuccess = defineAction(
    'LOAD_SUCCESS');

export const loadFailed = defineAction(
    'LOAD_FAILED', (reason) => ({ reason }));

export const updateLoadMessage = defineAction(
    'UPDATE_LOAD_MESSAGE', (message) => ({ message }));

export const updateLoadProgress = defineAction(
    'UPDATE_LOAD_PROGRESS', (progress) => ({ progress }));


const dx = new Dux('loader', {
   active: true,
   message: 'downloading site resources',
   progress: 0
});

export const mapStateToProps = dx.makeSelector(state => state);

dx.makeReducer({
    [updateLoadMessage]: (state, { message }) => ({
        ...state,
        message
    }),
    [updateLoadProgress]: (state, { progress }) => ({
        ...state,
        progress
    }),
    [loadSuccess]: (state, action) => ({
        active: false,
        success: true
    }),
    [loadFailed]: (state, { reason }) => ({
        active: false,
        success: false,
        reason
    })
});

export default dx;
