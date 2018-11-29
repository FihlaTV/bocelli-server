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
  // var publisher = OT.initPublisher('publisher', {
  //   insertMode: 'append',
  //   width: '100%',
  //   height: '100%'
  // }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      // session.publish(publisher, handleError);
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
var apiKey = "46228432";
var sessionId = "2_MX40NjIyODQzMn5-MTU0MzQ5ODQ3NjUwMX5pamNMcVhUTnlIWSsrY2VUSFJUMWduZDB-fg";
var token = "T1==cGFydG5lcl9pZD00NjIyODQzMiZzaWc9OTk0NmFiZDZlYzRjMmRiNzg1N2YwZDYzMzE5NzY5YTA2OWZkZmUyMjpzZXNzaW9uX2lkPTJfTVg0ME5qSXlPRFF6TW41LU1UVTBNelE1T0RRM05qVXdNWDVwYW1OTWNWaFVUbmxJV1NzclkyVlVTRkpVTVdkdVpEQi1mZyZjcmVhdGVfdGltZT0xNTQzNDk4NDkzJm5vbmNlPTAuNDg0MjM3NTQ0MjcxNjU4OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQzNTAyMDkyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (optional) add server code here
initializeSession();