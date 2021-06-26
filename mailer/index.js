import kafka from './lib/kafka.js';
import sendEmail from './lib/sendEmail.js';

const consumer = kafka.consumer({ groupId: 'mailer' });

async function main() {
  await consumer.connect();
  console.info('connected');
  await consumer.subscribe({ topic: 'send-email' });
  console.info('suscribed');
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());
      switch (topic) {
        case 'send-email': {
          sendEmail(data);
          return;
        }
        default: {
          console.warn('Unknown topic:', topic);
        }
      }
    },
  });
}

main();
