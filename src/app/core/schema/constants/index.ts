
// ── Constants ─────────────────────────────────────────────────────────────────

import {
  BlogArticle,
  ProjectPreview,
  ProjectPreviewDetail,
} from "@schema/models";

export const DB_ROOT          = '';
export const CONTENT_ROOT     = `${DB_ROOT}/siteContent`;

export const POSTS: BlogArticle[] = [
  {
    title:    'Understanding the Real Estate Purchase Agreement in Alberta',
    date:     '2026-01-08',
    author:   'William H. Fric, JD',
    categories: [{ name: 'Real Estate' }],
    excerpt:  'The purchase agreement is the most important document in any real estate transaction. Learn what every clause means and what to watch out for before you sign.',
    content: `
      <p>When you make an offer on a property in Alberta, you are signing a legally binding contract — the Real Estate Purchase Agreement. Many buyers treat this document as a formality, but every clause carries real legal weight. Understanding what you are agreeing to before you sign can save you from costly disputes down the road.</p>
      <h2>What the Agreement Covers</h2>
      <p>A standard Alberta purchase agreement sets out the purchase price, the possession date, what chattels are included (appliances, window coverings, garage door openers), and the conditions under which the deal can be collapsed. The most common conditions are financing approval and a satisfactory home inspection.</p>
      <p>Conditions are time-limited. You will typically have five to seven business days to satisfy a financing condition. If your lender requires more time or your inspection reveals a serious defect, you must act within that window — missing the deadline means the condition is deemed waived and the deal becomes unconditional.</p>
      <h2>The Deposit</h2>
      <p>In Alberta, the deposit is held in trust by the seller's brokerage. If the deal collapses because a condition was not met, the deposit is returned. If the buyer fails to close after going unconditional, the seller may be entitled to keep the deposit as liquidated damages — and may also sue for additional losses if the property ultimately sells for less.</p>
      <h2>Title and Encumbrances</h2>
      <p>The agreement requires the seller to deliver clear title on possession day. Your lawyer will conduct a title search and review any registered encumbrances — mortgages, caveats, easements, or restrictive covenants. Some encumbrances run with the land and survive the sale; others must be discharged by the seller before closing.</p>
      <h2>What a Lawyer Reviews</h2>
      <p>Your real estate lawyer reviews the agreement before you remove conditions, examines the title search results, prepares the transfer documents, arranges the payout of the seller's mortgage, and registers the transfer at Alberta Land Titles. This process typically takes two to three weeks from the time conditions are removed to possession day.</p>
      <p>If you have questions about a purchase agreement or are concerned about a specific clause, contact our office before you sign. It is far easier to address issues at the offer stage than after conditions have been removed.</p>
    `.trim(),
  },
  {
    title:    'Mortgage Financing in Alberta: What Borrowers Need to Know',
    date:     '2026-01-22',
    author:   'Howard M. Lowenstein',
    categories: [{ name: 'Real Estate' }],
    excerpt:  'From stress tests to discharge fees, the legal side of mortgage financing is more complex than most buyers expect. Here is what to expect when your lender sends the file to your lawyer.',
    content: `
      <p>Securing mortgage financing involves more than satisfying your lender's underwriting requirements. There is a legal component that occurs at the back end of every mortgage transaction — and understanding it helps you avoid surprises on possession day.</p>
      <h2>The Mortgage Commitment Letter</h2>
      <p>Once your lender approves your application, they issue a commitment letter outlining the loan amount, interest rate, amortization, and any conditions of funding. Common conditions include proof of employment, a satisfactory appraisal, and confirmation that the property has adequate insurance coverage from the possession date.</p>
      <h2>What Your Lawyer Does</h2>
      <p>Your lender sends mortgage instructions to your lawyer — typically a 30 to 60 page package outlining exactly how the mortgage must be registered. Your lawyer reviews the instructions, prepares the mortgage document, has you sign it, registers it at Alberta Land Titles on possession day, and confirms the registration to the lender before funds are advanced.</p>
      <h2>The Stress Test</h2>
      <p>Since 2018, all federally regulated lenders in Canada must qualify borrowers at the greater of the contract rate plus 2% or the Bank of Canada's benchmark qualifying rate. This rule applies to all buyers regardless of down payment size. Credit unions and some private lenders are not federally regulated and may not apply the stress test — but their rates and terms are often less favourable.</p>
      <h2>Mortgage Default Insurance</h2>
      <p>If your down payment is less than 20% of the purchase price, you are required by law to obtain mortgage default insurance through CMHC, Sagen, or Canada Guaranty. The premium ranges from 2.8% to 4.0% of the loan amount depending on your down payment percentage. It is added to your mortgage balance and amortized over the life of the loan.</p>
      <h2>Payout and Discharge</h2>
      <p>When you sell your home or pay off your mortgage early, your lender must provide a discharge statement and ultimately register a discharge of mortgage at Land Titles. Lenders may charge a discharge administration fee. If you break your mortgage early, you will also owe a prepayment penalty — typically three months' interest or an interest rate differential calculation, whichever is greater.</p>
      <p>Our firm acts for all major Canadian banks and financial institutions, as well as individual borrowers. If you have questions about your mortgage documents or need assistance with a financing transaction, we are happy to help.</p>
    `.trim(),
  },
  {
    title:    'Foreclosure in Alberta: A Guide for Homeowners and Lenders',
    date:     '2026-02-05',
    author:   'Anthony J. Di Lello',
    categories: [{ name: 'Civil Litigation' }],
    excerpt:  'Alberta uses a court-supervised foreclosure process that gives borrowers meaningful rights — but missing key deadlines can eliminate those rights entirely. Here is how the process works.',
    content: `
      <p>Alberta is one of the few provinces in Canada where mortgage enforcement proceeds through a court-supervised foreclosure process rather than the power-of-sale procedure used in Ontario and British Columbia. This process gives borrowers important rights, but it also has strict deadlines that must be respected.</p>
      <h2>The Statement of Claim</h2>
      <p>When a borrower defaults on a mortgage, the lender commences foreclosure proceedings by filing a Statement of Claim in the Court of King's Bench. The borrower is served and has a prescribed time — typically 20 days — to file a Statement of Defence. Most defendants do not file a defence, and the matter proceeds by way of application for a Foreclosure Order.</p>
      <h2>The Redemption Period</h2>
      <p>At the initial application, the Court typically grants a Redemption Order giving the borrower a period of time — usually one to six months depending on the circumstances — to redeem the mortgage by paying the full amount owing. This includes arrears, the outstanding principal balance, accrued interest, and the lender's legal costs.</p>
      <p>During the redemption period, the borrower can also sell the property. If the sale proceeds are sufficient to pay out the mortgage, the foreclosure proceedings are discontinued and the borrower keeps any equity.</p>
      <h2>Order for Sale or Foreclosure</h2>
      <p>If the borrower does not redeem or sell during the redemption period, the lender applies for either an Order for Sale (the Court supervises a sale process) or a Final Order of Foreclosure (the lender takes title to the property). The lender typically prefers an Order for Sale because a Final Order of Foreclosure extinguishes the personal covenant — meaning the lender cannot sue the borrower for any deficiency if the property sells for less than the mortgage balance.</p>
      <h2>Rights of Junior Encumbrancers</h2>
      <p>Anyone with a registered interest in the property — a second mortgage, a builder's lien, a caveat — is entitled to notice of the foreclosure proceedings and has the right to redeem the senior mortgage by paying it out. This is an important protection for creditors who might otherwise see their security wiped out.</p>
      <h2>Seeking Legal Advice</h2>
      <p>Whether you are a lender seeking to enforce a defaulted mortgage or a borrower trying to understand your options, early legal advice is critical. The redemption period is finite, and options narrow significantly once a Final Order of Foreclosure is granted. Contact our office as soon as you become aware of a mortgage default.</p>
    `.trim(),
  },
  {
    title:    'Selling Your Home in Alberta: The Legal Process from Listing to Closing',
    date:     '2026-02-19',
    author:   'Tami Fric',
    categories: [{ name: 'Real Estate' }],
    excerpt:  'Most sellers focus on price and possession date — but the legal process of selling a home involves title searches, mortgage payouts, and adjustments that require careful attention.',
    content: `
      <p>Selling a home in Alberta is a significant financial transaction that involves more than accepting an offer and handing over keys. The legal side of a home sale begins the moment you accept an offer and involves your lawyer, your lender, and the buyer's lawyer working in concert to ensure a clean transfer of title.</p>
      <h2>Accepting an Offer</h2>
      <p>When you accept a purchase offer, both parties are bound by its terms. If the offer contains conditions — financing, inspection, sale of the buyer's existing property — you must wait for those conditions to be satisfied or waived before the deal is firm. Until then, either party may walk away without penalty if a condition is not met.</p>
      <h2>Engaging Your Lawyer</h2>
      <p>Once conditions are removed, engage your real estate lawyer immediately. Your lawyer will request a mortgage payout statement from your lender, review the title to confirm there are no unexpected encumbrances, and prepare the transfer documents. The timeline from conditions removed to possession is typically two to four weeks — do not wait until the week before closing to call your lawyer.</p>
      <h2>Real Property Report</h2>
      <p>In Alberta, sellers are typically required to provide a current Real Property Report (RPR) with evidence of municipal compliance. An RPR is a survey prepared by an Alberta Land Surveyor showing the location of all structures on the property relative to the property boundaries. If your RPR is outdated or if you have made additions since the last survey, you will need a new one — which can take two to four weeks to obtain.</p>
      <h2>Closing Adjustments</h2>
      <p>On possession day, financial adjustments are calculated between the buyer and seller. These typically include property taxes (adjusted to the possession date), condo fees if applicable, and any prepaid utilities. Your lawyer calculates the net proceeds you will receive after your mortgage is paid out and adjustments are settled.</p>
      <h2>Title Transfer and Mortgage Discharge</h2>
      <p>On possession day, your lawyer registers the transfer of land in favour of the buyer and receives the sale proceeds from the buyer's lawyer. Your lawyer pays out your mortgage and sends the discharge to your lender for registration. The net proceeds — after mortgage payout, legal fees, real estate commission, and adjustments — are then forwarded to you.</p>
      <p>Planning ahead and working with an experienced real estate lawyer ensures that closing day goes smoothly. Contact our office as soon as your property is listed to get the process started.</p>
    `.trim(),
  },
  {
    title:    'Condominium Purchases in Alberta: What the Disclosure Documents Tell You',
    date:     '2026-03-04',
    author:   'York Campbell',
    categories: [{name: 'Real Estate'}],
    excerpt:  'Buying a condo in Alberta gives you a 10-day review period for the condominium disclosure documents. Most buyers skip this review — here is why you should not.',
    content: `
      <p>Under the Alberta Condominium Property Act, a buyer of a resale condominium unit is entitled to receive a disclosure package from the condominium corporation and has 10 days to review it and, if necessary, rescind the purchase agreement without penalty. This is one of the most valuable consumer protections in Alberta real estate law — and one of the most frequently overlooked.</p>
      <h2>What the Disclosure Package Contains</h2>
      <p>The disclosure package must include the condominium plan and bylaws, the most recent audited financial statements and current year budget, a current reserve fund study or plan, the minutes of the last annual general meeting and any special general meetings held in the preceding 12 months, and a certificate confirming the amount of any contributions to the reserve fund and any amounts owing by the unit being purchased.</p>
      <h2>The Reserve Fund</h2>
      <p>The reserve fund is the condominium corporation's savings account for major repair and replacement projects — roofing, parkade membranes, elevator modernization, window replacement. A healthy reserve fund is adequately funded relative to the estimated cost of upcoming major repairs. An underfunded reserve fund is a red flag: it means owners will face either a special assessment (a one-time charge to cover a shortfall) or a significant increase in monthly condo fees.</p>
      <h2>Special Assessments</h2>
      <p>Review the meeting minutes carefully for any discussion of special assessments — past or anticipated. A special assessment levied after your purchase becomes your obligation as the new owner, even if the underlying repair was identified before you bought the unit. The minutes will often reveal concerns that have not yet resulted in a formal assessment.</p>
      <h2>The 10-Day Rescission Right</h2>
      <p>If you receive the disclosure package and decide you do not want to proceed, you have 10 days from receipt to serve written notice of rescission on the seller. Your deposit must be returned in full. This right cannot be waived by contract.</p>
      <h2>New Construction Condominiums</h2>
      <p>Purchases of new condominium units from a developer are governed by different rules. The developer must provide a disclosure statement before the purchase agreement is signed, and you have a statutory right to rescind within 10 days. New condominium developments are also subject to the Real Estate Act Rules administered by the Real Estate Council of Alberta.</p>
      <p>Before you waive your review period or remove conditions on a condominium purchase, have your lawyer review the disclosure documents. What you learn may significantly affect your decision.</p>
    `.trim(),
  },
  {
    title:    "'Builder's Liens in Alberta: Protecting Contractors and Property Owners'",
    date:     '2026-03-10',
    author:   'Marc A. Lowenstein',
    categories: [{ name: 'Civil Litigation'}],
    excerpt:  "Alberta's Builders' Lien Act gives contractors, subcontractors, and suppliers a powerful tool to secure payment — but strict deadlines apply. Here is what both property owners and tradespeople need to know.",
    content: `
      <p>Construction projects in Alberta are governed by the Builders' Lien Act, which gives contractors, subcontractors, material suppliers, and equipment lessors the right to register a lien against the title of a property if they are not paid for their work or materials. The lien attaches to the land and can prevent the sale or refinancing of a property until it is resolved.</p>
      <h2>Who Can Register a Lien</h2>
      <p>Any person who performs work or supplies materials to be used in the improvement of land in Alberta may register a lien. This includes general contractors, subcontractors, trades (electricians, plumbers, framers), material suppliers, equipment lessors, and architects or engineers who provide services in connection with a project.</p>
      <h2>The 45-Day Deadline</h2>
      <p>A lien must be registered within 45 days of the date the lien claimant last performed work or supplied materials on the project. This is a strict limitation period — missing it extinguishes the right to lien. If you are a contractor or supplier who has not been paid, do not wait to see if payment arrives. Register a lien to protect your rights and deal with the underlying dispute afterward.</p>
      <h2>The Holdback</h2>
      <p>The Builders' Lien Act requires owners to hold back 10% of each payment made to a general contractor. The purpose of the holdback is to create a fund available to satisfy lien claims. The holdback must be maintained for 40 days after the date of substantial completion of the contract. During this period, lien claimants who were not paid by the general contractor can claim against the holdback fund.</p>
      <h2>Discharging a Lien</h2>
      <p>A registered lien can be discharged in several ways: by paying the claim in full and obtaining a discharge, by posting a lien bond or cash payment into court in substitution for the lien (which releases the land from the lien while the underlying dispute is resolved), or by challenging the lien in court and obtaining an order striking it if it is defective or without merit.</p>
      <h2>For Property Owners</h2>
      <p>If a lien is registered against your property, do not ignore it. A lien that is not dealt with within the limitation period prescribed by the Act becomes unenforceable — but you still need a court order to have it removed from title. If you are facing a builders' lien dispute, whether as a claimant or a property owner, early legal advice is essential.</p>
      <p>Our firm has extensive experience in builders' lien matters at all levels of the Alberta courts. Contact us to discuss your situation.</p>
    `.trim(),
  },
  {
    title:    'Estate Planning and Real Property: What Happens to Your Home When You Die',
    date:     '2026-03-17',
    author:   'Howard M. Lowenstein',
    categories: [{name: 'Wills & Estates'}],
    excerpt:  'Your home is likely your most valuable asset. Without proper planning, transferring it to your heirs can be slow, expensive, and contested. Here is how to do it right.',
    content: `
      <p>For most Albertans, their home is their single largest asset. Yet many people give little thought to how that asset will transfer to their heirs — or what happens if they die without a will. The result can be a slow and expensive probate process, unintended outcomes, and family conflict that proper estate planning would have avoided.</p>
      <h2>Joint Tenancy</h2>
      <p>One of the most common estate planning tools for real property is joint tenancy with right of survivorship. When spouses or partners own a property as joint tenants, the surviving owner automatically becomes the sole owner on the death of the other — no probate required, no transfer of land fees, no delay. The transfer occurs by operation of law and is registered at Land Titles by filing a survivorship application with a death certificate.</p>
      <p>Joint tenancy is not appropriate in every situation. If one owner becomes incapacitated, the other owner's ability to deal with the property may be restricted. Joint tenancy can also have unintended tax consequences if the property is not a principal residence.</p>
      <h2>Tenants in Common</h2>
      <p>When property is owned as tenants in common, each owner holds a defined percentage interest that passes through their estate on death. If you own property as a tenant in common and die without a will, your interest passes under Alberta's intestacy rules — which may not align with your wishes. A will is essential for tenants in common to ensure their interest in the property goes where they intend.</p>
      <h2>Transfer on Death</h2>
      <p>Alberta does not currently have a transfer-on-death deed mechanism for real property (unlike some American states). The options for transferring property outside of probate are joint tenancy, inter vivos transfers (gifts during your lifetime), or holding property through a corporation or trust.</p>
      <h2>Wills and Probate</h2>
      <p>If you own property solely in your own name, your estate will likely need to go through the probate process in order for your executor to deal with the property. Probate is an application to the Court of King's Bench for a grant of probate (if there is a will) or administration (if there is not). The grant authorizes the executor or administrator to transfer the property to the beneficiaries.</p>
      <p>Probate fees in Alberta are modest compared to other provinces — $35 for estates under $10,000, and $525 for estates over $250,000. The bigger concern is usually the time involved: probate can take several months, during which the property cannot be transferred or sold.</p>
      <h2>Planning Ahead</h2>
      <p>A comprehensive estate plan — including a will, an enduring power of attorney, and a personal directive — is the most effective way to ensure your property goes to the people you intend, as efficiently as possible. Our firm prepares wills and estate plans for individuals and families throughout Calgary. Contact us to arrange a consultation.</p>
    `.trim(),
  },
  {
    title:    'Commercial Real Estate Transactions in Alberta: Key Differences from Residential Deals',
    date:     '2026-03-24',
    author:   'Tami Fric',
    categories: [{name: 'Real Estate'}],
    excerpt:  'Commercial real estate transactions are significantly more complex than residential deals. Due diligence, environmental concerns, zoning, and financing structures all require careful legal review.',
    content: `
      <p>Commercial real estate transactions share some structural similarities with residential purchases — there is still an offer, conditions, a closing date, and a transfer of title — but the complexity, the stakes, and the legal requirements are substantially greater. Buyers and sellers entering the commercial market for the first time are often surprised by how different the process is.</p>
      <h2>Due Diligence</h2>
      <p>In a residential transaction, due diligence is typically limited to a home inspection and a review of title. In a commercial transaction, due diligence is comprehensive and may include a review of existing leases and tenant estoppel certificates, environmental site assessments (Phase I and potentially Phase II), zoning and land use compliance, building condition assessments, review of service agreements and contracts, financial statements for income-producing properties, and confirmation of all governmental approvals and permits.</p>
      <p>The due diligence period in a commercial transaction is typically 30 to 60 days — significantly longer than the 5 to 10 day periods common in residential deals.</p>
      <h2>Environmental Issues</h2>
      <p>Environmental liability is one of the most significant risks in commercial real estate. Alberta's Environmental Protection and Enhancement Act imposes liability on owners of contaminated land regardless of who caused the contamination. A Phase I Environmental Site Assessment reviews the history of the property and identifies potential areas of concern. If a Phase I identifies concerns, a Phase II assessment involves physical testing of soil and groundwater.</p>
      <p>Purchasing contaminated commercial property without adequate due diligence can expose a buyer to remediation costs that far exceed the purchase price. Environmental indemnification provisions in the purchase agreement are critical.</p>
      <h2>Financing Structures</h2>
      <p>Commercial mortgages are typically structured differently from residential mortgages. They often have shorter amortization periods, higher interest rates, and more restrictive covenants. Some commercial purchases are structured as share purchases rather than asset purchases — buying the shares of a corporation that owns the property — which has different legal and tax implications.</p>
      <h2>GST</h2>
      <p>Unlike most residential real estate, commercial real estate transactions are subject to GST. The parties can elect to have the transaction treated as a sale of a going concern and avoid GST if both parties are GST registrants and the transaction meets the requirements. Failing to address GST properly can result in significant unexpected costs.</p>
      <h2>Working with a Commercial Real Estate Lawyer</h2>
      <p>The complexity of commercial transactions means that having an experienced commercial real estate lawyer involved from the outset — before you sign the offer — is not optional. Issues identified during due diligence can and should affect the price and terms of the deal. Our firm has been assisting businesses and investors with commercial real estate transactions in Calgary for over 40 years. Contact us to discuss your transaction.</p>
    `.trim(),
  },
];

