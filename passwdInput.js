// component/passwdInput/passwdInput.js
let timer = null
let cachedIndex = -1
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max:{
      type:Number,
      default:6,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0,
    list:[],
    showFocus:false,
    showKeyBoard:false,
  },
  lifetimes:{
    attached(){
      this.init()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      cachedIndex = -1
      this.setData({ 
        currentIndex:0,
        list:Array.from({ length:this.properties.max }).map((_,index)=>{
          return {
            id:index+1,
            input:'',
          }
        }) 
      })
    },
    inputChange(e){
      let value = e.currentTarget.dataset.value
      let { currentIndex } = this.data
      let { max } = this.properties
      this.setData({ 
        currentIndex:this.data.currentIndex + 1,
        [`list[${ currentIndex }].input`]:value
      },()=>{
        if(this.data.currentIndex === max ){
          let res = this.data.list.map(item => item.input)
          this.closeKeyboard()
          this.triggerEvent('end',res.join(''))
        }
      })
    },
    startFocus(){
      this.setData({ showFocus:true })
      timer = setInterval(()=>{
        this.setData({ showFocus:!this.data.showFocus })
      },500)
    },
    endFocus(){
      clearInterval(timer)
      this.setData({ showFocus:false })
    },
    backClick(){
      let { currentIndex } = this.data
      if(currentIndex === 0) return
      this.setData({ 
        currentIndex:currentIndex - 1,
        [`list[${ currentIndex - 1}].input`]:''
      })
    },
    openKeyBoard(){
      let { max } = this.properties
      console.log(cachedIndex)
      if(cachedIndex === max){
        this.setData({ 
          [`list[${ cachedIndex - 1}].input`]:'',
          currentIndex:cachedIndex - 1,
          showKeyBoard:true 
        })
      }else if(cachedIndex === -1){
        this.setData({ currentIndex:0,showKeyBoard:true })
      }else{
        this.setData({ currentIndex:cachedIndex,showKeyBoard:true })
      }
      this.startFocus()
    },
    closeKeyboard(){
      cachedIndex = this.data.currentIndex
      this.setData({ currentIndex:-1,showKeyBoard:false })
      this.endFocus()
    },
    stop(){
      
    },
  }
})
