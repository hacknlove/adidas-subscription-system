import send from 'mailer/lib/send';

export default function queueEmail({ email, templateId, templateParams }) {
  return send({
    topic: 'send-email',
    messages: [
      {
        email,
        templateId,
        templateParams,
      },
    ],
  });
}
