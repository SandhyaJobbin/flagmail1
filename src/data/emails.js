// Flagmail — Email Dataset v2.1
// 50 emails: 20 easy (zone 1), 20 medium (zone 2), 10 hard (zone 3)
// v2.1 adds: fromName, sender, replyTo, auth, originIp, userContext,
//            reasoningQuestion, reasoningOptions, correctReason
// First 5 per zone are the demo-selected set with fully crafted metadata.

export const EMAIL_POOL = [

  {
    id: "E001",
    zone: 1,
    fromName: "Apple Support",
    from: "security-alert@apple-id-support.net",
    sender: "security-alert@apple-id-support.net",
    replyTo: "noreply@apple-id-support.net",
    subject: "Your Apple ID has been LOCKED — Immediate Action Required",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Dear Apple User,

We have detected multiple failed login attempts on your Apple ID account. As a precaution, your account has been LOCKED and all purchases have been suspended.

To unlock your account and avoid permanent closure, you MUST verify your identity in the next 24 HOURS by clicking the button below:

[ UNLOCK MY APPLE ID NOW ]

If you do not verify within 24 hours, your Apple ID will be permanently deleted along with all associated purchases, photos, and data.

Apple Support Team
apple-id-support.net`,
    clues: [
      "Sender domain is apple-id-support.net — Apple only sends from apple.com",
      "All-caps words like LOCKED and HOURS are pressure tactics not used in real Apple emails",
      "Threatens deletion of purchases and photos to create panic",
      "Apple never locks accounts or threatens permanent deletion via email",
    ],
    giveawayPhrase: "your Apple ID will be permanently deleted along with all associated purchases, photos, and data",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "Sloppy Apple ID phishing. Three all-caps pressure words, a fake domain, and a threat to delete all purchases are classic signs of a low-effort phishing template. Real Apple emails never threaten account deletion.",
    reasoningQuestion: "What is the single strongest indicator this is a phishing email?",
    reasoningOptions: [
      "The sender domain is apple-id-support.net, not apple.com",
      "The email uses urgent language like \"LOCKED\" and \"HOURS\"",
      "It threatens to delete purchases and photos",
      "Apple never sends emails about account issues",
    ],
    correctReason: 0,
  },
  {
    id: "E002",
    zone: 1,
    fromName: "Global Prize Awards",
    from: "winner-notifications@prize-global-awards.xyz",
    sender: "winner-notifications@prize-global-awards.xyz",
    replyTo: "claims@prize-global-awards.xyz",
    subject: "🏆 YOU ARE OUR GRAND PRIZE WINNER — Claim $5,000 Cash Today",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "41.185.28.7 (NG)",
    userContext: null,
    body: `CONGRATULATIONS!!!

Your email address was randomly selected as the GRAND PRIZE WINNER of our Global Cash Sweepstakes. You have won FIVE THOUSAND DOLLARS ($5,000) in cash!

To claim your prize, you must:
1. Reply to this email with your full name, home address, and date of birth
2. Pay a one-time processing and release fee of $49.99
3. Provide your bank account details so we can transfer your winnings

This offer expires in 48 hours. If we do not hear from you, your prize will be forfeited and awarded to another winner.

Global Prize Awards Team
prize-global-awards.xyz`,
    clues: [
      "You never entered a sweepstakes — unsolicited prize emails are always spam",
      "Requires a $49.99 'processing fee' upfront — legitimate prizes never cost money to claim",
      "Requests home address, date of birth, and bank account details in one email",
      "Suspicious .xyz domain with no verifiable company behind it",
    ],
    giveawayPhrase: "Pay a one-time processing and release fee of $49.99",
    level1: "High-Risk Fraud",
    level2: "Advance Fee Fraud",
    explanation: "Classic advance fee prize scam. The $49.99 'processing fee' is the attack — once paid, the scammer disappears. No legitimate prize requires the winner to pay anything upfront.",
    reasoningQuestion: "Why is this High-Risk Fraud and not just Spam?",
    reasoningOptions: [
      "It requires you to pay a fee and provide bank details to claim winnings",
      "It uses all-caps and multiple exclamation marks",
      "It claims you won a sweepstakes you never entered",
      "It has a 48-hour expiry deadline",
    ],
    correctReason: 0,
  },
  {
    id: "E003",
    zone: 1,
    fromName: "PayPal Security",
    from: "billing@netflix.com",
    sender: "security@paypal-accounts-alert.com",
    replyTo: "support@paypal-accounts-alert.com",
    subject: "Your Netflix membership — March 2026 billing confirmation",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "196.251.65.143 (NG)",
    userContext: null,
    body: `Hi there,

Your Netflix Standard plan has been successfully renewed.

Plan: Standard (1080p)
Amount charged: $15.49
Billing date: March 14, 2026
Next billing date: April 14, 2026

If you have questions about your membership or need to update your payment method, visit netflix.com/account or contact us at help.netflix.com.

— The Netflix Team`,
    clues: [
      "Sender domain is netflix.com — verified and expected",
      "Billing amount matches the real Netflix Standard plan price",
      "No links to external sites — only references netflix.com",
      "No urgency, no threats, no requests for any information",
    ],
    giveawayPhrase: "visit netflix.com/account or contact us at help.netflix.com",
    level1: "Legitimate",
    level2: "Subscription Billing",
    explanation: "Routine Netflix billing confirmation. The verified domain, accurate plan pricing, and absence of any external links or information requests are all hallmarks of a genuine transactional email.",
    reasoningQuestion: "What is the most definitive signal this is not from PayPal?",
    reasoningOptions: [
      "The sender domain is paypal-accounts-alert.com, not paypal.com",
      "It claims suspicious activity on your account",
      "It asks you to verify identity via a link",
      "It threatens to limit your account",
    ],
    correctReason: 0,
  },
  {
    id: "E004",
    zone: 1,
    fromName: "IRS Tax Refund Department",
    from: "deals@bestbuy-exclusive-offers.com",
    sender: "refund@irs-refund-dept.com",
    replyTo: "collect@irs-refund-dept.com",
    subject: "FLASH SALE: 90% OFF all electronics — Today Only!!!",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "91.109.4.28 (NL)",
    userContext: null,
    body: `Hi Valued Customer,

We are clearing our entire electronics inventory and passing the savings directly to YOU. For the next 6 hours only, enjoy 90% OFF on ALL products including:

• iPhone 15 Pro — now just $119.99 (was $1,199)
• MacBook Pro 16" — now just $249.99 (was $2,499)
• Samsung 65" QLED TV — now just $89.99 (was $899)

These prices are REAL and LIMITED. Click below to shop before stock runs out.

[ SHOP THE FLASH SALE NOW ]

This email was sent to you because you are a Best Buy rewards member.
Unsubscribe: bestbuy-exclusive-offers.com/unsubscribe`,
    clues: [
      "Sender domain is bestbuy-exclusive-offers.com — not bestbuy.com",
      "90% off pricing is implausible — iPhone 15 Pro for $119.99 is impossible",
      "6-hour countdown creates false urgency to prevent rational thinking",
      "Unsubscribe link goes to the fake domain, not bestbuy.com",
    ],
    giveawayPhrase: "iPhone 15 Pro — now just $119.99 (was $1,199)",
    level1: "Spam & Junk",
    level2: "Bulk Marketing Spam",
    explanation: "Fake retail flash sale spam using Best Buy's brand. The 90% discount on an iPhone is the clearest signal — no legitimate retailer can offer this price. The fake domain confirms it.",
    reasoningQuestion: "Why is this definitely not a legitimate IRS communication?",
    reasoningOptions: [
      "The IRS only contacts taxpayers by postal mail, never by unsolicited email",
      "The email promises a refund",
      "It asks for personal information",
      "The dollar amount looks suspicious",
    ],
    correctReason: 0,
  },
  {
    id: "E005",
    zone: 1,
    fromName: "Bank of America Alerts",
    from: "no-reply@github.com",
    sender: "alerts@bankofamerica-secure.net",
    replyTo: "noreply@bankofamerica-secure.net",
    subject: "[GitHub] A new SSH key was added to your account",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "103.75.190.12 (CN)",
    userContext: null,
    body: `Hey there,

A new public SSH key was recently added to your GitHub account.

Key fingerprint: SHA256:uNiVztksCsDhcc0u9e8BujQXVUpKZIDTMczCvj3tD2s
Added: March 14, 2026 at 09:42 UTC

If you added this key, no further action is needed. If you did not add this key, remove it immediately and secure your account:
github.com/settings/security

If you're having trouble, contact GitHub Support at support.github.com.

— The GitHub Team`,
    clues: [
      "Sender domain is github.com — verified",
      "Contains a specific key fingerprint — personalised, not generic",
      "All links point exclusively to github.com subdomains",
      "Provides clear action if unrecognised — no panic, no urgency",
    ],
    giveawayPhrase: "If you did not add this key, remove it immediately and secure your account: github.com/settings/security",
    level1: "Legitimate",
    level2: "Security Notification",
    explanation: "Standard GitHub SSH key notification. The verified domain, specific key fingerprint, and calm actionable instructions are consistent with GitHub's actual security notification format.",
    reasoningQuestion: "What is the clearest red flag in this email?",
    reasoningOptions: [
      "The domain bankofamerica-secure.net is not bankofamerica.com",
      "It warns about suspicious account activity",
      "It asks you to click a link to verify",
      "A Chinese IP address was used to send it",
    ],
    correctReason: 0,
  },
  {
    id: "E006",
    zone: 1,
    fromName: "support@paypa1-account-services.com",
    from: "support@paypa1-account-services.com",
    sender: "support@paypa1-account-services.com",
    replyTo: "support@paypa1-account-services.com",
    subject: "Your PayPal account has been limited — verify now",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Dear PayPal Customer,

We have noticed some unusual activity associated with your PayPal account and have temporarily limited what you can do until we confirm your identity.

To restore your account, please provide the following within 72 hours:
• Your full credit card number and expiry date
• Your billing address and Social Security Number
• A photo of your government-issued ID

Click below to submit your verification documents securely:
[ VERIFY MY ACCOUNT ]
paypa1-account-services.com/verify

Failure to complete verification will result in your account being permanently closed and any funds being held for 180 days.

PayPal Security Team`,
    clues: [
      "Domain is paypa1-account-services.com — the letter 'l' replaced with digit '1'",
      "Requests full credit card number, SSN, and government ID in one email",
      "PayPal never requests your SSN or card number via email under any circumstances",
      "Threatens to hold funds for 180 days to prevent the victim from ignoring the email",
    ],
    giveawayPhrase: "Your full credit card number and expiry date • Your billing address and Social Security Number • A photo of your government-issued ID",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "Homoglyph domain attack (1 for l) combined with a maximum data harvest — card number, SSN, and government ID in a single email. PayPal never requests these via email. The domain typo is visible if read carefully.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E007",
    zone: 1,
    fromName: "hr@acmecorp.com",
    from: "hr@acmecorp.com",
    sender: "hr@acmecorp.com",
    replyTo: "hr@acmecorp.com",
    subject: "Office closure — Friday March 15 (public holiday)",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Hi team,

Just a quick reminder that the office will be closed this Friday, March 15, in observance of the public holiday.

If you have any urgent matters, please ensure they are completed by end of day Thursday. The office will reopen as normal on Monday, March 18.

Have a great long weekend everyone.

Best,
Rachel
People & Culture`,
    clues: [
      "Internal company domain — acmecorp.com matches expected sender",
      "Casual familiar tone consistent with an internal HR notice",
      "No links, no attachments, no requests for any information",
      "Specific operational details (dates, reopening) confirm legitimacy",
    ],
    giveawayPhrase: "The office will reopen as normal on Monday, March 18",
    level1: "Legitimate",
    level2: "Internal Communication",
    explanation: "Routine internal HR communication. Internal domain, familiar HR tone, specific dates, and zero requests for information or clicks make this a clean internal notice.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E008",
    zone: 1,
    fromName: "crypto-profits@bitcoin-wealth-system.io",
    from: "crypto-profits@bitcoin-wealth-system.io",
    sender: "crypto-profits@bitcoin-wealth-system.io",
    replyTo: "crypto-profits@bitcoin-wealth-system.io",
    subject: "I made $94,000 in 11 days — I'll show you exactly how",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Hi,

My name is James and 3 months ago I was $40,000 in debt. Then a friend showed me a trading algorithm that the major banks have been desperately trying to suppress.

In just 11 days, I turned a $500 investment into $94,000.

This system works automatically. You don't need any experience. All you need is 15 minutes a day and a starting deposit of $250.

⚠️ WARNING: Due to pressure from financial institutions, this page may be taken down at any time. Act NOW before it disappears.

Real results from real people:
"Made $12,000 in my first week!" — Sandra K.
"Quit my job after 3 weeks!" — Mike T.

[ ACCESS THE SYSTEM BEFORE IT'S GONE ]`,
    clues: [
      "Claims $500 turned into $94,000 in 11 days — a 18,700% return, mathematically impossible legally",
      "'Banks trying to suppress this' is a conspiracy framing designed to bypass scepticism",
      "Anonymous testimonials with only first name and last initial — unverifiable",
      "'This page may be taken down at any time' creates artificial scarcity and urgency",
    ],
    giveawayPhrase: "Due to pressure from financial institutions, this page may be taken down at any time",
    level1: "High-Risk Fraud",
    level2: "Advance Fee Fraud",
    explanation: "Investment fraud using a personal story, impossible returns, and fake social proof. The 'banks are suppressing this' framing is designed to make sceptics feel they're being controlled. The $250 starting deposit is the initial theft.",
    reasoningQuestion: "Why is this email classified as \"High-Risk Fraud\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E009",
    zone: 1,
    fromName: "noreply@amazon.com",
    from: "noreply@amazon.com",
    sender: "noreply@amazon.com",
    replyTo: "noreply@amazon.com",
    subject: "Your Amazon order #112-3847291-9384756 has been delivered",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Hello,

Your package has been delivered.

Order: #112-3847291-9384756
Item: Kindle Paperwhite (16GB, Black)
Delivered: March 14, 2026 at 2:14 PM
Left at: Front door

Track your delivery or report an issue at:
amazon.com/orders

Thank you for shopping with Amazon.`,
    clues: [
      "Sender domain is amazon.com — verified",
      "Order number matches Amazon's actual format (three groups of digits)",
      "Specific product, delivery time, and location — not generic",
      "Single link to amazon.com/orders — no external redirects",
    ],
    giveawayPhrase: "Track your delivery or report an issue at: amazon.com/orders",
    level1: "Legitimate",
    level2: "Shipping Update",
    explanation: "Standard Amazon delivery confirmation. The verified domain, correctly formatted order number, specific delivery details, and single on-domain link are all consistent with genuine Amazon transactional email.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E010",
    zone: 1,
    fromName: "admin@microsoft-account-verify.net",
    from: "admin@microsoft-account-verify.net",
    sender: "admin@microsoft-account-verify.net",
    replyTo: "admin@microsoft-account-verify.net",
    subject: "Microsoft Account: Sign-in from unknown device blocked",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Dear Microsoft Account User,

A sign-in attempt to your Microsoft account was blocked because it came from an unrecognised device in Lagos, Nigeria.

To confirm your identity and restore access, click the link below and enter your Microsoft username and password:

[ CONFIRM MY IDENTITY ]
http://microsoft-account-verify.net/login?ref=security

If you do not confirm within 12 hours, your account will be suspended and you will lose access to all Microsoft 365 services, OneDrive files, and Outlook emails permanently.

Microsoft Account Team
microsoft-account-verify.net`,
    clues: [
      "Sender domain is microsoft-account-verify.net — Microsoft emails come from microsoft.com",
      "Link URL shown is http (not https) and goes to the fake domain",
      "Asks you to enter your Microsoft username and password via an email link",
      "Threatens permanent loss of OneDrive and Outlook to maximise fear",
    ],
    giveawayPhrase: "click the link below and enter your Microsoft username and password",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "Microsoft account phishing. The explicit instruction to enter your password via an email link is the most obvious red flag — no legitimate service ever asks for your password this way. The fake domain and HTTP link confirm it.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E011",
    zone: 1,
    fromName: "jobs@easy-remote-income.net",
    from: "jobs@easy-remote-income.net",
    sender: "jobs@easy-remote-income.net",
    replyTo: "jobs@easy-remote-income.net",
    subject: "Work from home — $75/hour, no experience needed, start today",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Hi,

We are urgently hiring remote data entry workers. No experience required. No qualifications needed. Work from home on your own schedule.

Pay: $75 per hour
Hours: flexible, minimum 2 hours per day
Start date: immediately

To secure your position, complete the following steps today:
1. Reply with your full name and address
2. Pay the $99 starter kit and training fee
3. We will courier your equipment within 3 business days

Over 4,000 people are already earning with us. Do not miss this opportunity — positions fill fast.

[ APPLY NOW ]`,
    clues: [
      "$75/hour for no-experience data entry is far above any realistic market rate",
      "Requires a $99 'starter kit and training fee' — no legitimate employer charges candidates",
      "Vague company name with no verifiable business details",
      "'Positions fill fast' creates false urgency to prevent the target from researching",
    ],
    giveawayPhrase: "Pay the $99 starter kit and training fee",
    level1: "High-Risk Fraud",
    level2: "Job Scam",
    explanation: "Advance fee job scam. The $99 fee is the theft mechanism — equipment never arrives. No legitimate employer charges candidates a fee before employment. The unrealistic pay rate is designed to attract desperate job seekers.",
    reasoningQuestion: "Why is this email classified as \"High-Risk Fraud\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E012",
    zone: 1,
    fromName: "mailer@bankofamerica.com",
    from: "mailer@bankofamerica.com",
    sender: "mailer@bankofamerica.com",
    replyTo: "mailer@bankofamerica.com",
    subject: "Your Bank of America statement is ready — February 2026",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Your February 2026 statement is now available.

Account: Checking (...4821)
Statement period: Feb 1 – Feb 28, 2026

Sign in to Online Banking at bankofamerica.com to view your full statement.

Minimum payment due: $0.00
Next statement date: March 31, 2026

Questions? Call 1-800-432-1000 or visit bankofamerica.com/help.

Bank of America, N.A.
© 2026 Bank of America Corporation`,
    clues: [
      "Sender domain is bankofamerica.com — verified",
      "References a specific partial account number — personalised",
      "All contact points (phone, web) are verified Bank of America channels",
      "No external links, no requests for information, no urgency",
    ],
    giveawayPhrase: "Sign in to Online Banking at bankofamerica.com to view your full statement",
    level1: "Legitimate",
    level2: "Bank / Financial Notification",
    explanation: "Legitimate Bank of America statement notification. Verified domain, partial account number for personalisation, and all contact links pointing to bankofamerica.com are consistent with genuine bank correspondence.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E013",
    zone: 1,
    fromName: "sextortion-dept@anon-collective.cc",
    from: "sextortion-dept@anon-collective.cc",
    sender: "sextortion-dept@anon-collective.cc",
    replyTo: "sextortion-dept@anon-collective.cc",
    subject: "We have recorded you. Pay $1,500 Bitcoin or we send the video.",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Hello.

I have been monitoring your online activity for the past 3 months using malware I installed when you visited an adult website. I have a split-screen recording of you and the content you were viewing.

If you want me to delete this recording, transfer exactly $1,500 in Bitcoin to the wallet address below within 48 hours:

BTC Wallet: 1A2B3C4D5E6F7G8H9I0J

Do not reply to this email. Do not contact the police. If you do not pay within 48 hours, I will send the video to every contact in your email and social media accounts.

You have been warned.`,
    clues: [
      "Sender is a random anonymous address — no real organisation sends extortion emails",
      "'Do not contact the police' is a control tactic to prevent the victim from seeking help",
      "Bitcoin wallet demand with 48-hour deadline is the standard sextortion template",
      "The malware and recording claim is almost always a bluff sent to millions of addresses",
    ],
    giveawayPhrase: "Do not reply to this email. Do not contact the police.",
    level1: "High-Risk Fraud",
    level2: "Extortion & Sextortion",
    explanation: "Mass sextortion email — one of the most common fraud templates. The malware and recording are almost certainly fabricated. These emails are sent to millions of addresses. The 'do not contact police' instruction is the clearest signal of criminal intent.",
    reasoningQuestion: "Why is this email classified as \"High-Risk Fraud\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E014",
    zone: 1,
    fromName: "newsletter@theverge.com",
    from: "newsletter@theverge.com",
    sender: "newsletter@theverge.com",
    replyTo: "newsletter@theverge.com",
    subject: "The Verge Daily — Top stories for March 14, 2026",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Good morning,

Here are today's top stories from The Verge:

• Apple announces M5 chip — what's new and what it means for the Mac lineup
• The EU's AI Act takes effect: what changes for users today
• Best budget laptops under $500 in 2026 — our top picks

Read these stories and more at theverge.com

Manage your newsletter preferences or unsubscribe at theverge.com/newsletters

— The Verge`,
    clues: [
      "Sender domain is theverge.com — verified tech publication",
      "Content is consistent with The Verge's coverage areas",
      "Unsubscribe link goes to theverge.com/newsletters — on-domain",
      "No links to external sites, no requests for information",
    ],
    giveawayPhrase: "Manage your newsletter preferences or unsubscribe at theverge.com/newsletters",
    level1: "Legitimate",
    level2: "Newsletter / Platform Notification",
    explanation: "Legitimate daily newsletter from The Verge. Verified domain, relevant content, on-domain unsubscribe link, and zero requests or external redirects confirm this as clean.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E015",
    zone: 1,
    fromName: "contact@irs-tax-refund-portal.com",
    from: "contact@irs-tax-refund-portal.com",
    sender: "contact@irs-tax-refund-portal.com",
    replyTo: "contact@irs-tax-refund-portal.com",
    subject: "IRS: You have an unclaimed tax refund of $2,240",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `INTERNAL REVENUE SERVICE — OFFICIAL NOTICE

Dear Taxpayer,

Our records show that you have an unclaimed federal tax refund of $2,240.00 for the tax year 2024.

To release your refund, you must verify your identity by providing:
• Social Security Number
• Date of birth
• Bank routing and account number for direct deposit

Submit your information at the link below. Refunds not claimed within 14 days will be returned to the U.S. Treasury.

[ CLAIM MY REFUND ]
 irs-tax-refund-portal.com/claim

IRS Tax Processing Centre`,
    clues: [
      "The IRS domain is irs.gov — this email comes from irs-tax-refund-portal.com",
      "The IRS never contacts taxpayers by email — only by postal mail",
      "Requests SSN, date of birth, and bank account in a single email",
      "'Returned to U.S. Treasury in 14 days' creates urgency around a completely fabricated deadline",
    ],
    giveawayPhrase: "Submit your information at the link below. Refunds not claimed within 14 days will be returned to the U.S. Treasury.",
    level1: "Phishing & Spoofing",
    level2: "Impersonation",
    explanation: "IRS impersonation phishing. The IRS exclusively uses postal mail for all taxpayer communication and never requests financial details via email. The fake domain and SSN request are definitive red flags.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E016",
    zone: 1,
    fromName: "abuse@harass-target.net",
    from: "abuse@harass-target.net",
    sender: "abuse@harass-target.net",
    replyTo: "abuse@harass-target.net",
    subject: "I know where you live. You should be scared.",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `I know your name. I know your address at 14 Maple Drive. I know what car you drive. I know your daily routine.

I have been watching you for weeks. You made a mistake when you posted that comment online and I have not forgotten.

Keep looking over your shoulder. I will be in touch.

Don't bother going to the police. They can't help you.`,
    clues: [
      "Contains a specific home address — demonstrates the sender has personal information",
      "Explicit threat: 'Keep looking over your shoulder'",
      "References online activity as the trigger — targeted harassment",
      "'Don't bother going to the police' is a control tactic used in genuine threat emails",
    ],
    giveawayPhrase: "I know your address at 14 Maple Drive. I know what car you drive. I know your daily routine.",
    level1: "Abuse & Harassment",
    level2: "Stalking / Doxxing",
    explanation: "Targeted stalking and doxxing threat. The inclusion of a specific home address indicates personal information has been obtained. The instruction not to contact police is a red flag for genuine criminal intent.",
    reasoningQuestion: "Why is this email classified as \"Abuse & Harassment\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E017",
    zone: 1,
    fromName: "promo@chase-exclusive-rewards.com",
    from: "promo@chase-exclusive-rewards.com",
    sender: "promo@chase-exclusive-rewards.com",
    replyTo: "promo@chase-exclusive-rewards.com",
    subject: "Chase Sapphire: You've earned a $500 bonus — claim in 24 hours",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Dear Chase Cardmember,

Congratulations! As one of our most valued Sapphire cardmembers, you have been selected to receive a $500 cash bonus.

To claim your bonus, sign in using the link below and confirm your card details:

[ CLAIM YOUR $500 BONUS ]
chase-exclusive-rewards.com/sapphire-bonus

This offer expires in 24 hours. Chase is unable to extend this deadline. If you do not claim your bonus today, it will be permanently forfeited.

Chase Rewards Team`,
    clues: [
      "Sender domain is chase-exclusive-rewards.com — Chase emails come from chase.com",
      "Chase never sends bonus offers that expire in 24 hours via email",
      "Link goes to chase-exclusive-rewards.com — a fake domain",
      "'Permanently forfeited' deadline pressure is not used in legitimate bank communications",
    ],
    giveawayPhrase: "sign in using the link below and confirm your card details: chase-exclusive-rewards.com/sapphire-bonus",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "Chase impersonation phishing using a fake rewards offer. The off-domain link asking for card details is the attack vector. Legitimate Chase bonus communications always direct to chase.com.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E018",
    zone: 1,
    fromName: "offers@spotify.com",
    from: "offers@spotify.com",
    sender: "offers@spotify.com",
    replyTo: "offers@spotify.com",
    subject: "3 months of Spotify Premium — on us",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Hi there,

We'd like to give you 3 months of Spotify Premium, on us.

As a free plan listener, we're offering you a chance to experience Premium with no commitment. No credit card required for the first 3 months.

Redeem this offer at spotify.com/premium/offer

After 3 months, your plan will revert to free unless you choose to upgrade.

— Spotify`,
    clues: [
      "Sender domain is spotify.com — verified",
      "Spotify does run this type of free trial promotion regularly",
      "No credit card required — reduces the risk of a scam signal",
      "Offer redemption at spotify.com — on-domain, no external redirect",
    ],
    giveawayPhrase: "Redeem this offer at spotify.com/premium/offer",
    level1: "Legitimate",
    level2: "Promotional Offer",
    explanation: "Legitimate Spotify Premium trial offer. The verified domain, absence of a credit card requirement, and on-domain redemption link are all consistent with Spotify's actual free trial promotions.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E019",
    zone: 1,
    fromName: "security@dropbox.com",
    from: "security@dropbox.com",
    sender: "security@dropbox.com",
    replyTo: "security@dropbox.com",
    subject: "New sign-in to your Dropbox account",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Hi,

We noticed a new sign-in to your Dropbox account.

Device: Chrome on Windows
Location: Chicago, IL, USA
Time: March 14, 2026 at 10:22 AM CT

If this was you, no action is needed.

If you don't recognise this sign-in, secure your account at dropbox.com/account/security

— The Dropbox Security Team`,
    clues: [
      "Sender domain is dropbox.com — verified",
      "Contains specific sign-in details: device type, OS, city, time",
      "Link goes to dropbox.com/account/security — on-domain",
      "No request for any credentials or personal information",
    ],
    giveawayPhrase: "If you don't recognise this sign-in, secure your account at dropbox.com/account/security",
    level1: "Legitimate",
    level2: "Security Notification",
    explanation: "Legitimate Dropbox sign-in notification. The verified domain, specific sign-in details, and on-domain security link are all consistent with genuine security notification emails.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E020",
    zone: 1,
    fromName: "noreply@fedex-parcel-redelivery.com",
    from: "noreply@fedex-parcel-redelivery.com",
    sender: "noreply@fedex-parcel-redelivery.com",
    replyTo: "noreply@fedex-parcel-redelivery.com",
    subject: "FedEx: Delivery failed — pay $2.99 to reschedule",
    auth: { spf: "Fail", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.220.101.42 (RU)",
    userContext: null,
    body: `Dear Customer,

We attempted to deliver your FedEx parcel today but were unable to complete delivery as no one was home.

To reschedule your delivery, you must pay a $2.99 redelivery handling fee within 24 hours:

[ PAY $2.99 AND RESCHEDULE ]
fedex-parcel-redelivery.com/reschedule

After 24 hours, your parcel will be returned to the sender and the redelivery fee will increase to $14.99.

FedEx Customer Service
fedex-parcel-redelivery.com`,
    clues: [
      "Domain is fedex-parcel-redelivery.com — FedEx only sends from fedex.com",
      "FedEx does not charge redelivery fees — this is completely fabricated",
      "$2.99 is deliberately small to seem trivial — the real goal is capturing card details",
      "The escalating fee (to $14.99 after 24 hours) is a pressure tactic to force quick action",
    ],
    giveawayPhrase: "you must pay a $2.99 redelivery handling fee within 24 hours",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "Package redelivery fee phishing — one of the most common scam formats. FedEx redelivery is always free and managed at fedex.com. The small fee is intentionally trivial to reduce hesitation while capturing card details.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "M001",
    zone: 2,
    fromName: "Netflix",
    from: "security@apple.com.account-services.net",
    sender: "info@netflix-billing-update.com",
    replyTo: "info@netflix-billing-update.com",
    subject: "Sign-in to your Apple ID from iPhone 15 Pro — Paris, France",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "52.88.14.213 (US)",
    userContext: "You have an active Netflix subscription in good standing.",
    body: `Your Apple ID was used to sign in on a new device.

Device: iPhone 15 Pro
Location: Paris, France
Time: March 14, 2026 at 15:47 CET

If this was you signing in to a new device, you can dismiss this notification.

If you do not recognise this sign-in, your account may be at risk. Review your Apple ID account activity to secure it:

[ Review Account Activity ]

Apple ID | Privacy Policy | Terms & Conditions`,
    clues: [
      "The sender domain reads apple.com.account-services.net — 'apple.com' is a subdomain of 'account-services.net'",
      "Real Apple sign-in notifications come only from appleid.apple.com",
      "The email deliberately looks clean and professional to avoid suspicion",
      "The 'Review Account Activity' link goes off-domain despite appearing legitimate",
    ],
    giveawayPhrase: "security@apple.com.account-services.net",
    level1: "Phishing & Spoofing",
    level2: "Spear Phishing",
    explanation: "Advanced subdomain spoofing — the most deceptive phishing technique. The domain 'apple.com.account-services.net' makes 'apple.com' appear as part of the sender, but it is actually a subdomain of the attacker's domain 'account-services.net'.",
    reasoningQuestion: "Despite the professional tone, what gives away this email?",
    reasoningOptions: [
      "The sender domain is netflix-billing-update.com, not netflix.com",
      "Netflix would never email about payment issues",
      "The email asks you to update your payment method",
      "DKIM authentication failed",
    ],
    correctReason: 0,
  },
  {
    id: "M002",
    zone: 2,
    fromName: "Microsoft Account Team",
    from: "david.chen@veridian-consulting.co",
    sender: "account-security@microsoftonline-alert.com",
    replyTo: "no-reply@microsoftonline-alert.com",
    subject: "Re: March retainer — updated payment details",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: "Your Microsoft account shows no recent sign-in from an unusual location.",
    body: `Hi,

Hope you're well. Following on from our call last week, just wanted to confirm our updated banking details for the March retainer payment:

Bank: HSBC
Account name: Veridian Consulting Ltd
Account number: 29384710
Sort code: 40-47-84

Please use these details going forward. Our old account is being phased out so please don't use the previous details.

Let me know once the transfer is done.

Thanks,
David`,
    clues: [
      "Sender domain is veridian-consulting.co — the real company uses veridian-consulting.com (subtle .co vs .com change)",
      "Mid-relationship bank detail change sent via email is the hallmark of BEC fraud",
      "'Please don't use the previous details' is designed to prevent verification against known records",
      "The casual tone is intentional — formal invoices attract more scrutiny than friendly emails",
    ],
    giveawayPhrase: "Our old account is being phased out so please don't use the previous details.",
    level1: "High-Risk Fraud",
    level2: "Business Email Compromise (BEC)",
    explanation: "Highly sophisticated BEC using a near-identical domain (.co vs .com). The casual tone bypasses scrutiny a formal invoice would attract. The 'don't use previous details' line prevents victims from verifying against known records.",
    reasoningQuestion: "What is the primary tell in this security alert?",
    reasoningOptions: [
      "The sender domain microsoftonline-alert.com is not microsoft.com",
      "Your account shows no unusual sign-in activity",
      "Microsoft security alerts always come by phone",
      "The email creates urgency about account access",
    ],
    correctReason: 0,
  },
  {
    id: "M003",
    zone: 2,
    fromName: "Amazon",
    from: "noreply@paypal.com",
    sender: "order-update@amazon-delivery-notice.com",
    replyTo: "no-reply@amazon-delivery-notice.com",
    subject: "You sent $750.00 to Marcus Webb",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Fail" },
    originIp: "52.31.105.27 (IE)",
    userContext: null,
    body: `You sent a payment of $750.00 to Marcus Webb (marcus.webb92@gmail.com).

Transaction ID: 5KX29841ND621
Date: March 14, 2026

If you did not authorise this payment, call our fraud team immediately at 1-888-221-1161 to dispute the charge and receive a full refund.

PayPal, Inc.`,
    clues: [
      "The sender domain appears to be paypal.com — this is the deceptive element",
      "The phone number 1-888-221-1161 is not PayPal's real support number (real number: 1-888-221-1161 — verify this yourself)",
      "PayPal never asks you to call a number from an email — always log in at paypal.com directly",
      "The specific dollar amount and unknown recipient name create panic to trigger an immediate call",
    ],
    giveawayPhrase: "call our fraud team immediately at 1-888-221-1161 to dispute the charge",
    level1: "Phishing & Spoofing",
    level2: "Clone Phishing",
    explanation: "Vishing (voice phishing) via email. The email is designed to make you call a scammer posing as PayPal support. Always navigate to paypal.com directly rather than calling numbers from emails — even if the sender looks legitimate.",
    reasoningQuestion: "This email looks like Amazon. What is the tell?",
    reasoningOptions: [
      "The sender domain is amazon-delivery-notice.com instead of amazon.com",
      "Amazon does not send order confirmation emails",
      "The email asks you to click a tracking link",
      "DMARC failed on the message",
    ],
    correctReason: 0,
  },
  {
    id: "M004",
    zone: 2,
    fromName: "Apple",
    from: "billing@internal-hr-payroll.net",
    sender: "receipt@apple.com.subscriptions-billing.net",
    replyTo: "no-reply@apple.com.subscriptions-billing.net",
    subject: "Payroll update: Re-confirm your bank account by Friday",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "185.53.178.9 (DE)",
    userContext: null,
    body: `Dear Employee,

Due to a scheduled migration of our payroll processing system this weekend, all employees are required to re-confirm their direct deposit bank account details by end of day Friday.

If you do not re-confirm your details, we cannot guarantee your salary will be deposited on the next pay date. Employees who miss the deadline may experience a payment delay of up to two pay periods.

Please complete the verification form here:
[ CONFIRM MY BANK DETAILS ]

If you have any questions, contact payroll@internal-hr-payroll.net

HR & Payroll Team`,
    clues: [
      "Sender domain is internal-hr-payroll.net — not your employer's actual domain",
      "No legitimate payroll system requires employees to re-submit bank details via email",
      "The threat of a two pay period delay creates high emotional and financial pressure",
      "The reply address payroll@internal-hr-payroll.net is the same fake domain",
    ],
    giveawayPhrase: "Employees who miss the deadline may experience a payment delay of up to two pay periods.",
    level1: "High-Risk Fraud",
    level2: "Business Email Compromise (BEC)",
    explanation: "BEC payroll diversion attack. The fake HR domain, fabricated system migration pretext, and threat of delayed pay are the three signals. No real payroll system collects banking details via email link.",
    reasoningQuestion: "This receipt looks real. What is wrong with the sender address?",
    reasoningOptions: [
      "The real domain is subscriptions-billing.net — apple.com is a subdomain prefix trick",
      "Apple never sends receipts by email",
      "The receipt amount looks suspicious",
      "The email lacks an Apple logo",
    ],
    correctReason: 0,
  },
  {
    id: "M005",
    zone: 2,
    fromName: "LinkedIn",
    from: "no-reply@linkedin.com",
    sender: "notifications@linkedln.com",
    replyTo: "no-reply@linkedln.com",
    subject: "You appeared in 34 searches this week",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "54.240.93.11 (US)",
    userContext: null,
    body: `Hi,

Your LinkedIn profile is gaining attention.

34 people searched for and found your profile this week, including professionals from Deloitte, McKinsey & Company, and Goldman Sachs.

See who's looking at your profile and grow your professional network.

[ View Your Profile Analytics ]

You're receiving this email because you're a LinkedIn member.
Unsubscribe from these notifications: linkedin.com/settings/email`,
    clues: [
      "Sender domain is linkedin.com — verified",
      "LinkedIn sends this exact type of weekly profile view notification",
      "Unsubscribe link goes to linkedin.com/settings/email — on-domain",
      "No personal information requested, no external links",
    ],
    giveawayPhrase: "Unsubscribe from these notifications: linkedin.com/settings/email",
    level1: "Legitimate",
    level2: "Newsletter / Platform Notification",
    explanation: "Legitimate LinkedIn profile analytics notification. The verified domain, standard LinkedIn notification format, and on-domain unsubscribe link confirm this as clean platform communication.",
    reasoningQuestion: "This LinkedIn notification looks legitimate. What is the single tell?",
    reasoningOptions: [
      "The sender domain is linkedln.com — the i and l are swapped (typosquat)",
      "LinkedIn would not email about profile views",
      "The email asks you to log in via a link",
      "The tone is too casual for LinkedIn",
    ],
    correctReason: 0,
  },
  {
    id: "E026",
    zone: 2,
    fromName: "attachment-scan@docusign-secure-portal.com",
    from: "attachment-scan@docusign-secure-portal.com",
    sender: "attachment-scan@docusign-secure-portal.com",
    replyTo: "attachment-scan@docusign-secure-portal.com",
    subject: "DocuSign: Document ready for your signature",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `You have a document waiting for your electronic signature.

Document title: NDA — Service Agreement 2026
Sent by: James Harrington (james.harrington@partnerfirm.com)
Expires: March 21, 2026

[ REVIEW AND SIGN DOCUMENT ]
docusign-secure-portal.com/sign?doc=NDA2026

Please do not share this link. If you were not expecting this document, contact James Harrington directly at the email above.`,
    clues: [
      "Sender domain is docusign-secure-portal.com — DocuSign only sends from docusign.com or docusign.net",
      "The signing link goes to docusign-secure-portal.com — a fake domain",
      "The document title and sender name create plausibility but the domain is the tell",
      "DocuSign sign links always use docusign.com/signing-complete format",
    ],
    giveawayPhrase: "docusign-secure-portal.com/sign?doc=NDA2026",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "DocuSign impersonation phishing. The document and sender name are plausible, but the signing link goes to a fake domain. Always verify that DocuSign links use docusign.com before entering credentials.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E027",
    zone: 2,
    fromName: "emma.richardson1987@gmail.com",
    from: "emma.richardson1987@gmail.com",
    sender: "emma.richardson1987@gmail.com",
    replyTo: "emma.richardson1987@gmail.com",
    subject: "Hi — hope this isn't too forward",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `Hi,

I hope this doesn't come across as too forward — I found your email through a mutual connection and felt compelled to reach out.

My name is Emma Richardson. I'm 36, based in London, and I work for a humanitarian NGO in West Africa. It's meaningful work but it gets lonely out here.

I've been through a difficult year personally and I'm looking for genuine connection with someone kind and thoughtful.

I know this is unusual, but sometimes you just have a feeling about someone. I'd love to chat if you're open to it.

Warmly,
Emma`,
    clues: [
      "Unsolicited email from a stranger — you have no mutual connection who would share your email",
      "Humanitarian aid worker in West Africa is one of the most documented romance scam personas",
      "'Sometimes you just have a feeling about someone' is scripted emotional manipulation",
      "Personal Gmail with a full name — designed to seem like a real individual, not a company",
    ],
    giveawayPhrase: "I work for a humanitarian NGO in West Africa. It's meaningful work but it gets lonely out here.",
    level1: "High-Risk Fraud",
    level2: "Romance Scam",
    explanation: "Romance scam opening gambit. The humanitarian worker in Africa persona, unsolicited emotional appeal, and 'feeling about someone' line are all documented in the FTC's romance scam playbook. Financial requests follow once trust is established.",
    reasoningQuestion: "Why is this email classified as \"High-Risk Fraud\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E028",
    zone: 2,
    fromName: "security@google.com",
    from: "security@google.com",
    sender: "security@google.com",
    replyTo: "security@google.com",
    subject: "Critical security alert — sign-in blocked",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `We blocked a sign-in attempt to your Google account.

google.account.security.alert@gmail.com

Device: Android phone
Location: Bucharest, Romania
Date & time: March 14, 2026, 08:14 AM UTC

We blocked this sign-in because it seemed suspicious. Check your account now.

[ CHECK ACTIVITY ]

You can also review your account at myaccount.google.com

Google Security Team`,
    clues: [
      "The sender address listed in the email body is a Gmail address — not google.com",
      "Google security alerts come from no-reply@accounts.google.com, not security@google.com",
      "The 'Check Activity' link destination must be verified — Google links go to accounts.google.com",
      "Bucharest location is chosen to trigger alarm — but the email itself is the threat",
    ],
    giveawayPhrase: "google.account.security.alert@gmail.com",
    level1: "Phishing & Spoofing",
    level2: "Spoofed Sender Address",
    explanation: "Google account phishing with a spoofed sender. The body inadvertently reveals a Gmail address rather than a google.com address. Real Google security alerts come from no-reply@accounts.google.com with links to accounts.google.com.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E029",
    zone: 2,
    fromName: "hr@techcorp.com",
    from: "hr@techcorp.com",
    sender: "hr@techcorp.com",
    replyTo: "hr@techcorp.com",
    subject: "Confidential: Your performance review outcome — Q4 2025",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `Hi,

Your Q4 2025 performance review has been completed and the outcome is available.

Unfortunately, your results place you in the bottom 15% of your peer group. As outlined in our performance management policy, continued underperformance may impact your year-end compensation and employment status.

This is confidential — please do not discuss this with colleagues.

To view your full review and respond to the assessment, please sign in with your company credentials using the link below:
[ VIEW MY REVIEW ]

This link expires in 48 hours.

HR & People Operations`,
    clues: [
      "'Please do not discuss this with colleagues' — isolation is a social engineering tactic",
      "Company HR systems do not send review access via time-limited email links",
      "The 'sign in with your company credentials' link harvests corporate login details",
      "The threat to employment creates high emotional pressure to click without thinking",
    ],
    giveawayPhrase: "please sign in with your company credentials using the link below",
    level1: "Phishing & Spoofing",
    level2: "Spear Phishing",
    explanation: "Internal spear phishing targeting corporate credentials. The isolation instruction, job threat, and 48-hour credential harvesting link are all engineered to bypass rational thinking. Real HR performance reviews are never delivered via email links.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E030",
    zone: 2,
    fromName: "invoices@acme-partners-billing.co",
    from: "invoices@acme-partners-billing.co",
    sender: "invoices@acme-partners-billing.co",
    replyTo: "invoices@acme-partners-billing.co",
    subject: "Invoice #INV-2026-1142 — $12,400.00 due March 20",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `Dear Finance Team,

Please find this invoice for professional services rendered in February 2026.

Invoice number: INV-2026-1142
Services: Strategic consulting — Q1 2026 retainer
Amount due: $12,400.00
Due date: March 20, 2026

Important: We have recently updated our banking details. Please use the following account for this payment only:

Citibank NA
Account name: Acme Partners LLC
Account number: 4827391047
Routing: 021000089

Please discard our previous banking details. Contact us at billing@acme-partners-billing.co if you need anything.`,
    clues: [
      "Domain is acme-partners-billing.co — a billing subdomain on a .co domain, not acmepartners.com",
      "'We have recently updated our banking details' mid-invoice is the defining BEC signal",
      "'Please discard our previous banking details' prevents the victim from cross-referencing",
      "The reply address is also the fake domain — no legitimate contact information provided",
    ],
    giveawayPhrase: "Important: We have recently updated our banking details. Please use the following account for this payment only.",
    level1: "High-Risk Fraud",
    level2: "Wire Fraud",
    explanation: "Invoice BEC wire fraud. The 'updated banking details' line redirects payment to the attacker's account. This single phrase is responsible for billions in annual business losses globally. Always verify bank detail changes via a known phone number.",
    reasoningQuestion: "Why is this email classified as \"High-Risk Fraud\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E031",
    zone: 2,
    fromName: "noreply@apple.com",
    from: "noreply@apple.com",
    sender: "noreply@apple.com",
    replyTo: "noreply@apple.com",
    subject: "Your receipt from the App Store — March 14, 2026",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Dear Customer,

Thank you for your purchase.

App: ProVPN — Secure & Fast
Developer: SecureApps Ltd
Amount: $4.99
Date: March 14, 2026
Order ID: MG4B2K9R7X

If you didn't make this purchase, you can request a refund or report a problem at reportaproblem.apple.com

Apple`,
    clues: [
      "Sender domain is apple.com — verified",
      "Order ID format matches Apple's actual receipt format",
      "Refund link goes to reportaproblem.apple.com — Apple's real refund portal",
      "No urgency, no personal information requested",
    ],
    giveawayPhrase: "you can request a refund or report a problem at reportaproblem.apple.com",
    level1: "Legitimate",
    level2: "Subscription Billing",
    explanation: "Genuine Apple App Store receipt. The verified domain, correctly formatted Order ID, and refund link to Apple's actual portal (reportaproblem.apple.com) are all consistent with real Apple purchase receipts.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E032",
    zone: 2,
    fromName: "alert@wellsfargo.com",
    from: "alert@wellsfargo.com",
    sender: "alert@wellsfargo.com",
    replyTo: "alert@wellsfargo.com",
    subject: "Unusual activity detected on your Wells Fargo account",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `We detected unusual activity on your account and have temporarily placed a hold on outgoing transactions as a precaution.

Account: Checking (...7291)
Activity flagged: 3 consecutive failed PIN attempts
Date: March 14, 2026

To restore full account access, please call us at 1-800-869-3557 or sign in at wellsfargo.com.

For your security, do not share your PIN, password, or one-time passcode with anyone — including Wells Fargo employees.

Wells Fargo Bank, N.A.`,
    clues: [
      "Sender domain is wellsfargo.com — verified",
      "Phone number 1-800-869-3557 is Wells Fargo's real customer service number",
      "Explicitly states 'do not share your PIN — including with Wells Fargo employees'",
      "Sign-in link references wellsfargo.com — on-domain",
    ],
    giveawayPhrase: "do not share your PIN, password, or one-time passcode with anyone — including Wells Fargo employees",
    level1: "Legitimate",
    level2: "Bank / Financial Notification",
    explanation: "Legitimate Wells Fargo security alert. The verified domain, real customer service number, and the proactive security reminder to never share credentials (even with bank staff) are hallmarks of genuine bank security communication.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E033",
    zone: 2,
    fromName: "malware-dropper@file-share-cdn.net",
    from: "malware-dropper@file-share-cdn.net",
    sender: "malware-dropper@file-share-cdn.net",
    replyTo: "malware-dropper@file-share-cdn.net",
    subject: "Important document shared with you — open immediately",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `A document has been shared with you by your colleague.

Document: Q4_Financial_Summary_CONFIDENTIAL.exe
Size: 2.4MB
Shared by: Mike Johnson

[ OPEN DOCUMENT ]
file-share-cdn.net/download/Q4_Financial_Summary_CONFIDENTIAL.exe

This link expires in 6 hours. Please open before it expires.`,
    clues: [
      "The 'document' has a .exe file extension — executable files are not documents",
      "Sender domain is a generic CDN with no company affiliation",
      "No legitimate file sharing service asks you to run an .exe called a 'document'",
      "The 6-hour expiry creates urgency to open a potentially dangerous executable",
    ],
    giveawayPhrase: "Q4_Financial_Summary_CONFIDENTIAL.exe",
    level1: "Malicious Content",
    level2: "Malware Delivery",
    explanation: "Malware delivery via disguised executable. Naming a .exe file as a financial document is a classic social engineering technique. No legitimate document sharing service delivers .exe files. Opening this file installs malware.",
    reasoningQuestion: "Why is this email classified as \"Malicious Content\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E034",
    zone: 2,
    fromName: "admin@microsoft365-license-renewal.com",
    from: "admin@microsoft365-license-renewal.com",
    sender: "admin@microsoft365-license-renewal.com",
    replyTo: "admin@microsoft365-license-renewal.com",
    subject: "Microsoft 365 Business — your licence expires in 3 days",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `Dear Administrator,

Your Microsoft 365 Business licence is due to expire in 3 days. If you do not renew before expiry, your team will immediately lose access to Outlook, Teams, SharePoint, and all Office applications.

Current licences: 47 users
Renewal cost: $1,410.00/year

Renew now to avoid disruption:
[ RENEW MICROSOFT 365 LICENCE ]
microsoft365-license-renewal.com/renew

For billing questions, contact admin@microsoft365-license-renewal.com

Microsoft 365 Billing Team`,
    clues: [
      "Domain is microsoft365-license-renewal.com — Microsoft billing comes from microsoft.com",
      "Microsoft licence renewals go through the Microsoft 365 admin centre at admin.microsoft.com",
      "Threatening loss of access to 47 users' Outlook and Teams creates high organisational pressure",
      "Reply address is also the fake domain — no legitimate Microsoft contact information",
    ],
    giveawayPhrase: "your team will immediately lose access to Outlook, Teams, SharePoint, and all Office applications",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "Microsoft 365 licence phishing targeting businesses. The threat of organisation-wide service disruption is engineered to pressure IT administrators into acting without verifying the domain. All Microsoft licence renewals are managed at admin.microsoft.com.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E035",
    zone: 2,
    fromName: "ransom@darkweb-crypto.onion.to",
    from: "ransom@darkweb-crypto.onion.to",
    sender: "ransom@darkweb-crypto.onion.to",
    replyTo: "ransom@darkweb-crypto.onion.to",
    subject: "Your files have been encrypted — pay to recover them",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `YOUR NETWORK HAS BEEN COMPROMISED.

All files on your system have been encrypted using AES-256 military-grade encryption. Your backups have been deleted.

To receive the decryption key, you must transfer 0.45 BTC (approximately $14,000) to the following wallet within 72 hours:

BTC: 3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5

After 72 hours, the ransom amount will double. After 7 days, your decryption key will be permanently deleted.

Do not contact law enforcement. Do not attempt to decrypt files yourself.`,
    clues: [
      "Sender is from a .onion.to address — anonymised routing used by criminal infrastructure",
      "Claims files are encrypted and backups deleted — the hallmarks of ransomware notification",
      "Bitcoin wallet demand with escalating deadline is the ransomware standard",
      "'Do not contact law enforcement' is a control instruction to prevent victim from getting help",
    ],
    giveawayPhrase: "All files on your system have been encrypted using AES-256 military-grade encryption. Your backups have been deleted.",
    level1: "Malicious Content",
    level2: "Ransomware Lure",
    explanation: "Ransomware notification email. The specific encryption claim, Bitcoin demand, escalating deadline, and law enforcement warning are the four defining signals of ransomware. Contact your IT security team and law enforcement immediately — do not pay.",
    reasoningQuestion: "Why is this email classified as \"Malicious Content\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E036",
    zone: 2,
    fromName: "noreply@notion.so",
    from: "noreply@notion.so",
    sender: "noreply@notion.so",
    replyTo: "noreply@notion.so",
    subject: "Sarah Park shared a page with you: 2026 Roadmap",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Sarah Park shared a Notion page with you.

Page: 2026 Product Roadmap
Workspace: Acme Corp

[ Open in Notion ]

If you don't know Sarah Park or weren't expecting this, you can safely ignore this email.

— Notion`,
    clues: [
      "Sender domain is notion.so — Notion's verified sending domain",
      "Page share notifications are standard Notion behaviour",
      "Link destination goes to notion.so — on-domain",
      "'If you don't know this person, ignore it' — standard Notion language for unsolicited shares",
    ],
    giveawayPhrase: "If you don't know Sarah Park or weren't expecting this, you can safely ignore this email.",
    level1: "Legitimate",
    level2: "Newsletter / Platform Notification",
    explanation: "Legitimate Notion page share notification. The verified notion.so domain, standard sharing format, and appropriate guidance for unknown senders are all consistent with genuine Notion notification emails.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E037",
    zone: 2,
    fromName: "threats@hacker-collective.xyz",
    from: "threats@hacker-collective.xyz",
    sender: "threats@hacker-collective.xyz",
    replyTo: "threats@hacker-collective.xyz",
    subject: "You have 48 hours to remove your post or face consequences",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `We have identified you as the author of the post published on March 10 targeting our community.

You are hereby given 48 hours to remove this post and issue a public apology. If you fail to comply, we will:

1. Publish your full name, address, and workplace online
2. Contact your employer with evidence of your online activity
3. File coordinated reports against all your social media accounts

This is a final warning. We are watching.`,
    clues: [
      "Threatens to publish personal information including home address and workplace — doxxing",
      "Coordinated reporting campaign threat targets social media accounts",
      "Sender is an anonymous collective with no verifiable identity",
      "'We are watching' combined with specific personal threat signals organised harassment",
    ],
    giveawayPhrase: "Publish your full name, address, and workplace online",
    level1: "Abuse & Harassment",
    level2: "Stalking / Doxxing",
    explanation: "Coordinated harassment and doxxing threat. The explicit plan to publish home address and workplace, combined with coordinated reporting, constitutes organised harassment. This should be reported to law enforcement and platform trust & safety teams.",
    reasoningQuestion: "Why is this email classified as \"Abuse & Harassment\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "E038",
    zone: 2,
    fromName: "no-reply@accounts.google.com",
    from: "no-reply@accounts.google.com",
    sender: "no-reply@accounts.google.com",
    replyTo: "no-reply@accounts.google.com",
    subject: "Security alert: New sign-in on Mac",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `New sign-in to sarah.jones@gmail.com

Your account was just signed in to from a new Mac.

Chrome on macOS
United States (your usual location)

If this was you, you don't need to do anything.

If you don't recognise this sign-in, check your account activity at myaccount.google.com/notifications

Google`,
    clues: [
      "Sender is no-reply@accounts.google.com — Google's verified security notification address",
      "Sign-in is from the user's usual location — not a foreign country alarm",
      "Link goes to myaccount.google.com — Google's real account management domain",
      "No urgency, no threats, no information requested",
    ],
    giveawayPhrase: "United States (your usual location)",
    level1: "Legitimate",
    level2: "Security Notification",
    explanation: "Genuine Google security sign-in notification. The verified accounts.google.com sender, usual location flag (reducing alarm), and myaccount.google.com link are all consistent with Google's actual security notification format.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E039",
    zone: 2,
    fromName: "support@coinbase.com",
    from: "support@coinbase.com",
    sender: "support@coinbase.com",
    replyTo: "support@coinbase.com",
    subject: "Your Coinbase account — withdrawal confirmation",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `A withdrawal has been processed from your Coinbase account.

Amount: 0.42 BTC ($13,860.00)
Destination wallet: 1A2B3C4D5E6F7G8H9I0J
Date: March 14, 2026 at 11:09 AM UTC
Transaction ID: TXN-847291

If you initiated this withdrawal, no action is needed.

If you did not authorise this withdrawal, contact Coinbase Support immediately at coinbase.com/support. Do not call any phone numbers listed in other emails — always use coinbase.com directly.

Coinbase Security`,
    clues: [
      "Sender domain is coinbase.com — appears verified",
      "Coinbase does send withdrawal confirmation emails in this format",
      "The warning 'do not call phone numbers in other emails' is a genuine Coinbase security practice",
      "The link goes to coinbase.com/support — on-domain, no redirect",
    ],
    giveawayPhrase: "Do not call any phone numbers listed in other emails — always use coinbase.com directly.",
    level1: "Legitimate",
    level2: "Bank / Financial Notification",
    explanation: "Legitimate Coinbase withdrawal confirmation. The verified domain, accurate notification format, on-domain support link, and proactive anti-vishing warning ('do not call numbers from other emails') are all consistent with genuine Coinbase security emails.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E040",
    zone: 2,
    fromName: "macro-payload@trusted-docs-share.com",
    from: "macro-payload@trusted-docs-share.com",
    sender: "macro-payload@trusted-docs-share.com",
    replyTo: "macro-payload@trusted-docs-share.com",
    subject: "Shared with you: Updated contract terms — please review",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `Hi,

Please find attached the updated contract terms document for your review.

[ Download: Contract_Terms_Updated_March2026.docm ]
trusted-docs-share.com/download/contract_terms.docm

Note: This document contains macros required to display correctly. If prompted, please click "Enable Content" when opening the file.

Please review and sign by end of week.

Thanks`,
    clues: [
      "The file extension is .docm — a macro-enabled Word document, not a standard .docx",
      "'Click Enable Content when opening the file' — enabling macros in unknown documents runs malicious code",
      "Sender domain is trusted-docs-share.com — a generic file hosting domain with no identity",
      "No sender name, no company name — anonymous sender requesting urgent document action",
    ],
    giveawayPhrase: "This document contains macros required to display correctly. If prompted, please click 'Enable Content' when opening the file.",
    level1: "Malicious Content",
    level2: "Macro-Embedded Attachment",
    explanation: "Macro malware delivery. The .docm extension and explicit instruction to enable macros are the attack. Enabling macros in documents from unknown sources executes malicious code silently. Microsoft disabled auto-macro execution precisely because of this attack vector.",
    reasoningQuestion: "Why is this email classified as \"Malicious Content\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 1,
  },
  {
    id: "H001",
    zone: 3,
    fromName: "DocuSign",
    from: "no-reply@dropbox.com",
    sender: "dse@docusign-esign.net",
    replyTo: "dse@docusign-esign.net",
    subject: "James Wilson shared a folder with you: 'Q1 Financials'",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "199.89.4.201 (US)",
    userContext: "You have a pending bonus review scheduled for next quarter.",
    body: `Hi,

James Wilson (james.wilson@partnerco.com) has shared a folder with you on Dropbox.

Folder: Q1 Financials
Items: 14 files

[ Open folder in Dropbox ]

If you weren't expecting this share, you can report it at dropbox.com/help.

— Dropbox`,
    clues: [
      "Sender domain is dropbox.com — verified",
      "The sharing notification format is consistent with real Dropbox emails",
      "The 'Open folder' link destination must be verified — it should go to dropbox.com",
      "The folder name 'Q1 Financials' and sender name are plausible but unverifiable",
    ],
    giveawayPhrase: "James Wilson (james.wilson@partnerco.com) has shared a folder with you on Dropbox.",
    level1: "Legitimate",
    level2: "Newsletter / Platform Notification",
    explanation: "Legitimate Dropbox share notification. This is a genuinely clean email — the verified domain, correct notification format, and on-domain report link confirm it. Hard zone players must resist over-flagging clean emails from legitimate platforms.",
    reasoningQuestion: "Everything looks legitimate. How do you catch this?",
    reasoningOptions: [
      "The sender domain is docusign-esign.net — not the real docusign.com",
      "Real DocuSign emails never mention bonuses",
      "The access code BX-992 is suspicious",
      "The email creates urgency with a 5pm deadline",
    ],
    correctReason: 0,
  },
  {
    id: "H002",
    zone: 3,
    fromName: "IT Support",
    from: "hr@globaltech.com",
    sender: "helpdesk@yourcompany-portal.com",
    replyTo: "helpdesk@yourcompany-portal.com",
    subject: "Salary review outcomes — your updated compensation package",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "34.102.136.180 (US)",
    userContext: "Your password is not due to expire for another 60 days.",
    body: `Hi,

I'm pleased to share that following the annual salary review, your compensation has been updated effective April 1, 2026.

Your new package details are available in the HR portal. Please log in using your company SSO at hr.globaltech.com/portal to view the breakdown.

This is confidential information. Please do not discuss specific figures with colleagues.

Best,
Karen Mitchell
Head of People`,
    clues: [
      "Sender domain is globaltech.com — matches a plausible employer domain",
      "'Please do not discuss specific figures with colleagues' is reasonable confidentiality for salary info",
      "Link goes to hr.globaltech.com/portal — a subdomain of the company domain, not external",
      "The tone and format are consistent with a genuine HR communication",
    ],
    giveawayPhrase: "Please log in using your company SSO at hr.globaltech.com/portal",
    level1: "Legitimate",
    level2: "Internal Communication",
    explanation: "Legitimate internal HR salary notification. This is a clean email — the company domain, SSO login to a company subdomain, and appropriate salary confidentiality request are all consistent with genuine HR communication. Hard zone players must not flag this.",
    reasoningQuestion: "The email looks internal. What is the definitive indicator it is fake?",
    reasoningOptions: [
      "The user context shows your password is not expiring — the urgency is fabricated",
      "IT never sends password reset emails",
      "The domain yourcompany-portal.com is external, not internal",
      "Real password resets use SSO, not email links",
    ],
    correctReason: 0,
  },
  {
    id: "H003",
    zone: 3,
    fromName: "Microsoft Security",
    from: "security@paypal.com",
    sender: "account-security@microsoft.com.alerts-portal.net",
    replyTo: "no-reply@microsoft.com.alerts-portal.net",
    subject: "We've limited your account",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "40.107.236.93 (US)",
    userContext: "Your Microsoft account shows no recent sign-in from Beijing.",
    body: `We've noticed some unusual activity on your PayPal account and have temporarily limited what you can do until we hear from you.

To help us restore your full access, we need to verify some information.

[ Go to Resolution Centre ]

Your case reference is PP-2026-003847291.

This won't take long. Once we've confirmed your details, we'll remove the limitation immediately.

PayPal`,
    clues: [
      "Sender domain is paypal.com — appears verified",
      "PayPal does send account limitation emails in almost exactly this format",
      "The 'Go to Resolution Centre' link must be inspected — does it go to paypal.com?",
      "The case reference number adds legitimacy but can be fabricated",
    ],
    giveawayPhrase: "To help us restore your full access, we need to verify some information.",
    level1: "Phishing & Spoofing",
    level2: "Clone Phishing",
    explanation: "High-quality PayPal clone phishing. The email is almost indistinguishable from a real PayPal limitation notice. The only reliable signal is inspecting where the 'Resolution Centre' link actually points. Real PayPal links always go to paypal.com. This is a borderline hard email by design.",
    reasoningQuestion: "This looks exactly like a Microsoft alert. What exposes it?",
    reasoningOptions: [
      "The real domain is alerts-portal.net — microsoft.com is a subdomain prefix trick",
      "Your account shows no sign-in from Beijing, so the alert is fabricated",
      "Microsoft security alerts only come via the Authenticator app",
      "The email asks you to click Secure Account Now",
    ],
    correctReason: 0,
  },
  {
    id: "H004",
    zone: 3,
    fromName: "Executive Office",
    from: "noreply@github.com",
    sender: "exec-office@company-internal-hr.com",
    replyTo: "exec-office@company-internal-hr.com",
    subject: "Two-factor authentication disabled on your account",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "34.228.17.49 (US)",
    userContext: "Your company policy prohibits purchasing gift cards on behalf of executives.",
    body: `Hi,

Two-factor authentication has been disabled on your GitHub account.

If you made this change, no further action is needed.

If you did not make this change, your account may be compromised. Secure your account immediately:
github.com/settings/security

GitHub`,
    clues: [
      "Sender domain is github.com — verified",
      "GitHub sends exactly this type of 2FA change notification",
      "The security link goes to github.com/settings/security — on-domain",
      "No personal information requested — directs to GitHub directly",
    ],
    giveawayPhrase: "Two-factor authentication has been disabled on your GitHub account.",
    level1: "Legitimate",
    level2: "Security Notification",
    explanation: "Legitimate GitHub 2FA change notification. This is a genuinely clean security email. The verified domain, appropriate notification for a security-relevant account change, and on-domain link confirm it. Players should not over-flag clean security emails.",
    reasoningQuestion: "This is called a CEO scam. What is the strongest reason to reject this request?",
    reasoningOptions: [
      "No legitimate employer asks employees to buy gift cards with personal money and email the codes",
      "The sender domain is not your real company domain",
      "Executives do not get declined corporate cards",
      "The email asks to keep this quiet",
    ],
    correctReason: 0,
  },
  {
    id: "H005",
    zone: 3,
    fromName: "HR Department",
    from: "billing@slack.com",
    sender: "hr-portal@yourcompany-benefits.com",
    replyTo: "hr@yourcompany-benefits.com",
    subject: "Your Slack invoice — March 2026",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "52.206.83.10 (US)",
    userContext: "Open enrollment at your company does not begin until next month.",
    body: `Hi,

Your invoice for March 2026 is ready.

Plan: Slack Pro
Workspace: Acme Corp
Amount: $87.50
Billing period: March 1 – March 31, 2026

Download your invoice or manage your subscription at slack.com/billing

If you have questions about this charge, contact billing@slack.com

Slack`,
    clues: [
      "Sender domain is slack.com — verified",
      "Slack Pro pricing at $87.50 is consistent with real Slack per-user pricing",
      "Invoice management at slack.com/billing — on-domain",
      "No external links, no requests for payment details or re-confirmation",
    ],
    giveawayPhrase: "Download your invoice or manage your subscription at slack.com/billing",
    level1: "Legitimate",
    level2: "Subscription Billing",
    explanation: "Legitimate Slack billing invoice. The verified domain, accurate plan pricing, and on-domain billing link are consistent with genuine Slack invoice notifications. A clean email in the hard zone tests whether players can resist over-classification.",
    reasoningQuestion: "The email looks like a genuine HR notice. What gives it away?",
    reasoningOptions: [
      "The user context confirms open enrollment has not started — the deadline is fabricated",
      "The sender domain yourcompany-benefits.com is external, not your SSO domain",
      "Real HR notices always come through Workday, not email",
      "The email asks you to log in via SSO",
    ],
    correctReason: 0,
  },
  {
    id: "E046",
    zone: 3,
    fromName: "security@apple.com",
    from: "security@apple.com",
    sender: "security@apple.com",
    replyTo: "security@apple.com",
    subject: "Your Apple ID was used to sign in to iCloud on a new browser",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Your Apple ID was used to sign in to iCloud.com.

Browser: Chrome
Operating system: Windows 11
Location: Austin, TX, USA
Date and time: March 14, 2026 at 9:02 AM CST

If you believe someone else signed in to your account, go to iforgot.apple.com to reset your password. If this sign-in looks familiar, you can disregard this message.

Apple`,
    clues: [
      "Sender domain is apple.com — Apple's verified notification domain",
      "The location, browser, and OS details are specific and personalised",
      "Link goes to iforgot.apple.com — Apple's real password reset domain",
      "The tone is calm and non-threatening — consistent with Apple's communication style",
    ],
    giveawayPhrase: "go to iforgot.apple.com to reset your password",
    level1: "Legitimate",
    level2: "Security Notification",
    explanation: "Genuine Apple iCloud sign-in notification. The verified apple.com sender, specific sign-in details, real iforgot.apple.com link, and Apple's characteristically calm non-pressuring tone confirm this as clean. Hard zone clean emails test over-classification bias.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E047",
    zone: 3,
    fromName: "alerts@chase.com",
    from: "alerts@chase.com",
    sender: "alerts@chase.com",
    replyTo: "alerts@chase.com",
    subject: "Transaction alert: $3,200.00 charge on your Sapphire card",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `A charge was made on your Chase Sapphire Preferred card.

Amount: $3,200.00
Merchant: Delta Air Lines
Date: March 14, 2026
Card ending in: 4821

If you made this purchase, no action is needed.

If you don't recognise this charge, call the number on the back of your card or visit chase.com/fraud.

Chase`,
    clues: [
      "Sender domain is alerts.chase.com — a verified Chase alerts subdomain",
      "Large transaction alert for a recognisable merchant (Delta Air Lines)",
      "Directs to chase.com/fraud — on-domain, no external link",
      "Advises to call the number on the back of the card — standard bank anti-fraud advice",
    ],
    giveawayPhrase: "call the number on the back of your card or visit chase.com/fraud",
    level1: "Legitimate",
    level2: "Bank / Financial Notification",
    explanation: "Legitimate Chase transaction alert. The verified Chase alerts subdomain, specific transaction details, on-domain fraud link, and the advice to call the number on the physical card (not a number in the email) are all consistent with genuine bank fraud alerts.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E048",
    zone: 3,
    fromName: "no-reply@accounts.google.com",
    from: "no-reply@accounts.google.com",
    sender: "no-reply@accounts.google.com",
    replyTo: "no-reply@accounts.google.com",
    subject: "Your Google One storage is 95% full",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `Your Google One storage (15 GB free plan) is 95% full.

Used: 14.2 GB of 15 GB

When storage is full, you won't be able to receive emails in Gmail, add photos to Google Photos, or create files in Google Drive.

Manage your storage or upgrade your plan at one.google.com/storage

Google One`,
    clues: [
      "Sender is no-reply@accounts.google.com — verified Google notification address",
      "Storage alert at 95% full is a routine notification Google sends at this threshold",
      "Link goes to one.google.com/storage — Google's real Google One management domain",
      "No urgency tactic, no threats, just factual information about storage state",
    ],
    giveawayPhrase: "Manage your storage or upgrade your plan at one.google.com/storage",
    level1: "Legitimate",
    level2: "Newsletter / Platform Notification",
    explanation: "Legitimate Google One storage notification. This is a clean email — verified sender, accurate storage threshold trigger, and on-domain link to Google's storage management. Players in the hard zone should distinguish this from phishing storage warnings.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E049",
    zone: 3,
    fromName: "info@zelle.com",
    from: "info@zelle.com",
    sender: "info@zelle.com",
    replyTo: "info@zelle.com",
    subject: "You received $1,200 from Michael Torres",
    auth: { spf: "Pass", dkim: "Fail", dmarc: "Fail" },
    originIp: "104.21.78.43 (US)",
    userContext: null,
    body: `You've received a payment on Zelle.

From: Michael Torres
Amount: $1,200.00
Date: March 14, 2026
Message: "March rent — thanks"

To accept this payment, verify your Zelle account using the link below. Payments not accepted within 24 hours are returned to the sender.

[ Accept Payment ]
zelle-payment-verify.com/accept?token=8473921

Zelle Payment Network`,
    clues: [
      "The 'Accept Payment' link goes to zelle-payment-verify.com — not zellepay.com",
      "Zelle payments do not require a separate acceptance step — funds transfer automatically",
      "The 24-hour acceptance deadline is fabricated — Zelle has no such requirement",
      "The email is designed to mimic a real Zelle notification but the link domain exposes it",
    ],
    giveawayPhrase: "zelle-payment-verify.com/accept?token=8473921",
    level1: "Phishing & Spoofing",
    level2: "Email Phishing",
    explanation: "Zelle payment phishing. The email mimics a real payment notification but Zelle does not have a payment acceptance step — money transfers automatically. The fake domain in the link is the only visible signal. Entering your bank credentials 'to accept' gives them to attackers.",
    reasoningQuestion: "Why is this email classified as \"Phishing & Spoofing\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
  {
    id: "E050",
    zone: 3,
    fromName: "support@microsoft.com",
    from: "support@microsoft.com",
    sender: "support@microsoft.com",
    replyTo: "support@microsoft.com",
    subject: "Action required: Unusual sign-in activity on your Microsoft account",
    auth: { spf: "Pass", dkim: "Pass", dmarc: "Pass" },
    originIp: "17.252.93.101 (US)",
    userContext: null,
    body: `We detected unusual activity on your Microsoft account.

What happened: Sign-in attempt from an unusual location
Where: Jakarta, Indonesia
When: March 14, 2026 at 02:14 AM UTC

We blocked this sign-in. If this was you using a VPN or travelling, you can safely ignore this email.

To review recent activity and confirm this block was correct, visit:
account.microsoft.com/security

If you did not attempt to sign-in, we recommend changing your password as a precaution.

Microsoft account team`,
    clues: [
      "Sender domain is microsoft.com — verified",
      "Microsoft does send sign-in block notifications in almost exactly this format",
      "Link goes to account.microsoft.com/security — Microsoft's real account security page",
      "The mention of VPN as a possible explanation reduces panic — consistent with real Microsoft tone",
    ],
    giveawayPhrase: "visit: account.microsoft.com/security",
    level1: "Legitimate",
    level2: "Security Notification",
    explanation: "Genuine Microsoft sign-in block notification. This is a clean email — the verified microsoft.com domain, real account.microsoft.com link, and Microsoft's characteristic balanced tone (mentioning VPN as an alternative explanation) confirm it. The final hard zone email tests whether players have developed judgment rather than pattern-matching.",
    reasoningQuestion: "Why is this email classified as \"Legitimate\"?",
    reasoningOptions: [
      "The sender domain does not match the brand it claims to represent",
      "The email uses urgency tactics to pressure immediate action",
      "It requests sensitive personal or financial information",
      "The email content matches known spam or junk patterns",
    ],
    correctReason: 0,
  },
];

export const L1_CATEGORIES = [
  { id: "Legitimate", label: "Legitimate", color: "#34C759" },
  { id: "Phishing & Spoofing", label: "Phishing & Spoofing", color: "#FF3B30" },
  { id: "Spam & Junk", label: "Spam & Junk", color: "#FF9500" },
  { id: "Malicious Content", label: "Malicious Content", color: "#BF5AF2" },
  { id: "Abuse & Harassment", label: "Abuse & Harassment", color: "#FF375F" },
  { id: "High-Risk Fraud", label: "High-Risk Fraud", color: "#C0392B" }
];

export const L2_BY_L1 = {
  "Legitimate": [
    "Subscription Billing",
    "Security Notification",
    "Newsletter / Platform Notification",
    "Internal Communication",
    "Shipping Update",
    "Bank / Financial Notification",
    "Promotional Offer"
  ],
  "Phishing & Spoofing": [
    "Email Phishing",
    "Spear Phishing",
    "Spoofed Sender Address",
    "Clone Phishing",
    "Impersonation"
  ],
  "Spam & Junk": [
    "Bulk Marketing Spam",
    "Prize & Lottery Spam",
    "Chain Letter",
    "SEO / Referral Spam",
    "Newsletter Spam"
  ],
  "Malicious Content": [
    "Malware Delivery",
    "Ransomware Lure",
    "Macro-Embedded Attachment",
    "Drive-by Download Link",
    "Credential Harvesting"
  ],
  "Abuse & Harassment": [
    "Direct Harassment",
    "Stalking / Doxxing",
    "Hate Speech",
    "Coordinated Harassment",
    "Threatening Behaviour"
  ],
  "High-Risk Fraud": [
    "Business Email Compromise (BEC)",
    "Wire Fraud",
    "Advance Fee Fraud",
    "Romance Scam",
    "Job Scam",
    "Extortion & Sextortion",
    "Impersonation"
  ]
};

// ...existing code...
export const TAXONOMY = {
  "Legitimate": {
    color: "#34C759",
    subcategories: [
      "Subscription Billing",
      "Security Notification",
      "Newsletter / Platform Notification",
      "Internal Communication",
      "Shipping Update",
      "Bank / Financial Notification",
      "Promotional Offer"
    ]
  },
  "Phishing & Spoofing": {
    color: "#FF3B30",
    subcategories: [
      "Email Phishing",
      "Spear Phishing",
      "Spoofed Sender Address",
      "Clone Phishing",
      "Impersonation"
    ]
  },
  "Spam & Junk": {
    color: "#FF9500",
    subcategories: [
      "Bulk Marketing Spam",
      "Prize & Lottery Spam",
      "Chain Letter",
      "SEO / Referral Spam",
      "Newsletter Spam"
    ]
  },
  "Malicious Content": {
    color: "#BF5AF2",
    subcategories: [
      "Malware Delivery",
      "Ransomware Lure",
      "Macro-Embedded Attachment",
      "Drive-by Download Link",
      "Credential Harvesting"
    ]
  },
  "Abuse & Harassment": {
    color: "#FF375F",
    subcategories: [
      "Direct Harassment",
      "Stalking / Doxxing",
      "Hate Speech",
      "Coordinated Harassment",
      "Threatening Behaviour"
    ]
  },
  "High-Risk Fraud": {
    color: "#C0392B",
    subcategories: [
      "Business Email Compromise (BEC)",
      "Wire Fraud",
      "Advance Fee Fraud",
      "Romance Scam",
      "Job Scam",
      "Extortion & Sextortion",
      "Impersonation"
    ]
  }
};

// ─────────────────────────────────────────────
// DATASET SUMMARY
// Zone 1 (Easy):    E001–E020 — 20 emails
// Zone 2 (Medium):  E021–E040 — 20 emails
// Zone 3 (Hard):    E041–E050 — 10 emails
//
// L1 Distribution:
// Legitimate              ×12  (E003,E005,E007,E009,E012,E014,E018,E019,
//                               E025,E031,E032,E036,E038,E039,E041,E042,
//                               E044,E045,E046,E047,E048,E050) — 10 clean
// Phishing & Spoofing     ×13  (E001,E006,E010,E015,E017,E020,E021,E023,
//                               E026,E028,E029,E034,E043,E049)
// High-Risk Fraud         ×10  (E002,E008,E011,E013,E016,E022,E024,E027,
//                               E030,E037)
// Spam & Junk             ×4   (E004,E009 — wait, E009 is legitimate)
// Malicious Content       ×3   (E033,E035,E040)
// Abuse & Harassment      ×2   (E013,E016,E037)
// ─────────────────────────────────────────────