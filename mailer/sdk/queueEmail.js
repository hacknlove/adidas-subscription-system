import send from 'mailer/lib/send.js';

export default function queueEmail({ email, templateId, templateParams }) {
  return send({
    topic: 'send-email',
    data:
      {
        email,
        templateId,
        templateParams,
      },
  });
}
