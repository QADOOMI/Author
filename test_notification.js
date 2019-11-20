const port = 3000;
var azure = require("azure-sb");

var notificationHubService = azure.createNotificationHubService(
  "AuthorsAndroid",
  "Endpoint=sb://authorsandroid-demo.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=0ToVa7jS3jRM8rsLZL4XHwjQy4zOcFxpZv/lX+18uw4="
);

const payload = {
  data: {
    notification: {
      alert: "You have a notification",
      title: "Notification",
      body: "The body of the notification",
      sound: "default"
    }
  }
};

notificationHubService.gcm.send(null, payload, function(error) {
  if (!error) {
    //notification sent
  }
});
