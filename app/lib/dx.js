import { combineReducers } from 'redux';


export const getDuxInRow = (...duxi) => {
    const reducers = {};
    for (const dux of duxi) {
        if (dux.reducer !== null) {
            reducers[dux.root] = dux.reducer;
        } else {
            throw Error('A Dux is missing a reducer');
        }
    }

    return combineReducers(reducers);
};

export const defineAction = (type, factory = () => ({})) => {
    const actionFactory = (...args) => ({ ...factory(...args), type });
    actionFactory.type = type;
    actionFactory.toString = () => type;
    return actionFactory;
};

export class Dux {
    constructor(root, initialState) {
        this.root = root;
        this.initialState = initialState;

        this.reducer = null;
    }

    makeReducer(mapping) {
        this.reducer = (state = this.initialState, action) => {
            const reducer = mapping[action.type];
            if (typeof reducer === 'undefined') {
                return state;
            }
            return reducer(state, action);
        };

        return this.reducer;
    }

    makeSelector(partialSelector) {
        return (state, ownProps) => {
            // TODO: is it possible to retain enough info to traverse deeper
            // than one node?
            const partialState = state.app[this.root];
            return partialSelector(partialState, ownProps);
        };
    }
}
