# Form → ClickUp Data Mapping

## Form A — Strategy & Discovery Call Intake
Page: Form-A-Strategy-Intake.dc.html · Linked from Consulting + Media & Partnerships ("Let's Collaborate")
Target list: **The Nexus → Inbound & Lead Growth → Pipeline & Proposals** (`1000410000001074`)

| Form field | ClickUp destination |
|---|---|
| First & Last Name | Task name + custom field "Primary Contact Name" (`3f7ff1e3-a264-425c-9507-bc457903fc36`) |
| Email | Custom field "Email" (`da1210c9-33b4-419e-95a4-1bc1dd675b0a`) |
| Phone | Custom field "Phone" (`64f4c472-ff4f-4c9e-bf72-5fca238e7ba9`) |
| Organization / Company | Custom field "Company" (`120fc6e7-1229-45ef-836f-b3126c6ed92a`) |
| Project Type (fixed value) | Custom field "Project Type" (`8125f9c8-2dc8-490e-9280-bc861e286576`) → set to "Consulting & Strategy" |
| Structural/project needs | Task description |
| How are you showing up? / How did you find me? | Task description (no matching field yet — see below) |

**Gaps to add in ClickUp** (list currently has no field for these): a "Requester Type" dropdown (Nonprofit Leader / Small Business Owner / Political Org or Candidate / Other) and a "Lead Source" dropdown (Instagram / LinkedIn / Google / Referral / Podcast/Media / Speaking Event / Other). Until added, both answers land in the task description.

## Form B — Event Booking & Brand Collaboration Request
Page: Form-B-Booking-Request.dc.html · Linked from Consulting + Media & Partnerships ("Book Angel")
Target list: **Media Studio → Brand Operations → Bookings & Collaborations** (`1000410000001877`)

This list has no custom fields yet. Recommended fields to create (all values are captured by the form now and will sit in the task description until fields exist):

| Form field | Proposed ClickUp field | Type |
|---|---|---|
| First & Last Name | Task name + "Contact Name" | Text |
| Company / Brand Name | "Company" | Text |
| Position / Title | "Title" | Text |
| Business Address | "Address" | Text |
| Email / Phone | "Email" / "Phone" | Email / Phone |
| Event Name / Website | "Event Name" / "Event URL" | Text / URL |
| Event Location | "Event Location" | Text |
| Appearance Type | "Engagement Type" | Dropdown (Panelist, Panel Moderator, Keynote Address, Fireside Chat, Podcast/Media Guest, Brand Content Collaboration) |
| Event Date / Start / End | Task due date + "Start Time" / "End Time" | Date / Text |
| Talent Budget | "Talent Budget" | Currency |
| Other Speakers / Logistics | Task description | — |
| Supporting Document | Task attachment | File |
| Affirmation checkbox | "Equity Affirmation Signed" | Checkbox (mandatory) |

## Automation note
Both forms currently submit client-side (success state shown, matching the existing Work-With-Me pattern). Turning submissions into live ClickUp tasks needs a middle layer once this is on Netlify — Netlify Forms (or a Netlify Function) posting to a Zapier/Make/Pipedream automation that calls the ClickUp API with the field IDs above. Say the word once the two lists' fields are finalized and I'll wire the submit handlers to POST to that endpoint.
