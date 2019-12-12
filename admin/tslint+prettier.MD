1. 安装相关依赖

```bash
$ yarn add -D tslint tslint-config-prettier tslint-config-standard tslint-react
$ yarn add -D prettier
```

2. 初始化 tslint

执行 `npx tslint --init` 会自动在项目中生成一个名为 `tslint.json` 的文件，修改其中的配置为

```json
{
  "defaultSeverity": "error",
  "extends": [
    "tslint:recommended",
    "tslint-config-standard",
    "tslint-react",
    "tslint-config-prettier"
  ],
  "jsRules": {},
  "rules": {},
  "rulesDirectory": []
}
```

此时 tslint 其实就配置完了，在命令行中执行 `npx tslint 'src/**/*.{ts,tsx}'` 就可以看到报错，不过这样不够好用。

3. 配置 prettier

```js
$ touch .prettierrc
```

新建一个名为 `.prettierrc` 的文件，在其中加入类似如下配置：

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

> 这里配置的其实都是代码的样式风格，可以参照官方文档进行修改。
> 有了上述配置，prettier 其实也已经可以通过命令行工作了，不过这也还不够方便。

4. 配置 VSCode 使用
   1. 安装 VSCode 插件：[TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) 和 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)；
   2. 在 VSCode 首选项 - 配置中配置
      1. `editor.formatOnSave:true` 开启保存时候自动格式化,
      2. `javascript.format.enable:false`，取消 VScode 支持的 JS 的格式化

大功告成，现在我们在编辑器中就可以看到 TSLint 的报错，点击保存的时候，代码就能自动格式化了。

来源：掘金作者@[Fundebug](https://gist.github.com/Val-Zhang/f34a318ffd46b037f00b9a29c90a5082);
