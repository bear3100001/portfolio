/*
  The homepage is the portfolio. Routing is just the URL hash:
    #                    → hero sentence
    #/schedule-assistant → that project
  so the browser's back button, deep links and refresh all work.
*/
(() => {
  const projects = window.PROJECTS;
  const profile = window.PROFILE;
  const body = document.body;
  const root = document.documentElement;
  const view = document.getElementById("project");
  const strip = document.getElementById("strip");
  const card = document.getElementById("profile");
  const profileGlyph = document.querySelector('[popovertarget="profile"]');
  const glyphs = [...document.querySelectorAll(".glyph[data-project]")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const byId = (id) => projects.find((p) => p.id === id);
  const isRoute = (id) => id === "about" || !!byId(id);
  const glyphFor = (id) => (id === "about" ? profileGlyph : glyphs.find((g) => g.dataset.project === id));
  const iconFor = (id) => document.querySelector(`.glyph[data-project="${id}"] img`).getAttribute("src");
  const pad = (n) => String(n).padStart(2, "0");
  const total = pad(projects.length);

  let current = null;

  /* ── Labels and project strip, derived from the data ── */
  projects.forEach((p, i) => {
    const glyph = glyphs.find((g) => g.dataset.project === p.id);
    if (glyph) {
      const label = p.draft ? "Coming soon" : `${pad(i + 1)}  ${p.title}`;
      glyph.dataset.label = label;
      glyph.setAttribute("aria-label", `Project ${i + 1}: ${p.draft ? "coming soon" : p.title}`);
      glyph.addEventListener("click", () => go(p.id));
    }

    const b = document.createElement("button");
    b.type = "button";
    b.dataset.project = p.id;
    b.setAttribute("aria-label", p.draft ? `Project ${i + 1}, coming soon` : p.title);
    b.innerHTML = `<img src="${iconFor(p.id)}" alt="">`;
    b.addEventListener("click", () => go(p.id));
    strip.append(b);
  });

  // The profile drawing leads the strip, so the CV is one click from any project
  const aboutBtn = document.createElement("button");
  aboutBtn.type = "button";
  aboutBtn.dataset.project = "about";
  aboutBtn.setAttribute("aria-label", "About and CV");
  aboutBtn.innerHTML = `<img src="${profileGlyph.querySelector("img").getAttribute("src")}" alt="">`;
  aboutBtn.addEventListener("click", () => go("about"));
  strip.prepend(aboutBtn);

  /* ── Rendering ── */
  const stagger = (i) => `style="--i:${i}"`;

  function template(p) {
    const n = projects.indexOf(p) + 1;
    const head = `
      <div class="p-intro" ${stagger(0)}>
        <img class="emblem" src="${iconFor(p.id)}" alt="">
        <p class="p-index"><em>${pad(n)}</em> / ${total}</p>
        <h2 class="p-title">${p.title}</h2>
        ${p.meta ? `<p class="p-meta">${p.meta}</p>` : ""}
        ${p.summary ? `<p class="p-summary">${p.summary}</p>` : ""}
        ${p.link ? `<a class="p-link" href="${p.link}" target="_blank" rel="noopener">View the source ↗</a>` : ""}
      </div>`;
    if (p.draft) return head;

    const rows = [
      ["The problem", p.problem && `<p>${p.problem}</p>`],
      ["What I made", p.created && `<p>${p.created}</p>${steps(p.steps)}`],
      ["Built with", p.tools && p.tools.join(" <i>.</i> ")],
      ["Outcome", p.outcome && `<p>${p.outcome}</p>`],
    ].filter(([, html]) => html);

    return `${head}
      <dl class="p-details">
        ${rows
          .map(([dt, dd], i) => `<div ${stagger(i + 1)}><dt>${dt}</dt><dd${dt === "Built with" ? ' class="tools"' : ""}>${dd}</dd></div>`)
          .join("")}
      </dl>`;
  }

  function aboutTemplate() {
    const dot = " <i>.</i> ";
    return `
      <div class="p-intro" ${stagger(0)}>
        <img class="emblem" src="${profileGlyph.querySelector("img").getAttribute("src")}" alt="">
        <p class="p-index"><em>About</em></p>
        <h2 class="p-title">${profile.title}</h2>
        <p class="p-meta">${profile.meta}</p>
        ${profile.bio.map((t) => `<p class="p-summary">${t}</p>`).join("")}
        <p class="p-skills">${profile.skills.join(dot)}</p>
      </div>
      <dl class="p-details cv">
        ${profile.experience
          .map(
            (x, i) => `<div ${stagger(i + 1)}>
              <dt>${x.dates}</dt>
              <dd><h3>${x.role}</h3><p>${x.text}</p><p class="tags">${x.tags.join(dot)}</p></dd>
            </div>`
          )
          .join("")}
      </dl>`;
  }

  const steps = (list) =>
    list?.length
      ? `<ol class="steps">${list.map(([name, text]) => `<li><b>${name}</b><span>${text}</span></li>`).join("")}</ol>`
      : "";

  function render(id) {
    current = id;
    body.dataset.view = id ? "project" : "home";

    if (id === "about") {
      view.className = "project is-about";
      view.innerHTML = aboutTemplate();
      document.title = "About · Khushi Arora";
    } else if (id) {
      const p = byId(id);
      view.className = `project${p.draft ? " is-draft" : ""}`;
      view.innerHTML = template(p);
      document.title = `${p.draft ? "Coming soon" : p.title} · Khushi Arora`;
    } else {
      view.innerHTML = "";
      document.title = "Khushi Arora";
    }

    strip.querySelectorAll("button").forEach((b) => b.setAttribute("aria-current", String(b.dataset.project === id)));
  }

  /* ── Navigation ── */
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    return isRoute(id) ? id : null;
  };

  function go(id) {
    const hash = id ? `#/${id}` : "#";
    if (location.hash !== hash && !(hash === "#" && !location.hash)) location.hash = hash;
    else transitionTo(id);
  }

  function transitionTo(id) {
    if (id === current) return;
    card.hidePopover?.();

    // Mark the drawing that travels: the one clicked on the way in, or the one we return to.
    const travelling = glyphFor(id ?? current);
    document.querySelectorAll(".glyph").forEach((g) => g.classList.toggle("is-active", g === travelling));

    const order = (x) => projects.findIndex((p) => p.id === x);
    root.dataset.dir = byId(id) && byId(current) ? (order(id) > order(current) ? "next" : "prev") : "";

    if (!document.startViewTransition || reduceMotion.matches) return render(id);
    const t = document.startViewTransition(() => render(id));
    // A rapid second click skips the running transition; the DOM is already correct.
    t.ready.catch(() => {});
    t.finished.catch(() => {});
  }

  addEventListener("hashchange", () => transitionTo(fromHash()));

  document.querySelector(".card-more").addEventListener("click", (e) => {
    e.preventDefault();
    go("about");
  });

  document.querySelectorAll('.logo, .back').forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      go(null);
    })
  );

  addEventListener("keydown", (e) => {
    if (!current || e.metaKey || e.ctrlKey || e.altKey) return;
    const i = projects.findIndex((p) => p.id === current);
    if (e.key === "Escape") go(null);
    if (i < 0) return;
    if (e.key === "ArrowRight") go(projects[(i + 1) % projects.length].id);
    if (e.key === "ArrowLeft") go(projects[(i - 1 + projects.length) % projects.length].id);
  });

  /* ── Profile card: native popover, positioned beside the drawing that opens it ── */
  card.addEventListener("beforetoggle", (e) => {
    const opening = e.newState === "open";
    profileGlyph.classList.toggle("is-open", opening);
    if (!opening) return;

    const r = profileGlyph.getBoundingClientRect();
    const w = Math.min(340, innerWidth - 32);
    const x = Math.min(Math.max(16, r.left + r.width * 0.55), innerWidth - w - 16);
    const y = r.bottom + 4;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    // Grow out of the drawing itself
    card.style.setProperty("--ox", `${r.left + r.width / 2 - x}px`);
    card.style.setProperty("--oy", `${r.top + r.height / 2 - y}px`);
  });

  render(fromHash());
})();
