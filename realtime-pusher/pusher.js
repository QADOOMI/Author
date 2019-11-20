const Pusher = require('pusher');

exports.pusher = new Pusher({
  appId: '897266',
  key: 'f088d9eb66b33753c70d',
  secret: 'a754938fc235945b788b',
  cluster: 'ap2',
  encrypted: true
});
