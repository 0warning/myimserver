function server() {}

server.prototype = {
   socket : null
   ,fs : null
   ,register : function() {
      this.socket = require(__dirname + '/socket').socket;
      this.fs = require('fs');
   }
   ,startup : function() {
      let self = this;
      let server = new this.socket(5412);
      server.on('connection', function(webSocket,arg2) {
         //console.log(arg1);
         self.fs.writeFile(__dirname + '/../logs/log.txt', JSON.parse(arg2), e=>{console.log(e)});
      });
   }
};

exports.server = server;