import kafka from './lib/kafka';

const consumer = kafka.consumer({ groupId: 'mailer' });

async function main() {
  await consumer.connect();

  await consumer.subscribe({ topic: 'send-email' });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (topic !== 'send-email') {
        return;
      }

      console.log(JSON.stringify(message, null, 3));
    },
  });
}

main();
