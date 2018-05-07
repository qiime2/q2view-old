export default () => {
    const store = {};
    const dedup = [];

    return (bibtex) => {
        let skip = false;
        for (const line of bibtex.split('\n')) {
            if (line.startsWith('@')) {
                skip = false;
                const id = /@.*{(.*),\w*/.exec(line)[0];

                if (id in store) {
                    skip = true;
                } else {
                    store[id] = true;
                }
            }

            if (!skip) {
                dedup.push(line);
            }
        }
        return dedup.join('\n');
    };
};
