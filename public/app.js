/* global $ */
/* global vis */
/* global document */
$.get('/api/graph', function(data) {
    // create an array with nodes
    var nodes = new vis.DataSet(data.vertices);

    // create an array with edges
    var edges = new vis.DataSet(data.edges);

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        physics: {
            enabled: true
        },
        layout: {
            improvedLayout: true
        }
    };
    var network = new vis.Network(container, data, options);
});