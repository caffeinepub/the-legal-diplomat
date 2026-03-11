# The Legal Diplomat

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full company website for The Legal Diplomat
- Lead capture popup on first visit: collects name, phone number, email
- Lead storage backend: admin can log in and view all submitted leads
- Hero section with logo and tagline
- About section describing the company focus: geopolitical analysis and international law
- YouTube channel section linking to https://youtube.com/@thelegaldiplomat
- Upcoming Courses section: "History of Indian Diplomacy" (Coming Soon)
- Contact section: phone +91 9334287787, WhatsApp link to same number
- Social links: Instagram (https://www.instagram.com/the_legal_diplomat), YouTube
- Admin panel (behind authorization) to view all leads in a table

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Select authorization component for admin lead access
2. Generate Motoko backend with:
   - submitLead(name, phone, email) -> async Result
   - getLeads() -> async [Lead] (admin only)
3. Frontend pages:
   - Public website (single page with sections: Hero, About, YouTube, Courses, Contact, Footer)
   - Lead capture popup shown once per session
   - Admin page at /admin showing leads table (requires login)
