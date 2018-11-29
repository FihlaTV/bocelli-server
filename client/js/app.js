// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    publishAudio: true,
    publishVideo: false
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });

  session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscriber', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
});
}

// replace these values with those generated in your TokBox Account
var apiKey = "46228482";
var sessionId = "2_MX40NjIyODQ4Mn5-MTU0MzQ5OTIyNDYyNH5Yd0paenpZQm1NclM4MlF4V0N1ajNIV2Z-fg";
var token = "T1==cGFydG5lcl9pZD00NjIyODQ4MiZzaWc9NDIyNDJkZTZkNjdjMGY1ODg1ZjcwOTAwYzk0Y2E4M2YzMjZiZTM0MjpzZXNzaW9uX2lkPTJfTVg0ME5qSXlPRFE0TW41LU1UVTBNelE1T1RJeU5EWXlOSDVZZDBwYWVucFpRbTFOY2xNNE1sRjRWME4xYWpOSVYyWi1mZyZjcmVhdGVfdGltZT0xNTQzNDk5MjU5Jm5vbmNlPTAuOTQ0MjU0MjkxODA3MDk5MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQ0MTA0MDU4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (optional) add server code here
initializeSession();
