/*
  About / CV content, shown at #/about (opened from the profile card).
*/
window.PROFILE = {
  title: "Khushi Arora",
  meta: "Architecture BSc, UCL",
  bio: [
    "I'm an Architecture BSc graduate from UCL, currently working across multidisciplinary projects at Populous. I combine creative thinking with a structured approach to delivery, whether coordinating design information, improving team processes or exploring how emerging technology can support better workflows.",
    "I enjoy turning complex processes into clear and practical systems that my team can use effectively. My approach is proactive and detail-focused, with an emphasis on accuracy and improvement in every task.",
  ],
  skills: ["Revit", "AutoCAD", "Rhino3D"],
  experience: [
    {
      dates: "09.2025 – Present",
      role: "Architectural Designer at Populous",
      text: "After independently creating ChatGPT workflows to solve operational problems in the delivery process, I was selected for a small internal cohort testing Claude within Revit. There I developed and adapted MCPs to optimise workflows and gave practical feedback to support wider company adoption. I also embedded Runway into the existing visualisation workflow, accelerating image generation and design iteration. Alongside this, I led the sanitaryware package for King Salman Stadium from RIBA Stage 2–4, coordinating requirements across disciplines into a technically resolved package.",
      tags: ["Revit", "ChatGPT Plugins", "Slay"],
    },
    {
      dates: "09.2024 – 06.2025",
      role: "Marketing for InterACT Festival",
      text: "I produced digital marketing material in Adobe Creative Suite to promote a large-scale inter-university performing arts festival, driving engagement across UCL and partner institutions. I also led the festival's visual branding and content creation, establishing a consistent design language across digital and physical touchpoints.",
      tags: ["Branding", "Making Art"],
    },
    {
      dates: "07.2024 – 09.2024",
      role: "Product Team Analyst at Ecolibrium",
      text: "I collaboratively built an Excel forecast from historical website traffic and enquiry rates to estimate future lead volumes, showing the product team where website improvements would have most impact. I also proposed an interactive 3D feature to communicate the core product to clients, and took it from concept to delivery as a detailed Rhino3D model of the Data Centre System.",
      tags: ["Forecasting", "Analysis", "Web Dev"],
    },
  ],
};

/*
  Project content.

  Each project is linked to a drawing in the hero sentence through `id`
  (see data-project="…" in index.html). To add a project, replace one of the
  drafts below: give it a title, remove `draft: true`, and fill in the fields.
  Every field except `id` and `title` is optional.
*/
window.PROJECTS = [
  {
    id: "schedule-assistant",
    title: "Schedule Assistant",
    meta: "ChatGPT Skill · Live · v1.0",
    summary:
      "An AI skill that turns a Finish Requirements workbook into a coded interior finishes schedule, matching every row against the live Product Index on SharePoint.",
    problem:
      "Finishes schedules are built by cross-referencing every requested finish against a product index by hand. On a stadium-scale project this is slow and repetitive, and one wrong code carries through the whole package.",
    created:
      "A ChatGPT skill backed by a two-stage Python engine. The model is used only for judgement, and every decision is validated by the script before anything is written.",
    steps: [
      ["Fetch", "Downloads the latest Product Index from SharePoint, read-only."],
      ["Inspect", "Validates the requirements template and shortlists candidates per row."],
      ["Decide", "The model rules MATCH, NO MATCH or INPUT ERROR using fixed filter and ranking rules."],
      ["Build", "Checks those decisions and writes a coded schedule with alternatives."],
    ],
    tools: ["ChatGPT Skills", "Python", "openpyxl", "SharePoint", "Excel"],
    outcome:
      "Live across ChatGPT, Codex, the API and Atlas. Covers five finish categories (FL, LIN, PLS, PT, TRM) and runs end to end on demo data from a stadium project.",
    link: "https://github.com/bear3100001/chatgpt-plugins/tree/main/schedule-assistant",
  },
  {
    id: "consultant-door-sync",
    title: "Consultant Door Sync",
    meta: "ChatGPT Skill · Beta · v0.1",
    summary:
      "An AI skill that overlays a consultant's door plan on the Revit door plan, matches each marker to the right door, and writes the data into an Ideate BIMLink export ready to import back into Revit.",
    problem:
      "On a stadium, the security consultant marks door requirements on their own drawings. Every marker then has to be read, matched to a door and typed into Revit parameters by hand.",
    created:
      "A ChatGPT skill with a computer-vision pipeline that reads both drawings, aligns them and maps the consultant's legend onto door parameters.",
    steps: [
      ["Overlay", "Aligns the two plans using labels both drawings share, such as grid bubbles and zone names."],
      ["Match", "Snaps each consultant marker to the nearest door tag and flags any that are ambiguous."],
      ["Legend", "Maps each marker type to door parameters, e.g. red → Security Level SL3."],
      ["Write back", "Fills only the mapped columns of a copy of the BIMLink export, highlighting rows to review."],
    ],
    tools: ["ChatGPT Skills", "Python", "OpenCV", "PyMuPDF", "ezdxf", "Ideate BIMLink", "Revit"],
    outcome:
      "The export keeps its IDs, headers and structure, so it imports straight back into Revit. Nothing is inferred: conflicts are flagged, never guessed. It works for fire, access and acoustic consultants too.",
    link: "https://github.com/bear3100001/chatgpt-plugins/tree/main/consultant-door-sync",
  },
  {
    id: "project-03",
    draft: true,
    title: "Work in progress",
    summary: "A design, technology or architecture project, being documented now.",
  },
  {
    id: "project-04",
    draft: true,
    title: "Work in progress",
    summary: "A design, technology or architecture project, being documented now.",
  },
];
