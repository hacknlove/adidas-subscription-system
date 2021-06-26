import { Kafka } from 'kafkajs';

export default new Kafka({
  clientId: 'mailer',
  brokers: [process.env.KAFKA_URL],
});
