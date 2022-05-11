
const hashPassword = require('../src/utils/password');

const data = [
  {
    first_name: 'Admin',
    last_name: 'Admin',
    email: 'admin@example.com',
    password: hashPassword('password')
  },
  {
    first_name: 'James',
    last_name: 'Bondss',
    email: 'jammy@example.com',
    password: hashPassword('password')
  },
  {
    first_name: 'Samuel',
    last_name: 'Binuetan',
    email: 'samubins@example.com',
    password: hashPassword('password')
  }, 
  {
    first_name: 'Manager',
    last_name: 'Jude',
    email: 'mj@example.com',
    password: hashPassword('6*N$vBh#W8DG')
  },
  {
    first_name: 'Okoranwan',
    last_name: 'Jude',
    email: 'judeokan@example.com',
    password: hashPassword('password')
  },
  {
    first_name: 'request',
    last_name: 'man',
    email: 'requestman@example.com',
    password: hashPassword('password')
  },
  {
    first_name: 'Gbefu',
    last_name: 'Daniels',
    email: 'gbefdans@example.com',
    password: hashPassword('password')
  },
  {
    first_name: 'Temitayo',
    last_name: 'Bakstar',
    email: 'temibaks@example.com',
    password: hashPassword('password')
  }
];

module.exports = data