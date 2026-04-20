// Flagmail — Email Dataset v3.0
// 30 emails: 10 easy (zone 1), 10 medium (zone 2), 10 hard (zone 3)
// L1 Distribution: Legitimate ×10, Phishing & Spoofing ×10, Spam & Junk ×10

export const EMAIL_POOL = [

  // ─── ZONE 1 — EASY ─────────────────────────────────────────────────────────
  {
    id: "E001",
    zone: 1,
    from: "money.transfer772@gmail.com",
    subject: "URGENT: YOUR $100,000,000.00 IS READY",
    body: `Dearest Beloved Friend,

I am the Prince of Dubai and I am writing to you with a matter of great importance. I have been searching for a trustworthy person to help me move my family's private inheritance funds out of the country before the new government regulations take effect.

I have chosen your email address from a global database of honest citizens. I am prepared to transfer $100,000,000.00 to your account today. I will give you 10% for your help. Please click the link below to provide your bank details and ID so we can start the wire transfer immediately. This is a secret!

[Link: bit.ly/claim-dubai-cash]`,
    clue: "A Prince wouldn't use a random @gmail.com account or find a 'trustworthy person' via a random database.",
    level1: "Phishing & Spoofing",
    subCategory: "Email Phishing",
    explanation: "Classic Nigerian prince phishing. No real prince uses a Gmail address, and no inheritance requires your bank details upfront. The link to a URL shortener hides the real destination — a credential-harvesting page.",
    giveawayPhrase: "I have chosen your email address from a global database of honest citizens",
  },
  {
    id: "E002",
    zone: 1,
    from: "billing-office@apple.com",
    subject: "REFUND: You have an unclaimed credit of $149.99",
    body: `Dear Customer,

Our billing department has identified a double-payment error on your recent subscription for "iCloud+ and Music Bundle." As a result, your account has been overcharged by $149.99.

We have tried to process the refund automatically, but your current payment method on file has expired. To receive your refund, you must manually enter your bank or credit card details into our secure refund portal. If you do not claim this credit within 48 hours, the funds will be forfeited and returned to the state treasury.

Please click the link below to verify your details and receive your $149.99 refund immediately:

[Link: apple-refund-portal-secure.net/claim-funds]

Thank you,`,
    clue: "If a company owes you a refund, they send it back to your card automatically. They will never ask you to click a link and 'enter your bank details' to get a refund. Also, look at the link — it says apple-refund-portal-secure.net. Apple only uses apple.com.",
    level1: "Phishing & Spoofing",
    subCategory: "Impersonation",
    explanation: "Apple impersonation phishing using a fake refund pretext. Legitimate refunds are processed automatically to the original payment method — Apple never asks you to submit card details via email. The link domain (apple-refund-portal-secure.net) is a fake; Apple only emails from apple.com.",
    giveawayPhrase: "apple-refund-portal-secure.net/claim-funds",
  },
  {
    id: "E003",
    zone: 1,
    from: "auto-confirm@amazon.com",
    subject: "Your order #112-394857 has shipped!",
    body: `Hello! We're excited to let you know that a part of your order is on its way. You can find the details of your shipment and track its progress using the link below.

Items in this shipment:

Wireless Optical Mouse (Black) - 1 unit

If you need to make any changes to your delivery preferences or view your full invoice, please visit your "Orders" page on our official website. Thank you for being a valued customer!

Regards,`,
    clue: "The sender domain is exactly @amazon.com and it references a specific order number without asking for sensitive info.",
    level1: "Legitimate",
    subCategory: "Shipping Update",
    explanation: "Genuine Amazon shipment confirmation. The verified amazon.com domain, specific order number, and direction to the official website (not a link in the email) are all consistent with real Amazon shipping notifications.",
    giveawayPhrase: "visit your \"Orders\" page on our official website",
  },
  {
    id: "E004",
    zone: 1,
    from: "no-reply@accounts.google.com",
    subject: "Security alert: New sign-in detected",
    body: `Your Google Account was recently signed in to from a new Linux device.

Details:
Date: April 17, 2026
Location: Bengaluru, India (Estimated)
Browser: Chrome

If this was you, you can safely ignore this email. If you do not recognize this activity, please review your recent devices by going to your Google Account Security settings. Google will never ask you for your password or 2-step verification code via email.`,
    clue: "It's a standard 'FYI' alert from a verified address and specifically tells you they won't ask for a password.",
    level1: "Legitimate",
    subCategory: "Security Notification",
    explanation: "Genuine Google security sign-in alert. The verified no-reply@accounts.google.com sender, specific sign-in details, and proactive reminder that Google will never ask for your password via email are all hallmarks of real Google security notifications.",
    giveawayPhrase: "Google will never ask you for your password or 2-step verification code via email",
  },
  {
    id: "E005",
    zone: 1,
    from: "no-reply@spotify.com",
    subject: "Your receipt for April 2026",
    body: `Thanks for being a Premium subscriber!

Your monthly payment of $10.99 has been successfully processed via your saved payment method. Your current billing cycle runs from April 17 to May 17. You can view your full transaction history or update your subscription plan at any time by visiting your account page on our website.

Keep on listening!
The Spotify Team`,
    clue: "The price is standard, the domain is correct, and there is no 'urgent' demand.",
    level1: "Legitimate",
    subCategory: "Subscription Billing",
    explanation: "Legitimate Spotify billing receipt. The verified no-reply@spotify.com domain, accurate subscription price, correct billing cycle dates, and zero urgency or requests for information confirm this as genuine.",
    giveawayPhrase: "Your monthly payment of $10.99 has been successfully processed",
  },
  {
    id: "E006",
    zone: 1,
    from: "newsletters@natgeo.com",
    subject: "This week's top stories: The Deep Ocean",
    body: `Welcome to your weekly digest! This week, we explore the mysterious "Midnight Zone" of the ocean, where creatures have evolved to live in total darkness.

In this issue:

How bioluminescence works in deep-sea jellyfish.

New species discovered near the Mariana Trench.

Our photographer's diary: 48 hours in a submarine.

Click "Read More" to dive into the full stories on our digital platform.`,
    clue: "It provides educational value and comes from a well-known, verified publisher.",
    level1: "Legitimate",
    subCategory: "Newsletter",
    explanation: "Legitimate National Geographic weekly newsletter. The verified natgeo.com domain, genuinely educational content, and absence of any requests for personal information or money confirm this as clean.",
    giveawayPhrase: "Click \"Read More\" to dive into the full stories on our digital platform",
  },
  {
    id: "E007",
    zone: 1,
    from: "messages-noreply@linkedin.com",
    subject: "You have 3 new notifications waiting for you",
    body: `Hi there, here's what's been happening in your network while you were away:

Sarah Miller and 2 others viewed your profile.

You have a new connection request from Mark Stevens (Recruiter).

Your post "Thinking about AI" is trending in your industry.

Stay connected and see what's new in your professional circle by visiting your feed.`,
    clue: "Uses standard LinkedIn notification formatting and a verified sender address.",
    level1: "Legitimate",
    subCategory: "Platform Notification",
    explanation: "Genuine LinkedIn activity digest. The verified messages-noreply@linkedin.com sender, standard LinkedIn notification format, and direction to the platform (not an external link) confirm this as legitimate.",
    giveawayPhrase: "Stay connected and see what's new in your professional circle by visiting your feed",
  },
  {
    id: "E008",
    zone: 1,
    from: "no-reply@chase.com",
    subject: "Your monthly statement is now available",
    body: `Dear Customer,

Your monthly credit card statement for the period ending April 15 is now ready to view. For your protection, we do not include account details or attachments in this email.

To view your statement, please log in to the Chase Mobile app or visit chase.com and navigate to the "Statements & Documents" section. If you have questions, please call the number on the back of your card.`,
    clue: "It follows the golden rule of banking: 'Don't click a link, go to our app/site yourself.'",
    level1: "Legitimate",
    subCategory: "Bank Notification",
    explanation: "Legitimate Chase statement notification. The verified no-reply@chase.com domain, no embedded links to click, and the instruction to navigate to chase.com directly are all consistent with genuine bank communication. Real banks never embed statement links in emails.",
    giveawayPhrase: "please log in to the Chase Mobile app or visit chase.com",
  },
  {
    id: "E009",
    zone: 1,
    from: "contest@marketing-blasts.xyz",
    subject: "You are our 1,000,000th Visitor! Claim Prize!",
    body: `CONGRATULATIONS! You have been selected as the 1,000,000th visitor of the day! As a result, you have won a brand new 2024 Tesla Model S or a $50,000 cash prize!

To claim your reward, you just need to complete our quick 50-page consumer preference survey. Once finished, pay a small $5 processing fee to cover the title transfer and the car will be delivered to your door! Don't wait — this offer expires when you close your browser!`,
    clue: "'1,000,000th visitor' is a legendary spam trope. Also, cars aren't 'free' if you have to pay a fee to a random site.",
    level1: "Spam & Junk",
    subCategory: "Prize Spam",
    explanation: "Classic prize spam. The '1,000,000th visitor' claim is sent to millions of people simultaneously. The $5 'processing fee' is the theft mechanism — the car never arrives. Legitimate prize draws never require a fee to claim.",
    giveawayPhrase: "pay a small $5 processing fee to cover the title transfer",
  },
  {
    id: "E010",
    zone: 1,
    from: "martha1955@yahoo.com",
    subject: "Fwd: DO NOT DELETE OR BAD LUCK!",
    body: `This is the "Golden Owl of Prosperity." It was started by a monk in 1920. If you send this to 10 people in the next 5 minutes, you will receive a large sum of money tomorrow morning.

If you break the chain and delete this email, your computer will crash and you will have 10 years of bad luck. One man ignored this and lost his job the next day! Don't take the risk! Forward this now to everyone in your contact list!`,
    clue: "This is classic 'junk' clutter that offers no value and asks for forwards.",
    level1: "Spam & Junk",
    subCategory: "Chain Letter",
    explanation: "Classic chain letter spam. No email can cause computer crashes or bad luck. The superstitious threat and forward request are the defining signals of this long-running spam format. Forwarding it only spreads junk and wastes people's time.",
    giveawayPhrase: "your computer will crash and you will have 10 years of bad luck",
  },

  // ─── ZONE 2 — MEDIUM ───────────────────────────────────────────────────────
  {
    id: "E011",
    zone: 2,
    from: "shipping@apple.com",
    subject: "Your iPhone is on its way!",
    body: `Hello, Your order is heading your way! We've handed it off to the carrier and you should see it at your doorstep soon.

Order Number: W9928374
Delivery Method: Standard Shipping

You can use the tracking link below to see the latest updates on your delivery. Please note that a signature may be required upon arrival. If you won't be home, you can manage your delivery through the carrier's portal. Thank you for choosing Apple.`,
    clue: "The domain @apple.com is correct, and the language is calm and professional.",
    level1: "Legitimate",
    subCategory: "Shipping Update",
    explanation: "Genuine Apple shipping notification. The verified shipping@apple.com domain, specific order number, and standard shipping language are consistent with real Apple order emails. No suspicious links or requests for information.",
    giveawayPhrase: "You can use the tracking link below to see the latest updates on your delivery",
  },
  {
    id: "E012",
    zone: 2,
    from: "support@yourcompany.com",
    subject: "Scheduled System Maintenance: This Sunday",
    body: `Hello Team,

Please be advised that the Internal Employee Portal and the VPN service will be undergoing scheduled maintenance this Sunday, April 19, from 2:00 AM to 4:00 AM local time.

During this window, you may experience intermittent connectivity or be unable to log in to internal tools. We recommend saving all your work and logging out before the maintenance window begins. We apologize for any inconvenience this may cause.

Thank you,
IT Operations`,
    clue: "Standard corporate announcement. It doesn't ask you to 'click here to keep your access.'",
    level1: "Legitimate",
    subCategory: "Internal Communication",
    explanation: "Routine IT maintenance notice. The internal company domain, specific maintenance window, and absence of any links or credential requests are all consistent with a genuine internal IT communication.",
    giveawayPhrase: "We recommend saving all your work and logging out before the maintenance window begins",
  },
  {
    id: "E013",
    zone: 2,
    from: "news@e.starbucks.com",
    subject: "Double Star Day is tomorrow",
    body: `Hello, Get your favorite drink and earn twice the stars! Tomorrow only, every purchase made using your registered Starbucks Card or the Starbucks app will earn you 2x Stars toward your next free reward.

Whether it's a morning latte or an afternoon refresher, make sure to scan your app at the register. See you tomorrow at your local Starbucks!

Offer valid at participating stores. Double stars apply to the base stars earned on the purchase.`,
    clue: "e.starbucks.com is a legitimate marketing subdomain used by Starbucks for email campaigns.",
    level1: "Legitimate",
    subCategory: "Promotional Offer",
    explanation: "Legitimate Starbucks rewards promotion. The e.starbucks.com subdomain is Starbucks' verified email marketing domain. The promotion is a standard loyalty program offer with no requests for personal information or payment.",
    giveawayPhrase: "earn twice the stars! Tomorrow only",
  },
  {
    id: "E014",
    zone: 2,
    from: "alerts@wellsfargo.com",
    subject: "Large transaction alert on your account",
    body: `Hello, Wells Fargo Alert: A transaction of $542.10 occurred on your credit card ending in 4492 at "Electronics Plus" on April 17.

If this was you, no action is needed. We sent this alert as part of our commitment to your account security. If you do not recognize this transaction, please do not reply to this email. Instead, call the official customer service number on the back of your physical card or log in to our secure online portal to report unauthorized activity.`,
    clue: "It tells you to call the number on the back of your card — a very safe instruction.",
    level1: "Legitimate",
    subCategory: "Bank Notification",
    explanation: "Legitimate Wells Fargo transaction alert. The verified alerts@wellsfargo.com sender, specific transaction details, and the advice to call the number on the physical card (not a number in the email) are hallmarks of genuine bank security alerts.",
    giveawayPhrase: "call the official customer service number on the back of your physical card",
  },
  {
    id: "E015",
    zone: 2,
    from: "support@netfIex-payments.com",
    subject: "Your account is on hold",
    body: `Hello, We're sorry to say that we're having some trouble with your current billing information. As a result, your Netflix subscription has been put on hold and you will no longer be able to stream movies and TV shows.

To continue enjoying Netflix, please update your payment method by clicking the button below. You will need to provide a valid credit card to restore your service. If we do not hear from you within 48 hours, we will be forced to cancel your membership permanently.

[Button: Update Payment Now]`,
    clue: "Look at the sender address. The word 'Netflix' is spelled with a capital 'I' instead of a lowercase 'l' — netfIex-payments.com.",
    level1: "Phishing & Spoofing",
    subCategory: "Spoofed Address",
    explanation: "Netflix phishing using a capital 'I' to replace lowercase 'l' in the domain (netfIex vs netflix). This visual trick makes the domain look legitimate at a glance. The 48-hour cancellation threat creates pressure to click without inspecting the sender address carefully.",
    giveawayPhrase: "netfIex-payments.com",
  },
  {
    id: "E016",
    zone: 2,
    from: "service@pay-pal-notice.com",
    subject: "Unusual activity: Your account has been temporarily restricted",
    body: `Dear Member, we have noticed some unusual activity on your PayPal account that suggests an unauthorized third party may have accessed your funds.

Dear Customer,

We noticed some unusual activity on your PayPal account that suggests an unauthorized third party may have accessed your personal information. For your protection, we have temporarily restricted access to your account until you can verify your identity.

While your account is restricted, you will be unable to send money, withdraw funds, or make online purchases. To lift this restriction and secure your account, please visit our secure verification portal immediately at the address below:

Link: www.paypal.security-updates.com/login-verify

Please complete the verification process within 24 hours to avoid a permanent account suspension. We apologize for any inconvenience this may cause, but your security is our top priority.

Thank you,`,
    clue: "Look at the link provided. In a web address, the 'real' website is the part right before the .com. Here, the real website is security-updates.com, not PayPal. A real PayPal link would always be paypal.com/something.",
    level1: "Phishing & Spoofing",
    subCategory: "Clone Phishing",
    explanation: "PayPal clone phishing. The login link goes to paypal.security-updates.com — which is a subdomain of security-updates.com, not PayPal. The sender domain pay-pal-notice.com is also fake. Real PayPal links always use paypal.com as the base domain.",
    giveawayPhrase: "www.paypal.security-updates.com/login-verify",
  },
  {
    id: "E017",
    zone: 2,
    from: "Microsoft-Support-Cloud@outlook-mail.co",
    subject: "Your mailbox is full: Action Required",
    body: `Hello, Your Outlook mailbox has reached 99.5% of its 15GB storage limit. Because of this, you will no longer be able to send or receive new emails. Important messages from your contacts may be bounced back to the sender.

To avoid any service interruption, please click the button below to add 50GB of extra storage to your account for free as part of our loyalty program. You must sign in to confirm your upgrade.

[Button: Get More Storage]`,
    clue: "The sender domain is outlook-mail.co — Microsoft uses microsoft.com and outlook.com, not outlook-mail.co.",
    level1: "Phishing & Spoofing",
    subCategory: "Impersonation",
    explanation: "Microsoft impersonation phishing. The domain outlook-mail.co mimics Microsoft's branding but is a fake. Microsoft and Outlook only send from microsoft.com and outlook.com. The 'free 50GB upgrade' requiring a sign-in is a credential harvesting trap.",
    giveawayPhrase: "outlook-mail.co",
  },
  {
    id: "E018",
    zone: 2,
    from: "deals@daily-discount.net",
    subject: "RE: Your 90% discount (Expires Midnight!)",
    body: `Hey there! We noticed you were browsing our site recently and left a few items in your shopping cart. We didn't want you to miss out, so we're giving you a secret 90% discount on all designer knock-off sunglasses!

Whether you're hitting the beach or just want to look cool, our glasses are the perfect fit. Prices start at just $5.99. Use the code "CHEAP90" at checkout. Hurry, this offer is only valid for the next few hours!`,
    clue: "It uses 'RE:' in the subject to trick you into thinking you've talked to them before.",
    level1: "Spam & Junk",
    subCategory: "Bulk Marketing",
    explanation: "Deceptive marketing spam. The 'RE:' subject line prefix is designed to make the email look like a reply to a prior conversation, bypassing spam filters and tricking recipients into opening it. The sender domain daily-discount.net has no brand affiliation.",
    giveawayPhrase: "RE: Your 90% discount",
  },
  {
    id: "E019",
    zone: 2,
    from: "news@healthy-life.me",
    subject: "One weird trick to lose weight",
    body: `Hello, Are you tired of spending hours at the gym with no results? Doctors and fitness gurus are stunned by this one simple trick that helps you burn fat while you sleep!

It's not a diet, it's not a pill, and it's not surgery. It's a secret fruit discovered in the Amazon jungle that naturally boosts your metabolism by 400%. Watch the free video below to see how thousands of people are changing their lives in just 7 days!`,
    clue: "'One weird trick' and 'doctors hate this' are classic clickbait spam markers.",
    level1: "Spam & Junk",
    subCategory: "Newsletter Spam",
    explanation: "Health misinformation spam. The 'one weird trick', '400% metabolism boost', and 'doctors are stunned' phrases are documented spam copywriting patterns. The .me domain has no medical credibility and the claims are scientifically impossible.",
    giveawayPhrase: "naturally boosts your metabolism by 400%",
  },
  {
    id: "E020",
    zone: 2,
    from: "marketing@rank-first.biz",
    subject: "I found 5 critical errors on your website",
    body: `Hi, I was browsing your website this morning and I noticed several technical errors that are preventing you from appearing on the first page of Google.

If you don't fix these issues, you are losing out on thousands of potential customers every month. My agency specializes in ranking businesses #1 in less than 3 days. Would you be open to a 5-minute phone call tomorrow so I can show you exactly how to crush your competitors?`,
    clue: "Unsolicited business offers that promise 'instant' results are almost always low-quality spam.",
    level1: "Spam & Junk",
    subCategory: "SEO Spam",
    explanation: "SEO cold-outreach spam. The claim of finding 'critical errors' is automated and sent to millions of domains. No agency can guarantee Google #1 rankings in 3 days — that's not how search algorithms work. The goal is to get you on a call to sell overpriced services.",
    giveawayPhrase: "ranking businesses #1 in less than 3 days",
  },

  // ─── ZONE 3 — HARD ─────────────────────────────────────────────────────────
  {
    id: "E021",
    zone: 3,
    from: "hr-portal@yourcompany.com",
    subject: "IMPORTANT: Action Required - Annual Benefits Enrollment",
    body: `Hi Team,

It is officially time for our Annual Open Enrollment period! Between now and Friday, you must review and select your health, dental, and vision insurance plans for the 2026 calendar year.

To make your selections, please log in to our internal portal via the company SSO (Single Sign-On) dashboard and navigate to the "Workday" application. If you have any questions regarding plan changes or premiums, please attend one of our virtual Q&A sessions tomorrow at 10 AM.

Best,
HR Team`,
    clue: "It uses the term 'SSO', which is a sign of a real corporate secure login process.",
    level1: "Legitimate",
    subCategory: "Internal Communication",
    explanation: "Legitimate HR benefits enrollment notice. The internal company domain, SSO reference (a real enterprise security practice), named internal system (Workday), and specific enrollment deadline are all consistent with genuine corporate HR communications.",
    giveawayPhrase: "log in to our internal portal via the company SSO (Single Sign-On) dashboard",
  },
  {
    id: "E022",
    zone: 3,
    from: "mail@adobe.com",
    subject: "Your invoice for April 2026",
    body: `Hello, Thank you for your continued subscription to Adobe Creative Cloud.

This is a notification that your monthly payment of $52.99 has been charged to your credit card ending in 1234. Your invoice is now available for download in the "Billing" section of your Adobe ID account.

If you have any questions about this charge or need to update your payment info, please visit our official support page. Thank you for being a part of the creative community.`,
    clue: "The domain @adobe.com is correct, and it correctly shows only the last 4 digits of a card.",
    level1: "Legitimate",
    subCategory: "Subscription Billing",
    explanation: "Genuine Adobe Creative Cloud invoice. The verified mail@adobe.com domain, accurate subscription pricing, partial card number (last 4 digits only — a security best practice), and direction to the official Adobe portal confirm this as legitimate.",
    giveawayPhrase: "your credit card ending in 1234",
  },
  {
    id: "E023",
    zone: 3,
    from: "exec-office@company-internal-hr.com",
    subject: "Quick Request - Are you at your desk?",
    body: `Hi, I'm currently stuck in a back-to-back board meeting and I can't take any calls right now. I need a huge favor.

I was supposed to send gift cards to a client for their anniversary today, but I've just realized my corporate card is being declined. Can you please head to the store and purchase five $100 Apple Gift Cards? Just scratch the back, take a photo of the codes, and email them to me here. I will reimburse you by the end of the day. Please keep this quiet as it's a surprise for the client.`,
    clue: "This is a 'CEO scam.' Bosses do not ask employees to buy gift cards with their own personal money.",
    level1: "Phishing & Spoofing",
    subCategory: "Spear Phishing",
    explanation: "CEO gift card scam (Business Email Compromise). The request to buy gift cards personally and 'keep it quiet' is the defining signal. The sender domain company-internal-hr.com mimics an internal address but is not the company's real domain. This scam costs businesses millions annually.",
    giveawayPhrase: "purchase five $100 Apple Gift Cards? Just scratch the back, take a photo of the codes, and email them to me",
  },
  {
    id: "E024",
    zone: 3,
    from: "account-security@mircosoft.com",
    subject: "Unusual Sign-in Activity Detected",
    body: `Hello, Microsoft account security alert.

We detected an unusual sign-in to your account from an IP address located in Beijing, China. If this was not you, your account may have been compromised.

To secure your account and prevent unauthorized access to your files and emails, please click the button below to verify your identity. You will be asked to confirm your current password and your recovery phone number.

[Button: Secure Account Now]`,
    clue: "Look at the spelling in the 'From' field: 'mircosoft' instead of 'microsoft'.",
    level1: "Phishing & Spoofing",
    subCategory: "Typosquatting",
    explanation: "Microsoft typosquatting phishing. The domain mircosoft.com swaps the 'c' and 'r' in 'microsoft' — easy to miss at a glance, especially in a small font. The Beijing sign-in is chosen to trigger alarm. Microsoft security alerts come from microsoft.com only.",
    giveawayPhrase: "mircosoft.com",
  },
  {
    id: "E025",
    zone: 3,
    from: "dse@docusıgn.net",
    subject: "Action Required: Your 2026 Annual Bonus & Performance Review.pdf",
    body: `Hello,

You have a new document waiting for your electronic signature from the Finance & Payroll Department.

This document contains your confidential performance evaluation and the final calculation for your 2026 annual bonus. To ensure your bonus is included in the next pay cycle, please review the document and provide your digital signature by 5:00 PM today.

Document: Performance_Bonus_2026.pdf
Access Code: BX-992

[Button: VIEW DOCUMENT]

This is an automated message from the DocuSign Secure System. Do not reply to this email. For assistance, please contact your internal HR representative.`,
    clue: "Look extremely closely at the sender's email: dse@docusıgn.net. The 'i' in docusıgn is a Turkish 'dotless i' character — it looks identical to a normal 'i' but it is a completely different domain.",
    level1: "Phishing & Spoofing",
    subCategory: "Spoofed Sender Address",
    explanation: "Unicode homoglyph attack — one of the most sophisticated phishing techniques. The 'i' in docusıgn is a Turkish dotless-i (ı), making it visually identical to docusign.net but a completely different domain. The annual bonus subject matter creates urgency that bypasses careful reading.",
    giveawayPhrase: "dse@docusıgn.net",
  },
  {
    id: "E026",
    zone: 3,
    from: "helpdesk@yourcompany-portal.com",
    subject: "URGENT: Password Expiration Notice",
    body: `Hi, According to our security policy, your network password is set to expire in exactly 2 hours. If you do not update your password before the deadline, you will be locked out of the system and will lose access to your email, the VPN, and all internal files.

To avoid a service lockout, please click the link below to go to our password reset portal. You must enter your old password and then choose a new one.

[Link: reset-portal-login.com/secure]`,
    clue: "Creating 'False Urgency' (2 hours left!) is a classic trick to make you panic and not check the URL.",
    level1: "Phishing & Spoofing",
    subCategory: "Spoofed Address",
    explanation: "Internal IT impersonation phishing. The domain yourcompany-portal.com mimics an internal IT address and the reset link goes to reset-portal-login.com — a completely unrelated domain. Real corporate password resets always use the company's own domain. The 2-hour countdown prevents calm analysis.",
    giveawayPhrase: "reset-portal-login.com/secure",
  },
  {
    id: "E027",
    zone: 3,
    from: "mark@biz-solutions.net",
    subject: "Question about your business",
    body: `Hi, I was looking at your LinkedIn profile earlier and I was very impressed with your background.

I work with several companies in your industry and we've been able to help them get 500 new high-quality leads every single week using our proprietary software. I'll actually be in your city next week for a conference — do you have 15 minutes to grab a coffee so I can show you how we can do the same for you?`,
    clue: "This is a 'cold outreach' bot. It feels personal, but it's an automated sales pitch.",
    level1: "Spam & Junk",
    subCategory: "Referral Spam",
    explanation: "Cold-outreach spam designed to feel personal. The LinkedIn reference, the '500 leads per week' promise, and the local meeting offer are all automated scripts sent to thousands of addresses. The biz-solutions.net domain has no verifiable company behind it.",
    giveawayPhrase: "500 new high-quality leads every single week",
  },
  {
    id: "E028",
    zone: 3,
    from: "cleanup@unsubscriber.app",
    subject: "You have 4,302 unread junk emails in your inbox",
    body: `Hello, Are you tired of waking up to a messy inbox full of spam and advertisements?

Our new "Clean-Sweep" app can automatically unsubscribe you from thousands of mailing lists with just one click. To get started, simply click the button below to connect your email account to our secure server. We will analyze your inbox and clean it up for just a $1 monthly fee. Say goodbye to spam forever!`,
    clue: "Fake 'unsubscriber' services are actually used to verify your email is active so they can send you more spam.",
    level1: "Spam & Junk",
    subCategory: "Newsletter Spam",
    explanation: "Anti-spam spam — a meta-scam. Connecting your email account to an unknown 'unsubscriber' service gives the operator full access to your inbox. These services typically harvest active email addresses and sell them to other spammers, making your spam problem worse, not better.",
    giveawayPhrase: "simply click the button below to connect your email account to our secure server",
  },
  {
    id: "E029",
    zone: 3,
    from: "deals@daily-deals-inbox.com",
    subject: "Open for a massive surprise!",
    body: `Hello, You have been selected as a preferred customer for our exclusive 24-hour "Flash Sale"!

Inside this email, you will find a hidden coupon for an extra 20% off our already discounted prices. We have everything from home electronics to designer clothing. Don't let someone else grab your deals — click the link below to browse our catalog before the sale ends at midnight!`,
    clue: "Unsolicited marketing from a random 'Daily Deals' sender you never signed up for.",
    level1: "Spam & Junk",
    subCategory: "Bulk Marketing",
    explanation: "Generic bulk marketing spam. The 'preferred customer' claim is false — this is a mass send to purchased email lists. The '24-hour flash sale' is a manufactured urgency tactic. The daily-deals-inbox.com domain has no brand affiliation.",
    giveawayPhrase: "You have been selected as a preferred customer",
  },
  {
    id: "E030",
    zone: 3,
    from: "marketing@seo-experts.io",
    subject: "Your website is slow and losing money!",
    body: `Hello, I ran a performance test on your website this morning and the results were shocking. Your site is failing 3 major Google Core Web Vitals, which means Google is pushing you down in the search results.

If you don't fix this immediately, your competitors will take all your traffic. Reply to this email with the word "REPORT" and I will send you a free 20-page audit of your site and a plan to fix it.`,
    clue: "Fear-mongering about technical performance is a common tactic used by low-quality spam agencies to find victims.",
    level1: "Spam & Junk",
    subCategory: "SEO Spam",
    explanation: "SEO fear-mongering spam. The '3 failing Core Web Vitals' claim is generic and sent to every domain on a purchased list — no one has checked your specific site. The 'reply with REPORT' mechanism confirms your email is active for further targeting.",
    giveawayPhrase: "Reply to this email with the word \"REPORT\"",
  },
];

