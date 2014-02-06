require.config({
  baseUrl: 'js',
  shim: {
    underscore: {
      paths: 'underscore',
      exports: '_'
    },
    d3: {
      paths: 'd3',
      exports: 'd3'
    }
  }
});

require(['d3', 'underscore'], function(d3, _) {
  var data = {}; // loaded asynchronously

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
    _.each(json, function (county) {
      data[county.county_fips_code] = county.unemployment_rate;
    });
    counties.selectAll("path")
    .attr("rate", rate)
    .attr("class", quantize);
  });

  function rate(d) {
    return data[parseInt(d.id.slice(-3))];
  }

  function quantize(d) {
    return "q" + Math.min(8, ~~(data[parseInt(d.id.slice(-3))] * 9 / 12)) + "-9";
  }
});
