import kafka from './kafka';

export default async function send(props) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send(...props);
  await producer.disconnect();
}
