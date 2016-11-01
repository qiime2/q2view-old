
import { dependencySelector } from './dux';


export default class DependencyEngine {
    constructor(store) {
        this.store = store;
        this.currentState = dependencySelector(store.getState());
    }

    // From https://github.com/reactjs/redux/issues/303#issuecomment-125184409
    handleChange() {
        let nextState = dependencySelector(this.store.getState());
        if (nextState !== this.currentState) {
            this.currentState = nextState;
            this.onChange(nextState);
        }
    }

    onChange(state) {
        const todo = [];

    }
}
