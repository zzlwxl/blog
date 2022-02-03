/**   
 * api接口统一管理
 */
 import { get, post ,deletefn} from './http'
 //注册
 export const reguser = (userInfo) => post('/api/reguser',userInfo);
 //登录
 export const login = (userInfo) => post('/api/login',userInfo);
 //更新用户信息
 export const updateUserinfo = (userInfo)=>post('/my/userinfo',userInfo)
 //获取用户信息
 export const getUserinfo = ()=>get('/my/userinfo')
 //更改用户密码
 export const updateCode = (code)=>post('/my/updatepwd',code)
 //获取文章分类
 export const getCates = ()=>get('/anyone/artcate/cates')
 //新增文章分类
 export const addCate = (cateInfo)=>post('/my/artcate/addcates',cateInfo)
 //发布新文章
 export const addArticle = (contentInfo)=>post('/my/article/add',contentInfo)
 //获取文章列表
 export const getContentList =(offset,limit)=>get(`/anyone/article/getarticles?offset=${offset}&limit=${limit}`)
 //获取分类下文章列表
 export const getContentListByCate =(cate_id,offset,limit)=>get(`/anyone/article/getarticles/bycate?cate_id=${cate_id}&offset=${offset}&limit=${limit}`)
 //获取指定用户下文章列表
 export const getContentListByUser =(offset,limit)=>get(`/my/article/byuser/getarticles?offset=${offset}&limit=${limit}`)
 //根据ID获取文章详情
 export const getContentInfo =(id)=>get(`/anyone/article/getarticle/info/${id}`)
 //更新文章
 export const updataContent =(id,formInfo)=>post(`/my/article/update/articleinfo/${id}`,formInfo)
 //用户删除文章
 export const delContent = (id) => deletefn(`/my/article/delarticle/${id}`)

