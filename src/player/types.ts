/**
 * Prism Play Core — 播放器内核统一抽象定义
 */

export type PlaybackEngineType = 'web-hls' | 'web-mp4' | 'native-exoplayer';

export interface PlaybackSource {
  url: string;
  type?: 'm3u8' | 'mp4' | 'auto';
  title?: string;
  poster?: string;
  headers?: Record<string, string>;
}

export interface PlayerEventMap {
  play: () => void;
  pause: () => void;
  timeupdate: (currentTime: number, duration: number) => void;
  ended: () => void;
  error: (error: Error) => void;
  fullscreen: (isFullscreen: boolean) => void;
}

export interface PlayerOptions {
  container: HTMLDivElement | string;
  source: PlaybackSource;
  themeColor?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  playbackRate?: number;
}
