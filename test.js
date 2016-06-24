const Particle = require('particle-api-js');
const particle = new Particle();
var token;

particle.login({username: process.env.PARTICLE_USERNAME, password:process.env.PARTICLE_PASSWORD})
  .then(data => {
    token = data.body.access_token;
    console.log('Login completed:', token);
    var devicesPr = particle.listDevices({auth: token});
    return devicesPr;
  })
  .then(devices => {
    const photon = devices[0];

    console.log('Devices: ', devices);
  })
  .catch(err => {
    console.log('list devices failed:', err);
  });
