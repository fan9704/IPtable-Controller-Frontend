import{x as p,v as o,B as i,V as R,z as I}from"./vuetify-C18Pwkks.js";import{g,d as u,U as c,V as _,W as t,m as e,O as m,X as N,F as P,Y as T,a0 as v,_ as U}from"./vue-Cfb3gJkC.js";const $=U("h1",{id:"index-title"},"Iptables NAT 指令生成頁面",-1),B=g({__name:"index",setup(x){const n=u(""),s=u(""),d=u(""),r=u(""),f=u([]),b=()=>{const V=`iptables -t nat -A PREROUTING -p tcp --dport ${s.value} -j DNAT --to-destination ${d.value}:${r.value}`,a=`iptables -t nat -A POSTROUTING -p tcp -d ${d.value} --dport ${r.value} -j SNAT --to-source ${n.value}`;let l={preRouting:V,postRouting:a};f.value.push(l)};return(V,a)=>(c(),_(I,null,{default:t(()=>[e(p,{class:"justify-center"},{default:t(()=>[e(o,{style:{"text-align":"center"}},{default:t(()=>[$]),_:1})]),_:1}),e(p,{class:"justify-center"},{default:t(()=>[e(o,{cols:"3"},{default:t(()=>[e(i,{label:"對外 IP",modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=l=>n.value=l)},null,8,["modelValue"])]),_:1}),e(o,{cols:"3"},{default:t(()=>[e(i,{label:"對外 Port",modelValue:s.value,"onUpdate:modelValue":a[1]||(a[1]=l=>s.value=l)},null,8,["modelValue"])]),_:1}),e(o,{cols:"3"},{default:t(()=>[e(i,{label:"對內 IP",modelValue:d.value,"onUpdate:modelValue":a[2]||(a[2]=l=>d.value=l)},null,8,["modelValue"])]),_:1}),e(o,{cols:"3"},{default:t(()=>[e(i,{label:"對內 Port",modelValue:r.value,"onUpdate:modelValue":a[3]||(a[3]=l=>r.value=l)},null,8,["modelValue"])]),_:1})]),_:1}),e(p,null,{default:t(()=>[e(o,{cols:"12"},{default:t(()=>[e(R,{onClick:b},{default:t(()=>[m(" 提交 ")]),_:1})]),_:1})]),_:1}),(c(!0),N(P,null,T(f.value,(l,C)=>(c(),_(p,null,{default:t(()=>[e(o,{cols:"6"},{default:t(()=>[m(v(l.preRouting),1)]),_:2},1024),e(o,{cols:"6"},{default:t(()=>[m(v(l.postRouting),1)]),_:2},1024)]),_:2},1024))),256))]),_:1}))}}),O=g({__name:"IptablesView",setup(x){return(n,s)=>(c(),_(B))}});export{O as default};