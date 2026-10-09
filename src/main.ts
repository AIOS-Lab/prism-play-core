import { DEMO_MEDIA } from './demo-data';
import { PrismPlayer } from './player/prism-player';
import { createChannelBar } from './components/channel-bar';
import { createPosterGrid, type MediaCardItem } from './components/poster-grid';

console.log('[Prism Play Core] 现代流媒体播放框架启动成功');

const app = document.getElementById('app');
if (app) {
  app.innerHTML = `
    <header style="padding: 16px 24px; border-bottom: 1px solid var(--border, #222736); display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-weight: 800; font-size: 1.25rem; color: var(--accent, #E5A93C); letter-spacing: 1px;">PRISM PLAY CORE</span>
        <span style="font-size: 0.8rem; padding: 2px 8px; border-radius: 4px; background: rgba(229,169,60,0.15); color: var(--accent, #E5A93C);">开源参考工程</span>
      </div>
      <div>
        <button id="theme-btn" style="background: transparent; border: 1px solid var(--border, #222736); color: var(--fg, #F5F6FA); padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">日夜模式切换</button>
      </div>
    </header>

    <div id="nav-container"></div>

    <main style="max-width: 960px; margin: 0 auto; padding: 24px 16px; width: 100%; box-sizing: border-box;">
      <div id="player-container" style="width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.5);"></div>

      <div style="margin-top: 20px;">
        <h1 id="title-text" style="font-size: 1.4rem; margin: 0 0 8px 0; color: var(--fg, #F5F6FA);">${DEMO_MEDIA.title}</h1>
        <p id="intro-text" style="font-size: 0.95rem; color: var(--muted, #A4ADC0); margin: 0; line-height: 1.6;">${DEMO_MEDIA.intro}</p>
      </div>

      <section style="margin-top: 24px;">
        <h3 style="font-size: 1.05rem; margin-bottom: 12px; color: var(--accent, #E5A93C);">多剧集状态机切换</h3>
        <div id="episode-rail" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px;">
          ${DEMO_MEDIA.seasons[0].episodes.map((ep, idx) => `
            <button class="ep-btn" data-url="${ep.url}" data-idx="${idx}" style="flex: 0 0 auto; padding: 10px 18px; border-radius: 8px; border: 1px solid ${idx === 0 ? 'var(--accent, #E5A93C)' : 'var(--border, #222736)'}; background: ${idx === 0 ? 'rgba(229,169,60,0.1)' : 'var(--surface, #12151F)'}; color: ${idx === 0 ? 'var(--accent, #E5A93C)' : 'var(--fg, #F5F6FA)'}; cursor: pointer; font-size: 0.9rem;">
              ${ep.title}
            </button>
          `).join('')}
        </div>
      </section>

      <section style="margin-top: 36px;">
        <h3 style="font-size: 1.05rem; margin-bottom: 12px; color: var(--fg, #F5F6FA);">示例海报流布局 (Poster Grid)</h3>
        <div id="grid-container"></div>
      </section>

      <section style="margin-top: 40px; padding: 24px; border-radius: 12px; background: var(--surface, #12151F); border: 1px solid var(--border, #222736);">
        <h3 style="margin-top: 0; color: var(--fg, #F5F6FA);">关于 Prism Play Core · 作者寄语</h3>
        <p style="color: var(--muted, #A4ADC0); line-height: 1.8; font-size: 0.95rem; margin-bottom: 16px;">
          我把自己在媒体播放应用开发中积累的一部分通用能力整理成了这个开源切片项目。
          它以成熟的开源组件（ArtPlayer、Hls.js、Capacitor）为底座，重点解决播放引擎调度、移动端触控交互与应用生命周期之间的协同接缝。
          这份工程旨在作为独立可运行、可阅读、可二开的实践参考，也希望成为和同行交流技术的一个起点。
        </p>
        <p style="color: var(--muted, #A4ADC0); line-height: 1.8; font-size: 0.95rem; margin-bottom: 16px;">
          我也承接<strong>音视频播放器定制、跨端应用开发与程序定制</strong>等商业业务。商业合作与免费开源使用完全相互独立，如有需求欢迎微信交流。
        </p>
        <div style="display: flex; align-items: center; gap: 20px; padding-top: 8px;">
          <img src="./images/author-contact.jpg" alt="作者微信二维码" style="width: 130px; height: 130px; border-radius: 8px; border: 1px solid var(--border, #222736); object-fit: cover;">
          <div>
            <div style="font-weight: 700; color: var(--accent, #E5A93C); margin-bottom: 6px; font-size: 1rem;">作者微信 · 同行交流与程序定制</div>
            <div style="font-size: 0.85rem; color: var(--muted, #A4ADC0); line-height: 1.5;">扫码添加微信，备注「开源交流」或「项目定制」<br>探讨跨端播放器架构与工程实践</div>
          </div>
        </div>
      </section>
    </main>
  `;

  // 挂载频道栏
  const navBox = document.getElementById('nav-container');
  if (navBox) {
    const channelBar = createChannelBar({
      channels: [
        { id: 'featured', name: '精选影片' },
        { id: 'scifi', name: '开源短片' },
        { id: 'animation', name: '经典动画' },
        { id: 'doc', name: '技术纪实' }
      ],
      activeId: 'featured',
      onSelect: (chId) => console.log('选中频道:', chId)
    });
    navBox.appendChild(channelBar);
  }

  // 挂载海报流
  const gridBox = document.getElementById('grid-container');
  if (gridBox) {
    const demoCards: MediaCardItem[] = [
      { id: '1', title: 'Tears of Steel', coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80', badge: '开源' },
      { id: '2', title: 'Big Buck Bunny', coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80', badge: '经典' },
      { id: '3', title: 'Elephants Dream', coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', badge: '动画' },
      { id: '4', title: 'Cosmos Laundromat', coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80', badge: '高码率' }
    ];
    const posterGrid = createPosterGrid({
      items: demoCards,
      onItemClick: (item) => console.log('点击海报:', item.title)
    });
    gridBox.appendChild(posterGrid);
  }

  // 初始化统一播放器
  const container = document.getElementById('player-container') as HTMLDivElement | null;
  let player: PrismPlayer | null = null;

  if (container && DEMO_MEDIA.seasons[0].episodes[0]) {
    player = new PrismPlayer({
      container,
      source: {
        url: DEMO_MEDIA.seasons[0].episodes[0].url,
        title: DEMO_MEDIA.seasons[0].episodes[0].title
      },
      themeColor: '#E5A93C'
    });
  }

  // 绑定选集切换
  const epButtons = document.querySelectorAll('.ep-btn');
  epButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const url = target.dataset.url;
      if (url && player) {
        epButtons.forEach(b => {
          (b as HTMLButtonElement).style.borderColor = 'var(--border, #222736)';
          (b as HTMLButtonElement).style.background = 'var(--surface, #12151F)';
          (b as HTMLButtonElement).style.color = 'var(--fg, #F5F6FA)';
        });
        target.style.borderColor = 'var(--accent, #E5A93C)';
        target.style.background = 'rgba(229,169,60,0.1)';
        target.style.color = 'var(--accent, #E5A93C)';
        player.switchSource({ url });
      }
    });
  });

  // 主题切换
  const themeBtn = document.getElementById('theme-btn');
  themeBtn?.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', nextTheme);
  });
}
