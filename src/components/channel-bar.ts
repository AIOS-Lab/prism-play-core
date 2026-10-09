export interface ChannelItem {
  id: string;
  name: string;
}

export interface ChannelBarOptions {
  channels: ChannelItem[];
  activeId: string;
  onSelect: (channelId: string) => void;
}

export function createChannelBar(options: ChannelBarOptions): HTMLElement {
  const container = document.createElement('nav');
  container.className = 'channel-bar';
  container.style.cssText = `
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border, #222736);
    scrollbar-width: none;
  `;

  options.channels.forEach(ch => {
    const btn = document.createElement('button');
    const isActive = ch.id === options.activeId;
    btn.textContent = ch.name;
    btn.style.cssText = `
      background: transparent;
      border: none;
      padding: 6px 12px;
      font-size: 0.95rem;
      font-weight: ${isActive ? '700' : '500'};
      color: ${isActive ? 'var(--accent, #E5A93C)' : 'var(--muted, #A4ADC0)'};
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      transition: all 0.2s ease;
    `;

    btn.addEventListener('click', () => {
      options.onSelect(ch.id);
    });

    container.appendChild(btn);
  });

  return container;
}
