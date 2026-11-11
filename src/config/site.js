// Tenant settings. Swap these to re-skin the hub for another organization or client.
export const site = {
  orgName: 'i-Tech Academy',
  hubName: 'AI Hub',
  tagline: 'Work smarter with AI',
  intro:
    'Learn the frameworks, fill in a proven prompt, and send it straight to ChatGPT, Claude, Gemini, or Copilot. Then build an agent that already knows your role.',
  contactEmail: 'cwadmin@i-techsupport.com',
  website: 'https://www.i-techsupport.com',
};

// Audiences drive filtering across the whole hub. Keys match `audiences` in data files.
export const audiences = [
  {
    key: 'msp',
    label: 'MSP / Technology',
    short: 'MSP',
    description: 'Service desk, account management, and vCIO teams. Tickets, client comms, QBRs, and service delivery.',
  },
  {
    key: 'erp',
    label: 'ERP / Projects',
    short: 'ERP',
    description: 'Consultants, project managers, and trainers. Status reporting, discovery, go-lives, and adoption.',
  },
  {
    key: 'business',
    label: 'Business & Education',
    short: 'Business',
    description: 'Operations, HR, school leaders, and educators. Meetings, policies, reviews, and everyday communication.',
  },
];
