import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { agencyContent } from "../content/agencyContent";
import { customizePortfolioContent, getAgencyMeta } from "../content/customizePortfolioContent";

const pageModules = import.meta.glob("../generated/pages/*.json");
const sharedAssetReplacements = [
  {
    pattern: /\/assets\/pages\/[^/]+\/logo\.BFFbahU8_Z1WHULm\.webp/g,
    replacement: "/images/stackmerlion-logo.svg",
  },
  {
    pattern: /\/assets\/pages\/[^/]+\/hero-light\.0g0G8SoQ_Z1oXDql\.svg/g,
    replacement: "/images/hero-light.svg",
  },
];
const blogPageSize = 3;
const blogListingItems = (agencyContent.blog?.posts || []).map((post) => ({
  title: post.title,
  summary: post.summary,
  href: post.href,
  image: post.cardImage,
}));

function normalizeLocalUrl(value) {
  if (!value || !/^(\/|\.\/|\.\.\/)/.test(value) || value.startsWith("//")) {
    return value;
  }

  try {
    return encodeURI(decodeURI(value));
  } catch {
    try {
      return encodeURI(value);
    } catch {
      return value;
    }
  }
}

function normalizeInlineStyleUrls(value) {
  return value.replace(/url\((['"]?)(.*?)\1\)/gi, (match, quote, url) => {
    const normalizedUrl = normalizeLocalUrl(url.trim());
    return `url(${quote}${normalizedUrl}${quote})`;
  });
}

function normalizeHtmlAssetPaths(html) {
  let content = sharedAssetReplacements.reduce(
    (currentValue, { pattern, replacement }) => currentValue.replace(pattern, replacement),
    html,
  );

  content = content.replace(/\b(src|href|poster)=(["'])(.*?)\2/gi, (match, attribute, quote, value) => {
    const normalizedValue = normalizeLocalUrl(value);
    return `${attribute}=${quote}${normalizedValue}${quote}`;
  });

  content = content.replace(/\bstyle=(["'])(.*?)\1/gi, (match, quote, value) => {
    const normalizedValue = normalizeInlineStyleUrls(value);
    return `style=${quote}${normalizedValue}${quote}`;
  });

  return content;
}

function initializeAssetUrls(root) {
  root.querySelectorAll("[src], [href], [poster], [style]").forEach((element) => {
    ["src", "href", "poster"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) {
        return;
      }

      const normalizedValue = normalizeLocalUrl(value);
      if (normalizedValue !== value) {
        element.setAttribute(attribute, normalizedValue);
      }
    });

    const styleValue = element.getAttribute("style");
    if (!styleValue) {
      return;
    }

    const normalizedStyleValue = normalizeInlineStyleUrls(styleValue);
    if (normalizedStyleValue !== styleValue) {
      element.setAttribute("style", normalizedStyleValue);
    }
  });

  return () => {};
}

function setMetaDescription(description) {
  let element = document.querySelector('meta[name="description"]');

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", "description");
    document.head.appendChild(element);
  }

  element.setAttribute("content", description || "");
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function formatPortableHeading(value) {
  return String(value || "")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/\n+/g, "<br>");
}

function mapHowWeWorkAssetPath(value) {
  if (typeof value !== "string") {
    return value;
  }

  if (!value.startsWith("/images/sections/how-we-work/")) {
    return value;
  }

  const filename = value.split("/").pop();
  return filename ? `/assets/pages/home/${filename}` : value;
}

function isRouterEligibleLink(link) {
  if (!link) {
    return false;
  }

  const href = link.getAttribute("href");

  if (!href || href === "#" || link.hasAttribute("download")) {
    return false;
  }

  if (link.target && link.target !== "_self") {
    return false;
  }

  return href.startsWith("/") || href.startsWith("#");
}

function initializeRouterLinks(root, navigate) {
  const handleClick = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = event.target.closest("a");

    if (!root.contains(link) || !isRouterEligibleLink(link)) {
      return;
    }

    const href = link.getAttribute("href");
    event.preventDefault();

    if (href.startsWith("#")) {
      navigate(`${window.location.pathname}${href}`);
      return;
    }

    navigate(href);
  };

  root.addEventListener("click", handleClick);
  return () => root.removeEventListener("click", handleClick);
}

