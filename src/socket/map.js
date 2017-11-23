let map = {
   _ : new Map()
   ,put : (key, name, value) => {
      let obj = map._.has(key) ? map._.get(key) : {};
      obj[name] = value;
      map._.set(key, obj);
   }
   ,setSocket : (key, socket) => {
      map.put(key, 'socket', socket);
   }
   ,setName : (key, name) => {
      map.put(key, 'name', name);
   }
   ,getSocket : key => {
      return map._.get(key).socket;
   }
   ,getName : key => {
      return map._.get(key).name;
   }
   ,allSocketSend : param => {
      let count = 0;
      for (let key of map._) {
         map._.get(key).socket.send(param);
         count++;
      }
      return count;
   }
   ,delete : key => {
      map._.delete(key);
      console.log('socket delete');
   }
};
exports.map = map;