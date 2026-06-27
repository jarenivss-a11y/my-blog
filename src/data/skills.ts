export interface Skill {
  name: string;
  desc: string;
  version?: string;
}

export interface SkillCategory {
  icon: string;
  items: Skill[];
}

export const skills: Record<string, SkillCategory> = {
  "飞书系列": {
    icon: "📦",
    items: [
      { name: "lark-approval", desc: "飞书审批 API：审批实例、审批任务管理", version: "1.0.0" },
      { name: "lark-attendance", desc: "飞书考勤打卡：查询自己的考勤打卡记录", version: "1.0.0" },
      { name: "lark-base", desc: "飞书多维表格：搜索 Base，建表、字段管理、记录读写等", version: "1.2.0" },
      { name: "lark-calendar", desc: "飞书日历：查看/搜索日程、创建/更新日程、管理参会人", version: "1.0.0" },
      { name: "lark-contact", desc: "飞书通讯录：按姓名/邮箱解析员工为 open_id", version: "1.0.0" },
      { name: "lark-doc", desc: "飞书云文档：创建和编辑飞书文档，支持 Markdown", version: "2.0.0" },
      { name: "lark-drive", desc: "飞书云空间：管理文件和文件夹，上传下载", version: "1.0.0" },
      { name: "lark-event", desc: "飞书实时事件：流式消费事件，支持 IM 消息、 reactions 等", version: "1.0.0" },
      { name: "lark-im", desc: "飞书即时通讯：收发消息、管理群聊、搜索记录", version: "1.0.0" },
      { name: "lark-mail", desc: "飞书邮箱：起草、发送、回复、搜索邮件", version: "1.0.0" },
      { name: "lark-markdown", desc: "飞书 Markdown：查看、创建、上传和编辑 Markdown 文件", version: "1.0.0" },
      { name: "lark-minutes", desc: "飞书妙记：查询妙记、下载音视频、获取 AI 产物", version: "1.0.0" },
      { name: "lark-okr", desc: "飞书 OKR：管理目标与关键结果，查看对齐关系", version: "1.0.0" },
      { name: "lark-openapi-explorer", desc: "飞书 OpenAPI 探索：从官方文档库挖掘原生 API", version: "1.0.0" },
      { name: "lark-shared", desc: "飞书共享基础：应用配置初始化、认证登录、权限管理", version: "1.0.0" },
      { name: "lark-sheets", desc: "飞书电子表格：创建表格、读写数据、导出表格", version: "1.1.0" },
      { name: "lark-skill-maker", desc: "创建 lark-cli 的自定义 Skill", version: "1.0.0" },
      { name: "lark-slides", desc: "飞书幻灯片：创建和编辑幻灯片", version: "1.0.0" },
      { name: "lark-task", desc: "飞书任务：管理任务、清单、分配协作成员", version: "1.0.0" },
      { name: "lark-vc", desc: "飞书视频会议：查询会议记录、获取会议纪要产物", version: "1.0.0" },
      { name: "lark-whiteboard", desc: "飞书画板：查询和编辑画板，导出预览图片", version: "1.0.0" },
      { name: "lark-wiki", desc: "飞书知识库：管理知识空间、空间成员和文档节点", version: "1.0.0" },
      { name: "lark-workflow-meeting-summary", desc: "会议纪要整理工作流：汇总会议纪要生成结构化报告", version: "1.0.0" },
      { name: "lark-workflow-standup-report", desc: "日程待办摘要：生成日程与未完成任务摘要", version: "1.0.0" }
    ]
  },
  "产品设计": {
    icon: "🎨",
    items: [
      { name: "general-productivity", desc: "代码审查：基于最佳实践提供全面的代码审查反馈", version: "-" },
      { name: "frontend-design", desc: "前端界面设计：创建独特、生产级的前端界面", version: "-" },
      { name: "canvas-design", desc: "视觉艺术设计：使用设计理念创建美观的视觉艺术", version: "-" },
      { name: "doc-coauthoring", desc: "文档协作：引导用户完成结构化的文档协作工作流", version: "-" },
      { name: "claude-md-management", desc: "CLAUDE.md 管理：审计、质量评估和针对性改进", version: "-" },
      { name: "huashu-design", desc: "全能设计交付：HTML原型/交互Demo/幻灯片/动画/设计变体+5维评审", version: "-" }
    ]
  },
  "开发工具": {
    icon: "🔧",
    items: [
      { name: "github", desc: "GitHub 交互：使用 gh CLI 管理 issues、PRs、CI 等", version: "-" },
      { name: "playwright-cli", desc: "Web 应用测试：使用 Playwright 交互和测试本地 Web 应用", version: "-" },
      { name: "building-native-ui", desc: "原生 UI 构建：构建原生界面组件", version: "-" },
      { name: "find-skills", desc: "技能搜索：搜索和发现可用的 Claude Code Skills", version: "-" },
      { name: "self-improving-agent", desc: "自改进代理：捕获学习、错误和修正实现持续改进", version: "-" },
      { name: "addy-agent-skills", desc: "Google工程师出品：24个生产级工程技能（/spec /plan /build /test /review /ship）", version: "-" }
    ]
  },
  "AI媒体": {
    icon: "✨",
    items: [
      { name: "minimax-docx", desc: "生成 Word 文档：创建专业文档，支持学术/商业样式", version: "1.0.0" },
      { name: "minimax-pdf", desc: "生成 PDF：创建高质量 PDF 文档和报告", version: "-" },
      { name: "minimax-xlsx", desc: "生成 Excel：创建和分析电子表格、财务模型", version: "-" },
      { name: "pptx-generator", desc: "生成 PPT：使用 PptxGenJS 创建演示文稿", version: "-" },
      { name: "ppt-master", desc: "AI生成可编辑PPT：支持原生形状/动画、语音旁白、模板定制", version: "-" },
      { name: "multi-search-engine", desc: "多引擎联网搜索：必应/Google/百度，支持专业网站站内搜索", version: "-" },
      { name: "anthropic-algorithmic-art", desc: "算法艺术：使用 p5.js 创建生成艺术", version: "-" },
      { name: "gpt-image-2", desc: "GPT Image 2：18大类80+模板，覆盖海报/UI/信息图/技术图/漫画", version: "-" },
      { name: "web-video-presentation", desc: "网页演示：16:9点击驱动演示，23种主题，可合成旁白音频", version: "-" },
      { name: "805bfa87-...", desc: "主题工厂：为幻灯片、文档、报告等应用主题", version: "-" }
    ]
  },
  "AI思维模型": {
    icon: "🧠",
    items: [
      { name: "nuwa-skill", desc: "女娲造人：技能蒸馏框架，用于创建人物思维模型", version: "-" },
      { name: "elon-musk-perspective", desc: "马斯克思维框架：第一性原理、决策启发式、表达DNA", version: "-" },
      { name: "karpathy-guidelines", desc: "Karpathy编码准则：编码前思考/简洁优先/精准修改/目标驱动", version: "-" }
    ]
  },
  "其他": {
    icon: "📚",
    items: [
      { name: "systematic-debugging", desc: "系统调试：假设驱动调查、日志分析、二分法隔离缺陷", version: "-" },
      { name: "skills-org-webapp-testing", desc: "Web 测试：使用 Playwright 验证前端功能、调试 UI", version: "-" },
      { name: "web-artifacts-builder", desc: "Web 组件构建：创建复杂的 React/HTML 组件", version: "-" },
      { name: "deep-research", desc: "深度研究：多源搜索、事实核查、合成引用报告", version: "-" },
      { name: "wechat-article-publisher", desc: "微信公众号发布：自动排版、一键发布到微信平台", version: "-" }
    ]
  }
};

export const totalSkills = Object.values(skills).reduce((sum, cat) => sum + cat.items.length, 0);
