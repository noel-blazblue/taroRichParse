## 组件说明

> taro框架wxParse和bdParse封装组件，随时更新

### 使用方式如下：

- 组件名称

```js
TaroRichParse
```

-  下载到`src/components`

- 使用方法：

```js
import TaroRichParse from '../../components/taroRichParse'

<View>
  <TaroRichParse desc={detail}></TaroRichParse>
</View>

```
-  desc（详情描述） 数据获取

```js
constructor(props) {
  super(props)
  this.state = {
    detail: '<div>我是div内容</div>'
  }
}

