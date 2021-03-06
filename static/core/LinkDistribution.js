// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    var LinkDistributionView, height, margin, maxStrength, minStrength, width;
    margin = {
      top: 10,
      right: 10,
      bottom: 40,
      left: 10
    };
    width = 200 - margin.left - margin.right;
    height = 200 - margin.top - margin.bottom;
    minStrength = 0;
    maxStrength = 1;
    return LinkDistributionView = (function(_super) {
      __extends(LinkDistributionView, _super);

      LinkDistributionView.prototype.className = "link-pdf";

      function LinkDistributionView(options) {
        this.options = options;
        this.windowModel = new Backbone.Model();
        this.windowModel.set("window", 10);
        this.listenTo(this.windowModel, "change:window", this.paint);
        LinkDistributionView.__super__.constructor.call(this);
      }

      LinkDistributionView.prototype.init = function(instances) {
        var scale;
        this.graphModel = instances["GraphModel"];
        this.graphView = instances["GraphView"];
        this.listenTo(instances["GraphModel"], "change:links", this.paint);
        scale = d3.scale.linear().domain([2, 200]).range([0, 100]);
        instances["Sliders"].addSlider("Smoothing", scale(this.windowModel.get("window")), (function(_this) {
          return function(val) {
            return _this.windowModel.set("window", scale.invert(val));
          };
        })(this));
        this.render();
        return instances["Layout"].addPlugin(this.el, this.options.pluginOrder, 'Link Distribution');
      };

      LinkDistributionView.prototype.render = function() {

        /* one time setup of link strength pdf view */
        var bottom, thresholdX, xAxis;
        this.svg = d3.select(this.el).append("svg").classed("pdf", true).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").classed("workspace", true).attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.svg.append("g").classed("pdfs", true);
        this.x = d3.scale.linear().domain([minStrength, maxStrength]).range([0, width]);
        xAxis = d3.svg.axis().scale(this.x).orient("bottom");
        bottom = this.svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")");
        bottom.append("g").call(xAxis);
        bottom.append("text").classed("label", true).attr("x", width / 2).attr("y", 35).text("Link Strength");
        this.paint();

        /* create draggable threshold line */
        d3.select(this.el).select(".workspace").append("line").classed("threshold-line", true);
        thresholdX = this.x(this.graphView.getLinkFilter().get("threshold"));
        d3.select(this.el).select(".threshold-line").attr("x1", thresholdX).attr("x2", thresholdX).attr("y1", 0).attr("y2", height);
        this.$(".threshold-line").on("mousedown", (function(_this) {
          return function(e) {
            var $line, moveListener, originalX, pageX;
            $line = _this.$(".threshold-line");
            pageX = e.pageX;
            originalX = parseInt($line.attr("x1"));
            d3.select(_this.el).classed("drag", true);
            $(window).one("mouseup", function() {
              $(window).off("mousemove", moveListener);
              return d3.select(_this.el).classed("drag", false);
            });
            moveListener = function(e) {
              var dx, newX;
              _this.paint();
              dx = e.pageX - pageX;
              newX = Math.min(Math.max(0, originalX + dx), width);
              _this.graphView.getLinkFilter().set("threshold", _this.x.invert(newX));
              $line.attr("x1", newX);
              return $line.attr("x2", newX);
            };
            $(window).on("mousemove", moveListener);
            return e.preventDefault();
          };
        })(this));
        return this;
      };

      LinkDistributionView.prototype.paint = function() {

        /* function called everytime link strengths change */
        var area, cdf, data, halfWindow, i, layout, maxY, path, pdf, sum, threshold, values, visiblePDF, y;
        layout = d3.layout.histogram().range([minStrength, maxStrength]).frequency(false).bins(100);
        values = _.pluck(this.graphModel.getLinks(), "strength");
        sum = 0;
        cdf = _.chain(layout(values)).map(function(bin) {
          return {
            "x": bin.x,
            "y": sum += bin.y
          };
        }).value();
        halfWindow = Math.max(1, parseInt(this.windowModel.get("window") / 2));
        pdf = _.map(cdf, function(bin, i) {
          var q1, q2, slope, y1, y2;
          q1 = Math.max(0, i - halfWindow);
          q2 = Math.min(cdf.length - 1, i + halfWindow);
          y1 = cdf[q1]["y"];
          y2 = cdf[q2]["y"];
          slope = (y2 - y1) / (q2 - q1);
          return {
            "x": bin.x,
            "y": slope
          };
        });
        maxY = _.chain(pdf).map(function(bin) {
          return bin.y;
        }).max().value();
        this.y = d3.scale.linear().domain([0, maxY]).range([height, 0]);
        area = d3.svg.area().interpolate("monotone").x((function(_this) {
          return function(d) {
            return _this.x(d.x);
          };
        })(this)).y0(this.y(0)).y1((function(_this) {
          return function(d) {
            return _this.y(d.y);
          };
        })(this));

        /*
        
        define the x and y points to use for the visible links.
        they should be the points from the original pdf that are above
        the threshold
        
        to avoid granularity issues (jdhenke/celestrium#75),
        we also prepend this list of points with a point with x value exactly at
        the threshold and y value that is the average of it's neighbors' y values
         */
        threshold = this.graphView.getLinkFilter().get("threshold");
        visiblePDF = _.filter(pdf, (function(_this) {
          return function(bin) {
            return bin.x > threshold;
          };
        })(this));
        if (visiblePDF.length > 0) {
          i = pdf.length - visiblePDF.length;
          if (i > 0) {
            y = (pdf[i - 1].y + pdf[i].y) / 2.0;
          } else {
            y = pdf[i].y;
          }
          visiblePDF.unshift({
            "x": threshold,
            "y": y
          });
        }
        pdf.opacity = 0.25;
        visiblePDF.opacity = 1;
        data = [pdf];
        if (visiblePDF.length !== 0) {
          data.push(visiblePDF);
        }
        path = d3.select(this.el).select(".pdfs").selectAll(".pdf").data(data);
        path.enter().append("path").classed("pdf", true);
        path.exit().remove();
        return path.attr("d", area).style("opacity", function(d) {
          return d.opacity;
        });
      };

      return LinkDistributionView;

    })(Backbone.View);
  });

}).call(this);
