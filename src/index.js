function server() {}

server.prototype = {
   socket : null
   ,session : null
   ,tools : null
   ,handle : null
   ,register : () => {
      this.socket = require(__dirname + '/socket/socket').socket;
      this.session = new require(__dirname + '/socket/map').map;
      this.tools = {};
      this.tools.msg = require(__dirname + '/tools/msg').tools;
      this.handle = require(__dirname + '/handle/handle').handle;
      this.handle.init(this.session, this.tools);
   }
   ,startup : () => {
      let self = this;
      let server = new self.socket(5412);
      server.on('connection', (webSocket, incomingMessage) => {
         let uuid = self.tools.msg.uuid();
         self.session.setSocket(uuid, webSocket);
         webSocket.on('message', event => {
            let msg = self.tools.msg.encode(event);
            if (msg === null) {
               webSocket.send(self.tools.msg.error(1000));
               return;
            }
            if (msg.action === 'setName') {
               self.session.setName(uuid, msg.text);
               webSocket.send(self.tools.msg.notice('登录成功，欢迎' + msg.text));
               return;
            }
            if (self.handle[msg.action] === undefined) {
               webSocket.send(self.tools.msg.error(1001));
               return;
            }
            self.handle[msg.action](uuid, msg);
         });
         webSocket.on('error', event => {
            self.session.delete(uuid);
         });
         webSocket.on('close', event => {
            self.session.delete(uuid);
         });
      });
   }
};

exports.server = server;