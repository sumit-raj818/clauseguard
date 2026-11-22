import { SampleContract } from "./types";

export const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: "freelance-sow",
    title: "Freelance Software Master Agreement (Predatory Terms)",
    category: "Contractor Agreement",
    description: "Contains uncapped indemnification, full forfeiture of background IP, Net-90 delayed payout, and global non-compete.",
    text: `MASTER SERVICES AGREEMENT & STATEMENT OF WORK (SOW-2024-88)

BETWEEN: Apex Global Enterprises Inc. ("Client") 
AND: John Doe / Developer ("Contractor")

1. SCOPE OF SERVICES & OWNERSHIP OF INTELLECTUAL PROPERTY
1.1 Work Product: Contractor agrees that all code, scripts, architectures, libraries, algorithms, documentation, and inventions conceived, authored, or reduced to practice by Contractor during the term of this Agreement, whether created on or off Client premises, and whether created during working hours or during Contractor's personal time, shall be considered a "work made for hire" and shall solely and exclusively belong to Client in perpetuity worldwide.
1.2 Background IP Forfeiture: To the extent Contractor incorporates any pre-existing software libraries, developer tools, boilerplates, or personal proprietary code into the Deliverables, Contractor hereby irrevocably assigns all right, title, and interest in such Background IP to Client without additional consideration.

2. COMPENSATION & PAYMENT TERMS
2.1 Invoicing: Invoices shall be submitted monthly upon completion of milestones. Client shall have ninety (90) business days from milestone receipt to inspect and approve deliverables ("Net-90").
2.2 Discretionary Withholding: Client reserves the unilateral right to withhold up to 50% of any milestone payment indefinitely if Client, in its sole subjective determination, deems any deliverable unsatisfactory.

3. INDEMNIFICATION & LIMITATION OF LIABILITY
3.1 Uncapped Contractor Indemnity: Contractor shall defend, indemnify, and hold harmless Client, its officers, directors, affiliates, and customers from and against any and all claims, damages, liabilities, costs, losses, and legal expenses (including full attorney fees) arising from any bug, system downtime, third-party claim, security breach, or alleged infringement related to any software delivered by Contractor. Contractor's liability under this section shall be UNLIMITED.
3.2 Client Limitation of Liability: In no event shall Client's aggregate liability arising out of or related to this Agreement exceed the sum of $100 (one hundred US dollars), regardless of whether Client was advised of the possibility of damages.

4. TERMINATION & NON-COMPETE
4.1 Termination: Client may terminate this Agreement immediately at any time without cause and without prior written notice. In the event of early termination, Client shall have no obligation to pay Contractor for work completed prior to termination unless accepted in writing.
4.2 Restrictive Covenant (Non-Compete): For a period of twenty-four (24) months following termination of this Agreement, Contractor shall not directly or indirectly provide software engineering, design, or consulting services to any entity worldwide that operates in any business sector that competes directly or indirectly with Client.

5. GOVERNING LAW & ARBITRATION
5.1 Jurisdiction: This Agreement shall be governed by the laws of the Cayman Islands. Any dispute shall be resolved through confidential binding individual arbitration in Grand Cayman, Cayman Islands. Contractor irrevocably waives any right to jury trial or to participate in class actions. Contractor shall bear all travel, arbitration, and legal filing fees.`
  },
  {
    id: "saas-subscription",
    title: "B2B SaaS Enterprise Agreement (Auto-Renewal Trap)",
    category: "SaaS Agreement",
    description: "Features a 120-day notice window auto-renewal trap, unilateral price increases, and customer data ownership claims.",
    text: `ENTERPRISE CLOUD SOFTWARE AS A SERVICE (SaaS) AGREEMENT

BETWEEN: CloudCore Systems LLC ("Vendor")
AND: Customer Enterprise ("Subscriber")

1. SUBSCRIPTION TERM & AUTOMATIC RENEWAL TRAP
1.1 Initial Term: The initial subscription period shall be thirty-six (36) months from the Effective Date.
1.2 Automatic Evergreen Renewal: This Agreement shall automatically renew for successive thirty-six (36) month terms unless Subscriber provides written notice of cancellation by certified registered mail delivered no earlier than one hundred and eighty (180) days and no later than one hundred and twenty (120) days prior to the expiration of the current term. Failure to deliver notice within this precise 60-day window shall automatically bind Subscriber to the full subsequent 36-month commitment.
1.3 Early Cancellation Penalty: Should Subscriber terminate prior to term completion, Subscriber shall immediately pay Vendor liquidated damages equal to 100% of all fees that would have become payable for the remainder of the term.

2. PRICING & MODIFICATION OF FEES
2.1 Unilateral Price Adjustments: Vendor reserves the right to increase subscription fees at any time during the term upon thirty (30) days electronic notice. Continued use of the platform after thirty days constitutes irrevocable acceptance of the modified fee structure. Subscriber may not terminate this Agreement due to fee increases.

3. CUSTOMER DATA & DERIVATIVE RIGHTS
3.1 License to Subscriber Data: Subscriber grants Vendor a perpetual, irrevocable, worldwide, royalty-free, transferable license to ingest, modify, train proprietary artificial intelligence models on, commercialize, and create derivative works from all data, customer files, confidential communications, and metrics uploaded to the Service.

4. WARRANTIES & SERVICE LEVEL DISCLAIMER
4.1 "AS-IS" Disclaimer: The service is provided "AS-IS" and "AS-AVAILABLE". Vendor does not warrant that the Service will be uninterrupted, error-free, or secure. Vendor disclaims all uptime commitments, and uptime SLA credits shall be Subscriber's sole and exclusive remedy, capped at a maximum value of $50 per calendar quarter.`
  },
  {
    id: "employment-agreement",
    title: "Tech Startup Employment & IP Assignment Agreement",
    category: "Employment",
    description: "Contains total employee IP assignment (even weekend side projects), broad non-solicitation, and mandatory wage forfeiture.",
    text: `CONFIDENTIAL INFORMATION AND INVENTIONS ASSIGNMENT AGREEMENT (CIIAA)

BETWEEN: NovaTech Innovations Inc. ("Company")
AND: Employee ("Employee")

1. INVENTIONS ASSIGNMENT & MOONLIGHTING
1.1 Assignment of Inventions: Employee hereby assigns and agrees to assign to Company all right, title, and interest in and to any and all inventions, discoveries, designs, computer programs, algorithms, patent applications, and original works of authorship developed, conceived, or reduced to practice by Employee solely or jointly with others during the period of Employee's employment, whether or not conceived during working hours, and whether or not using Company equipment or facilities.
1.2 Presumption: Any technical project, software repository, mobile application, or SaaS product launched by Employee during the tenure of employment, or within twelve (12) months following termination of employment, shall be presumed to be the exclusive property of Company.

2. NON-COMPETE & NON-SOLICITATION
2.1 Non-Competition: During employment and for a period of twelve (12) months thereafter, Employee shall not directly or indirectly engage in, perform services for, invest in, or advise any enterprise engaged in technology development within North America.
2.2 Non-Solicitation: For twenty-four (24) months post-termination, Employee shall not directly or indirectly solicit, recruit, or attempt to hire any employee, contractor, or customer of Company.

3. COMPENSATION RECOVERY & OFFSET
3.1 Unilateral Deduction: Company reserves the right to deduct from Employee's final salary, accrued bonuses, and paid time off (PTO) balance any amounts Company determines are owed for property damage, alleged software flaws, or legal costs incurred in enforcing this Agreement.`
  },
  {
    id: "commercial-lease",
    title: "Commercial Retail/Office Lease Agreement",
    category: "Real Estate",
    description: "Features triple-net hidden pass-throughs, continuous occupancy penalties, and 300% holdover rent charges.",
    text: `COMMERCIAL PROPERTY LEASE AGREEMENT

BETWEEN: Metro Commercial Realty Holdings LLC ("Landlord")
AND: Commercial Tenant LLC ("Tenant")

1. TRIPLE NET (NNN) OPERATING EXPENSES PASS-THROUGH
1.1 Uncapped Operating Costs: In addition to Base Monthly Rent, Tenant shall pay its Proportionate Share of all Operating Costs. Operating Costs shall include all structural repairs, roof replacements, Landlord legal expenses, capital improvements, administrative overhead fees of 20%, and any municipal assessments. Landlord shall have no obligation to provide itemized receipts or audit rights to Tenant.

2. CONTINUOUS OPERATION & VACANCY DEFAULT
2.1 Continuous Occupancy: Tenant shall operate its business during all standard commercial hours. If Tenant closes the premises for more than forty-eight (48) consecutive hours for any reason (including remodeling or staff shortages), Tenant shall be in material default, and Landlord may immediately re-enter and seize all Tenant personal property, equipment, and inventory located on site.

3. HOLDOVER RENT PENALTY
3.1 Liquidated Holdover: If Tenant remains in possession of the leased premises after lease expiration without an executed renewal, Tenant shall pay holdover rent equal to three hundred percent (300%) of the final monthly rent rate, plus all consequential damages incurred by Landlord.`
  }
];
