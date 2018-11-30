const Nexmo = require('nexmo')



module.exports = {
  sendMessage: (user, text) => {

    const nexmo = new Nexmo({
      apiKey: "195db385",
      apiSecret: "0ESc2zHL9YQiT5ng",
      applicationId: "ff35c24a-6155-4c1b-a10f-885512e3f286",
      privateKey: "private.key"
    });

    nexmo.channel.send(
      // TO
      { "type": "sms", "number": "447521175057" },
      // FROM
      { "type": "sms", "number": "447521175057" },
      {
        "content": {
          "type": "text",
          "text": `${user} needs your help with ${text}. Follow this link to help him/her: http://bocelli.herokuapp.com/help-someone.html`
        }
      },
      (err, data) => {
        if (err)
          console.error(err);
        if (data)
          console.log(data.message_uuid);
      }
    );
  }
};
