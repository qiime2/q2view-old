import _ from 'lodash';


const dx = new Dux('dependencies', {
    checkBrowserCompatibility: true,
    initalizeServiceWorker: true,
    locateResult: false,
    loadResult: false,
})

export const setDependencies = dx.defineAction('SET_DEPENDENCIES',
                                               (...dependencies) => ({ dependencies }));
export const unsetAllDependencies = dx.defineAction('UNSET_ALL_DEPENDENCIES');

export const dependencySelector = dx.makeSelector(state => state);

dx.makeReducer({
    [setDependencies]: (state, { dependencies }) => (
        _.mapValues(state, (v, k) => _.includes(dependencies, k))),
    [unsetAllDependencies]: (state) => _.mapValues(state, () => false)
});
