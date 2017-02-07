import React from 'react';

import cytoscape from 'cytoscape';

const cytoscapeConfig = {
    boxSelectionEnabled: true,
    autounselectify: false,
    userZoomingEnabled: false,
    layout: {
        name: 'grid',
        fit: false,
        condense: true,
        avoidOverlapPadding: 75,
        position: node => ({
            row: node.data('row'),
            col: node.data('col')
        })
    },
    style: [
        {
            selector: 'node',
            css: {
                'text-valign': 'center',
                'text-halign': 'center'
            }
        },
        {
            selector: '$node > node',
            css: {
                'padding-top': '10px',
                'padding-left': '10px',
                'padding-bottom': '10px',
                'padding-right': '10px',
                'text-valign': 'top',
                'text-halign': 'center',
                'background-color': '#bbb'
            }
        },
        {
            selector: 'edge',
            css: {
                content: 'data(param)',
                'target-arrow-shape': 'triangle',
                'curve-style': 'segments'
            }
        },
        {
            selector: ':selected',
            css: {
                'background-color': 'rgb(81, 132, 151)',
                'line-color': 'rgb(81, 132, 151)',
                'target-arrow-color': 'rgb(81, 132, 151)',
                'source-arrow-color': 'rgb(81, 132, 151)'
            }
        }
    ]
};

export default class DAGView extends React.Component {
    componentDidMount() {
        this.lock = false; // used to prevent recursive event storms
        this.selectedExists = false;
        this.cy = cytoscape({
            ...cytoscapeConfig,
            container: this.cytoscapeRoot,
            elements: this.props.elements
        });

        this.cy.on('select', 'node, edge', (event) => {
            if (!this.lock) {
                this.selectedExists = true;
                this.lock = true;
                const elem = event.cyTarget;

                let node = elem;
                if (elem.isEdge()) {
                    node = elem.source();
                }

                if (node.isParent()) {
                    this.props.setSelection({
                        type: 'action',
                        uuid: node.children()[0].data('id')
                    });
                } else {
                    this.props.setSelection({
                        type: 'artifact',
                        uuid: node.data('id')
                    });
                }

                const edges = node.edgesTo('node');
                this.cy.elements('node, edge').unselect();
                node.select();
                edges.select();

                this.lock = false;
            }
        });

        this.cy.on('unselect', 'node, edge', (event) => {  // eslint-disable-line no-unused-vars
            this.cy.elements('node, edge').unselect();
            if (!this.lock && this.selectedExists) {
                this.selectedExists = false;
                this.props.clearSelection();
            }
        });

        this.cy.center();
    }

    componentWillReceiveProps({ elements }) {
        if (elements !== this.props.elements) {
            this.cy.json({ elements });
            this.lock = false;
            this.selectedExists = false;
            this.props.clearSelection();
        }
    }

    componentWillUnmount() {
        this.cy.destroy();
        this.cy = null;
        this.lock = false;
        this.selectedExists = false;
    }

    render() {
        return (<div
            ref={(c) => { this.cytoscapeRoot = c; }}
            style={{ height: `${(this.props.height + 1) * 105}px` }}
        />);
    }
}
