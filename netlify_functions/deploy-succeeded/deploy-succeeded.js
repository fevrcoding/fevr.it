// const axios = require('axios');

// const { ONE_SIGNAL_API_KEY, ONE_SIGNAL_APP_ID } = process.env;

exports.handler = function (event) {
  console.log(event);
  // axios.post(
  //   'https://onesignal.com/api/v1/notifications',
  //   {
  //     included_segments: ['Active Users'],
  //     app_id: ONE_SIGNAL_APP_ID,
  //     headings: {
  //       en: 'Pubblicato un nuovo evento!',
  //     },
  //     contents: {
  //       en: "Titolo dell'evento",
  //     },
  //   },
  //   {
  //     headers: { Authorization: `Basic ${ONE_SIGNAL_API_KEY}` },
  //   },
  // );
  return {
    statusCode: 200,
  };
};