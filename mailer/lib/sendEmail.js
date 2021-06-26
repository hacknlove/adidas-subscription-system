export default function sendEmail({ email, templateId, templateParams }) {
  console.log(`
  SEND EMAIL:
  to: ${email},
  templateId: ${templateId},
  templateParams: 
  ${JSON.stringify(templateParams, null, 3)}
  `);
}
