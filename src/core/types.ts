/**
 * Prism Play Core — 通用媒体与播放抽象契约
 * 纯净开源实现，不依赖任何特定云端后端或上游服务
 */

export type ErrorCode = 
  | 'NETWORK_ERROR'
  | 'UNEXPECTED_RESPONSE'
  | 'MEDIA_DECODE_ERROR'
  | 'SOURCE_UNAVAILABLE'
  | 'RATE_LIMITED';

export class ApiError extends Error {
  readonly code: ErrorCode;
  readonly status: number;

  constructor(code: ErrorCode, status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

export function usesLocalEpisodeIds(): boolean {
  return false;
}

export interface MediaEpisode {
  episodeNumber: number;
  title: string;
  url: string;
  duration?: number;
}

export interface MediaSeason {
  seasonNumber: number;
  title: string;
  episodes: MediaEpisode[];
}

export interface MediaTitleDetail {
  id: string;
  title: string;
  coverUrl: string;
  intro: string;
  seasons: MediaSeason[];
}
