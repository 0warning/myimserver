let index = require(__dirname + '/src/index').server;

let main = new index();

main.register();
main.startup();