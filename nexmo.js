const Nexmo = require('nexmo')



module.exports = {
  sendMessage: (user, text) => {

    const nexmo = new Nexmo({
      apiKey: "",
      apiSecret: "",
      applicationId: "",
      privateKey: "private.key"
    });

    nexmo.channel.send(
      // TO
      { "type": "sms", "number": "447521175057" },
      // FROM
      { "type": "sms", "number": "447418342690" },
      {
        "content": {
          "type": "text",
          "text": `${user} needs your help with: ${text}. Follow this link to help him/her: http://bocelli.herokuapp.com/#/chat`
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
