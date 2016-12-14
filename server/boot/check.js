'use strict';

var request = require('request');

module.exports = function(server, next) {
  server.on('started', function() {
    console.log('RUNNIG FEATURE CHECK');
    var url = server.get('url');
    var token = server.get('accessToken');
    var reqOpts = {
      method: 'GET',
      url: url + 'api/users/' + token.userId + '/testInjectedOptions',
      json: true,
      headers: {
        'Authorization': token.id,
      },
    };
    request(reqOpts, function(err, res, body) {
      if (err) return console.error(err);
      console.log('THE RESULT');
      console.log(body);
      process.exit(1);
    });
  });
  next();
};
