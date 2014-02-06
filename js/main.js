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
  var data; // loaded asynchronously

  var path = d3.geo.path();

  var svg = d3.select("#map")
  .append("svg:svg");

  var counties = svg.append("svg:g")
    .attr("id", "counties")
    .attr("class", "Blues");

  d3.json("../data/us-counties.json", function(json) {
    counties.selectAll("path")
    .data(json.features)
    .enter().append("svg:path")
    .attr("class", data ? quantize : null)
    .attr("d", path);
  });

  d3.json("http://data.wa.gov/resource/ak95-mjh9.json", function (json){
    data = json;
    counties.selectAll("path")
    .attr("class", quantize);
  });

  //d3.json("../data/unemployment.json", function(json) {
    //data = json;
    //counties.selectAll("path")
    //.attr("class", quantize);
  //});

  function quantize(d) {
    return "q" + Math.min(8, ~~(data[d.id] * 9 / 12)) + "-9";
  }
});
