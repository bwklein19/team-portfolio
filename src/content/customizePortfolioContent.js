import { agencyContent } from "./agencyContent";

const serviceVisuals = [
  {
    icon: "/assets/pages/services/web-design.cQGRRqbg_CqwHi.svg",
    illustration: "/assets/pages/services/web-design-service.DgN4onuL_3qvEJ.svg",
  },
  {
    icon: "/assets/pages/services/web-design.cQGRRqbg_CqwHi.svg",
    illustration: "/assets/pages/services/uiux-design.CjuFnkxH_3qvEJ.svg",
  },
  {
    icon: "/assets/pages/services/web-design.cQGRRqbg_CqwHi.svg",
    illustration: "/assets/pages/services/copy.DxyvgJ5Z_3qvEJ.svg",
  },
  {
    icon: "/assets/pages/services/web-design.cQGRRqbg_CqwHi.svg",
    illustration: "/assets/pages/services/project-management.C_-_IRhx_3qvEJ.svg",
  },
  {
    icon: "/assets/pages/services/web-design.cQGRRqbg_CqwHi.svg",
    illustration: "/assets/pages/services/seo.DtRmB8u__3qvEJ.svg",
  },
  {
    icon: "/assets/pages/services/web-design.cQGRRqbg_CqwHi.svg",
    illustration: "/assets/pages/services/marketing.NpZIJsDK_3qvEJ.svg",
  },
];

const featureHighlights = [
  ...agencyContent.hero.proofPoints,
  agencyContent.capabilityNotes.items[1],
];
const blogPosts = agencyContent.blog?.posts || [];
const blogPostsById = new Map(blogPosts.map((post) => [post.id, post]));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function matchesPattern(value, pattern) {
  if (pattern instanceof RegExp) {
    return pattern.test(value);
  }

  return value.includes(normalizeText(pattern));
}

function setText(element, text) {
  if (element) {
    element.textContent = text;
  }
}

function setImage(element, src, alt) {
  if (!element) {
    return;
  }

  element.setAttribute("src", src);
  element.setAttribute("alt", alt);
}

function setSplitHeading(element, primary, secondary, { useBreak = true } = {}) {
  if (!element) {
    return;
  }

  element.innerHTML = `${primary ? `<strong>${escapeHtml(primary)}</strong>` : ""}${primary && secondary ? useBreak ? "<br>" : " " : ""}${
    secondary ? `<em>${escapeHtml(secondary)}</em>` : ""
  }`;
}

function setBadgeText(scope, text) {
  const badge = scope.querySelector(".badge");
  if (!badge) {
    return;
  }

  const animatedTarget = badge.querySelector(".animate-letters");
  if (animatedTarget) {
    animatedTarget.style.opacity = "1";
    animatedTarget.textContent = text;
    return;
  }

  const slot = badge.querySelector("astro-slot");
  if (slot) {
    setText(slot, text);
    return;
  }

  const directSpans = Array.from(badge.children).filter((child) => child.tagName === "SPAN");
  const target = directSpans[directSpans.length - 1] || badge.querySelector("span") || badge;
  setText(target, text);
}

function setLinkTextPreserveChildren(link, text) {
  if (!link) {
    return;
  }

  Array.from(link.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.remove();
    }
  });

  link.insertBefore(link.ownerDocument.createTextNode(` ${text} `), link.firstElementChild || null);
}

function setInlineIconText(element, text) {
  if (!element) {
    return;
  }

  const icon = element.querySelector("svg");
  element.innerHTML = `${icon ? icon.outerHTML : ""} ${escapeHtml(text)}`;
}

function disableLink(link) {
  if (!link) {
    return;
  }

  link.removeAttribute("href");
  link.removeAttribute("title");
  link.removeAttribute("aria-label");
  link.setAttribute("aria-disabled", "true");
}

function isExternalUrl(value) {
  return /^(https?:|mailto:|tel:)/i.test(String(value || ""));
}

function buildTeamCardAction(label, href) {
  if (!href) {
    return "";
  }

  const external = isExternalUrl(href);
  return `
    <a
      href="${escapeHtml(href)}"
      ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}
      style="display:inline-flex;align-items:center;justify-content:center;padding:0.55rem 0.9rem;border-radius:9999px;border:1px solid rgba(255,255,255,0.18);background:rgba(8,8,8,0.38);backdrop-filter:blur(10px);font-size:0.875rem;line-height:1;font-weight:500;color:rgba(255,255,255,0.92);text-decoration:none;"
    >
      ${escapeHtml(label)}
    </a>
  `;
}

function buildTeamCardActions(member) {
  const actions = [
    buildTeamCardAction("Portfolio", member.portfolioUrl),
    buildTeamCardAction("GitHub", member.githubUrl),
    buildTeamCardAction("Resume", member.resumeUrl),
  ].filter(Boolean);

  if (!actions.length) {
    return "";
  }

  return `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:1rem;">
      ${actions.join("")}
    </div>
  `;
}

