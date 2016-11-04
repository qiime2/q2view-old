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
        construct: data => data
    }),
    new yaml.Type('!color', {
        kind: 'scalar',
        resolve: data => data !== null,
        construct: data => data
    })
]);
