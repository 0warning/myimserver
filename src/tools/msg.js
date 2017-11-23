let tools = {
   decode : (type, code, action, text) => {
      return JSON.stringify({'type':type, 'code':code, 'action':action, 'text':text});
   }
   ,encode : param => {
      let recode = null;
      try {
         recode = JSON.parse(param);
      } catch(e) {
         recode = null;
      }
      return recode;
   }
   ,uuid : () => {
      return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      });
   }
   ,notice : param => {
      return tools.decode('system', 0, 'notice', param);
   }
   ,error : code => {
      return tools.decode('system', code, 'error', null);
   }
};
exports.tools = tools;