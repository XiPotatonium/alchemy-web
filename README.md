# alchemy-web

## TODO

- [ ] FileExplorer的布局依然有很大问题，icon和搜素框没有垂直居中，toolbar是不是置顶会比较好
- [ ] 排序怎么实现？文件名称/类型/日期排序，支持顺序和倒序，是不是目前只有table有比较好的实现？但是vuetify3目前没有datatable
- [ ] item的hover和点击没有反馈，至少hover的时候需要变换鼠标样式，这个最好在排序实现之后再搞
- [ ] toolbar里面加一个刷新
- [ ] Records界面访问了不存在的文件夹需要进行处理
- [ ] Inbox (搜索，删除，已读未读，刷新，归档(checkbox筛选))
- [ ] Home页面（定时监视Inbox），显示基本信息，设置（Theme，监视间隔）
- [ ] 一个简单的MARKDOWN渲染器，可以渲染项目的README以及日志文件中的README
- [ ] Note页面，可以制作表格，表格元素可以链接文件夹。这可以用于实验记录的填写
- [ ] FIX: period的rule判断是不是整数，要么绑定的那个值就永远是string好了，等到post的时候再转换为number

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
