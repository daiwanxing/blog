import{_ as u,f as o,h as l,y as n,e as C,c as d,V as g,z as _,A as y,j as m,k as h,u as c,Z as A,J as f,D as r,l as v,R as F}from"./chunks/framework.229ba910.js";import{b,u as B,_ as k,w}from"./chunks/base.8c20c88c.js";import{E as S}from"./chunks/el-button.8c923244.js";import{u as q}from"./chunks/theme.2b8c16c2.js";const x={},E={class:"page"},T=n("header",null,[n("p",null," Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt iure ut animi vero a, inventore dolorem in assumenda maxime est eaque vel aspernatur aliquam porro explicabo tenetur vitae ab quis. ")],-1),P=n("main",null,[n("p",null," Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro eaque doloremque accusamus molestiae delectus facilis eius, ipsam ratione quibusdam quos, dolor ullam. Non quia, saepe doloremque facere quaerat adipisci mollitia! ")],-1),$=n("footer",null,[n("p",null," Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora praesentium ea earum, autem similique deleniti repudiandae ad quae eligendi, atque quaerat in quis maxime minima commodi? Aperiam deserunt voluptatibus porro. ")],-1),N=[T,P,$];function R(t,s){return o(),l("div",E,N)}const V=u(x,[["render",R]]),I=Symbol("rowContextKey"),j=["start","center","end","space-around","space-between","space-evenly"],L=["top","middle","bottom"],z=b({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:j,default:"start"},align:{type:String,values:L,default:"top"}}),J=C({name:"ElRow"}),K=C({...J,props:z,setup(t){const s=t,e=B("row"),D=d(()=>s.gutter);g(I,{gutter:D});const p=d(()=>{const a={};return s.gutter&&(a.marginRight=a.marginLeft=`-${s.gutter/2}px`),a}),i=d(()=>[e.b(),e.is(`justify-${s.justify}`,s.justify!=="start"),e.is(`align-${s.align}`,s.align!=="top")]);return(a,ss)=>(o(),_(f(a.tag),{class:h(c(i)),style:A(c(p))},{default:y(()=>[m(a.$slots,"default")]),_:3},8,["class","style"]))}});var O=k(K,[["__file","/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);const U=w(O);const Z={class:"has_div"},G={key:0},H={key:1},M={__name:"_has",setup(t){const[s,e]=q();return(D,p)=>{const i=S,a=U;return o(),l("div",null,[n("div",Z,[c(s)?(o(),l("p",G)):(o(),l("article",H))]),r(a,{style:{"margin-top":"10px"}},{default:y(()=>[r(i,{onClick:p[0]||(p[0]=()=>c(e)())},{default:y(()=>[v("切换")]),_:1})]),_:1})])}}},Q=F("",19),W=F("",20),X=F("",6),ls=JSON.parse('{"title":"CSS3 新伪类选择器","description":"","frontmatter":{},"headers":[],"relativePath":"articles/css/new_pseudo_selector.md","lastUpdated":1680399738000}'),Y={name:"articles/css/new_pseudo_selector.md"},ts=Object.assign(Y,{setup(t){return(s,e)=>(o(),l("div",null,[Q,r(V),W,r(M),X]))}});export{ls as __pageData,ts as default};
