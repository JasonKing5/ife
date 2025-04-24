# JasonKing Frontend

一个基于 React + TypeScript + Vite 构建的前端项目，支持用户登录注册、JWT 鉴权、Token 刷新机制、API 封装、权限控制、邮箱验证等完整功能模块。

## 技术栈
	•	框架: React 18
	•	构建工具: Vite
	•	语言: TypeScript
	•	路由管理: React Router v6
	•	状态管理: React Context
	•	表单管理: react-hook-form + zod
	•	请求库: axios + React Query（已封装统一请求与错误处理）
	•	认证机制: access_token + refresh_token 双令牌机制
	•	UI 框架: Tailwind CSS + shadcn/ui
	•	组件动画: Framer Motion
	•	邮箱服务: Resend（支持重置密码邮件发送）

## 项目结构

jasonking-frontend/
├── src/
│   ├── assets/             # 静态资源
│   ├── components/         # 通用组件
│   ├── contexts/           # React Context（含 AuthContext 认证上下文）
│   ├── hooks/              # 自定义 hooks（如 useAuth, useUserQuery 等）
│   ├── lib/                # axios 实例封装、工具函数等
│   ├── pages/              # 页面级组件
│   ├── routes/             # 路由定义
│   ├── types/              # 全局类型定义
│   ├── utils/              # 工具方法
│   ├── App.tsx             # 应用入口
│   └── main.tsx            # Vite 启动入口
├── public/                 # 公共资源
├── .env                    # 环境变量配置
├── index.html              # HTML 模板
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目文档

## 功能模块

✅ 用户模块
	•	用户注册 / 登录
	•	用户信息读取与更新
	•	登出与状态清理

✅ 鉴权与会话管理
	•	使用 access_token 携带身份请求
	•	使用 refresh_token 自动刷新令牌
	•	支持 token 失效自动重定向登录页
	•	登录信息本地存储（AuthContext）

✅ 表单验证
	•	使用 react-hook-form 管理表单状态
	•	使用 zod 执行类型安全的校验规则
	•	表单错误提示友好，国际化支持

✅ 请求封装与中间件处理
	•	axios + React Query 请求统一拦截、header 注入
	•	自动处理业务状态码、401 重登录机制
	•	统一 toast 反馈（sonner）

✅ 邮件验证功能（重置密码）
	•	使用 Resend 邮件服务（支持 HTML 模板 + 中英文双语）
	•	安全的 token 邮件链接重置机制
	•	域名验证支持

✅ UI/UX 优化
	•	使用 shadcn/ui 和 Tailwind 打造现代简约界面
	•	页面过渡与组件动画：Framer Motion
	•	支持移动端响应式布局

## 快速开始

### 环境要求
	•	Node.js >= 18
	•	pnpm >= 8

### 启动项目

1. 克隆仓库
git clone git@github.com:JasonKing5/ife.git
cd ife

2. 安装依赖
pnpm install

3. 启动开发服务器
pnpm dev

4. 环境变量配置 .env

VITE_API_BASE_URL=https://your-api-domain.com/api

## 鉴权机制说明
	•	登录成功后，access_token 和 refresh_token 存入 localStorage
	•	每次请求会自动携带 access_token
	•	若 token 过期，会尝试用 refresh_token 刷新，并替换旧 token
	•	若刷新失败，则重定向到登录页

## 安全建议
	•	前端不应持久保存 refresh token，可考虑配合 httpOnly cookie 实现更高安全性
	•	正式环境请开启 HTTPS
	•	尽量避免泄漏环境变量（如 Resend key）

## 推荐开发插件
	•	VSCode + Prettier + ESLint
	•	React DevTools
	•	Tailwind CSS IntelliSense

## License

MIT
