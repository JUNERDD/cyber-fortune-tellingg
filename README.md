# 赛博算命 (Cyber Fortune Telling)

一个现代化的在线算命应用，结合人工智能技术，为用户提供个性化的运势分析和建议。

![赛博算命界面预览](/public/image.png)

## ✨ 功能特点

- 🔮 多维度运势分析
  - 爱情运势
  - 事业运势
  - 财富运势
  - 健康运势
  - 综合运势
- 🤖 AI 驱动的智能分析
- 🎨 现代简约的用户界面
- 📱 响应式设计，支持多端访问
- 🔒 安全的 API 密钥管理

## 🛠️ 技术栈

- **前端框架**: Next.js 15.0
- **UI 组件**: HeroUI 组件库
- **样式方案**: Tailwind CSS
- **动画效果**: Framer Motion
- **AI 集成**: OpenRouter AI
- **表单处理**: React Hook Form
- **类型检查**: TypeScript
- **代码规范**: ESLint + Prettier

## 🚀 快速开始

1. 克隆项目
```bash
git clone [repository-url]
cd cyber-fortune-telling
```

2. 安装依赖
```bash
npm install
# 或
pnpm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
```
编辑 `.env.local` 文件，添加必要的环境变量：
- `OPENROUTER_API_KEY`（可选）

4. 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
```

5. 访问应用
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📝 使用说明

1. 输入个人信息（姓名、出生日期）
2. 选择想要了解的运势类型
3. 描述具体问题（可选）
4. 点击"开始算命"获取AI分析结果

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 📄 许可证（heroui）

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件
