import{createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const app={
    data(){
        return{
            Url:'https://vue3-course-api.hexschool.io/v2',//記得加上https:// and v2
            user:{
                userName:'',
                password:'',
            },


        };
    },
    methods:{
        login(){
            const api=`${this.Url}/admin/signin`;
            axios.post(api,this.user)
            .then((response)=>{
                console.log(response);
                const {token,expired}=response.data;
                document.cookie=`hexToken=${token};expires=${new Date(expired)}`;
                axios.defaults.headers.common["Authorization"] = token;
                alert("登入成功!");
                window.location="products.html";


            }).catch((err)=>{
                alert(err.data.message);

            })
        },

    },
    mounted(){

    },

};

createApp(app).mount('#app');


