function socket(port) {
   this.port = port;
   return this.server();
}

socket.prototype = {
   webSocket : null
   ,port : 0
   ,initSocket : function() {
      let server = require('ws').Server;
      this.webSocket = new server({ 'port' : this.port });
   }
   ,server : function() {
      if (this.webSocket === null) {
         this.initSocket();
      }
      return this.webSocket;
   }
};

exports.socket = socket;