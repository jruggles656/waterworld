document.addEventListener('DOMContentLoaded', () => {
  fetch('links.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load links');
      return response.json();
    })
    .then(data => {
      renderHeader(data.event);
      if (data.brochure) renderBrochure(data.brochure);
      renderCategories(data.categories);
      renderSponsors(data.sponsors);
      renderPastEvents(data.pastEvents);
      document.getElementById('loading').classList.add('hidden');
    })
    .catch(error => {
      console.error('Error loading links:', error);
      const loading = document.getElementById('loading');
      loading.innerHTML = '<p class="error-message">Failed to load links. Please refresh.</p>';
    });
});

// --- Header ---
function renderHeader(event) {
  document.getElementById('subtitle').textContent = event.subtitle || '';

  const details = document.getElementById('event-details');
  const items = [
    { icon: '\u{1F4C5}', text: event.date },
    { icon: '\u{1F552}', text: event.time },
    { icon: '\u{1F4CD}', text: event.location }
  ];

  items.forEach(item => {
    if (!item.text) return;
    const div = document.createElement('div');
    div.className = 'event-detail';
    div.innerHTML = `<span class="detail-icon">${item.icon}</span>${item.text}`;
    details.appendChild(div);
  });
}

// --- Brochure Video ---
function renderBrochure(brochure) {
  if (!brochure.video) return;

  const container = document.getElementById('links-container');

  const section = document.createElement('section');
  section.className = 'brochure-section';

  const video = document.createElement('video');
  video.src = brochure.video;
  video.className = 'brochure-video';
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');

  section.appendChild(video);
  container.appendChild(section);
}

// --- Categories & Links ---
function renderCategories(categories) {
  const container = document.getElementById('links-container');

  categories.forEach(category => {
    const section = document.createElement('section');
    section.className = 'category-section';
    section.id = category.id;

    const heading = document.createElement('h2');
    heading.className = 'category-title';
    heading.innerHTML = `
      <span class="category-icon">${category.icon || ''}</span>
      <span class="category-title-text">${category.title}</span>
    `;
    section.appendChild(heading);

    const linksDiv = document.createElement('div');
    linksDiv.className = 'category-links';

    category.links.forEach(link => {
      if (link.hidden) return;
      linksDiv.appendChild(createLinkButton(link));
    });

    section.appendChild(linksDiv);
    container.appendChild(section);
  });
}

function createLinkButton(link) {
  const a = document.createElement('a');
  a.href = link.url;
  a.target = link.url.startsWith('#') ? '_self' : '_blank';
  a.rel = 'noopener noreferrer';
  a.className = 'link-button';

  // Add logo class if vendor has a logo
  if (link.logo) {
    a.classList.add('has-logo');
  }

  // Track clicks in Google Analytics
  a.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'link_click', {
        event_category: 'outbound',
        event_label: link.name,
        transport_type: 'beacon'
      });
    }
  });

  // Use logo image if available, otherwise use emoji icon
  if (link.logo) {
    const logoImg = document.createElement('img');
    logoImg.src = link.logo;
    logoImg.alt = link.name;
    logoImg.className = 'link-logo';
    logoImg.loading = 'lazy';
    // Fallback to emoji icon if image fails
    logoImg.onerror = function() {
      this.style.display = 'none';
      const fallbackIcon = document.createElement('span');
      fallbackIcon.className = 'link-icon';
      fallbackIcon.textContent = link.icon || '\u{1F517}';
      a.insertBefore(fallbackIcon, a.firstChild);
    };
    a.appendChild(logoImg);
  } else {
    const icon = document.createElement('span');
    icon.className = 'link-icon';
    icon.textContent = link.icon || '\u{1F517}';
    a.appendChild(icon);
  }

  const textDiv = document.createElement('div');
  textDiv.className = 'link-text';

  const name = document.createElement('span');
  name.className = 'link-name';
  name.textContent = link.name;
  textDiv.appendChild(name);

  if (link.description) {
    const desc = document.createElement('span');
    desc.className = 'link-desc';
    desc.textContent = link.description;
    textDiv.appendChild(desc);
  }

  const arrow = document.createElement('span');
  arrow.className = 'link-arrow';
  arrow.textContent = '\u2192';

  a.appendChild(textDiv);
  a.appendChild(arrow);

  return a;
}

// --- Sponsors ---
function renderSponsors(sponsors) {
  if (!sponsors || sponsors.length === 0) return;

  const container = document.getElementById('sponsors-container');

  const heading = document.createElement('h2');
  heading.className = 'category-title sponsors-title';
  heading.innerHTML = `
    <span class="category-icon">\u{1F91D}</span>
    <span class="category-title-text">Community Partners</span>
  `;
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'sponsors-grid';

  sponsors.filter(s => !s.hidden).forEach(sponsor => {
    const item = document.createElement('a');
    item.className = 'sponsor-item';
    if (sponsor.url) {
      item.href = sponsor.url;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
    }

    const img = document.createElement('img');
    img.src = sponsor.logo;
    img.alt = sponsor.name;
    img.className = 'sponsor-logo';
    img.loading = 'lazy';

    // If image fails to load, show the name as text instead
    img.onerror = function() {
      this.style.display = 'none';
      const fallback = document.createElement('span');
      fallback.className = 'sponsor-fallback';
      fallback.textContent = sponsor.name;
      item.appendChild(fallback);
    };

    item.appendChild(img);
    grid.appendChild(item);
  });

  container.appendChild(grid);
  container.classList.add('visible');
}

// --- Past Events ---
function renderPastEvents(pastEvents) {
  if (!pastEvents || pastEvents.length === 0) return;

  const container = document.getElementById('past-events');

  const heading = document.createElement('p');
  heading.className = 'past-events-heading';
  heading.textContent = 'Past Events';
  container.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'past-events-list';

  pastEvents.filter(e => !e.hidden).forEach(event => {
    const link = document.createElement('a');
    link.href = event.url;
    link.className = 'past-event-link';
    link.textContent = event.name;
    list.appendChild(link);
  });

  container.appendChild(list);
}
