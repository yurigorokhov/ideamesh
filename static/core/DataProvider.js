// Generated by CoffeeScript 1.7.1
(function() {
  define([], function() {
    var DataProvider;
    return DataProvider = (function() {
      function DataProvider() {}

      DataProvider.prototype.init = function(instances) {
        this.graphModel = instances["GraphModel"];
        instances["KeyListener"].on("down:16:187", (function(_this) {
          return function() {
            return _this.getLinkedNodes(instances["NodeSelection"].getSelectedNodes(), function(nodes) {
              console.log("A list of the LINKED NODES: ", nodes);
              return _.each(nodes, function(node) {
                if (_this.nodeFilter(node)) {
                  return _this.graphModel.putNode(node);
                }
              });
            });
          };
        })(this));
        return this.graphModel.on("add:node", (function(_this) {
          return function(node) {
            var nodes;
            nodes = _this.graphModel.getNodes();
            return _this.getLinks(node, nodes, function(links) {
              return _.each(links, function(link, i) {
                if (link.start === node['_id']) {
                  link.source = node;
                  link.target = nodes[i];
                } else {
                  link.source = nodes[i];
                  link.target = node;
                }
                if (_this.linkFilter(link)) {
                  return _this.graphModel.putLink(link);
                }
              });
            });
          };
        })(this));
      };

      DataProvider.prototype.getLinks = function(node, nodes, callback) {
        throw "must implement getLinks for your data provider";
      };

      DataProvider.prototype.getLinkedNodes = function(nodes, callback) {
        throw "must implement getLinkedNodes for your data provider";
      };

      DataProvider.prototype.nodeFilter = function() {
        return true;
      };

      DataProvider.prototype.linkFilter = function() {
        return true;
      };

      DataProvider.prototype.ajax = function(url, data, callback) {
        return $.ajax({
          url: url,
          data: data,
          success: callback
        });
      };

      return DataProvider;

    })();
  });

}).call(this);