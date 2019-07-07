import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'

// var WxParse = require('./wxParse/wxParse');
var bdParse = require('./bdParse/bdParse');

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
      // var  article = self.state.desc
      // WxParse.wxParse('article', 'html', article, that, 0)

      var  content = self.state.content
      that.setData({ content: bdParse.bdParse('article', 'html', content, that, 5), })
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

        <import src="../../bdParse/bdParse.swan" />
        <template is="bdParse" data="{{ {bdParseData:article.nodes} }}" />
      </View>
    )
  }
}
