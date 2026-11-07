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
      tags: ["Revit", "Rhino", "Runway"],
    },
    {
      dates: "09.2024 – 06.2025",
      role: "Marketing for InterACT Festival",
      text: "Managed multiple creative deliverables against competing deadlines and team requirements, while leading visual branding and content development across digital and physical touchpoints to ensure consistency with the overall event strategy. During the event, monitored and reported on live progress, coordinating with teams to flag issues, communicate updates and support the smooth delivery of the programme.",
      tags: ["Branding", "Project Management", "Design"],
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
      "Finishes schedules are built by manually cross-referencing every requested finish against supplier data sheets. On a stadium-scale project this is slow and repetitive, and one wrong code carries through the whole package.",
    created:
      "A ChatGPT skill backed by a two-stage Python engine. The model is used only for judgement, and every decision is validated by the script before anything is written.",
    steps: [
      ["Fetch", "Downloads the latest Product Index from SharePoint, read-only."],
      ["Inspect", "Validates the requirements template and shortlists candidates per row."],
      ["Decide", "The model rules MATCH, NO MATCH or INPUT ERROR using fixed filter and ranking rules."],
      ["Build", "Checks those decisions and writes a coded schedule with alternatives."],
    ],
    note: "Available in two versions: one for ChatGPT on the web, and one that runs inside ChatGPT for Excel, building the schedule directly in your workbook.",
    tools: ["ChatGPT Skills", "Python", "openpyxl", "SharePoint", "Excel"],
    outcome:
      "Live across ChatGPT, Codex, the API and Atlas. Covers five finish categories (FL, LIN, PLS, PT, TRM) and runs end to end on demo data from a stadium project.",
    link: "https://github.com/bear3100001/chatgpt-plugins/tree/main/schedule-assistant",
    linkLabel: "Download skill",
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
      ["Overlay", "Lines the consultant's plan up with the Revit plan."],
      ["Match", "Links each consultant symbol to the nearest door."],
      ["Legend", "Translates each symbol into door data."],
      ["Output", "Fills in the BIMLink export, ready to import into Revit, with unclear doors highlighted."],
    ],
    tools: ["ChatGPT Skills", "Python", "Ideate BIMLink", "Revit"],
    outcome:
      "The export keeps its IDs, headers and structure, so it imports straight back into Revit. Nothing is inferred: conflicts are flagged, never guessed. It works for fire, access and acoustic consultants too.",
    link: "https://github.com/bear3100001/chatgpt-plugins/tree/main/consultant-door-sync",
    linkLabel: "Download skill",
  },
  {
    /*
      A folio project: portfolio pages rebuilt as native layouts.
      A page is a list of rows. Each row has `cols` (a CSS grid template, desktop only),
      `align` (start | center | end | stretch), `spread` (push a cell's blocks to its top and bottom)
      and `cells`, each cell a list of blocks:
        { img, alt, full?, vector?, hero?, fill?, narrow? }  image from assets/folio (<img>-l.jpg / -s.jpg);
                                     full = file shown in the full-screen view (e.g. an .svg);
                                     vector = show this .svg inline; hero = large, screen-height image;
                                     fill = image fills its cell's height; narrow = centred at a reading width
        { title, sub }      heading           { lead }        introductory paragraph
        { meta: [] }        small italic lines { date }        date line
        { body: [], cols? } paragraphs (cols: 2 sets them in two columns on desktop)
        { caption }         italic caption    { legend: [] }  numbered key
      On phones every row becomes one column, read top to bottom.
      A section's first page also shows the section heading.
    */
    id: "selected-works",
    type: "folio",
    title: "Selected Works",
    meta: "Architecture · 2022 – Present",
    sections: [
      {
        title: "Populous",
        subtitle: "King Salman Stadium · RIBA Stage 2–4",
        pages: [
          {
            rows: [{ cells: [[{ img: "pop-lounge", alt: "King Salman Stadium Royal Lounge, evening and daytime renders", hero: true }]] }],
            caption: "King Salman Stadium: Royal Lounge",
            date: "September – Present",
          },
          {
            rows: [
              {
                cols: "0.75fr 1fr",
                align: "stretch",
                spread: true,
                cells: [
                  [{ img: "pop-changing-room", alt: "King Salman Stadium Players' Changing Room render" }],
                  [
                    {
                      row: "1.5fr 1fr",
                      blocks: [
                        { img: "pop-locker-drawings", full: "pop-locker-drawings.svg", alt: "Locker elevation and section details, 1:10" },
                        { img: "pop-locker-axo", vector: true, alt: "Axonometric of the locker cubicle" },
                      ],
                    },
                    { body: ["The traditional locker design was adapted to subtly accommodate the required storage space for players while maintaining a clean and functional appearance. The design was also influenced by the project theme, taking inspiration from the concept of roots growing through soil. This idea was translated into the form and detailing of the locker, creating a connection between the overall theme and the user experience.", "The locker cubicle was developed in Revit through the creation of a detailed 3D model, allowing the design elements and spatial requirements to be accurately coordinated. The main locker structure was modelled using parametric families and assigned material properties, enabling components to be adjusted efficiently while maintaining design consistency. The internal storage requirements were integrated into the overall form of the cubicle rather than appearing as separate additions. The root-inspired elements were developed through the modelling of custom parametric families, using organic branching forms to create a visual connection between the locker structure and the project theme of natural growth and grounding."], cols: 2 },
                  ],
                ],
              },
            ],
            caption: "King Salman Stadium: Players' Changing Room",
            date: "September – Present",
          },
        ],
      },
      {
        title: "Maison Vestige",
        subtitle: "A Museum of Constructed Belonging · Year 3, UG03",
        pages: [
          {
            rows: [{ cells: [[{ img: "mv-interior", alt: "Maison Vestige interior render", hero: true }]] }],
            caption: "Third Year Building Project",
            date: "Jan 2025 – Ongoing",
          },
          {
            rows: [
              {
                cols: "1fr 1fr",
                align: "end",
                cells: [
                  [{ title: "Maison Vestige:", sub: "A Museum of Constructed Belonging" }],
                  [
                    { lead: "The project centres around the strained and complex relationship between immigrant workers and the French state, focusing on those whose contributions remain undocumented yet essential to the ongoing construction of Paris." },
                    { meta: ["Year 3 Architecture BSc", "UG03 / Daniel Dream & Ifigenia Liangi", "Building Project (Rhino 3D / Adobe Suite / Blender)"] },
                    { date: "Sep 2024 – Dec 2024" },
                  ],
                ],
              },
              { cells: [[{ img: "mv-street", alt: "Maison Vestige at night, street view", hero: true }]] },
              { cells: [[{ body: ["The design aims to create a space that honours the knowledge, labour, and lived experiences of these communities. Drawing directly from their methods of building, inhabiting, and navigating the city. It is shaped by an understanding that their presence is not peripheral but foundational, and that the city itself carries the imprint of their hands. Through architecture, the project seeks to acknowledge this presence and to give form to a history that has often gone unrecorded, proposing a site where visibility, memory, and participation converge in the built environment."], cols: 2 }]] },
            ],
          },
          {
            rows: [
              {
                cols: "1fr minmax(220px, 17rem)",
                align: "center",
                cells: [
                  [{ img: "mv-section", alt: "Maison Vestige key section" }],
                  [{ caption: "Key Section" }, { legend: [
                    "Building entrance", "Lift", "Entrance to courtyard", "Still life exhibition (courtyard)", "Garden",
                    "Secondary drawing room", "Drawing room and lifts", "Entrance to first floor", "Garden", "Resident study",
                    "Still life exhibition space (3)", "Still life exhibition space con.", "Observatory gallery", "Passage space next to lift", "Observatory space",
                  ] }],
                ],
              },
            ],
            date: "Jan 2025 – Ongoing",
          },
          {
            rows: [
              {
                cols: "1fr 1fr",
                align: "end",
                cells: [
                  [{ title: "Technical Investigation into Vernacular Construction" }],
                  [{ body: ["The building is constructed using materials salvaged from the restoration and maintenance of Paris' iconic landmarks. The Eiffel Tower has long stood as a symbol of French identity, while the recent and swift restoration of the Notre Dame Cathedral embodies the deep cultural value invested in preserving the city's architectural heritage. These monuments are routinely maintained through processes that generate significant amounts of waste material. Though some fragments are retained for study or exhibition, most are discarded."] }],
                ],
              },
              {
                cols: "1fr 1fr",
                align: "center",
                cells: [
                  [{ img: "tiv-collages", alt: "Collage studies of salvaged roof structures" }],
                  [{ img: "tiv-sketches", alt: "Sketchbook studies: figurative pattern and joinery at human scale" }],
                ],
              },
              {
                cols: "1fr 1fr",
                align: "center",
                cells: [
                  [{ img: "tiv-roof-detail", alt: "Roof joinery detail drawing" }],
                  [{ body: ["This project reclaims those discarded materials and assembles them in a different cultural vernacular. By incorporating fragments of these national symbols into a space that celebrates the histories of immigrant communities, the project challenges the hierarchies embedded within practices of preservation and authorship. It proposes a new architectural vernacular—one shaped by resourcefulness, memory, and belonging—where the act of reclamation becomes both a practical construction method and a symbolic gesture of resistance. Given the monumental scale of these structures, even the waste produced through their upkeep far exceeds what is required to realise this building. In doing so, the project transforms remnants of Paris' architectural legacy into carriers of overlooked histories, assembling them within a space that acknowledges those whose labour sustains the city yet whose stories remain largely unrecorded."] }, { lead: "The focus of my thesis was <b>how materials that hold significant historical and cultural value can be reclaimed and reassembled within a new architectural vernacular, examining how this process reframes narratives of authorship, belonging, and identity.</b>" }],
                ],
              },
              { cells: [[{ img: "tiv-joinery-models", alt: "Speculative joinery model", narrow: true }, { caption: "Speculative joinery model" }]] },
            ],
            date: "Jan 2025 – Ongoing",
          },
          {
            rows: [{ cells: [[{ img: "mv-entrance", alt: "Entrance to the building at night", hero: true }]] }],
            caption: "Entrance to the building at night",
            date: "Jan 2025 – Ongoing",
          },
        ],
      },
      {
        title: "Light After Dark",
        subtitle: "Reimagining the City · Year 3, UG03",
        pages: [
          {
            rows: [
              {
                cols: "minmax(0, 34em) 1fr",
                align: "stretch",
                cells: [
                  [
                    { meta: ["Year 3 Architecture BSc", "UG03 / Daniel Dream & Ifigenia Liangi", "Design Project (Rhino 3D / Adobe Suite / Blender / AutoCAD)"] },
                    { date: "Sep 2024 – Dec 2024" },
                    { body: ["This project explores the significance of Diwali, also known as the festival of lights, which is traditionally celebrated after sunset. Diwali symbolises the victory of light over darkness, and the evening prayers emphasise the sacred nature of the night. The concept for this project was inspired by <i>“Architecture in the Dark”</i> by Jonathan Hill, where he challenges the common association of night with fear, suggesting instead that it can be a time for contemplation and sanctity. This idea aligns with the spirit of Diwali, where the night becomes a space for reflection and celebration. Through this project, the route from Trafalgar Square to Embankment is reimagined for the occasion, merging Indian and British cultures as a reflection of my identity through the synchronisation of two architectural languages.", "Along this route, an existing water gate by the bank of the Thames becomes a focal point for the project. Water gates are also a prevalent feature in Varanasi, the holy city of India, where they serve as both spiritual thresholds and points of arrival and departure along the Ganges. Reimagined for this context, the York watergate marks the symbolic conclusion of the Diwali procession and serves as a critical architectural gesture that anchors the project. Its redesign draws influence from traditional Indian architecture, referencing intricate structures like the Mahabat Maqbara Palace. Through the layering of form, ornament and material the structure becomes both physically and symbolically rich as the complexity reflects its significance. The iterative design process involved gradually introducing levels of articulation which echoes the craftmanship in traditional South Asian architecture. The gate celebrates complexity, identity and a cultural convergence in a space that bridges two histories."] },
                  ],
                  [{ img: "lad-render", alt: "The York watergate at night", fill: true }],
                ],
              },
              { cells: [[{ img: "lad-drawings", alt: "Exploded drawings of the stair and the watergate's ornament", narrow: true }]] },
            ],
            date: "September – December 2024",
          },
        ],
      },
    ],
  },
  {
    id: "project-04",
    draft: true,
    title: "Work in progress",
    summary: "A design, technology or architecture project, being documented now.",
  },
];
