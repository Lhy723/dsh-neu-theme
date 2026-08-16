# dsh-neu-theme

**DeepSeek Harness web 的轻拟物(Soft-UI)主题插件**——奶油浅色与墨蓝深色两套配色,
完整的光影、材质、纹理、磨砂玻璃与微交互动画。

English version: [README.md](README.md)。

## 特性

- **两套主题**注册进内置 ThemeRuntime:
  - `neu-light` — 奶油暖白画布,柔和灰蓝点缀
  - `neu-dark` — 墨蓝夜画布,幽光靛紫点缀
- **光影** — 环境顶光 + 角落补光,铺在真实可见的表面(对话画布、侧边栏、细节面板)
- **材质** — 三层阴影(接触影 + 投影 + 顶边高光)、145° 光泽渐变对齐光源方向、
  代码块背光内壁
- **纹理** — 细腻灰度噪点(内联 SVG feTurbulence)覆盖画布、侧边栏、细节面板与代码块
- **磨砂玻璃** — 输入栏与它的弹出层(权限菜单、模型菜单、上下文面板)共享同一套
  玻璃语言:输入栏的模糊放在 `::before` 伪元素层,弹层保留自己的真实
  `backdrop-filter` 模糊(卡片不再是它们的 backdrop root)
- **微交互动画** — 对话节点挂载淡入、气泡 hover 上浮、输入区聚焦凹陷加深、
  工具行与思考行 hover 增强;全部受 `prefers-reduced-motion` 保护
- **设置入口** — 设置 → 通用 → Neumorphism theme(Default / Neu Light / Neu Dark),
  选择持久化在 localStorage
- **默认即原生** — 选 Default(或从未选择)时,页面与 dsh 原生完全一致:
  不注入样式、不打 body 标记、原生颜色与阴影

## 安装

```sh
dsh plugin --profile web add <路径或 git 地址>
# 本地开发:
cd ~/.dsh/profiles/web
pnpm add file:/path/to/dsh-neu-theme
```

然后把 `"dsh-neu-theme"` 加入 profile `package.json` 的
`dsh.profile.bundles`,重启 `dsh web`。

使用:**设置 → 通用 → Neumorphism theme** 选择 **Default / Neu Light / Neu Dark**。
选择存储在 `localStorage` 的 `dsh-neu:skin`(清除该键即回到内置外观)。

## 开发

```sh
npm run build   # 从 src/client.tpl.js + themes/*.json 重新生成 lib/client.js
npm run check   # 语法检查构建产物
```

`dsh web` 运行期间,HMR 链会轮询 `lib/client.js`,重建后只热重载本插件。

## 仓库结构

```
dsh-neu-theme/
├── package.json          # dsh.bundle.patch + dsh.client 清单
├── cordis.patch.yml      # loader entry 插入(id: neu-theme)
├── themes/               # neu-light.json / neu-dark.json — 调色板
├── src/
│   ├── index.js          # Host 半(空 loader entry)
│   └── client.tpl.js     # 浏览器半模板(构建时注入主题)
├── scripts/build.mjs     # 零依赖构建脚本
└── lib/                  # 生成产物(git 忽略)
```

## License

MIT
