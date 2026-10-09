/**
 * 合规公版开源演示流 (Blender Foundation 公益开源短片)
 * 用于演示全屏手势、选集滑轨、倍速与双内核切换能力
 */
import type { MediaTitleDetail } from './core/types';

export const DEMO_MEDIA: MediaTitleDetail = {
  id: 'demo-blender-tears-of-steel',
  title: '钢铁之泪 (Tears of Steel)',
  coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=640&q=80',
  intro: 'Blender 基金会开源科幻电影项目，用于验证高码率 HLS 流媒体播放、手势 HUD 调节与多剧集状态机切换。',
  seasons: [
    {
      seasonNumber: 1,
      title: '第一季 · 科幻开源短片集',
      episodes: [
        {
          episodeNumber: 1,
          title: '第1集 · Tears of Steel (HLS 流)',
          url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          duration: 734
        },
        {
          episodeNumber: 2,
          title: '第2集 · Big Buck Bunny (MP4 流)',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          duration: 596
        },
        {
          episodeNumber: 3,
          title: '第3集 · Elephants Dream (备用演示)',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          duration: 653
        }
      ]
    }
  ]
};
