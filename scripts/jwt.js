import jwt from 'jsonwebtoken';

if (!process.argv[2]) {
  console.log(`
yarn getToken sub [JWT_SECRET]

Creates a JWT with the said sub that expires in 1 day.

JWT_SECRET defaults to the variable environment used by your development docker-compose

`)
process.exit(0)
}

console.log(jwt.sign({ sub: process.argv[2], expiresIn: '1d' }, process.argv[3] ?? process.env.JWT_SECRET))