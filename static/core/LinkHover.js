// Generated by CoffeeScript 1.7.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    var LinkHover;
    return LinkHover = (function(_super) {
      __extends(LinkHover, _super);

      function LinkHover(options) {
        this.options = options;
        this.expandSelection = __bind(this.expandSelection, this);
        LinkHover.__super__.constructor.call(this);
      }

      LinkHover.prototype.init = function(instances) {
        _.extend(this, Backbone.Events);
        this.graphView = instances['GraphView'];
        this.linkFilter = this.graphView.getLinkFilter();
        this.graphModel = instances['GraphModel'];
        this.dataProvider = instances["local/WikiNetsDataProvider"];
        this.topBarCreate = instances['local/TopBarCreate'];
        this.graphView.on("enter:node:mouseover", (function(_this) {
          return function(d) {
            return $('#expand-button' + _this.graphModel.get("nodeHash")(d)).show();
          };
        })(this));
        this.graphView.on("enter:node:mouseout", (function(_this) {
          return function(d) {
            return $('#expand-button' + _this.graphModel.get("nodeHash")(d)).hide();
          };
        })(this));
        this.graphView.on("enter:node:rect:click", (function(_this) {
          return function(d) {
            return _this.expandSelection(d);
          };
        })(this));
        this.graphView.on("enter:link:mouseover", (function(_this) {
          return function(d) {
            if (!_this.topBarCreate.buildingLink) {
              return $('#toplink-instructions').replaceWith('<span id="toplink-instructions" style="color:black; font-size:20px">' + 'Click to select: <b>' + d.source.name + " - " + d.name + " - " + d.target.name + '</b></span>');
            }
          };
        })(this));
        return this.graphView.on("enter:link:mouseout", (function(_this) {
          return function(d) {
            if (!_this.topBarCreate.buildingLink) {
              return $('#toplink-instructions').replaceWith('<span id="toplink-instructions" style="color:black; font-size:20px"></span>');
            }
          };
        })(this));
      };

      LinkHover.prototype.expandSelection = function(d) {
        return this.dataProvider.getLinkedNodes([d], (function(_this) {
          return function(nodes) {
            return _.each(nodes, function(node) {
              if (_this.dataProvider.nodeFilter(node)) {
                return _this.graphModel.putNode(node);
              }
            });
          };
        })(this));
      };

      return LinkHover;

    })(Backbone.View);
  });

}).call(this);
