import kafka from './kafka.js';

export default async function send({ topic, data }) {
  const producer = kafka.producer();
  await producer.connect();

  let messages;

  if (Array.isArray(data)) {
    messages = data.map((message) => ({ value: JSON.stringify(message) }));
  } else {
    messages = [{ value: JSON.stringify(data) }];
  }

  await producer.send({
    topic,
    messages,
  });
  await producer.disconnect();
}
