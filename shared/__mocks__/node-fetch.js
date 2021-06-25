import { Readable } from 'stream'

export default function fetch (...args) {
  return Promise.resolve({ body: Readable.from(JSON.stringify(args)) })
}