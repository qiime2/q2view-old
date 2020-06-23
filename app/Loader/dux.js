import { Dux, defineAction } from '../lib/dx';

export const loadSuccess = defineAction(
    'LOAD_SUCCESS');

export const loadFailed = defineAction(
    'LOAD_FAILED', (reason, title = 'Something went wrong!') => ({ reason, title }));

export const updateLoadMessage = defineAction(
    'UPDATE_LOAD_MESSAGE', message => ({ message }));

export const updateLoadProgress = defineAction(
    'UPDATE_LOAD_PROGRESS', progress => ({ progress }));


const dx = new Dux('loader', {
    active: true,
    message: 'downloading site resources',
    progress: 0
});

export const mapStateToProps = dx.makeSelector(state => state);

dx.makeReducer({
    [updateLoadMessage]: (state, { message }) => ({
        active: true,
        message,
        progress: state.progress || 0
    }),
    [updateLoadProgress]: (state, { progress }) => ({
        active: true,
        message: state.message || '',
        progress
    }),
    [loadSuccess]: (state, action) => ({ // eslint-disable-line no-unused-vars
        active: false,
        success: true
    }),
    [loadFailed]: (state, { reason, title }) => ({
        active: false,
        success: false,
        reason,
        title
    })
});

export default dx;