function initializeForms(root) {
  const cleanups = [];

  root.querySelectorAll("form").forEach((form) => {
    const handleSubmit = (event) => {
      if (!form.reportValidity()) {
        event.preventDefault();
        return;
      }

      const action = form.getAttribute("action") || "";
      const isFormspreeForm = /formspree\.io/i.test(action);

      if (!isFormspreeForm) {
        event.preventDefault();
      }
    };

    form.addEventListener("submit", handleSubmit);
    cleanups.push(() => form.removeEventListener("submit", handleSubmit));
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initializePriorityImages(root) {
  const eagerImages = [
    ...root.querySelectorAll("header .navbar-brand img"),
    ...root.querySelectorAll('img[alt="background image"]'),
  ];

  eagerImages.forEach((image) => {
    image.setAttribute("loading", "eager");
    image.setAttribute("fetchpriority", "high");
  });

  return () => {};
}

function initializeFaq(root) {
  const toggles = Array.from(root.querySelectorAll("[data-faq-toggle]"));

  if (!toggles.length) {
    return () => {};
  }

  const cleanups = [];

  toggles.forEach((toggle) => {
    const icon = toggle.querySelector("svg");
    if (icon) {
      icon.classList.add("faq-icon");
    }

    const handleClick = () => {
      const index = toggle.getAttribute("data-faq-toggle");
      const content = root.querySelector(`[data-faq-content="${index}"]`);

      if (!content) {
        return;
      }

      const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

      root.querySelectorAll("[data-faq-content]").forEach((panel) => {
        if (panel !== content) {
          panel.style.maxHeight = "0";
          panel.style.opacity = "0";
        }
      });

      root.querySelectorAll("[data-faq-toggle] svg").forEach((svg) => {
        if (svg !== icon) {
          svg.classList.remove("open");
        }
      });

      if (isOpen) {
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        icon?.classList.remove("open");
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        content.style.opacity = "1";
        icon?.classList.add("open");
      }
    };

    toggle.addEventListener("click", handleClick);
    cleanups.push(() => toggle.removeEventListener("click", handleClick));
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function decodeAstroObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  return Object.fromEntries(Object.entries(value).map(([key, nestedValue]) => [key, decodeAstroValue(nestedValue)]));
}

function decodeAstroValue(value) {
  if (Array.isArray(value) && value.length === 2 && typeof value[0] === "number") {
    const [type, encoded] = value;

    switch (type) {
      case 0:
        return decodeAstroObject(encoded);
      case 1:
        return encoded.map(decodeAstroValue);
      case 2:
        return new RegExp(encoded);
      case 3:
        return new Date(encoded);
      case 4:
        return new Map(encoded.map((item) => decodeAstroValue(item)));
      case 5:
        return new Set(encoded.map((item) => decodeAstroValue(item)));
      case 6:
        return BigInt(encoded);
      case 7:
        return new URL(encoded, window.location.origin);
      case 8:
        return new Uint8Array(encoded);
      case 9:
        return new Uint16Array(encoded);
      case 10:
        return new Uint32Array(encoded);
      case 11:
        return Number.POSITIVE_INFINITY * encoded;
      default:
        return encoded;
    }
  }

  if (Array.isArray(value)) {
    return value.map(decodeAstroValue);
  }

  if (value && typeof value === "object") {
    return decodeAstroObject(value);
  }

  return value;
}

function initializePricing(root) {
  const pricingIsland = root.querySelector('astro-island[component-url*="PricingPlan"]');

  if (!pricingIsland) {
    return () => {};
  }

  const props = pricingIsland.getAttribute("props");
  if (!props) {
    return () => {};
  }

  let decodedProps;

  try {
    decodedProps = decodeAstroObject(JSON.parse(props));
  } catch {
    return () => {};
  }

  const plans = decodedProps?.sectionData?.data?.plans;
  const switchButtons = Array.from(pricingIsland.querySelectorAll('button[type="button"]')).slice(0, 2);
  const indicator = switchButtons[0]?.parentElement?.querySelector("div.absolute");
  const cards = Array.from(pricingIsland.querySelectorAll(".card.gradient-border"));

  if (!Array.isArray(plans) || switchButtons.length < 2 || !indicator || cards.length < 2) {
    return () => {};
  }

  const renderPlanMode = (mode) => {
    switchButtons.forEach((button) => {
      const isActive = button.textContent.trim().toLowerCase() === mode;
      button.classList.toggle("text-text-dark", isActive);
      button.classList.toggle("text-white", !isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    indicator.style.transition = "transform 300ms ease";
    indicator.style.transform = mode === "yearly" ? "translateX(100%)" : "translateX(0)";

    cards.slice(0, plans.length).forEach((card, index) => {
      const heading = card.querySelector("h4.text-h1");
      const period = card.querySelector(".p-6 span");
      const plan = plans[index];

      if (heading && plan?.price?.[mode]) {
        heading.textContent = `$${plan.price[mode]}`;
      }

      if (period) {
        period.textContent = mode === "yearly" ? "Per User year" : "Per User month";
      }
    });
  };

  const listeners = switchButtons.map((button) => {
    const mode = button.textContent.trim().toLowerCase();
    const handleClick = () => renderPlanMode(mode);

    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  });

  renderPlanMode("monthly");
  return () => listeners.forEach((cleanup) => cleanup());
}

function initializeCounters(root) {
  const counters = Array.from(root.querySelectorAll(".counter"));

  if (!counters.length) {
    return () => {};
  }

  counters.forEach((counter) => {
    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";
    const target = counter.getAttribute("data-target") || counter.textContent || "";

    counter.textContent = `${prefix}${target}${suffix}`;
  });

  return () => {};
}

function initializeHowWeWork(root) {
  const howWeWorkIsland = root.querySelector('astro-island[component-url*="HowWeWork"]');

  if (!howWeWorkIsland) {
    return () => {};
  }

  const props = howWeWorkIsland.getAttribute("props");
  if (!props) {
    return () => {};
  }

  let decodedProps;

  try {
    decodedProps = decodeAstroObject(JSON.parse(props));
  } catch {
    return () => {};
  }

  const steps = decodedProps?.sectionData?.data?.steps;
  const section = howWeWorkIsland.querySelector("section");
  const buttons = Array.from(section?.querySelectorAll("ul button") || []);
  const contentCard = section?.querySelector(".flex.flex-col > .grid.lg\\:grid-cols-2");
  const detailColumn = contentCard?.querySelector(".lg\\:pr-6");
  const icon = detailColumn?.querySelector("img");
  const title = detailColumn?.querySelector("h3");
  const description = detailColumn?.querySelector("p.text-lg");
  const galleryImages = Array.from(contentCard?.querySelectorAll(".grid.grid-cols-2.gap-4 img") || []);

  if (!Array.isArray(steps) || !section || !buttons.length || !contentCard || !detailColumn || !icon || !title || !description || !galleryImages.length) {
    return () => {};
  }

  const setButtonState = (button, isActive) => {
    let fill = button.querySelector(":scope > div.absolute");

    if (!fill) {
      fill = document.createElement("div");
      fill.className = "absolute inset-0 bg-primary rounded-full transition-opacity duration-300";
      fill.style.opacity = "0";
      button.appendChild(fill);
    }

    button.classList.add("bg-transparent");
    button.classList.toggle("text-text-dark", isActive);
    button.classList.toggle("text-white", !isActive);
    fill.style.opacity = isActive ? "1" : "0";
  };

  const renderStep = (index) => {
    const step = steps[index];

    if (!step) {
      return;
    }

    buttons.forEach((button, buttonIndex) => {
      setButtonState(button, buttonIndex === index);
    });

    icon.setAttribute("src", normalizeLocalUrl(mapHowWeWorkAssetPath(step.icon)));
    icon.setAttribute("alt", step.category || `Step ${index + 1}`);
    title.innerHTML = formatPortableHeading(step.title);
    description.textContent = step.content || "";

    galleryImages.forEach((image, imageIndex) => {
      const source = step.image_list?.[imageIndex] || step.image_list?.[step.image_list.length - 1];

      if (!source) {
        return;
      }

      image.setAttribute("src", normalizeLocalUrl(mapHowWeWorkAssetPath(source)));
      image.setAttribute("alt", `${step.category || "Workflow"} image ${imageIndex + 1}`);
    });
  };

  const listeners = buttons.map((button, index) => {
    const handleClick = () => renderStep(index);
    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  });

  renderStep(0);
  return () => listeners.forEach((cleanup) => cleanup());
}

function getBlogPageNumber(pathname) {
  const match = pathname.match(/^\/blog\/page\/(\d+)$/);
  const pageNumber = Number(match?.[1]);

  return Number.isInteger(pageNumber) && pageNumber > 1 ? pageNumber : 1;
}

function buildBlogPaginationMarkup(currentPage, totalPages) {
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const previousDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;
  const previousStateClass = previousDisabled ? " opacity-50 cursor-not-allowed" : "";
  const nextStateClass = nextDisabled ? " opacity-50 cursor-not-allowed" : "";

  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;

    if (pageNumber === currentPage) {
      return `<span aria-current="page" class="size-12 rounded-full gradient-border flex items-center justify-center bg-primary text-text-dark font-medium">${pageNumber}</span>`;
    }

    return `<button type="button" data-blog-page="${pageNumber}" class="size-12 rounded-full gradient-border flex items-center justify-center hover:bg-primary text-primary hover:text-text-dark transition-colors">${pageNumber}</button>`;
  }).join("");

  return `
    <button type="button" data-blog-page="${previousPage}" class="px-4 py-2.5 text-primary hover:bg-primary flex items-center rounded-full gradient-border hover:text-text-dark transition-colors${previousStateClass}"${previousDisabled ? ' disabled aria-disabled="true"' : ""}>
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
      <span>Previous</span>
    </button>
    ${pageButtons}
    <button type="button" data-blog-page="${nextPage}" class="px-4 py-2.5 text-primary hover:bg-primary flex items-center rounded-full gradient-border hover:text-text-dark transition-colors${nextStateClass}"${nextDisabled ? ' disabled aria-disabled="true"' : ""}>
      <span class="mr-2">Next</span>
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>
    </button>
  `;
}

function initializeBlogPagination(root, navigate, pathname) {
  const section = Array.from(root.querySelectorAll("section")).find(
    (candidate) => normalizeText(candidate.querySelector("h2")?.textContent) === "latest posts" && candidate.querySelector(".row") && candidate.querySelector("nav"),
  );

  if (!section) {
    return () => {};
  }

  const row = section.querySelector(".row");
  const templateCard = row?.querySelector(":scope > div.mb-14");
  const nav = section.querySelector("nav");
  const totalPages = Math.max(1, Math.ceil(blogListingItems.length / blogPageSize));
  let currentPage = Math.min(getBlogPageNumber(pathname), totalPages);

  if (!row || !templateCard || !nav) {
    return () => {};
  }

  const renderCard = (card, item) => {
    const image = card.querySelector("img");
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    const link = card.querySelector("a");

    image?.setAttribute("src", normalizeLocalUrl(item.image));
    image?.setAttribute("alt", item.title);
    title && (title.textContent = item.title);
    description && (description.textContent = item.summary);

    if (link) {
      link.setAttribute("href", item.href);
      link.setAttribute("aria-label", `Read more about ${item.title}`);
    }
  };

  const renderPage = () => {
    const startIndex = (currentPage - 1) * blogPageSize;
    const pageItems = blogListingItems.slice(startIndex, startIndex + blogPageSize);

    row.innerHTML = "";
    pageItems.forEach((item) => {
      const card = templateCard.cloneNode(true);
      renderCard(card, item);
      row.appendChild(card);
    });

    nav.innerHTML = buildBlogPaginationMarkup(currentPage, totalPages);
  };

  const handleClick = (event) => {
    const target = event.target.closest("[data-blog-page]");

    if (!target) {
      return;
    }

    const targetPage = Number(target.getAttribute("data-blog-page"));
    if (!Number.isInteger(targetPage) || targetPage < 1 || targetPage > totalPages || targetPage === currentPage) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    currentPage = targetPage;
    renderPage();
    navigate(targetPage === 1 ? "/blog" : `/blog/page/${targetPage}`);
  };

  nav.addEventListener("click", handleClick);
  renderPage();

  return () => nav.removeEventListener("click", handleClick);
}

function getCarouselSlideCount(slides) {
  const signatures = slides.map((slide) => slide.textContent.replace(/\s+/g, " ").trim());
  const firstSignature = signatures[0];

  for (let index = 1; index < signatures.length; index += 1) {
    if (signatures[index] === firstSignature) {
      return index;
    }
  }

  return slides.length;
}

function initializeCarousels(root) {
  const sections = Array.from(root.querySelectorAll("section"));
  const cleanups = [];

  sections.forEach((section) => {
    const previousButton = section.querySelector('button[aria-label*="Previous"]');
    const nextButton = section.querySelector('button[aria-label*="Next"]');
    const track = section.querySelector(".relative.overflow-hidden > .flex");

    if (!previousButton || !nextButton || !track || track.dataset.codexCarouselReady === "true") {
      return;
    }

    const slides = Array.from(track.children).filter((child) => child.classList.contains("shrink-0"));
    if (slides.length < 2) {
      return;
    }

    const totalSlides = getCarouselSlideCount(slides);
    let currentIndex = 0;

    track.dataset.codexCarouselReady = "true";
    track.dataset.codexCarouselTrack = "true";
    track.style.transition = "transform 500ms ease";

    const update = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const handlePrevious = () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      update();
    };

    const handleNext = () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      update();
    };

    previousButton.addEventListener("click", handlePrevious);
    nextButton.addEventListener("click", handleNext);
    update();

    cleanups.push(() => previousButton.removeEventListener("click", handlePrevious));
    cleanups.push(() => nextButton.removeEventListener("click", handleNext));
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function shouldRevealElement(element) {
  const inlineStyle = element.getAttribute("style") || "";

  if (
    !inlineStyle ||
    element.hasAttribute("data-faq-content") ||
    element.closest(".search-modal") ||
    element.parentElement?.classList.contains("animate-letters")
  ) {
    return false;
  }

  const hasHiddenOpacity = /opacity:\s*0(?:[;}]|$)/i.test(inlineStyle);
  const hasTranslateTransform = /transform:\s*translate/i.test(inlineStyle);
  const isAnimatedLetters = element.classList.contains("animate-letters");

  return hasHiddenOpacity && (hasTranslateTransform || isAnimatedLetters);
}

function revealLetters(element) {
  element.style.opacity = "1";

  Array.from(element.children).forEach((child, index) => {
    child.style.transition = `opacity 420ms ease ${index * 35}ms, transform 420ms ease ${index * 35}ms`;
    child.style.opacity = "1";
    child.style.transform = "translateY(0)";
  });
}

function revealElement(element) {
  if (element.classList.contains("animate-letters")) {
    revealLetters(element);
    return;
  }

  element.style.transition = `${element.style.transition ? `${element.style.transition}, ` : ""}opacity 700ms ease, transform 700ms ease`;

  window.requestAnimationFrame(() => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}

function initializeRevealAnimations(root) {
  const candidates = Array.from(root.querySelectorAll("[style]")).filter(shouldRevealElement);

  if (!candidates.length) {
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        revealElement(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  candidates.forEach((candidate) => observer.observe(candidate));
  return () => observer.disconnect();
}

export function PortfolioPage({ page }) {
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const agencyMeta = getAgencyMeta(page.id);

  useEffect(() => {
    let isMounted = true;

    setContent(null);
    pageModules[page.moduleKey]?.().then((module) => {
      if (isMounted) {
        const normalizedHtml = normalizeHtmlAssetPaths(module.default.html);
        const customizedHtml = customizePortfolioContent(page.id, normalizedHtml);

        setContent({
          ...module.default,
          html: normalizeHtmlAssetPaths(customizedHtml),
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [page.moduleKey]);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = agencyMeta?.title || page.title || "Neonspark";
    setMetaDescription(agencyMeta?.description || page.description);
  }, [agencyMeta?.description, agencyMeta?.title, page.description, page.title]);

  useEffect(() => {
    if (!content || !location.hash) {
      return undefined;
    }

    const anchorId = location.hash.replace(/^#/, "");
    const rafId = window.requestAnimationFrame(() => {
      const target = document.getElementById(anchorId);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [content?.id, location.hash]);

  useEffect(() => {
    const root = containerRef.current;

    if (!root) {
      return undefined;
    }

    const cleanups = [
      initializeRouterLinks(root, navigate),
      initializeForms(root),
      initializeAssetUrls(root),
      initializePriorityImages(root),
      initializeCounters(root),
      initializeFaq(root),
      initializeRevealAnimations(root),
      initializePricing(root),
      initializeHowWeWork(root),
      initializeCarousels(root),
      initializeBlogPagination(root, navigate, location.pathname),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
    };
  }, [content?.id, location.pathname, navigate]);

  if (!content) {
    return <div className="min-h-screen bg-dark" />;
  }

  return <div ref={containerRef} className="react-portfolio-page" dangerouslySetInnerHTML={{ __html: content.html }} />;
}
