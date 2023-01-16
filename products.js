import {createApp}from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

let productModal =null;
let delProductModal=null;

const app={
  data(){
    return{
      apiUrl:"https://vue3-course-api.hexschool.io/v2",
      apiPath:"ivy-20468",
      products:[],
      isNew:false,//預設產品狀態
      tempProduct:{
        imagesUrl:[],
      },
      text:"一段文字",

    };
  },
  methods:{
    //確認登入狀態
    checkLogin(){
      const url=`${this.apiUrl}/api/user/check`;
      axios.post(url)
      .then(()=>{
        //如果是登入的，呼叫渲染方法
        this.getData();
      })
      .catch((err)=>{
        alert(err.data.message);
        //導回登入頁
        window.location='login.html';
      })
    },
    ////渲染畫面
    getData(){
      let url=`${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios.get(url).then((response)=>{
        this.products=response.data.products;
      }).catch((err)=>{
        alert(err.data.message);
      })
    },
    updateProduct(){
      let url=`${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http="post";
      //是否為新的產品，如果不是就編輯
      if(!this.isNew){
        url=`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http="put";
      }
      //方法變put
      axios[http](url,{data:this.tempProduct}).then((response)=>{
        alert(response.data.message);
        productModal.hide();//隱藏動態視窗
        this.getData();//重新渲染畫面
      }).catch((err)=>{
        alert(err.response.data.message);
      })
      

    },
    openModal(isNew,item){
      if(isNew==='new'){
        //建立新的產品
        this.tempProduct={
          imagesUrl:[],
        };
        this.isNew=true;
        productModal.show();
      }else if(isNew==='edit'){
        //修改產品
        this.tempProduct={...item};
        this.isNew=false;
        productModal.show();
      }else if(isNew==='delete'){
        //刪除產品
        this.tempProduct={...item};
        delProductModal.show();
      }
    },
    delProduct(){
      const url=`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(url).then((response)=>{
        alert(response.data.message);
        delProductModal.hide();
        //重新渲染畫面
        this.getData();
      }).catch((err)=>{
        alert(err.data.message);
      })
    },
    createImages(){
      this.tempProduct.imagesUrl=[];
      this.tempProduct.imagesUrl.push('');
    },
  },

  mounted(){
    //生成Modal 實體 在初始化時
    productModal=new bootstrap.Modal(
      document.getElementById("productModal"),{
        keyboard:false,//按下 ESC 鍵時關閉互動視窗。
      }

    );

    delProductModal=new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard:false,//按下 ESC 鍵時關閉互動視窗
      }
    );
    const token =  document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token; // Cookie 有儲存時
      //defaults: 每次都會帶入
    this.checkLogin();
    
  },
};

createApp(app).mount("#app");