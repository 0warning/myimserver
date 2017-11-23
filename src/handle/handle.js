let session = null;
let tools = null;
let handle = {
   init : (_session, _tools) => {
      session = _session;
      tools = _tools;
   }
   ,sendMsg : (uuid, msg) => {
      session.allSocketSend(tools.msg.decode('system', 0, 'sendMsg', {
         'from' : session.getName(uuid)
         ,'msg' : msg.text
      }));
   }
};
exports.handle = handle;