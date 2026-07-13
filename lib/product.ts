export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "A11yGuard",
  slug: "a11yguard",
  tagline: "WCAG/ADA compliance checks tuned for AI-generated frontends.",
  description: "Enter a URL or paste AI-generated component markup; get a WCAG checklist (alt text, contrast, ARIA, keyboard nav, labels) with fix guidance. For agencies and SaaS teams shipping AI/vibe-coded UIs that must meet accessibility law.",
  toolTitle: "Check accessibility",
  resultLabel: "A11y report",
  ctaLabel: "Check",
  features: [
  "WCAG/ADA checklist",
  "AI-UI specific rules",
  "Fix guidance",
  "Portfolio reports (Team)"
],
  inputs: [
  {
    "key": "url",
    "label": "Site or page URL",
    "type": "input",
    "placeholder": "https://yourapp.com/dashboard"
  },
  {
    "key": "code",
    "label": "Paste AI-generated markup (optional)",
    "type": "textarea",
    "placeholder": "<div onClick={...}><img src='x'/></div>"
  },
  {
    "key": "framework",
    "label": "Framework",
    "type": "select",
    "options": [
      "React",
      "Next.js",
      "Vue",
      "Svelte",
      "Other"
    ]
  }
] as InputField[],
  systemPrompt: "You are a web-accessibility auditor. Given a URL or AI-generated component markup and a framework, run a WCAG/ADA checklist (alt text, color contrast, ARIA roles, keyboard navigation, form labels, heading order) and report violations with fixes.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "1 site scan"
  },
  {
    "tier": "Pro",
    "price": "$39/mo",
    "desc": "Unlimited scans + fixes"
  },
  {
    "tier": "Team",
    "price": "$89/mo",
    "desc": "Portfolio + reports"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const code = (inputs['code'] || '').trim()
  const url = (inputs['url'] || '').trim()
  const fw = inputs['framework'] || 'React'
  if (!code && !url) return 'Paste markup or enter a URL to check.'
  const src = (code + ' ' + url).toLowerCase()
  const checks = [
    ['Images have alt text', /alt=|alt\s*=/i.test(code) || !/<img/i.test(code)],
    ['Color contrast meets WCAG AA', !/color:|text-white|text-gray-400/i.test(code) || /contrast/i.test(code)],
    ['Interactive elements use semantic/ARIA roles', !/onclick|div.*click/i.test(code) || /role=|button/i.test(code)],
    ['Keyboard navigable (no mouse-only)', !/onclick/i.test(code) || /tabindex|onkeydown|role=/i.test(code)],
    ['Form inputs have labels', !/<input|<select|<textarea/i.test(code) || /<label|aria-label/i.test(code)],
    ['Logical heading order', !/<h[1-6]/i.test(code) || /<h1|<h2|<h3/i.test(code)]
  ]
  let pass = 0
  let out = 'ACCESSIBILITY CHECK - ' + fw + '\n\n'
  checks.forEach(c => { out += (c[1] ? '[OK] ' : '[RISK] ') + c[0] + '\n'; if (c[1]) pass++ })
  out += '\n' + pass + '/' + checks.length + ' passed. ' + (pass < checks.length ? 'Fix [RISK] items before launch (ADA/EO exposure).' : 'Looks clean (mock).')
  out += '\n\n--- (Mock static scan. Pro scans the live DOM + continuous monitoring.)'
  return out
}
}
