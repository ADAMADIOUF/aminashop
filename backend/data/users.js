import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin Amina',
    email: 'adminamina@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'adama Diouf',
    email: 'adama@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Debo Dioud',
    email: 'debo@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
