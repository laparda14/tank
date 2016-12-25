
var io = require('socket.io')();

io.listen(3000);

var games = [];

io.sockets.on('connection',function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
  socket.on('message', function(msg){
      console.log('message: ' + msg);
      socket.emit('news', msg);
  });
  var game = null;
  for(var i=0;i<games.length;i++) {
    if(games[i].length < 2) {
      game = i;
    }
  }

  if(game === null) {
    games.push([])
    game = games.length-1;
  }

  games[game].push(socket);

  // socket.set('game',game);
  socket.game = game;

  if(games[game].length == 2) {
    // games[game][0].set('partner',socket);
    games[game][0].partner = socket;
    // games[game][1].set('partner',games[game][0]);
    games[game][1].partner = games[game][0];

    games[game][0].emit('master');
    games[game][1].emit('slave');
  }

  socket.on('delay',function(data) {
    // socket.get('partner',function(err,partner) {
    //   if(partner) {
    //     data.steps += 1;
    //     partner.emit('delay',data);
    //   } 
    // });
  });

  socket.on('move',function(data) {
    // socket.get('partner',function(err,partner) {
    //   if(partner) {
    //     partner.volatile.emit('move',data);
    //   } 
    // });
  });

  socket.on('ball',function(data) {
    // socket.get('partner',function(err,partner) {
    //   if(partner) {
    //     partner.volatile.emit('ball',data);
    //   } 
    // });
  });

  socket.on('disconnect',function() {
    // socket.get('partner',function(err,partner) {
    //   if(partner) {
    //     partner.emit('end');
    //     partner.set("partner",null);
    //   }
    // });
    // socket.get('game',function(err,game) {
    //   var idx = games[game].indexOf(socket);
    //   if(idx!=-1) games[game].splice(idx, 1);
    // });
  });
});

