const Particle = require('particle-api-js');
const particle = new Particle();
var token;

particle.login({username: process.env.PARTICLE_USERNAME, password:process.env.PARTICLE_PASSWORD})
  .then(data => {
    token = data.body.access_token;
    console.log('Login completed.  Token:', token);
    return particle.listDevices({auth: token});
  })
  .then(devices => {
    const photon = devices.body[0];
    return particle.getDevice({
      deviceId: photon.id,
      auth: token
    });
  })
  .then(device => {
    let deviceId = device.body.id;
    return Promise.all([
      particle.callFunction({deviceId, name: 'digitalwrite', argument: 'D7:HIGH', auth: token}),
      particle.callFunction({deviceId, name: 'digitalwrite', argument: 'D7:LOW', auth: token})]);
  })
  .then(data => {
    console.log('Successful: ', data);
  })
  .catch(err => {
    console.log('Error:', err);
  });
