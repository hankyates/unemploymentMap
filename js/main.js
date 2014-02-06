require.config({
  baseUrl: 'js',
  shim: {
    d3: {
      paths: 'd3',
      exports: 'd3'
    }
  }
});

require(['d3'], function(d3) {
  console.log(d3);
});
