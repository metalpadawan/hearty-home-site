import Container from '../components/Container.jsx';
import MotionSection from '../components/MotionSection.jsx';
import { site } from '../data/site.js';

const sections = [
  {
    title: 'What We Collect',
    items: [
      'Name, email address, phone number if provided, service interest, location, and message content submitted through the enquiry form.',
      'Area checker input such as a postcode, postcode district, or local area name. This is used only to check likely service coverage.',
      'Basic technical logs from the hosting platform and email provider, such as timestamps, request status, and delivery status.',
    ],
  },
  {
    title: 'Why We Use It',
    items: [
      'To respond to enquiries and discuss requested services.',
      'To check whether a location appears to be within the current service area.',
      'To protect the site from spam, abuse, and security issues.',
      'To keep a practical business record of enquiries and follow-up communication.',
    ],
  },
  {
    title: 'Sensitive Information',
    items: [
      'Please do not submit medical records, diagnosis details, financial information, identity documents, or highly sensitive personal information through the contact form.',
      'For hoarders support enquiries, only share the practical information needed to understand the space, urgency, location, and preferred contact method.',
    ],
  },
  {
    title: 'Third-Party Processors',
    items: [
      'Vercel hosts the website and serverless API functions.',
      'Resend sends contact form emails to the business mailbox.',
      'Zoho Mail hosts the business mailbox used to receive and respond to enquiries.',
      'Cloudflare Turnstile may be used for spam protection once enabled.',
      'Postcodes.io is used to validate UK postcodes for the area checker.',
    ],
  },
  {
    title: 'Retention And Deletion',
    items: [
      'General enquiries should only be kept for as long as they are needed for follow-up, business records, or legal reasons.',
      'Spam, irrelevant, or accidental submissions should be deleted as soon as practical.',
      `People can request deletion of their enquiry information by emailing ${site.email}.`,
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">Privacy</p>
          <h1>How enquiry information is handled.</h1>
          <p className="lead">
            This page explains the practical privacy approach for {site.name}. It should be reviewed again whenever the email provider, domain, or service workflow changes.
          </p>
        </Container>
      </section>

      <MotionSection className="section">
        <Container className="grid gap-5">
          {sections.map((section) => (
            <article className="rounded-2xl border border-teal-900/10 bg-white p-6 shadow-soft" key={section.title}>
              <h2 className="font-display text-2xl font-bold text-teal-950">{section.title}</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-teal-950/70">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </MotionSection>

      <MotionSection className="section bg-cream">
        <Container className="rounded-[2rem] bg-teal-950 p-8 text-cream shadow-glow sm:p-10">
          <p className="eyebrow text-gold-400">Important</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">This is a starter privacy notice.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-cream/70">
            Before public launch, confirm the final retention period, deletion workflow, and any future service providers such as a CRM, booking tool, or client database.
          </p>
        </Container>
      </MotionSection>
    </>
  );
}
