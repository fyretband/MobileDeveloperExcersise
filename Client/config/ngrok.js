const ngrok = require('ngrok');

(async function() {
  try {
    await ngrok.authtoken('2RcjpoUOzRZqbLmrsaNpBsR6Xxv_4om2iy4tNdcthWVkAR8Rq');

    const url = await ngrok.connect(3000);
    console.log('Ngrok URL:', url);
  } catch (error) {
    console.error('Ngrok error:', error);
  }
})();