function splitAuthor(author) {
  const [name, ...rest] = author.split(",");

  return {
    name: name.trim(),
    detail: rest.join(",").trim(),
  };
}

function getBlogPostById(id) {
  return blogPostsById.get(id) || null;
}

function buildBlogArticleMarkup(post) {
  const sectionMarkup = post.sections
    .map((section) => {
      const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
      const bullets = (section.bullets || []).length
        ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";

      return `
        <h2>${escapeHtml(section.heading)}</h2>
        ${paragraphs}
        ${bullets}
      `;
    })
    .join("");

  const closingMarkup = (post.closing || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

  return `
    <p>${escapeHtml(post.intro)}</p>
    ${sectionMarkup}
    ${closingMarkup}
  `;
}

function updateBlogSimpleCard(card, post) {
  if (!card || !post) {
    return;
  }

  const image = card.querySelector("img");
  const title = card.querySelector("h3");
  const summary = card.querySelector("p");
  const link = card.querySelector("a");

  setImage(image, post.cardImage, post.title);
  setText(title, post.title);
  setText(summary, post.summary);

  if (link) {
    link.setAttribute("href", post.href);
    link.setAttribute("aria-label", `Read more about ${post.title}`);
    link.setAttribute("title", `Read more about ${post.title}`);
  }
}

function updateBlogFeatureCards(section, posts) {
  if (!section) {
    return;
  }

  const cards = Array.from(section.querySelectorAll(".card.gradient-border.grid"));

  cards.slice(0, posts.length).forEach((card, index) => {
    const post = posts[index];
    const image = card.querySelector("img");
    const metaSpans = card.querySelectorAll(".text-sm span");
    const title = card.querySelector("h3");
    const summary = card.querySelector("p");
    const link = card.querySelector("a");

    setImage(image, post.cardImage, post.title);
    setText(metaSpans[0], post.date);
    setText(metaSpans[1], post.category);
    setText(title, post.title);
    setText(summary, post.summary);

    if (link) {
      link.setAttribute("href", post.href);
      link.setAttribute("aria-label", `Read more about ${post.title}`);
      link.setAttribute("title", `Read more about ${post.title}`);
    }
  });
}

function updateBlogLatestCards(section, posts) {
  if (!section) {
    return;
  }

  const cards = Array.from(section.querySelectorAll(".row > div.mb-14 .card.gradient-border.bg-secondary\\/50"));

  cards.slice(0, posts.length).forEach((card, index) => {
    updateBlogSimpleCard(card, posts[index]);
  });
}

function updateRelatedPostsSection(section, post) {
  if (!section || !post?.relatedIds?.length) {
    return;
  }

  const grid = section.querySelector(".grid.md\\:grid-cols-3.gap-6");
  const templateCard = grid?.querySelector(".card.gradient-border.bg-secondary\\/50");
  if (!grid || !templateCard) {
    return;
  }

  const relatedPosts = post.relatedIds.map((id) => getBlogPostById(id)).filter(Boolean);
  if (!relatedPosts.length) {
    return;
  }

  grid.innerHTML = "";
  relatedPosts.forEach((relatedPost) => {
    const card = templateCard.cloneNode(true);
    updateBlogSimpleCard(card, relatedPost);
    grid.appendChild(card);
  });
}

function updateBlogPostHero(section, post) {
  if (!section || !post) {
    return;
  }

  setText(section.querySelector("h1, h2"), post.title);

  const metaItems = section.querySelectorAll("ul li");
  setInlineIconText(metaItems[0], post.date);
  setInlineIconText(metaItems[1], post.readTime);

  setImage(section.querySelector("img"), post.heroImage, post.title);
}

function updateBlogPostBody(section, post) {
  const content = section?.querySelector(".content");
  if (!content || !post) {
    return;
  }

  content.innerHTML = buildBlogArticleMarkup(post);
}

function isActiveNav(href, pageId) {
  if (href === "/") {
    return pageId === "home";
  }

  if (href === "/services") {
    return pageId === "services" || pageId === "service-copy-writer";
  }

  if (href === "/works") {
    return pageId === "works";
  }

  if (href === "/blog") {
    return pageId === "blog" || pageId.startsWith("blog-post-");
  }

  if (href === "/teams") {
    return pageId === "teams";
  }

  if (href === "/about") {
    return pageId === "about";
  }

  if (href === "/contact") {
    return pageId === "contact";
  }

  return false;
}

function buildHeaderNav(pageId) {
  const items = agencyContent.navigation
    .map(({ label, href }) => {
      const stateClass = isActiveNav(href, pageId) ? "active" : "false";
      return `<li class="nav-item"><a href="${href}" class="nav-link block ${stateClass}">${escapeHtml(label)}</a></li>`;
    })
    .join("");

  return `${items}<li class="mt-4 inline-block lg:hidden"><a class="btn btn-primary btn-sm" href="/contact">Start a brief</a></li>`;
}

function buildFooterLinks(items) {
  return items
    .map(({ label, href }) => `<li class="mb-4"><a href="${href}" class="text-text-light hover:text-white">${escapeHtml(label)}</a></li>`)
    .join("");
}

function buildFooterSupport() {
  return agencyContent.services
    .slice(0, 5)
    .map(
      (service) =>
        `<li class="mb-4"><a href="/services" class="text-text-light hover:text-white">${escapeHtml(service.title)}</a></li>`,
    )
    .join("");
}

function updateHeader(root, pageId) {
  const navMenu = root.querySelector("#nav-menu");
  if (navMenu) {
    navMenu.innerHTML = buildHeaderNav(pageId);
  }

  root.querySelectorAll("header .navbar-brand").forEach((brandLink) => {
    brandLink.style.display = "inline-flex";
    brandLink.style.alignItems = "flex-end";
    brandLink.style.paddingBottom = "0.125rem";
  });

  root.querySelectorAll('header .navbar-brand img').forEach((image) => {
    image.setAttribute("src", agencyContent.brand.logo);
    image.setAttribute("alt", agencyContent.brand.name);
    image.style.height = "42px";
    image.style.width = "auto";
    image.style.maxWidth = "100%";
    image.style.objectFit = "contain";
  });

  root
    .querySelectorAll('header a.btn[href*="themefisher.com/products/neonspark-astro"], header a.btn[href*="themefisher.com"]')
    .forEach((button) => {
      button.setAttribute("href", "/contact");
      setText(button, "Start a brief");
    });
}

function updateFooter(root) {
  root.querySelectorAll("footer .navbar-brand").forEach((brandLink) => {
    brandLink.style.display = "inline-flex";
    brandLink.style.alignItems = "flex-end";
    brandLink.style.paddingBottom = "0.75rem";
  });

  root.querySelectorAll("footer .navbar-brand img").forEach((image) => {
    image.setAttribute("src", agencyContent.brand.logo);
    image.setAttribute("alt", agencyContent.brand.name);
    image.style.height = "52px";
    image.style.width = "auto";
    image.style.maxWidth = "100%";
    image.style.objectFit = "contain";
  });

  const footer = root.querySelector("footer");
  if (!footer) {
    return;
  }

  footer.querySelectorAll(".social-icons").forEach((node) => node.remove());

  const footerColumns = footer.querySelectorAll(".grid.sm\\:grid-cols-12 > div");
  const [brandColumn, quickLinksColumn, supportColumn, contactColumn] = footerColumns;

  if (brandColumn) {
    const description = brandColumn.querySelector("p");
    setText(description, agencyContent.brand.summary);
  }

  if (quickLinksColumn) {
    const list = quickLinksColumn.querySelector("ul");
    if (list) {
      list.innerHTML = buildFooterLinks(agencyContent.navigation);
    }
  }

  if (supportColumn) {
    const heading = supportColumn.querySelector("h2");
    setText(heading, "Capabilities");

    const list = supportColumn.querySelector("ul");
    if (list) {
      list.innerHTML = buildFooterSupport();
    }
  }

  if (contactColumn) {
    const list = contactColumn.querySelector("ul");
    if (list) {
      list.innerHTML = `
        <li class="mb-4 text-text-light">${escapeHtml(agencyContent.letsBuild.location)}</li>
        <li class="mb-4 text-text-light">${escapeHtml(agencyContent.letsBuild.email)}</li>
        <li class="mb-4 text-text-light">${escapeHtml(agencyContent.brand.summary)}</li>
      `;
    }

    contactColumn.querySelectorAll("form, h2.mt-8").forEach((node) => node.remove());
  }

  const credit = footer.querySelector(".pt-px + p");
  setText(credit, `Built by ${agencyContent.brand.name}.`);

  const footerMark = footer.querySelector("div.flex.justify-center h1");
  setText(footerMark, agencyContent.brand.footerMark);
}

function updateSharedChrome(root, pageId) {
  updateHeader(root, pageId);
  updateFooter(root);
}

function getMainSections(root) {
  return Array.from(root.querySelectorAll("main > section"));
}

function getContentSections(root) {
  return Array.from(root.querySelectorAll("main > section, main > astro-island > section"));
}

function getSectionContainer(section) {
  if (!section) {
    return null;
  }

  return section.parentElement?.tagName === "ASTRO-ISLAND" ? section.parentElement : section;
}

function removeSection(section) {
  getSectionContainer(section)?.remove();
}

function getSectionHeadingText(section) {
  return normalizeText(section?.querySelector("h1, h2, h3")?.textContent);
}

function findSections(root, matcher) {
  return getContentSections(root).filter((section) => matcher(section));
}

function findSectionsByHeading(root, pattern) {
  return findSections(root, (section) => matchesPattern(getSectionHeadingText(section), pattern));
}

function findSectionsByBadge(root, pattern) {
  return findSections(root, (section) => {
    const badgeText = normalizeText(section.querySelector(".badge")?.textContent);
    return matchesPattern(badgeText, pattern);
  });
}

function findSectionsByActionText(root, pattern) {
  return findSections(root, (section) =>
    Array.from(section.querySelectorAll("a, button")).some((node) => matchesPattern(normalizeText(node.textContent), pattern)),
  );
}

function findSectionById(root, id) {
  return root.querySelector(`main > section#${id}, main > astro-island > section#${id}`);
}

function findMainIslandByComponent(root, componentName) {
  return root.querySelector(`main > astro-island[component-url*="${componentName}"]`);
}

function findTestimonialsSection(root) {
  const sections = findSections(
    root,
    (section) =>
      section.querySelector(".relative.overflow-hidden > .flex .shrink-0") &&
      (matchesPattern(getSectionHeadingText(section), /testimonials|what clients|what our customers/i) ||
        matchesPattern(normalizeText(section.textContent), /testimonials|what clients|what our customers/i)),
  );

  if (sections[0]) {
    return sections[0];
  }

  return (
    findSections(
      root,
      (section) =>
        section.querySelector(".relative.overflow-hidden > .flex .shrink-0") &&
        section.querySelector(".px-6.py-8.rounded-2xl, .absolute.inset-0.bg-transparent-gradient"),
    )[0] || null
  );
}

function updateHeroSection(section, { badge, primary, secondary, description, primaryCta, secondaryCta }) {
  if (!section) {
    return;
  }

  setBadgeText(section, badge);
  setSplitHeading(section.querySelector("h1, h2"), primary, secondary);

  const descriptionElement = section.querySelector("p.text-xl, p.text-lg, p");
  setText(descriptionElement, description);

  const buttons = section.querySelectorAll("a.btn");
  if (buttons[0] && primaryCta) {
    buttons[0].setAttribute("href", primaryCta.href);
    setText(buttons[0], primaryCta.label);
  }

  if (buttons[1] && secondaryCta) {
    buttons[1].setAttribute("href", secondaryCta.href);
    setText(buttons[1], secondaryCta.label);
  }
}

function updateMarquee(section, items) {
  const track = section.querySelector(".z-10.flex.items-center.relative .flex.gap-8");
  if (!track) {
    return;
  }

  const repeatedItems = Array.from({ length: 3 }, () => items).flat();
  track.innerHTML = repeatedItems
    .map(
      (item) =>
        `<div class="shrink-0"><div class="px-5 py-3 rounded-full gradient-border bg-secondary/30 text-sm text-white whitespace-nowrap">${escapeHtml(
          item,
        )}</div></div>`,
    )
    .join("");
}

function updateServiceCards(section, services, limit = services.length) {
  const cards = Array.from(section.querySelectorAll(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > astro-island"));
  const items = services.slice(0, limit);

  cards.slice(items.length).forEach((card) => card.remove());

  cards.slice(0, items.length).forEach((card, index) => {
    const service = items[index];
    const icon = card.querySelector("img");
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    const link = card.querySelector("a");

    setImage(icon, serviceVisuals[index].icon, service.title);
    setText(title, service.title);
    setText(description, truncate(service.description, 150));

    if (link) {
      disableLink(link);
    }
  });
}

function updateServiceIntro(section) {
  const heading = section.querySelector("h2");
  setBadgeText(section, "Services");
  setSplitHeading(heading, "What we build", "across product and platform work");

  const paragraphs = section.querySelectorAll("p");
  const intro = Array.from(paragraphs).find((paragraph) => paragraph.closest(".lg\\:col-5"));
  setText(intro, agencyContent.capabilityNotes.description);

  const button = section.querySelector("a.btn");
  if (button) {
    button.setAttribute("href", "/contact");
    setText(button, "Start a brief");
  }
}

function updateProjectCards(section, projects, limit = projects.length) {
  const cards = Array.from(section.querySelectorAll('div.gradient-border[class*="pt-8"]')).filter(
    (card) => card.querySelector("img") && card.querySelector(".badge"),
  );
  const items = projects.slice(0, limit);

  cards.slice(items.length).forEach((card) => card.remove());

  cards.slice(0, items.length).forEach((card, index) => {
    const project = items[index];
    const badges = card.querySelectorAll(".badge");
    const title = card.querySelector("a");
    const summary = card.querySelector("p");
    const image = card.querySelector("img");

    const technologies = project.technologies.slice(0, badges.length);
    badges.forEach((badge, badgeIndex) => {
      setText(badge, technologies[badgeIndex] || project.industry);
    });

    if (title) {
      setText(title, project.name);
      title.setAttribute("href", "/works");
      title.removeAttribute("target");
      title.removeAttribute("rel");
    }

    setText(summary, project.summary);
    setImage(image, project.image, project.name);
  });
}

function updateProjectSectionHeading(section, { badge, primary, secondary, description, buttonLabel, buttonHref }) {
  setBadgeText(section, badge);
  setSplitHeading(section.querySelector("h2"), primary, secondary);

  const intro = Array.from(section.querySelectorAll("p")).find((paragraph) => paragraph.closest(".lg\\:col-5"));
  setText(intro, description);

  const button = section.querySelector("a.btn");
  if (button) {
    button.setAttribute("href", buttonHref);
    setText(button, buttonLabel);
  }
}

function updateFeatureCards(section, items) {
  const headings = Array.from(section.querySelectorAll("h3")).slice(0, items.length);
  const paragraphs = Array.from(section.querySelectorAll("p")).slice(-items.length);

  headings.forEach((heading, index) => setText(heading, items[index].title));
  paragraphs.forEach((paragraph, index) => setText(paragraph, items[index].description));
}

function updateTeamSection(section, { badge, primary, secondary, description }) {
  if (!section) {
    return;
  }

  setBadgeText(section, badge);
  setSplitHeading(section.querySelector("h2"), primary, secondary);

  const intro = Array.from(section.querySelectorAll("p")).find((paragraph) => paragraph.closest(".md\\:grid-cols-2") || paragraph.classList.contains("text-lg"));
  setText(intro, description);
}

function updateTeamCards(section) {
  const cards = Array.from(section.querySelectorAll('div[class*="h-102"]'));
  const members = agencyContent.teamMembers;

  cards.slice(members.length).forEach((card) => card.remove());

  cards.slice(0, members.length).forEach((card, index) => {
    const member = members[index];
    const image = card.querySelector("img");
    const title = card.querySelector("h3");
    const role = card.querySelector("p");
    const content = title?.parentElement;

    setImage(image, member.image, member.name);

    if (!content) {
      setText(title, member.name);
      setText(role, member.role);
      return;
    }

    content.style.width = "100%";
    content.innerHTML = `
      <h3 class="text-xl mb-2 font-medium">${escapeHtml(member.name)}</h3>
      <p class="text-sm text-text">${escapeHtml(member.role)}</p>
      ${buildTeamCardActions(member)}
    `;
  });
}

function updateClientShowcaseSection(section) {
  if (!section) {
    return;
  }

  setSplitHeading(section.querySelector("h2"), "Awesome", "Clients");

  const grid = section.querySelector(".grid.grid-cols-2.lg\\:grid-cols-4.xl\\:grid-cols-5");
  if (!grid) {
    return;
  }

  const cards = Array.from(grid.children);
  const items = agencyContent.clientShowcase;

  cards.slice(items.length).forEach((card) => card.remove());

  cards.slice(0, items.length).forEach((card, index) => {
    const item = items[index];
    const innerCard = card.querySelector(":scope > div") || card;

    innerCard.innerHTML = `
      <div class="flex h-full flex-col justify-center text-center">
        <p class="text-sm uppercase tracking-wide text-text-light/50 mb-3">${escapeHtml(item.label)}</p>
        <h3 class="text-xl font-medium mb-2">${escapeHtml(item.value)}</h3>
        <p class="text-sm">${escapeHtml(item.detail)}</p>
      </div>
    `;
  });
}

function updateFaqSection(section) {
  const toggles = Array.from(section.querySelectorAll("[data-faq-toggle]"));
  const items = agencyContent.faqs;

  toggles.slice(items.length).forEach((toggle) => {
    const wrapper = toggle.closest("astro-island") || toggle.parentElement;
    wrapper?.remove();
  });

  toggles.slice(0, items.length).forEach((toggle, index) => {
    const item = items[index];
    const heading = toggle.querySelector("h3");
    const content = section.querySelector(`[data-faq-content="${toggle.getAttribute("data-faq-toggle")}"] p`);

    setText(heading, item.question);
    setText(content, item.answer);
  });

  const heading = section.querySelector("h2");
  setSplitHeading(heading, "Frequently asked", "questions");

  const intro = section.querySelector("p.text-lg");
  setText(
    intro,
    "Answers to the most common questions about how we work across product engineering, cloud, data, AI, and delivery support.",
  );
}

function updateContactCtaSection(section) {
  if (!section) {
    return;
  }

  setSplitHeading(section.querySelector("h2"), agencyContent.letsBuild.title, "Let's talk!");

  const list = section.querySelector("ul");
  const templateItem = list?.querySelector("li");
  if (list && templateItem) {
    list.innerHTML = "";
    agencyContent.letsBuild.fit.slice(0, 4).forEach((item) => {
      const listItem = templateItem.cloneNode(true);
      setText(listItem.querySelector("span"), item);
      list.appendChild(listItem);
    });
  }

  const scheduleHeading = Array.from(section.querySelectorAll("h3")).find((heading) =>
    heading.textContent.includes("Schedule a call with"),
  );
  setText(scheduleHeading, agencyContent.letsBuild.contactTitle);

  const cardLink = Array.from(section.querySelectorAll("a")).find((link) => link.querySelector("img"));
  if (cardLink) {
    cardLink.setAttribute("href", agencyContent.letsBuild.contactPerson.href);
  }

  const image = section.querySelector('a img, img[alt="Kathryn Murphy"]');
  const headings = section.querySelectorAll("h4");
  const role = Array.from(section.querySelectorAll("p")).find((paragraph) =>
    paragraph.textContent.includes("Head of Partnerships"),
  );

  setImage(image, agencyContent.letsBuild.contactPerson.image, agencyContent.letsBuild.contactPerson.name);
  setText(headings[0], agencyContent.letsBuild.contactPerson.name);
  setText(role, agencyContent.letsBuild.contactPerson.role);
}

function updateTestimonialsSection(section) {
  if (!section) {
    return;
  }

  const heading = section.querySelector("h2");
  setBadgeText(section, "Testimonials");
  setSplitHeading(heading, "What clients", "say");

  const track = section.querySelector(".relative.overflow-hidden > .flex");
  const slides = Array.from(track?.children || []).filter((slide) => slide.classList.contains("shrink-0"));
  const template = slides.find((slide) => !slide.querySelector(".absolute.inset-0.bg-transparent-gradient"));

  if (!track || !template) {
    return;
  }

  track.innerHTML = "";
  track.style.transform = "translateX(0)";

  agencyContent.testimonials.forEach((item) => {
    const { name, detail } = splitAuthor(item.author);
    const slide = template.cloneNode(true);
    const card = slide.querySelector(".px-6.py-8.rounded-2xl");
    const image = card?.querySelector("img");
    const contentColumns = card ? Array.from(card.children) : [];
    const topBlock = contentColumns[0];
    const bottomBlock = contentColumns[1];

    slide.setAttribute("style", "width:100%;padding-right:8px;padding-left:8px");

    if (!card || !topBlock || !bottomBlock) {
      track.appendChild(slide);
      return;
    }

    setImage(image, item.image, item.author);

    topBlock.innerHTML = `
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.author)}" width="80" height="80" class="size-14 mb-6 rounded-full object-cover grayscale">
      <p class="text-sm uppercase tracking-wide text-text-light/50 mb-4">${escapeHtml(item.title)}</p>
      <p class="font-medium mb-15">${escapeHtml(item.quote)}</p>
    `;

    bottomBlock.innerHTML = `
      <h3 class="text-xl mb-2 font-medium">${escapeHtml(name)}</h3>
      <p class="text-sm">${escapeHtml(detail)}</p>
    `;

    track.appendChild(slide);
  });
}

function updateCounterSection(section, values) {
  if (!section) {
    return;
  }

  const cards = Array.from(section.querySelectorAll(".text-center")).filter((card) => card.querySelector(".counter"));

  cards.slice(0, values.length).forEach((card, index) => {
    const counter = card.querySelector(".counter");
    const value = values[index];

    if (!counter) {
      return;
    }

    counter.setAttribute("data-target", String(value));
    counter.setAttribute("data-suffix", "+");
    counter.textContent = `${value}+`;
  });
}

function updateServicesPageCards(section) {
  const cards = Array.from(section.querySelectorAll("div.gradient-border.rounded-2xl")).filter(
    (card) => card.querySelector("ul") && card.querySelector("h4"),
  );
  const items = agencyContent.services;

  cards.slice(items.length).forEach((card) => card.remove());

  cards.slice(0, items.length).forEach((card, index) => {
    const service = items[index];
    const visuals = serviceVisuals[index];
    const images = card.querySelectorAll("img");
    const title = card.querySelector("h3");
    const description = card.querySelector("p.text-lg");
    const list = card.querySelector("ul");

    setImage(images[0], visuals.icon, service.title);
    setImage(images[1], visuals.illustration, service.title);
    setText(title, service.title);
    setText(description, service.description);

    if (list) {
      const templateItem = list.querySelector("li");
      list.innerHTML = "";

      service.capabilities.forEach((capability) => {
        const listItem = templateItem.cloneNode(true);
        const link = listItem.querySelector("a");
        if (link) {
          disableLink(link);
          setLinkTextPreserveChildren(link, capability);
        } else {
          setText(listItem, capability);
        }

        list.appendChild(listItem);
      });
    }
  });
}

function updateOfficeSection(section) {
  setSplitHeading(section.querySelector("h2"), "Our delivery", "base");

  const intro = section.querySelector("p.text-lg");
  setText(
    intro,
    `We keep communication direct and delivery practical, with product work supported from ${agencyContent.letsBuild.location} and collaboration structured for distributed teams.`,
  );

  const mapFrame = section.querySelector("iframe");
  const mapContainer = mapFrame?.parentElement;
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div class="size-full gradient-border bg-secondary/40 p-10 flex flex-col justify-between">
        <div>
          <h3 class="text-h4 font-medium mb-4">${escapeHtml(agencyContent.letsBuild.title)}</h3>
          <p class="text-lg mb-6">${escapeHtml(agencyContent.letsBuild.description)}</p>
        </div>
        <ul class="space-y-3">
          ${agencyContent.letsBuild.fit
            .map((item) => `<li class="text-text-light">${escapeHtml(item)}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }

  const cards = Array.from(section.querySelectorAll(".card.text-center.gradient-border.p-10"));
  const officeDetails = [
    {
      title: "Headquarters",
      lines: [agencyContent.letsBuild.location, agencyContent.letsBuild.email, agencyContent.brand.summary],
    },
    {
      title: "Delivery model",
      lines: ["Remote collaboration", "Scoped product and platform work", "Web, mobile, cloud, AI, and blockchain delivery"],
    },
  ];

  cards.forEach((card, index) => {
    const detail = officeDetails[index];
    if (!detail) {
      card.remove();
      return;
    }

    const heading = card.querySelector("h3");
    setText(heading, detail.title);

    const body = card.querySelector(".flex.flex-col");
    if (body) {
      body.innerHTML = detail.lines
        .map((line) => `<p class="font-medium mb-2">${escapeHtml(line)}</p>`)
        .join("");
    }
  });
}

function configureContactForms(root) {
  root.querySelectorAll("form.row.gap-y-5").forEach((form) => {
    form.setAttribute("action", agencyContent.contactForm.action);
    form.setAttribute("method", agencyContent.contactForm.method);
    form.setAttribute("data-formspree", "true");

    const nameField = form.querySelector("#name");
    if (nameField) {
      nameField.setAttribute("name", "name");
      nameField.setAttribute("autocomplete", "name");
    }

    const emailField = form.querySelector("#email");
    if (emailField) {
      emailField.setAttribute("name", "email");
      emailField.setAttribute("type", "email");
      emailField.setAttribute("autocomplete", "email");
    }

    const budgetField = form.querySelector("#budget");
    if (budgetField) {
      budgetField.setAttribute("name", "budget");
    }

    const referralField = form.querySelector("#about-us");
    if (referralField) {
      referralField.setAttribute("name", "referral_source");
    }

    const messageField = form.querySelector("#message");
    if (messageField) {
      messageField.setAttribute("name", "message");
    }
  });
}

function customizeHome(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: agencyContent.hero.eyebrow,
    primary: agencyContent.hero.headingPrimary,
    secondary: agencyContent.hero.headingSecondary,
    description: agencyContent.hero.intro,
    primaryCta: agencyContent.hero.primaryCta,
    secondaryCta: agencyContent.hero.secondaryCta,
  });
  updateMarquee(sections[0], agencyContent.hero.highlights);

  updateServiceIntro(sections[1]);
  updateServiceCards(sections[1], agencyContent.services, 6);

  updateProjectSectionHeading(sections[2], {
    badge: "Projects",
    primary: "Selected builds",
    secondary: "across product and platform work",
    description:
      "A sample of product, data, cloud, and AI delivery work applied to real operational problems.",
    buttonLabel: "View all projects",
    buttonHref: "/works",
  });
  updateProjectCards(sections[2], agencyContent.projects, 4);

  setBadgeText(sections[3], "Why choose us");
  setSplitHeading(sections[3].querySelector("h2"), "How we support", "strong delivery");
  updateFeatureCards(sections[3], featureHighlights);

  findMainIslandByComponent(root, "PricingPlan")?.remove();
  updateTestimonialsSection(findTestimonialsSection(root));
}

function customizeAbout(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: "About the team",
    primary: "Engineering breadth",
    secondary: "with practical delivery focus",
    description: agencyContent.whoWeAre.description,
  });

  setBadgeText(sections[3], "Why choose us");
  setSplitHeading(sections[3].querySelector("h2"), "How we add", "value");
  updateFeatureCards(sections[3], featureHighlights);

  updateFaqSection(sections[7]);

  updateCounterSection(
    findSections(
      root,
      (section) => section.querySelector(".counter") && matchesPattern(normalizeText(section.textContent), /years experience|happy clients/i),
    )[0],
    [8, 4, 15, 20],
  );

  findSectionsByHeading(root, /awesome clients/i).forEach((section) => {
    removeSection(section);
  });

  findSectionsByBadge(root, /our team/i).forEach((section) => {
    removeSection(section);
  });

  findSectionsByActionText(root, /request a project/i).forEach((section) => {
    removeSection(section);
  });
}

function customizeServices(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: "Services",
    primary: "Product engineering",
    secondary: "across web, mobile, cloud, AI, and blockchain",
    description: agencyContent.capabilityNotes.description,
  });

  setBadgeText(sections[1], "Our expertise");
  setSplitHeading(sections[1].querySelector("h2"), "What we deliver", "across the stack");
  updateServicesPageCards(sections[1]);

  sections[2]?.remove();

  updateProjectSectionHeading(sections[3], {
    badge: "Our work",
    primary: "Selected project",
    secondary: "delivery snapshots",
    description:
      "Examples of product, platform, analytics, and workflow systems built for practical business use.",
    buttonLabel: "View all projects",
    buttonHref: "/works",
  });
  updateProjectCards(sections[3], agencyContent.projects, 4);

  updateCounterSection(
    findSections(
      root,
      (section) => section.querySelector(".counter") && matchesPattern(normalizeText(section.textContent), /years experience|happy clients/i),
    )[0],
    [8, 4, 15, 20],
  );

  updateTestimonialsSection(findTestimonialsSection(root));

  findSectionsByActionText(root, /request a project/i).forEach((section) => {
    removeSection(section);
  });
}

function customizeWorks(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: "Projects",
    primary: "Selected work",
    secondary: "across product, data, and platform delivery",
    description:
      "A cross-section of builds that combine product interfaces, backend systems, cloud services, automation, and applied AI workflows.",
  });

  updateProjectSectionHeading(sections[1], {
    badge: "Our work",
    primary: "Project snapshots",
    secondary: "from real delivery work",
    description:
      "A mix of full-stack product engineering, analytics, automation, cloud workflows, and operational software built for real use.",
    buttonLabel: "Talk to the team",
    buttonHref: "/contact",
  });
  updateProjectCards(sections[1], agencyContent.projects, 6);
}

function customizeBlog(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: agencyContent.blog.eyebrow,
    primary: agencyContent.blog.headingPrimary,
    secondary: agencyContent.blog.headingSecondary,
    description: agencyContent.blog.description,
  });

  updateBlogFeatureCards(sections[1], blogPosts.slice(0, 2));
  updateBlogLatestCards(sections[2], blogPosts.slice(0, 3));

  setSplitHeading(sections[2]?.querySelector("h2"), "Latest", "Posts", { useBreak: false });
}

function customizeBlogPost(root, pageId) {
  const sections = getMainSections(root);
  const post = getBlogPostById(pageId);

  if (!post) {
    return;
  }

  updateBlogPostHero(sections[0], post);
  updateBlogPostBody(sections[1], post);
  updateRelatedPostsSection(sections[2], post);
}

function customizeTeams(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: "Our team",
    primary: "Meet the engineers",
    secondary: "and specialists behind the work",
    description:
      "A small team spanning technical strategy, full-stack engineering, frontend implementation, data support, and platform consulting.",
  });

  updateTeamCards(sections[1]);
}

function customizeContact(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: "Contact",
    primary: "Start with a clear brief",
    secondary: "and we can scope the fastest path forward",
    description: agencyContent.letsBuild.description,
  });

  updateContactCtaSection(sections[1]);

  findSectionsByHeading(root, /our office|our delivery base/i).forEach((section) => {
    removeSection(section);
  });
}

function customizeServiceDetail(root) {
  const sections = getMainSections(root);
  const service = agencyContent.services[0];

  updateHeroSection(sections[0], {
    badge: "Service detail",
    primary: "Full-stack product",
    secondary: "engineering",
    description: service.description,
  });

  updateTestimonialsSection(sections[4]);
  updateFaqSection(sections[5]);
  updateContactCtaSection(sections[6]);
}

function customizeFaq(root) {
  const sections = getMainSections(root);

  updateHeroSection(sections[0], {
    badge: "FAQ",
    primary: "Common questions",
    secondary: "about how we work",
    description:
      "Answers about project scope, delivery style, technical coverage, and the kinds of systems we usually support.",
  });

  updateFaqSection(sections[1]);
}

export function getAgencyMeta(pageId) {
  return agencyContent.meta[pageId] || null;
}

export function customizePortfolioContent(pageId, html) {
  if (typeof document === "undefined") {
    return html;
  }

  const template = document.createElement("template");
  template.innerHTML = html;

  updateSharedChrome(template.content, pageId);

  switch (pageId) {
    case "home":
      customizeHome(template.content);
      break;
    case "about":
      customizeAbout(template.content);
      break;
    case "services":
      customizeServices(template.content);
      break;
    case "works":
      customizeWorks(template.content);
      break;
    case "blog":
      customizeBlog(template.content);
      break;
    case "teams":
      customizeTeams(template.content);
      break;
    case "contact":
      customizeContact(template.content);
      break;
    case "service-copy-writer":
      customizeServiceDetail(template.content);
      break;
    case "faq":
      customizeFaq(template.content);
      break;
    default:
      if (pageId.startsWith("blog-post-")) {
        customizeBlogPost(template.content, pageId);
      }
      break;
  }

  configureContactForms(template.content);

  return template.innerHTML;
}
