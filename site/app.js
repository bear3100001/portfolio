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
        ${p.link ? `<a class="p-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || "View the source"} ↗</a>` : ""}
      </div>`;
    if (p.draft) return head;

    const rows = [
      ["The problem", p.problem && `<p>${p.problem}</p>`],
      ["What I made", p.created && `<p>${p.created}</p>${steps(p.steps)}${p.note ? `<p class="note">${p.note}</p>` : ""}`],
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

  /* ── Folio: portfolio pages, rebuilt as native layouts, that stack as you scroll ──
     Each page is a sticky card. A card taller than the screen scrolls until its
     bottom is in view, then holds while the next card slides up over it. */
  const folioImg = (b) => {
    const cls = `pg-fig${b.hero ? " pg-fig--hero" : ""}${b.fill ? " pg-fig--fill" : ""}${b.narrow ? " pg-fig--narrow" : ""}`;
    const full = b.full ? `assets/folio/${b.full}` : b.vector ? `assets/folio/${b.img}.svg` : `assets/folio/${b.img}-l.jpg`;
    const zoom = b.full || b.vector ? ' data-zoom="vector"' : "";
    if (b.vector)
      return `<figure class="${cls}"><img src="assets/folio/${b.img}.svg" loading="lazy" decoding="async" alt="${b.alt}" data-full="${full}"${zoom}></figure>`;
    return `<figure class="${cls}"><picture>
      <source media="(min-width: 901px)" srcset="assets/folio/${b.img}-l.jpg">
      <img src="assets/folio/${b.img}-s.jpg" loading="lazy" decoding="async" alt="${b.alt}" data-full="${full}"${zoom}>
    </picture></figure>`;
  };

  function folioBlock(b) {
    if (b.row) return `<div class="pg-row" style="grid-template-columns:${b.row}">${b.blocks.map(folioBlock).join("")}</div>`;
    if (b.img) return folioImg(b);
    let html = "";
    if (b.title) html += `<h4 class="pg-title">${b.title}${b.sub ? `<span>${b.sub}</span>` : ""}</h4>`;
    if (b.lead) html += `<p class="pg-lead">${b.lead}</p>`;
    if (b.meta) html += `<p class="pg-meta">${b.meta.join("<br>")}</p>`;
    if (b.date) html += `<p class="pg-date">${b.date}</p>`;
    if (b.body) html += `<div class="pg-body${b.cols === 2 ? " pg-body--2" : ""}">${b.body.map((t) => `<p>${t}</p>`).join("")}</div>`;
    if (b.caption) html += `<p class="pg-caption">${b.caption}</p>`;
    if (b.legend) html += `<ol class="pg-legend">${b.legend.map((t) => `<li>${t}</li>`).join("")}</ol>`;
    return html;
  }

  function folioTemplate(p) {
    const n = projects.indexOf(p) + 1;
    const all = p.sections.flatMap((sec, si) => sec.pages.map((pg, pi) => ({ sec, si, pg, first: pi === 0 })));
    const index = p.sections
      .map((sec, i) => `<li><a href="#" data-sec="${i}"><span>${pad(i + 1)}</span>${sec.title}</a></li>`)
      .join("");
    const cards = all
      .map(({ sec, si, pg, first }) => `
        <i class="f-mark" data-sec="${si}"></i>
        <article class="sheet" data-sec="${si}">
          ${first ? `<header class="f-head"><span>${pad(si + 1)}</span><h3>${sec.title}</h3><p>${sec.subtitle || ""}</p></header>` : ""}
          ${pg.rows
            .map(
              (row) => `<div class="pg${row.spread ? " pg--spread" : ""}" style="--cols:${row.cols || "1fr"}; align-items:${row.align || "start"}">
                ${row.cells.map((cell) => `<div class="pg-col">${cell.map(folioBlock).join("")}</div>`).join("")}
              </div>`
            )
            .join("")}
          ${pg.caption || pg.date ? `<footer class="pg-foot"><span>${pg.caption || ""}</span><em>${pg.date || ""}</em></footer>` : ""}
        </article>`)
      .join("");

    // A slim bar replaces the side column, so the pages get the full width
    return `
      <div class="p-intro f-bar" ${stagger(0)}>
        <img class="emblem" src="${iconFor(p.id)}" alt="">
        <p class="p-index"><em>${pad(n)}</em> / ${total}</p>
        <h2 class="p-title">${p.title}</h2>
        <ol class="f-index">${index}</ol>
      </div>
      <div class="f-pages" ${stagger(1)}>${cards}</div>`;
  }

  let folioCleanup = () => {};
  function initFolio() {
    folioCleanup();
    const sheets = [...view.querySelectorAll(".sheet")];
    const links = [...view.querySelectorAll(".f-index a")];
    if (!sheets.length) return;

    // Screen height, and each card's resting offset (negative when it is taller than the screen)
    const stick = sheets.map(() => 0);
    const bar = view.querySelector(".f-bar");
    let barH = 0;
    const measure = () => {
      barH = getComputedStyle(bar).position === "sticky" ? bar.offsetHeight : 0;
      const h = view.clientHeight - barH;
      view.style.setProperty("--ph", `${h}px`);
      view.style.setProperty("--bar", `${barH}px`);
      sheets.forEach((s, i) => {
        stick[i] = Math.min(0, h - s.offsetHeight);
        s.style.setProperty("--stick", `${stick[i] + barH}px`);
      });
      onScroll();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(view);
    sheets.forEach((s) => ro.observe(s));

    // Eased depth: each covered page recedes in proportion to how far the next has risen
    const eased = sheets.map(() => 0);
    let raf = 0;
    const tick = () => {
      raf = 0;
      const top = view.getBoundingClientRect().top + barH;
      const h = view.clientHeight - barH;
      let settling = false;
      let currentSec = sheets[0].dataset.sec;
      sheets.forEach((s, i) => {
        const next = sheets[i + 1];
        // Fully covered once the next card's top reaches the top of the screen
        const rest = next ? next.getBoundingClientRect().top - top : h;
        const target = next ? Math.min(1, Math.max(0, 1 - rest / h)) : 0;
        eased[i] += (target - eased[i]) * (reduceMotion.matches ? 1 : 0.2);
        if (Math.abs(target - eased[i]) > 0.001) settling = true;
        else eased[i] = target;
        s.style.setProperty("--cover", eased[i].toFixed(4));
        if (s.getBoundingClientRect().top - top < h * 0.5) currentSec = s.dataset.sec;
      });
      links.forEach((a) => a.classList.toggle("is-current", a.dataset.sec === currentSec));
      if (settling) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => raf || (raf = requestAnimationFrame(tick));
    view.addEventListener("scroll", onScroll, { passive: true });
    measure();

    links.forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const mark = view.querySelector(`.f-mark[data-sec="${a.dataset.sec}"]`);
        const y = view.scrollTop + mark.getBoundingClientRect().top - view.getBoundingClientRect().top - barH;
        view.scrollTo({ top: y, behavior: reduceMotion.matches ? "auto" : "smooth" });
      })
    );

    folioCleanup = () => {
      ro.disconnect();
      view.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      view.style.removeProperty("--ph");
      view.style.removeProperty("--bar");
      folioCleanup = () => {};
    };
  }

  /* ── Lightbox: one page full-screen; click to zoom into detail ── */
  const lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `<img alt=""><button type="button" class="lightbox-close" aria-label="Close">×</button>`;
  body.append(lightbox);
  const lbImg = lightbox.querySelector("img");
  lightbox.addEventListener("click", (e) => {
    if (e.target === lbImg) return lightbox.classList.toggle("is-zoomed");
    lightbox.close();
  });
  lightbox.addEventListener("close", () => lightbox.classList.remove("is-zoomed"));
  view.addEventListener("click", (e) => {
    const img = e.target.closest("img[data-full]");
    if (!img) return;
    lbImg.src = img.dataset.full;
    lbImg.alt = img.alt;
    lightbox.classList.toggle("is-vector", img.dataset.zoom === "vector");
    lightbox.showModal();
  });

  const steps = (list) =>
    list?.length
      ? `<ol class="steps">${list.map(([name, text]) => `<li><b>${name}</b><span>${text}</span></li>`).join("")}</ol>`
      : "";

  function render(id) {
    current = id;
    body.dataset.view = id ? "project" : "home";

    if (id === "about") {
      folioCleanup();
      view.className = "project is-about";
      view.innerHTML = aboutTemplate();
      document.title = "About · Khushi Arora";
    } else if (id) {
      const p = byId(id);
      const folio = p.type === "folio";
      view.className = `project${p.draft ? " is-draft" : ""}${folio ? " is-folio" : ""}`;
      folioCleanup();
      view.innerHTML = folio ? folioTemplate(p) : template(p);
      view.scrollTop = 0;
      if (folio) initFolio();
      document.title = `${p.draft ? "Coming soon" : p.title} · Khushi Arora`;
    } else {
      folioCleanup();
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
    if (!current || lightbox.open || e.metaKey || e.ctrlKey || e.altKey) return;
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
