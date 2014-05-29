// Generated by CoffeeScript 1.7.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    var ToolBox;
    return ToolBox = (function(_super) {
      __extends(ToolBox, _super);

      function ToolBox(options) {
        this.options = options;
        this.searchNodes = __bind(this.searchNodes, this);
        this.expandSelection = __bind(this.expandSelection, this);
        this.loadAllNodes = __bind(this.loadAllNodes, this);
        this.addZoomButtons = __bind(this.addZoomButtons, this);
        ToolBox.__super__.constructor.call(this);
      }

      ToolBox.prototype.init = function(instances) {
        this.render();
        this.graphModel = instances["GraphModel"];
        this.dataProvider = instances["local/WikiNetsDataProvider"];
        this.selection = instances["NodeSelection"];
        $(this.el).attr("class", "toolboxpopout").css("background", "white");
        $(this.el).appendTo($('#maingraph'));
        $(this.el).hide();
        this.graphView = instances["GraphView"];
        return this.listView = instances["local/ListView"];
      };

      ToolBox.prototype.render = function() {
        var $chooseSelectButton, $clearAllButton, $clearSelectedButton, $container, $deselectAllButton, $expandSelectionButton, $pinSelectedButton, $selectAllButton, $showAllButton, $unpinAllButton, $unpinSelectedButton;
        $container = $("<div id=\"show-all-container\">").appendTo(this.$el);
        this.addZoomButtons();
        $('#listviewButton').click((function(_this) {
          return function() {
            $(_this.listView.el).show();
            $('#listviewButton').css("background", "url(\"images/icons/blue/list_nested_24x21.png\")");
            $(_this.graphView.el).hide();
            return $('#graphviewButton').css("background", "url(\"images/icons/gray_dark/share_24x24.png\")");
          };
        })(this));
        $('#graphviewButton').click((function(_this) {
          return function() {
            $(_this.listView.el).hide();
            $('#listviewButton').css("background", "url(\"images/icons/gray_dark/list_nested_24x21.png\")");
            $(_this.graphView.el).show();
            return $('#graphviewButton').css("background", "url(\"images/icons/blue/share_24x24.png\")");
          };
        })(this));
        $('#minimapButton').click((function(_this) {
          return function() {
            $(_this.el).hide();
            $('#moreoptionsButton').removeClass('selected');
            $('#slidersPopOut').hide();
            $('#slidersButton').removeClass('selected');
            $('#minimapPopOut').toggle();
            if ($('#minimapButton').hasClass('selected')) {
              return $('#minimapButton').removeClass('selected');
            } else {
              return $('#minimapButton').addClass('selected');
            }
          };
        })(this));
        $('#slidersButton').click((function(_this) {
          return function() {
            $('#minimapPopOut').hide();
            $('#minimapButton').removeClass('selected');
            $(_this.el).hide();
            $('#moreoptionsButton').removeClass('selected');
            $('#slidersPopOut').toggle();
            if ($('#slidersButton').hasClass('selected')) {
              return $('#slidersButton').removeClass('selected');
            } else {
              return $('#slidersButton').addClass('selected');
            }
          };
        })(this));
        $('#moreoptionsButton').click((function(_this) {
          return function() {
            $('#minimapPopOut').hide();
            $('#minimapButton').removeClass('selected');
            $('#slidersPopOut').hide();
            $('#slidersButton').removeClass('selected');
            $(_this.el).toggle();
            if ($('#moreoptionsButton').hasClass('selected')) {
              return $('#moreoptionsButton').removeClass('selected');
            } else {
              return $('#moreoptionsButton').addClass('selected');
            }
          };
        })(this));
        $('#help').click((function(_this) {
          return function() {
            return $('body').chardinJs('toggle');
          };
        })(this));
        $showAllButton = $("<input type=\"button\" id=\"showAllButton\" value=\"Show All\"></input>").appendTo($container);
        $showAllButton.click((function(_this) {
          return function() {
            return _this.dataProvider.getEverything(_this.loadAllNodes);
          };
        })(this));
        $clearAllButton = $("<input type=\"button\" id=\"clearAllButton\" value=\"Clear All\"></input>").appendTo($container);
        $clearAllButton.click((function(_this) {
          return function() {
            return _this.graphModel.filterNodes(function(node) {
              return false;
            });
          };
        })(this));
        $expandSelectionButton = $("<input type=\"button\" id=\"expandSelectionButton\" value=\"Expand Selection\"></input>").appendTo($container);
        $expandSelectionButton.click((function(_this) {
          return function() {
            return _this.expandSelection();
          };
        })(this));
        $selectAllButton = $("<input type=\"button\" id=\"selectAllButton\" value=\"Select All\"></input>").appendTo($container);
        $selectAllButton.click((function(_this) {
          return function() {
            return _this.selection.selectAll();
          };
        })(this));
        $deselectAllButton = $("<input type=\"button\" id=\"deselectAllButton\" value=\"Deselect All\"></input>").appendTo($container);
        $deselectAllButton.click((function(_this) {
          return function() {
            return _this.selection.deselectAll();
          };
        })(this));
        $clearSelectedButton = $("<input type=\"button\" id=\"clearSelectedButton\" value=\"Clear Selection\"></input>").appendTo($container);
        $clearSelectedButton.click((function(_this) {
          return function() {
            return _this.selection.removeSelection();
          };
        })(this));
        $chooseSelectButton = $("<input type=\"button\" id=\"chooseSelectButton\" value=\"Clear Unselected\"></input>").appendTo($container);
        $chooseSelectButton.click((function(_this) {
          return function() {
            return _this.selection.removeSelectionCompliment();
          };
        })(this));
        $unpinAllButton = $("<input type=\"button\" id=\"unpinAllButton\" value=\"Un-pin Layout\"></input>").appendTo($container);
        $unpinAllButton.click((function(_this) {
          return function() {
            var node, _i, _len, _ref, _results;
            _ref = _this.graphModel.getNodes();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              node = _ref[_i];
              _results.push(node.fixed = false);
            }
            return _results;
          };
        })(this));
        $unpinAllButton = $("<input type=\"button\" id=\"unpinAllButton\" value=\"Pin Layout\"></input>").appendTo($container);
        $unpinAllButton.click((function(_this) {
          return function() {
            var node, _i, _len, _ref, _results;
            _ref = _this.graphModel.getNodes();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              node = _ref[_i];
              _results.push(node.fixed = true);
            }
            return _results;
          };
        })(this));
        $unpinSelectedButton = $("<input type=\"button\" id=\"unpinSelectedButton\" value=\"Un-Pin Selected\"></input>").appendTo($container);
        $unpinSelectedButton.click((function(_this) {
          return function() {
            var node, _i, _len, _ref, _results;
            _ref = _this.selection.getSelectedNodes();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              node = _ref[_i];
              _results.push(node.fixed = false);
            }
            return _results;
          };
        })(this));
        $pinSelectedButton = $("<input type=\"button\" id=\"unpinSelectedButton\" value=\"Pin Selected\"></input>").appendTo($container);
        $pinSelectedButton.click((function(_this) {
          return function() {
            var node, _i, _len, _ref, _results;
            _ref = _this.selection.getSelectedNodes();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              node = _ref[_i];
              _results.push(node.fixed = true);
            }
            return _results;
          };
        })(this));
        return "$showLearningButton = $(\"<input type=\"button\" id=\"showLearningButton\" value=\"Learning\"></input>\").appendTo $container\n$showLearningButton.click(() =>\n  @searchNodes({Theme:\"Learning\"})\n  )\n\n$showStudentLifeButton = $(\"<input type=\"button\" id=\"showStudentLifeButton\" value=\"Student Life\"></input>\").appendTo $container\n$showStudentLifeButton.click(() =>\n  @searchNodes({Theme:\"Student Life\"})\n  )\n      \n$showResearchButton = $(\"<input type=\"button\" id=\"showResearchButton\" value=\"Research\"></input>\").appendTo $container\n$showResearchButton.click(() =>\n  @searchNodes({Theme:\"Research\"})\n  )";
      };

      ToolBox.prototype.addZoomButtons = function() {
        $('#zoomin').click((function(_this) {
          return function() {
            var center, diff, newScale, translate, translate0, view;
            center = [$(window).width() / 2, $(window).height() / 2];
            translate = _this.graphView.zoom.translate();
            view = {
              x: translate[0],
              y: translate[1],
              k: _this.graphView.zoom.scale()
            };
            newScale = view.k * 1.3;
            translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
            view.k = newScale;
            diff = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];
            view.x += center[0] - diff[0];
            view.y += center[1] - diff[1];
            _this.graphView.zoom.translate([view.x, view.y]);
            _this.graphView.zoom.scale(newScale);
            return _this.graphView.workspace.transition().ease("linear").attr("transform", "translate(" + [view.x, view.y] + ") scale(" + newScale + ")");
          };
        })(this));
        return $('#zoomout').click((function(_this) {
          return function() {
            var center, diff, newScale, translate, translate0, view;
            center = [$(window).width() / 2, $(window).height() / 2];
            translate = _this.graphView.zoom.translate();
            view = {
              x: translate[0],
              y: translate[1],
              k: _this.graphView.zoom.scale()
            };
            newScale = view.k / 1.3;
            translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
            view.k = newScale;
            diff = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];
            view.x += center[0] - diff[0];
            view.y += center[1] - diff[1];
            _this.graphView.zoom.translate([view.x, view.y]);
            _this.graphView.zoom.scale(newScale);
            return _this.graphView.workspace.transition().ease("linear").attr("transform", "translate(" + [view.x, view.y] + ") scale(" + newScale + ")");
          };
        })(this));
      };

      ToolBox.prototype.loadAllNodes = function(nodes) {
        var node, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
          node = nodes[_i];
          _results.push(this.graphModel.putNode(node));
        }
        return _results;
      };

      ToolBox.prototype.expandSelection = function() {
        return this.dataProvider.getLinkedNodes(this.selection.getSelectedNodes(), (function(_this) {
          return function(nodes) {
            return _.each(nodes, function(node) {
              if (_this.dataProvider.nodeFilter(node)) {
                return _this.graphModel.putNode(node);
              }
            });
          };
        })(this));
      };

      ToolBox.prototype.searchNodes = function(searchQuery) {
        return $.post("/search_nodes", searchQuery, (function(_this) {
          return function(nodes) {
            var node, _i, _len, _results;
            console.log("made it here: " + searchQuery[0]);
            _results = [];
            for (_i = 0, _len = nodes.length; _i < _len; _i++) {
              node = nodes[_i];
              _this.graphModel.putNode(node);
              _results.push(_this.selection.toggleSelection(node));
            }
            return _results;
          };
        })(this));
      };

      return ToolBox;

    })(Backbone.View);
  });

}).call(this);