const Nexmo = require('nexmo')



module.exports = {
  sendMessage: () => {

    const nexmo = new Nexmo({
      apiKey: "195db385",
      apiSecret: "0ESc2zHL9YQiT5ng",
      applicationId: "ff35c24a-6155-4c1b-a10f-885512e3f286",
      privateKey: "private.key"
    });

    nexmo.channel.send(
      { "type": "sms", "number": "447521175057" },
      { "type": "sms", "number": "447521175057" },
      {
        "content": {
          "type": "text",
          "text": "This is an SMS sent from the Messages API"
        }
      },
      (err, data) => { console.log(data.message_uuid); }
    );
  }
};
