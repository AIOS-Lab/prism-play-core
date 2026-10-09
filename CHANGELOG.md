# 变更日志 (CHANGELOG)

本项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/) 规范。

---

## [1.0.0] - 2026-10-09

### 新增 (Added)
- **初始开源切片发布**：完成对生产级流媒体应用核心播放与交互架构的净室萃取。
- **双引擎播放控制器 (`PrismPlayer`)**：
  - 基于 ArtPlayer 5.4 + Hls.js 深度封装的统一播放器门面；
  - 支持 HLS 自适应码率分片拉取与 MP4 原生硬解无缝路由；
  - 完善的播放状态机、防假死加载、异常重试与退出清理机制。
- **流媒体视觉与设计系统**：
  - 院线级流媒体主题 Tokens：琥珀金 (`#E5A93C`) 与 OLED 黑曜石夜空 (`#080A10`) 双模切换；
  - 严格遵守 P0 规范（内联 Lucide 2px SVG，零 Emoji 图标，零裸 Hex 色值）。
- **完整移动端交互生态**：
  - 大视界横滑频道导航条 (`ChannelBar`) 与胶囊分类组件；
  - 选集横滑轨 (`EpisodeRail`) 与多剧集状态机切换；
  - 自适应多模态海报瀑布流网格 (`PosterGrid`)。
- **公版合规 Demo 媒体源**：
  - 内置 Blender 基金会开源科幻短片《Tears of Steel》HLS/MP4 演示流，开箱即播。
- **Q-Flow 证据化架构图谱**：
  - 内置全套 Q-Flow 架构资产（`docs/qgraphflow/`），所有节点与边 100% 锚定至真实源码 `file:line`，提供离线可交互浏览能力。
- **合规与法律装甲**：
  - 采用 Apache License 2.0 协议，明确保留商标保护权；
  - 附带《免责与合规声明》(DISCLAIMER.md)，申明武器中立原则。
