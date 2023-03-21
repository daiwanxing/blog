import{a4 as b,f as P,h as O,y as C,a6 as V,a7 as N,a8 as D,a9 as J,w as E,u as v,U as p,r as I,c as f,g as j,e as K,j as R,C as q,o as A,aa as M,x as H}from"./framework.b311cebe.js";import{a as Y}from"./theme.792f5dc7.js";function Z(e){for(var s=-1,t=e==null?0:e.length,o={};++s<t;){var a=e[s];o[a[0]]=a[1]}return o}const k=e=>e===void 0,Q=e=>b(e)?!Number.isNaN(Number(e)):!1;function W(e,s="px"){if(!e)return"";if(Y(e)||Q(e))return`${e}${s}`;if(b(e))return e}/*! Element Plus Icons Vue v2.1.0 */var X=(e,s)=>{let t=e.__vccOpts||e;for(let[o,a]of s)t[o]=a;return t},G={name:"Loading"},ee={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},se=C("path",{fill:"currentColor",d:"M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"},null,-1),te=[se];function ne(e,s,t,o,a,r){return P(),O("svg",ee,te)}var we=X(G,[["render",ne],["__file","loading.vue"]]);const B="__epPropKey",L=e=>e,oe=e=>V(e)&&!!e[B],F=(e,s)=>{if(!V(e)||oe(e))return e;const{values:t,required:o,default:a,type:r,validator:u}=e,y={type:r,required:!!o,validator:t||u?i=>{let m=!1,$=[];if(t&&($=Array.from(t),N(e,"default")&&$.push(a),m||(m=$.includes(i))),u&&(m||(m=u(i))),!m&&$.length>0){const g=[...new Set($)].map(z=>JSON.stringify(z)).join(", ");D(`Invalid prop: validation failed${s?` for prop "${s}"`:""}. Expected one of [${g}], got value ${JSON.stringify(i)}.`)}return m}:void 0,[B]:!0};return N(e,"default")&&(y.default=a),y},ae=e=>Z(Object.entries(e).map(([s,t])=>[s,F(t,s)])),Se=L([String,Object,Function]),re=(e,s)=>{if(e.install=t=>{for(const o of[e,...Object.values(s??{})])t.component(o.name,o)},s)for(const[t,o]of Object.entries(s))e[t]=o;return e},be=e=>(e.install=J,e),ce=["","default","small","large"],Pe=({from:e,replacement:s,scope:t,version:o,ref:a,type:r="API"},u)=>{E(()=>v(u),d=>{},{immediate:!0})},w="el",le="is-",_=(e,s,t,o,a)=>{let r=`${e}-${s}`;return t&&(r+=`-${t}`),o&&(r+=`__${o}`),a&&(r+=`--${a}`),r},ue=Symbol("namespaceContextKey"),T=e=>{const s=e||p(ue,I(w));return f(()=>v(s)||w)},ie=(e,s)=>{const t=T(s);return{namespace:t,b:(n="")=>_(t.value,e,n,"",""),e:n=>n?_(t.value,e,"",n,""):"",m:n=>n?_(t.value,e,"","",n):"",be:(n,c)=>n&&c?_(t.value,e,n,c,""):"",em:(n,c)=>n&&c?_(t.value,e,"",n,c):"",bm:(n,c)=>n&&c?_(t.value,e,n,"",c):"",bem:(n,c,l)=>n&&c&&l?_(t.value,e,n,c,l):"",is:(n,...c)=>{const l=c.length>=1?c[0]:!0;return n&&l?`${le}${n}`:""},cssVar:n=>{const c={};for(const l in n)n[l]&&(c[`--${t.value}-${l}`]=n[l]);return c},cssVarName:n=>`--${t.value}-${n}`,cssVarBlock:n=>{const c={};for(const l in n)n[l]&&(c[`--${t.value}-${e}-${l}`]=n[l]);return c},cssVarBlockName:n=>`--${t.value}-${e}-${n}`}},U=e=>{const s=j();return f(()=>{var t,o;return(o=(t=s==null?void 0:s.proxy)==null?void 0:t.$props)==null?void 0:o[e]})},S={prefix:Math.floor(Math.random()*1e4),current:0},de=Symbol("elIdInjection"),ve=()=>j()?p(de,S):S,pe=e=>{const s=ve(),t=T();return f(()=>v(e)||`${t.value}-id-${s.prefix}-${s.current++}`)},Oe=F({type:String,values:ce,required:!1}),fe=Symbol("size"),me=()=>{const e=p(fe,{});return f(()=>v(e.size)||"")};var _e=(e,s)=>{const t=e.__vccOpts||e;for(const[o,a]of s)t[o]=a;return t};const ye=ae({size:{type:L([Number,String])},color:{type:String}}),$e=K({name:"ElIcon",inheritAttrs:!1}),Ie=K({...$e,props:ye,setup(e){const s=e,t=ie("icon"),o=f(()=>{const{size:a,color:r}=s;return!a&&!r?{}:{fontSize:k(a)?void 0:W(a),"--color":r}});return(a,r)=>(P(),O("i",q({class:v(t).b(),style:v(o)},a.$attrs),[R(a.$slots,"default")],16))}});var he=_e(Ie,[["__file","/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);const Ve=re(he),h=Symbol("formContextKey"),x=Symbol("formItemContextKey"),Ee=(e,s={})=>{const t=I(void 0),o=s.prop?t:U("size"),a=s.global?t:me(),r=s.form?{size:void 0}:p(h,void 0),u=s.formItem?{size:void 0}:p(x,void 0);return f(()=>o.value||v(e)||(u==null?void 0:u.size)||(r==null?void 0:r.size)||a.value||"")},je=e=>{const s=U("disabled"),t=p(h,void 0);return f(()=>s.value||v(e)||(t==null?void 0:t.disabled)||!1)},Ke=()=>{const e=p(h,void 0),s=p(x,void 0);return{form:e,formItem:s}},Be=(e,{formItemContext:s,disableIdGeneration:t,disableIdManagement:o})=>{t||(t=I(!1)),o||(o=I(!1));const a=I();let r;const u=f(()=>{var d;return!!(!e.label&&s&&s.inputIds&&((d=s.inputIds)==null?void 0:d.length)<=1)});return A(()=>{r=E([M(e,"id"),t],([d,y])=>{const i=d??(y?void 0:pe().value);i!==a.value&&(s!=null&&s.removeInputId&&(a.value&&s.removeInputId(a.value),!(o!=null&&o.value)&&!y&&i&&s.addInputId(i)),a.value=i)},{immediate:!0})}),H(()=>{r&&r(),s!=null&&s.removeInputId&&a.value&&s.removeInputId(a.value)}),{isLabeledByFormItem:u,inputId:a}};export{Ve as E,_e as _,Ke as a,ae as b,ce as c,L as d,Ee as e,Pe as f,Be as g,je as h,Se as i,W as j,Oe as k,we as l,be as m,ie as u,re as w};