// ─── L1 Categories (trimmed to 3) ─────────────────────────────────────────────
export const L1_CATEGORIES = [
  { id: "Legitimate",          label: "Legitimate",          color: "#34C759" },
  { id: "Spam & Junk",         label: "Spam & Junk",         color: "#FF9500" },
  { id: "Phishing & Spoofing", label: "Phishing & Spoofing", color: "#FF3B30" },
];

// ─── Zone Config (single source of truth) ─────────────────────────────────────
export const ZONE_CONFIG = {
  1: { name: "The Inbox",      difficulty: "Easy",   emails: 10, icon: "📬", mission: "Clear the inbox. Trust your instincts." },
  2: { name: "The Queue",      difficulty: "Medium", emails: 10, icon: "🗂",  mission: "The queue is getting trickier. Stay sharp." },
  3: { name: "The Escalation", difficulty: "Hard",   emails: 10, icon: "🚨", mission: "These are the hardest calls. Think carefully." },
};

export const MAX_POINTS_PER_EMAIL = 2;
export const TOTAL_EMAILS = 30;
export const MAX_SCORE = MAX_POINTS_PER_EMAIL * TOTAL_EMAILS; // 60
export const MAX_POINTS_PER_ZONE = MAX_POINTS_PER_EMAIL * 10; // 20
