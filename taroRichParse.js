import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'

let globalDate = {
  fun: null,
  template: null
}

getEnv()

function getEnv() {
  const env = Taro.getEnv()
  if (env === ENV_TYPE.WEAPP){
    var WxParse = require('./wxParse/wxParse');
    globalDate.fun = wxCode()
  } else if (env === ENV_TYPE.SWAN){
    var bdParse = require('./bdParse/bdParse');
    globalDate.fun = bdCode()
  }
}

function bdCode() {
  return function (self, that) {
    const  content = self.state.content
    self.setData({ content: bdParse.bdParse('article', 'html', content, that, 5), })
    const template = (
      <View>
        <import src="../../bdParse/bdParse.swan" />
        <template is="bdParse" data="{{ {bdParseData: article.nodes} }}" />
      </View>
    )
    globalDate.template = template
  }
}

function wxCode() {
  return function (self, that) {
    var  article = self.state.desc
    WxParse.wxParse('article', 'html', article, that, 0)
    const template = (
      <View>
        <import src='./wxParse/wxParse.wxml'/>
        <template is="wxParse" data="{{wxParseData:article.nodes}}"/>
      </View>
    )
    globalDate.template = template
  }
}

export default class TaroRichParse extends Component {

  state = {
    desc: '',
    content: ''
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps::',nextProps)
    this.setState({
      desc: nextProps.desc,
      content: nextProps.desc
    })
  }

  componentWillUpdate() {
    console.log('componentWillUpdate::',this.state.desc)
  }

  componentDidUpdate() {
    console.log('componentDidUpdate::',this.state.desc)
    var self = this
    var that =  this.$scope
    if (self.state.desc) {
      console.log('有内容')
      globalDate.fun(self, that)
    }
    else {
      console.log('没有获取到资源')
    }
  }
  componentWillMount() {
    console.log('componentWillMount::',this.state.desc)
  }

  componentDidMount() {
    console.log('componentDidMount::',this.state.desc)

  }

  componentWillUnmout() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {

    return (
      <View>
        {/* <import src='./wxParse/wxParse.wxml'/>
        <template is="wxParse" data="{{wxParseData:article.nodes}}"/> */}
        {globalDate.template}
        {/* <import src="../../bdParse/bdParse.swan" />
        <template is="bdParse" data="{{ {bdParseData: article.nodes} }}" /> */}
      </View>
    )
  }
}
