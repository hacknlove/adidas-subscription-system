// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

if (!process.argv[2]) {
  console.log(`
yarn getToken sub iss [JWT_SECRET]

Creates a JWT with the said sub that expires in 1 day.

JWT_SECRET defaults to the variable environment used by your development docker-compose

`);
  process.exit(0);
}

const [,, sub, iss, secret = process.env.JWT_SECRET] = process.argv;

console.log(sub, iss, secret);
console.log(jwt.sign({ sub, iss, expiresIn: '1d' }, secret));
