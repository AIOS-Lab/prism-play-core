import Artplayer from 'artplayer';
import Hls from 'hls.js';
import type { PlaybackSource, PlayerOptions } from './types';

export class PrismPlayer {
  private art: Artplayer | null = null;
  private hlsInstance: Hls | null = null;
  private options: PlayerOptions;

  constructor(options: PlayerOptions) {
    this.options = options;
    this.init();
  }

  private init(): void {
    const { container, source, themeColor = '#E5A93C', autoplay = false, volume = 0.8 } = this.options;

    const isHls = source.type === 'm3u8' || source.url.includes('.m3u8');

    this.art = new Artplayer({
      container,
      url: source.url,
      type: isHls ? 'm3u8' : 'mp4',
      customType: {
        m3u8: (video: HTMLVideoElement, url: string, art: Artplayer) => {
          if (Hls.isSupported()) {
            if (this.hlsInstance) {
              this.hlsInstance.destroy();
            }
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
            });
            hls.loadSource(url);
            hls.attachMedia(video);
            this.hlsInstance = hls;

            art.on('destroy', () => {
              hls.destroy();
              this.hlsInstance = null;
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
          } else {
            art.notice.show = '当前浏览器环境不支持 HLS 流播放';
          }
        }
      },
      poster: source.poster || '',
      volume,
      autoplay,
      theme: themeColor,
      playbackRate: true,
      aspectRatio: true,
      setting: true,
      hotkey: true,
      pip: true,
      fullscreen: true,
      fullscreenWeb: true,
      playsInline: true,
      autoOrientation: true,
      airplay: true,
      icons: {
        state: '' // 遵循 P0 视觉规范，拔除默认生硬居中图标
      }
    });
  }

  public switchSource(source: PlaybackSource): void {
    if (!this.art) return;
    this.options.source = source;
    const isHls = source.type === 'm3u8' || source.url.includes('.m3u8');

    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }

    this.art.switchUrl(source.url);
    if (source.poster) {
      this.art.poster = source.poster;
    }
  }

  public play(): Promise<void> | void {
    return this.art?.play();
  }

  public pause(): void {
    this.art?.pause();
  }

  public destroy(): void {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    if (this.art) {
      this.art.destroy();
      this.art = null;
    }
  }

  public get instance(): Artplayer | null {
    return this.art;
  }
}
