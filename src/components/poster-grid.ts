export interface MediaCardItem {
  id: string;
  title: string;
  coverUrl: string;
  badge?: string;
  subtitle?: string;
}

export interface PosterGridOptions {
  items: MediaCardItem[];
  columns?: number;
  onItemClick?: (item: MediaCardItem) => void;
}

export function createPosterGrid(options: PosterGridOptions): HTMLElement {
  const container = document.createElement('div');
  container.className = 'poster-grid';
  container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
    padding: 16px 0;
  `;

  options.items.forEach(item => {
    const card = document.createElement('article');
    card.style.cssText = `
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      background: var(--surface, #12151F);
      border: 1px solid var(--border, #222736);
      transition: transform 0.2s ease, border-color 0.2s ease;
    `;

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.borderColor = 'var(--accent, #E5A93C)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'var(--border, #222736)';
    });

    const coverBox = document.createElement('div');
    coverBox.style.cssText = `
      position: relative;
      width: 100%;
      aspect-ratio: 3/4;
      background: #000;
      overflow: hidden;
    `;

    const img = document.createElement('img');
    img.src = item.coverUrl;
    img.alt = item.title;
    img.loading = 'lazy';
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;
    coverBox.appendChild(img);

    if (item.badge) {
      const badge = document.createElement('span');
      badge.textContent = item.badge;
      badge.style.cssText = `
        position: absolute;
        top: 6px;
        right: 6px;
        background: var(--accent, #E5A93C);
        color: #000;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
      `;
      coverBox.appendChild(badge);
    }

    const info = document.createElement('div');
    info.style.cssText = 'padding: 8px 10px;';
    const title = document.createElement('h4');
    title.textContent = item.title;
    title.style.cssText = `
      margin: 0;
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--fg, #F5F6FA);
    `;
    info.appendChild(title);

    card.appendChild(coverBox);
    card.appendChild(info);

    if (options.onItemClick) {
      card.addEventListener('click', () => options.onItemClick!(item));
    }

    container.appendChild(card);
  });

  return container;
}