export const INQUIRY_SUB_PREFIX = 'INQUIRY FROM WEBSITE:';

export const PROJECT_PREVIEWS: readonly ProjectPreviewDetail[] = [
  {
    id: 'toolbox',
    name: 'Toolbox',
    tagline: 'CLI & developer productivity suite',
    color: '#33FF88',
    status: 'active',
    description:
      'A modular CLI architecture built around reusable shell tooling, cross-machine configuration, SSH identity switching, and fast code-navigation pipelines.',
    tech: ['zsh', 'tmux', 'fzf', 'rg', 'WSL2'],
    summary:
      'A practical developer-workstation layer that turns frequently repeated engineering actions into fast, composable terminal workflows.',
    sections: [
      {
        eyebrow: 'Problem',
        title: 'High-frequency work should not require high-friction repetition.',
        body:
          'Toolbox consolidates recurring environment, repository, navigation, shell, and identity workflows into a coherent command surface instead of leaving them scattered across ad-hoc shell history.',
      },
      {
        eyebrow: 'Architecture',
        title: 'Composable shell tooling rather than one oversized script.',
        body:
          'The project is organized around modular shell capabilities such as aliaser.zsh, dev_tools.zsh, and sandbox_tools.zsh, with dotfiles providing cross-machine configuration continuity.',
        bullets: [
          'Cross-machine configuration through dotfiles',
          'SSH identity switching for distinct development contexts',
          'rg / fzf / bat workflows for rapid repository navigation',
          'tmux-oriented terminal workflows',
        ],
      },
      {
        eyebrow: 'Outcome',
        title: 'A workstation that behaves more like a personal engineering platform.',
        body:
          'The portfolio version emphasizes the system-design idea behind the tooling: make common actions discoverable, repeatable, and cheap enough that good workflow hygiene becomes the default.',
      },
    ],
    preview: {
      label: 'Terminal workflow preview',
      state: 'planned',
      message:
        'Interactive command-flow examples and benchmark snapshots will land here in a later portfolio iteration.',
    },
  },
  {
    id: 'workflow',
    name: 'Workflow',
    tagline: 'Agentic development orchestration',
    color: '#3B82F6',
    status: 'active',
    description:
      'State-Mode Development, ActivityWatch-to-local-LLM digests, and persistent multiplexer sessions for maintaining context across engineering work.',
    tech: ['TypeScript', 'Angular 20', 'Python', 'LLM APIs'],
    summary:
      'An experiment in treating engineering context, state transitions, and AI assistance as parts of one explicit development workflow.',
    sections: [
      {
        eyebrow: 'Method',
        title: 'Make working state explicit.',
        body:
          'Workflow applies State-Mode Development to decompose UI and engineering work into explicit modes instead of relying on implicit state scattered across tools and components.',
      },
      {
        eyebrow: 'Automation',
        title: 'Capture activity, summarize context, preserve continuity.',
        body:
          'The project combines activity capture, local-LLM digest generation, and persistent terminal sessions to reduce the cost of resuming complex work.',
        bullets: [
          'ActivityWatch → local LLM → digest pipeline',
          'State-Mode methodology across Angular and React work',
          'Persistent Zellij session architecture',
        ],
      },
      {
        eyebrow: 'Why it matters',
        title: 'Context switching becomes an architectural concern.',
        body:
          'The project treats lost working context as something that can be modeled and reduced systematically rather than accepted as unavoidable developer overhead.',
      },
    ],
    preview: {
      label: 'Workflow state preview',
      state: 'planned',
      message:
        'A visual state-transition explorer is reserved for the next preview iteration.',
    },
  },
  {
    id: 'autoval',
    name: 'AutoVal',
    tagline: 'AI assistant benchmarking & evaluation',
    color: '#F59E0B',
    status: 'active',
    description:
      'Comparative AI coding-assistant benchmarks using a shared prompt suite, plus an LLM-powered judge CLI for structured code review.',
    tech: ['Anthropic API', 'Cursor IDE', 'TypeScript', 'Prompt Engineering'],
    summary:
      'A repeatable evaluation harness for comparing coding assistants on the same engineering tasks instead of judging them from isolated demos.',
    sections: [
      {
        eyebrow: 'Evaluation',
        title: 'Hold the task constant; compare the systems.',
        body:
          'AutoVal is organized around shared frontend and backend prompt suites so model behavior can be evaluated against the same task framing.',
      },
      {
        eyebrow: 'Review',
        title: 'Use structured judging rather than impression alone.',
        body:
          'The project includes a judge CLI that uses an LLM-powered review step to make evaluation criteria more systematic and easier to reproduce.',
        bullets: [
          'Shared prompt suites',
          'Cross-assistant comparison',
          'Structured code-review workflow',
          'Anthropic API-powered judge CLI',
        ],
      },
      {
        eyebrow: 'Portfolio angle',
        title: 'Evaluation is an engineering system, not a leaderboard.',
        body:
          'The preview focuses on fair comparison, repeatable evidence, and evaluation design rather than presenting unsupported universal model rankings.',
      },
    ],
    preview: {
      label: 'Evaluation matrix',
      state: 'planned',
      message:
        'A sanitized benchmark matrix and scoring walkthrough will be added here.',
    },
  },
  {
    id: 'automation',
    name: 'Automation',
    tagline: 'Infrastructure & pipeline automation',
    color: '#F472B6',
    status: 'maintained',
    description:
      'A collection of infrastructure and pipeline systems spanning resilience testing, scheduled scraping, and Whisper ASR normalization.',
    tech: ['.NET 8', 'YARP', 'Node.js 22', 'Whisper', 'Python'],
    summary:
      'A portfolio grouping for production-minded automation projects where repeatability, observability, and deterministic pipelines matter more than UI surface area.',
    sections: [
      {
        eyebrow: 'Systems',
        title: 'Different workloads, one recurring theme: automate the fragile path.',
        body:
          'The project family includes ProxyMockApi for proxy and resilience scenarios, ScraperJobRunner for scheduled data collection, and ermis-transcriber for deterministic ASR post-processing.',
      },
      {
        eyebrow: 'Examples',
        title: 'Infrastructure automation across multiple runtimes.',
        body:
          'The work spans .NET, Node.js, Python, YARP, and Whisper, with each tool focused on making an operational workflow repeatable.',
        bullets: [
          'ProxyMockApi: .NET 8 / YARP resilience testing',
          'ScraperJobRunner: Node.js 22 scheduled scraping pipeline',
          'ermis-transcriber: 13-stage Whisper ASR normalization',
          'Reference normalization suite reaching 20/20',
        ],
      },
      {
        eyebrow: 'Design principle',
        title: 'The best automation makes failure modes easier to reason about.',
        body:
          'Each project reduces a manually fragile workflow to an explicit pipeline with inspectable stages and predictable execution.',
      },
    ],
    preview: {
      label: 'Pipeline topology',
      state: 'planned',
      message:
        'A compact topology view of the three automation systems will appear here.',
    },
  },
  {
    id: 'onboarded',
    name: 'Onboarded',
    tagline: 'Full-stack monorepo & portal platform',
    color: '#A78BFA',
    status: 'active',
    description:
      'An Nx v22 monorepo with an Angular 20 portal, scoped workspace tooling, and a datagen CLI for AI training-data workflows.',
    tech: ['Nx v22', 'Angular 20', 'Node.js', 'justfile'],
    summary:
      'A full-stack workspace focused on making monorepo structure, developer commands, and data-generation workflows coherent at project scale.',
    sections: [
      {
        eyebrow: 'Platform',
        title: 'One workspace, multiple engineering surfaces.',
        body:
          'Onboarded uses an Nx v22 monorepo to organize the Angular portal and supporting tooling behind one discoverable workspace model.',
      },
      {
        eyebrow: 'Developer experience',
        title: 'Make the right command obvious.',
        body:
          'The project standardizes scoped Nx syntax through justfile and Makefile workflows so contributors can operate the workspace without memorizing low-level command combinations.',
        bullets: [
          'Nx v22 monorepo',
          'Angular 20 portal',
          'Scoped Nx command conventions',
          'justfile / Makefile developer tooling',
          'datagen CLI for AI training-data generation',
        ],
      },
      {
        eyebrow: 'Architecture',
        title: 'Tooling is part of the platform contract.',
        body:
          'The preview frames build commands, workspace boundaries, and generation utilities as first-class architecture rather than incidental repository scripts.',
      },
    ],
    preview: {
      label: 'Workspace explorer',
      state: 'planned',
      message:
        'A lightweight monorepo topology and command explorer is planned for this route.',
    },
  },
  {
    id: 'eleanor',
    name: 'Eleanor',
    tagline: 'A new project, arriving shortly',
    color: '#22D3EE',
    status: 'coming-soon',
    description:
      'Eleanor is nearing release. This preview intentionally keeps the implementation under wraps while establishing a home for launch notes, architecture highlights, and an interactive demonstration.',
    tech: ['Preview', 'Coming Soon'],
    summary:
      'A restrained pre-release preview for Eleanor: enough structure to establish the project on the portfolio without inventing or prematurely exposing implementation details.',
    sections: [
      {
        eyebrow: 'Release',
        title: 'Eleanor is almost ready to be introduced.',
        body:
          'The v1 portfolio includes Eleanor as a deliberately minimal pre-release card. Product details, technical architecture, and implementation notes should be filled from the released project itself rather than guessed in advance.',
      },
      {
        eyebrow: 'Preview plan',
        title: 'This route is already shaped for the launch.',
        body:
          'When Eleanor ships, this page can graduate in place: the hero, engineering narrative, implementation highlights, screenshots, and live demo surface can be populated without changing the project-card or routing architecture.',
        bullets: [
          'Release overview',
          'Architecture highlights',
          'Representative implementation decisions',
          'Screenshots or interactive demo',
          'Links to the public project when available',
        ],
      },
      {
        eyebrow: 'Status',
        title: 'Coming soon.',
        body:
          'For version 1, the page acts as a polished teaser rather than presenting unsupported technical claims.',
      },
    ],
    preview: {
      label: 'Eleanor preview',
      state: 'coming-soon',
      message:
        'Launch preview reserved. Eleanor will be released shortly.',
    },
  },
];

export const PROJECT_CARDS: readonly ProjectPreview[] =
  PROJECT_PREVIEWS;

export function getProjectPreview(
  slug: string | null | undefined,
): ProjectPreviewDetail | undefined {
  if (!slug) return undefined;

  const normalized = slug.trim().toLowerCase();

  return PROJECT_PREVIEWS.find(
    project => project.id === normalized,
  );
}

export * from './site-defaults';