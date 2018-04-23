import yaml from 'js-yaml';

export default yaml.Schema.create([
    new yaml.Type('!no-provenance', {
        kind: 'scalar',
        resolve: data => (
            data !== null && /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(data)
        ),
        construct: data => data
    }),
    new yaml.Type('!ref', {
        kind: 'scalar',
        resolve: data => data !== null,
        construct: data => data
    }),
    new yaml.Type('!metadata', {
        kind: 'scalar',
        resolve: data => data !== null,
        construct: (data) => {
            const splitData = data.split(':');
            if (splitData.length === 1) {
                return { file: data, artifacts: [] };
            }
            return { file: splitData[1], artifacts: splitData[0].split(',') };
        }
    }),
    new yaml.Type('!color', {
        kind: 'scalar',
        resolve: data => data !== null,
        construct: data => data
    }),
    new yaml.Type('!set', {
        kind: 'sequence',
        resolve: data => data !== null,
        construct: data => data
    }),
    new yaml.Type('!cite', {
        kind: 'scalar',
        resolve: data => data !== null,
        construct: data => data
    })
]);
