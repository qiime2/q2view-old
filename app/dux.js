import { Dux } from './lib/dx';

const dx = new Dux('data', {
    raw: {
        type: 'none',
        data: null
    },
    src: null,
    reader: null
})

export const getReader = dx.makeSelector(({ reader }) => reader);
export const getSource = dx.makeSelector(({ src }) => src);


dx.makeReducer({});

export default dx;
