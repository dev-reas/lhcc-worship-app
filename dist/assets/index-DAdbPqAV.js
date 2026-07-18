const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RoleSelectorView-SiVilBln.js","assets/practice-mode-DbA7dqT2.js","assets/practice-mode-Em7pTRiO.css","assets/RoleSelectorView-C3k9mHzQ.css","assets/HomeView-BT4cqH8c.js","assets/lineupStore-AZHQ9XiD.js","assets/date-DhSNj_5M.js","assets/EmptyState-BXoVO6F5.js","assets/EmptyState-hxkhVG2J.css","assets/HomeView-Ev0TYGtc.css","assets/SongListView-Dr1luY02.js","assets/SearchBar-DdyPugeI.js","assets/SearchBar-DxZ_xn-n.css","assets/LoadingSpinner-CLAQ_xag.js","assets/LoadingSpinner-Dyppbf-f.css","assets/SongListView-DiivOdf0.css","assets/SongFormView-BFk_9o_y.js","assets/KeySelector-BgGOYkOI.js","assets/KeySelector-CAqGeLVb.css","assets/SongFormView-ByqQf9mo.css","assets/SongDetailView-Dsh1QfLw.js","assets/ConfirmDialog-DQaJA3g4.js","assets/ConfirmDialog-Dr0dOytd.css","assets/SongDetailView-CB6CWG69.css","assets/LineupListView-CPjIw204.js","assets/LineupListView-C00aQhP8.css","assets/LineupFormView-AcQR660u.js","assets/LineupEntryCard-BfPwjS87.js","assets/LineupEntryCard-BfTfgyvH.css","assets/LineupFormView-BjJHwViK.css","assets/LineupDetailView-CTAKb5B_.js","assets/LineupDetailView-C2MpY9px.css","assets/TemplateListView-BZWr_jzS.js","assets/TemplateListView-3fZe8rrk.css","assets/TemplateDetailView-x7fVsTZj.js","assets/TemplateDetailView-Co488uCE.css","assets/PracticeView-CIECLTIR.js","assets/NotificationListView-DzPzVXyP.js","assets/NotificationListView-kI2NJUcq.css"])))=>i.map(i=>d[i]);
import{d as O,w as Q,r as L,c as y,g as ee,a as E,u as te,b as M,o as u,e as p,f as l,h as g,i as b,j as w,n as C,k as oe,t as A,l as k,m as j,p as G,_ as R,q as W,s as H,v as $,F as T,x as B,T as z,y as x,z as re,A as ne,B as se,C as ae,D as ie,E as le,G as de}from"./practice-mode-DbA7dqT2.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const N="lhcc-theme",ue=O("theme",()=>{const e=L(!1);function a(){document.documentElement.setAttribute("data-theme",e.value?"dark":"light")}function s(){e.value=!e.value}function d(o){e.value=o}function t(){const o=localStorage.getItem(N);o!==null?e.value=o==="dark":e.value=window.matchMedia("(prefers-color-scheme: dark)").matches,a()}return Q(e,()=>{localStorage.setItem(N,e.value?"dark":"light"),a()}),{isDark:e,toggleTheme:s,setTheme:d,initializeTheme:t}});function J(){const e=ue(),a=y(()=>e.isDark);function s(t){if(!document.startViewTransition||window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.toggleTheme();return}if(t){const n=document.documentElement;n.style.setProperty("--vt-origin-x",`${t.x}px`),n.style.setProperty("--vt-origin-y",`${t.y}px`);const r=Math.hypot(window.innerWidth,window.innerHeight);n.style.setProperty("--vt-max-radius",`${r}px`)}document.startViewTransition(()=>{e.toggleTheme()}).finished.finally(()=>{const n=document.documentElement;n.style.removeProperty("--vt-origin-x"),n.style.removeProperty("--vt-origin-y"),n.style.removeProperty("--vt-max-radius")})}function d(){e.initializeTheme()}return{isDark:a,toggleTheme:s,initializeTheme:d}}var V=(e=>(e.LEADER="leader",e.MEMBER="member",e))(V||{});const S="lhcc-role",he=O("role",()=>{const e=L(null),a=y(()=>e.value===V.LEADER),s=y(()=>e.value===V.MEMBER),d=y(()=>e.value!==null);function t(r){e.value=r,localStorage.setItem(S,r)}function o(){e.value=null,localStorage.removeItem(S)}function n(){const r=localStorage.getItem(S);r&&Object.values(V).includes(r)&&(e.value=r)}return{currentRole:e,isLeader:a,isMember:s,hasRole:d,setRole:t,clearRole:o,initializeRole:n}});function K(){const e=he(),a=y(()=>e.currentRole),s=y(()=>e.isLeader),d=y(()=>e.isMember),t=y(()=>e.hasRole);function o(c){e.setRole(c)}function n(){e.clearRole()}function r(){e.initializeRole()}return{currentRole:a,isLeader:s,isMember:d,hasRole:t,setRole:o,clearRole:n,initializeRole:r}}const U="lhcc-notifications";function P(){try{const e=localStorage.getItem(U);return e?JSON.parse(e):[]}catch{return[]}}function Y(e){localStorage.setItem(U,JSON.stringify(e))}const X=O("notification",()=>{const e=L(P()),a=L(!1),s=y(()=>e.value.filter(i=>!i.read).length),d=y(()=>[...e.value].sort((i,_)=>new Date(_.timestamp).getTime()-new Date(i.timestamp).getTime()));async function t(){a.value=!0;try{e.value=P()}finally{a.value=!1}}async function o(i){const _={id:ee(),songId:i.songId,fromKey:i.fromKey,toKey:i.toKey,timestamp:new Date().toISOString(),read:!1};return e.value.push(_),Y(e.value),_}async function n(i){const _=e.value.findIndex(D=>D.id===i);_!==-1&&(e.value[_]={...e.value[_],read:!0},Y(e.value))}async function r(){e.value=e.value.map(i=>({...i,read:!0})),Y(e.value)}async function c(i){e.value=e.value.filter(_=>_.id!==i),Y(e.value)}async function h(){return e.value.filter(i=>!i.read)}async function f(i){const _=new Date(i).getTime();e.value=e.value.filter(D=>new Date(D.timestamp).getTime()>=_),Y(e.value)}return{notifications:e,loading:a,unreadCount:s,sortedNotifications:d,fetchNotifications:t,addNotification:o,markAsRead:n,markAllAsRead:r,deleteNotification:c,getUnread:h,deleteOlderThan:f}}),ce={class:"app-header"},me={class:"header-left"},pe={class:"header-right"},_e=["aria-label"],ve={class:"notification-badge"},fe=E({__name:"AppHeader",emits:["toggleSidebar"],setup(e){const a=te(),{isDark:s,toggleTheme:d}=J(),{hasRole:t,isLeader:o}=K(),n=X(),r=y(()=>n.unreadCount);function c(){a.push("/")}function h(f){d({x:f.clientX,y:f.clientY})}return(f,i)=>{const _=M("router-link");return u(),p("header",ce,[l("div",me,[l("button",{class:"menu-toggle","aria-label":"Toggle navigation",onClick:i[0]||(i[0]=D=>f.$emit("toggleSidebar"))},[...i[1]||(i[1]=[l("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none"},[l("path",{d:"M3 5h14M3 10h14M3 15h14",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})],-1)])]),g(_,{to:"/home",class:"header-brand"},{default:b(()=>[...i[2]||(i[2]=[l("span",{class:"brand-icon"},"✦",-1),l("span",{class:"brand-text"},[l("span",{class:"brand-church"},"LHCC"),l("span",{class:"brand-app"},"Worship")],-1)])]),_:1})]),l("div",pe,[w(t)?(u(),p("button",{key:0,class:C(["role-badge",w(o)?"role-leader":"role-member"]),onClick:c},[i[3]||(i[3]=l("span",{class:"role-dot"},null,-1)),oe(" "+A(w(o)?"Leader":"Member"),1)],2)):k("",!0),l("button",{class:C(["theme-switch",{"is-dark":w(s)}]),"aria-label":w(s)?"Switch to light mode":"Switch to dark mode",onClick:h},[...i[4]||(i[4]=[j('<span class="switch-track" data-v-2b47a996><span class="switch-decor switch-clouds" aria-hidden="true" data-v-2b47a996><span class="cloud cloud-1" data-v-2b47a996><span class="cloud-bump cloud-bump-l" data-v-2b47a996></span><span class="cloud-bump cloud-bump-r" data-v-2b47a996></span></span><span class="cloud cloud-2" data-v-2b47a996><span class="cloud-bump cloud-bump-t" data-v-2b47a996></span></span></span><span class="switch-decor switch-stars" aria-hidden="true" data-v-2b47a996><span class="star star-1" data-v-2b47a996></span><span class="star star-2" data-v-2b47a996></span><span class="star star-3" data-v-2b47a996></span></span><span class="switch-knob" data-v-2b47a996><svg class="knob-icon knob-sun" viewBox="0 0 14 14" fill="none" data-v-2b47a996><circle cx="7" cy="7" r="2.5" fill="currentColor" data-v-2b47a996></circle><path d="M7 1.5v1.5M7 11v1.5M1.5 7H3M11 7h1.5M3.3 3.3l1 1M9.7 9.7l1 1M3.3 10.7l1-1M9.7 4.3l1-1" stroke="currentColor" stroke-width="1" stroke-linecap="round" data-v-2b47a996></path></svg><svg class="knob-icon knob-moon" viewBox="0 0 14 14" fill="none" data-v-2b47a996><path d="M11.5 8a4.5 4.5 0 01-5-5 4.5 4.5 0 105 5z" fill="currentColor" data-v-2b47a996></path></svg></span></span>',1)])],10,_e),w(o)&&r.value>0?(u(),G(_,{key:1,to:"/notifications",class:"notification-link","aria-label":"Notifications"},{default:b(()=>[i[5]||(i[5]=l("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none"},[l("path",{d:"M13.5 6.75a4.5 4.5 0 10-9 0c0 5.25-2.25 6.75-2.25 6.75h13.5s-2.25-1.5-2.25-6.75",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),l("path",{d:"M10.3 15.75a1.5 1.5 0 01-2.6 0",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),l("span",ve,A(r.value),1)]),_:1})):k("",!0)])])}}}),ge=R(fe,[["__scopeId","data-v-2b47a996"]]),ye={class:"sidebar-nav"},be=["innerHTML"],we={class:"nav-label"},Ce={key:0,class:"mobile-sidebar"},Le={class:"sidebar-nav"},Ge=["innerHTML"],De={class:"nav-label"},ke=E({__name:"AppSidebar",props:{open:{type:Boolean}},emits:["close"],setup(e){const a=W(),s=L(!1),d=[{path:"/home",label:"Home",icon:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.25 9l6.75-6.75 6.75 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.75 7.5v6.75a.75.75 0 00.75.75h3v-3.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3.75h3a.75.75 0 00.75-.75V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},{path:"/songs",label:"Songs",icon:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2.25v9.38a2.62 2.62 0 101.5 2.37" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.25 13.5a1.12 1.12 0 100 2.25 1.12 1.12 0 000-2.25z" stroke="currentColor" stroke-width="1.5"/><path d="M11.63 4.88L6 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'},{path:"/lineups",label:"Lineups",icon:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2.25" width="12" height="13.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M3 6h12M7.5 2.25V6M7.5 9.75h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'},{path:"/templates",label:"Templates",icon:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2.25" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2.25" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>'}];function t(n){return a.path===n||a.path.startsWith(n+"/")}function o(){s.value=window.innerWidth<1024}return H(()=>{o(),window.addEventListener("resize",o)}),$(()=>{window.removeEventListener("resize",o)}),(n,r)=>{const c=M("router-link");return u(),p(T,null,[s.value?k("",!0):(u(),p("div",{key:0,class:C(["app-sidebar",{open:e.open}])},[l("nav",ye,[(u(),p(T,null,B(d,h=>g(c,{key:h.path,to:h.path,class:C(["nav-item",{active:t(h.path)}]),onClick:r[0]||(r[0]=f=>n.$emit("close"))},{default:b(()=>[l("span",{class:"nav-icon",innerHTML:h.icon},null,8,be),l("span",we,A(h.label),1)]),_:2},1032,["to","class"])),64))]),r[3]||(r[3]=j('<div class="sidebar-footer" data-v-2ed8db6c><div class="sidebar-divider" data-v-2ed8db6c></div><div class="sidebar-church" data-v-2ed8db6c><span class="church-icon" data-v-2ed8db6c>✝</span><div class="church-text" data-v-2ed8db6c><span class="church-name" data-v-2ed8db6c>Lord of the Harvest</span><span class="church-sub" data-v-2ed8db6c>Community Church</span></div></div></div>',1))],2)),(u(),G(z,{to:"body"},[g(x,{name:"fade"},{default:b(()=>[s.value&&e.open?(u(),p("div",{key:0,class:"sidebar-overlay",onClick:r[1]||(r[1]=h=>n.$emit("close"))})):k("",!0)]),_:1}),g(x,{name:"slide-right"},{default:b(()=>[s.value&&e.open?(u(),p("div",Ce,[l("nav",Le,[(u(),p(T,null,B(d,h=>g(c,{key:h.path,to:h.path,class:C(["nav-item",{active:t(h.path)}]),onClick:r[2]||(r[2]=f=>n.$emit("close"))},{default:b(()=>[l("span",{class:"nav-icon",innerHTML:h.icon},null,8,Ge),l("span",De,A(h.label),1)]),_:2},1032,["to","class"])),64))])])):k("",!0)]),_:1})]))],64)}}}),Ae=R(ke,[["__scopeId","data-v-2ed8db6c"]]),Ee={class:"mobile-nav"},Ye=["innerHTML"],Ie={class:"mobile-nav-label"},Te=E({__name:"MobileNav",setup(e){const a=W(),s=[{path:"/home",label:"Home",icon:'<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path d="M2.25 9l6.75-6.75 6.75 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.75 7.5v6.75a.75.75 0 00.75.75h3v-3.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3.75h3a.75.75 0 00.75-.75V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},{path:"/songs",label:"Songs",icon:'<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><path d="M9 2.25v9.38a2.62 2.62 0 101.5 2.37" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.25 13.5a1.12 1.12 0 100 2.25 1.12 1.12 0 000-2.25z" stroke="currentColor" stroke-width="1.5"/><path d="M11.63 4.88L6 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'},{path:"/lineups",label:"Lineups",icon:'<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="3" y="2.25" width="12" height="13.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M3 6h12M7.5 2.25V6M7.5 9.75h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'},{path:"/templates",label:"Templates",icon:'<svg width="20" height="20" viewBox="0 0 18 18" fill="none"><rect x="2.25" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="2.25" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="2.25" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="10.5" y="10.5" width="5.25" height="5.25" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>'}];function d(t){return a.path===t||a.path.startsWith(t+"/")}return(t,o)=>{const n=M("router-link");return u(),p("nav",Ee,[(u(),p(T,null,B(s,r=>g(n,{key:r.path,to:r.path,class:C(["mobile-nav-item",{active:d(r.path)}])},{default:b(()=>[l("span",{class:"mobile-nav-icon",innerHTML:r.icon},null,8,Ye),l("span",Ie,A(r.label),1)]),_:2},1032,["to","class"])),64))])}}}),Me=R(Te,[["__scopeId","data-v-1e3e46f3"]]),I=L([]);let Re=0;function Ve(){function e(d,t="info",o=5e3,n){const r=`toast-${++Re}`,c={id:r,message:d,type:t,duration:o,notification:n};return I.value.push(c),o>0&&setTimeout(()=>{a(r)},o),r}function a(d){I.value=I.value.filter(t=>t.id!==d)}function s(){I.value=[]}return $(()=>{s()}),{toasts:I,addToast:e,dismissToast:a,clearAll:s}}const Be=["onClick"],Se={class:"toast-icon"},xe={key:0,width:"16",height:"16",viewBox:"0 0 16 16",fill:"none"},Oe={key:1,width:"16",height:"16",viewBox:"0 0 16 16",fill:"none"},We={key:2,width:"16",height:"16",viewBox:"0 0 16 16",fill:"none"},He={key:3,width:"16",height:"16",viewBox:"0 0 16 16",fill:"none"},$e={class:"toast-message"},Fe=E({__name:"NotificationToast",setup(e){const{toasts:a,dismissToast:s}=Ve();return(d,t)=>(u(),G(z,{to:"body"},[g(re,{name:"toast",tag:"div",class:"toast-container"},{default:b(()=>[(u(!0),p(T,null,B(w(a),o=>(u(),p("div",{key:o.id,class:C(["toast",`toast-${o.type}`]),onClick:n=>w(s)(o.id)},[l("div",Se,[o.type==="success"?(u(),p("svg",xe,[...t[0]||(t[0]=[l("path",{d:"M13.3 4L6 11.3 2.7 8",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):o.type==="error"?(u(),p("svg",Oe,[...t[1]||(t[1]=[l("path",{d:"M12 4L4 12M4 4l8 8",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"},null,-1)])])):o.type==="warning"?(u(),p("svg",We,[...t[2]||(t[2]=[l("path",{d:"M8 4v4M8 11v.5",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"},null,-1)])])):(u(),p("svg",He,[...t[3]||(t[3]=[l("circle",{cx:"8",cy:"8",r:"6",stroke:"currentColor","stroke-width":"1.5"},null,-1),l("path",{d:"M8 5v3M8 10v.5",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"},null,-1)])]))]),l("span",$e,A(o.message),1),t[4]||(t[4]=l("button",{class:"toast-dismiss","aria-label":"Dismiss"},[l("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none"},[l("path",{d:"M10.5 3.5L3.5 10.5M3.5 3.5l7 7",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"})])],-1))],10,Be))),128))]),_:1})]))}}),Ne=R(Fe,[["__scopeId","data-v-eb3e7c0d"]]),Pe={class:"app-content"},qe=E({__name:"AppLayout",setup(e){const a=L(!1),s=L(!1);function d(){s.value=window.innerWidth<1024,s.value||(a.value=!1)}return H(()=>{d(),window.addEventListener("resize",d)}),$(()=>{window.removeEventListener("resize",d)}),(t,o)=>{const n=M("router-view");return u(),p("div",{class:C(["app-layout",{"has-sidebar":!s.value}])},[g(ge,{class:"layout-header",onToggleSidebar:o[0]||(o[0]=r=>a.value=!a.value)}),g(Ae,{open:a.value,onClose:o[1]||(o[1]=r=>a.value=!1)},null,8,["open"]),l("main",{class:C(["app-main",{"sidebar-open":a.value&&!s.value}])},[l("div",Pe,[g(n,null,{default:b(({Component:r})=>[g(x,{name:"page",mode:"out-in"},{default:b(()=>[(u(),G(ne(r)))]),_:2},1024)]),_:1})])],2),s.value?(u(),G(Me,{key:0})):k("",!0),g(Ne)],2)}}}),je=R(qe,[["__scopeId","data-v-ec2b4211"]]),m="2026-07-14T00:00:00.000Z",ze=[{id:"song-001",title:"Amazing Grace",artist:"John Newton",key:"G",bpm:72,lyrics:"",chordChart:`{title: Amazing Grace}
{artist: John Newton}
{key: G}
{tempo: 72}

{start_of_intro}
[G] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[G]Amazing [C]grace, how [G]sweet the [D]sound
That [C]saved a [G]wretch like [D]me
I [G]once was [C]lost, but [G]now am [D]found
Was [C]blind but [G]now I [D]see
{end_of_verse}

{start_of_verse: Verse 2}
'Twas [C]grace that [G]taught my [D]heart to [G]fear
And [C]grace my [G]fears re-[D]lieved
How [G]precious [C]did that [G]grace ap-[D]pear
The [C]hour I [G]first be-[D]lieved
{end_of_verse}

{start_of_chorus}
[G]Chains are [C]gone, I've been [G]set [D]free
My [C]God, my [G]Savior has [D]ran-[G]somed me
And [C]like a [G]flood His [D]mercy [C]reigns
Un-[G]ending [D]love, a-[G]mazing [D]grace
{end_of_chorus}

{start_of_verse: Verse 3}
The [C]Lord has [G]promised [D]good to [G]me
His [C]word my [G]hope se-[D]cures
He [G]will my [C]shield and [G]portion [D]be
As [C]long as [G]life en-[D]dures
{end_of_verse}

{start_of_outro}
[G] [C] [G] [D]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:12},{type:"verse",label:"Verse 2",startLine:14,endLine:18},{type:"chorus",label:"Chorus",startLine:20,endLine:25},{type:"verse",label:"Verse 3",startLine:27,endLine:31},{type:"outro",label:"Outro",startLine:33,endLine:34}],createdAt:m,updatedAt:m},{id:"song-002",title:"How Great Is Our God",artist:"Chris Tomlin",key:"G",bpm:80,lyrics:"",chordChart:`{title: How Great Is Our God}
{artist: Chris Tomlin}
{key: G}
{tempo: 80}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]The [C]splendor of a [G]King
Clothed in [D]majesty
Let all the [Em]earth re-[C]joice
All the [G]earth re-[D]joice
He [Em]wraps Him-[C]self in [G]light
And dark-[D]ness tries to hide
And [Em]trembles at His [C]voice
And [G]trembles at His [D]voice
{end_of_verse}

{start_of_chorus}
How [C]great is our [G]God
Sing with [D]me, how [Em]great is our [G]God
And all will [C]see how [G]great, how [D]great
Is our [G]God
{end_of_chorus}

{start_of_verse: Verse 2}
[Em]Age to [C]age He [G]stands
And [D]time is in His hands
The [Em]begin-[C]ning and the [G]end
The [D]beginning and the [G]end
The [Em]Godhead [C]three in [G]one
The [D]Father, Spirit, Son
The [Em]Lion and the [C]Lamb
The [G]Lion and the [D]Lamb
{end_of_verse}

{start_of_bridge}
Name a-[C]bove all [G]names
Worthy of all [D]praise
My heart will [C]sing how [G]great is our [D]God
{end_of_bridge}

{start_of_outro}
[Em] [C] [G] [D]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:17},{type:"chorus",label:"Chorus",startLine:19,endLine:23},{type:"verse",label:"Verse 2",startLine:25,endLine:34},{type:"bridge",label:"Bridge",startLine:36,endLine:40},{type:"outro",label:"Outro",startLine:42,endLine:43}],createdAt:m,updatedAt:m},{id:"song-003",title:"10,000 Reasons (Bless the Lord)",artist:"Matt Redman",key:"G",bpm:72,lyrics:"",chordChart:`{title: 10,000 Reasons (Bless the Lord)}
{artist: Matt Redman}
{key: G}
{tempo: 72}

{start_of_intro}
[G] [Em] [C] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]Bless the [C]Lord, O my [G]soul
O my [D]soul
Worship His [Em]holy [C]name
Sing like [G]never be-[D]fore
O my [Em]soul
I'll [C]worship Your ho-[G]ly [D]name
{end_of_verse}

{start_of_chorus}
The [C]sun comes [G]up, it's a new [D]day dawning
It's time to [C]sing Your song a-[G]gain
What-[D]ever may [Em]pass and what-[C]ever lies be-[G]fore
Let me be [C]singing when the [D]evening comes
{end_of_chorus}

{start_of_verse: Verse 2}
[Em]You're rich in [C]love and You're [G]slow to [D]anger
You're [Em]kind to [C]all that You've [G]cre-[D]ated
And [Em]all the [C]works of Your [G]hands
Will [D]sing of Your praise
{end_of_verse}

{start_of_chorus}
The [C]sun comes [G]up, it's a new [D]day dawning
It's time to [C]sing Your song a-[G]gain
What-[D]ever may [Em]pass and what-[C]ever lies be-[G]fore
Let me be [C]singing when the [D]evening comes
{end_of_chorus}

{start_of_bridge}
Ten [C]thousand [G]reasons for my [D]heart to [Em]find
Ten [C]thousand [G]reasons for my [D]heart to [G]find
{end_of_bridge}

{start_of_verse: Verse 3}
And on that [Em]day when my [C]strength is [G]failing
The [D]end draws near and my [Em]time has [C]come
Still my [G]soul will [D]sing Your praise un-[G]ending
Ten [C]thousand [G]years and then [D]forever-[G]more
{end_of_verse}

{start_of_outro}
[G] [Em] [C] [D]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:15},{type:"chorus",label:"Chorus",startLine:17,endLine:21},{type:"verse",label:"Verse 2",startLine:23,endLine:29},{type:"chorus",label:"Chorus",startLine:31,endLine:35},{type:"bridge",label:"Bridge",startLine:37,endLine:40},{type:"verse",label:"Verse 3",startLine:42,endLine:49},{type:"outro",label:"Outro",startLine:51,endLine:52}],createdAt:m,updatedAt:m},{id:"song-004",title:"Oceans (Where Feet May Fail)",artist:"Hillsong UNITED",key:"D",bpm:68,lyrics:"",chordChart:`{title: Oceans (Where Feet May Fail)}
{artist: Hillsong UNITED}
{key: D}
{tempo: 68}

{start_of_intro}
[D] [G] [D] [A]
{end_of_intro}

{start_of_verse: Verse 1}
You [D]call me out [G]upon the [D]waters
The great un-[A]known where feet may [D]fail
And [G]there I'll [D]find You in the [A]mystery
In [D]ocean [G]deep, my faith will [D]stand
{end_of_verse}

{start_of_chorus}
Spirit [G]lead me where my [D]trust is without [A]borders
Let me [G]walk upon the [D]waters
Where-[A]ever You would [Bm]call me
Take me [G]deeper than my [D]feet could ever [A]wander
And my [G]faith will be made [D]stronger
In the [A]presence of my [Bm]Savior
{end_of_chorus}

{start_of_verse: Verse 2}
Your [D]grace a-[G]bounds in deep-[D]est [A]waters
Your sov-[D]ereign hand will be my [G]guide
Where [D]feet may fail and fear sur-[A]rounds me
You've [D]never [G]failed and You won't [D]start now
{end_of_verse}

{start_of_chorus}
Spirit [G]lead me where my [D]trust is without [A]borders
Let me [G]walk upon the [D]waters
Where-[A]ever You would [Bm]call me
Take me [G]deeper than my [D]feet could ever [A]wander
And my [G]faith will be made [D]stronger
In the [A]presence of my [Bm]Savior
{end_of_chorus}

{start_of_bridge}
[Bm]I will [G]call upon Your [D]name
Keep my [A]eyes a-[Bm]bove the [G]waves
When o-[D]ceans [A]rise
My soul will [G]rest in Your [D]embrace
For I am [A]Yours and [Bm]You are [G]mine
{end_of_bridge}

{start_of_outro}
[D] [G] [D] [A]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:12},{type:"chorus",label:"Chorus",startLine:14,endLine:21},{type:"verse",label:"Verse 2",startLine:23,endLine:27},{type:"chorus",label:"Chorus",startLine:29,endLine:36},{type:"bridge",label:"Bridge",startLine:38,endLine:43},{type:"outro",label:"Outro",startLine:45,endLine:46}],createdAt:m,updatedAt:m},{id:"song-005",title:"Reckless Love",artist:"Cory Asbury",key:"G",bpm:74,lyrics:"",chordChart:`{title: Reckless Love}
{artist: Cory Asbury}
{key: G}
{tempo: 74}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]Before I [C]spoke a [G]word
You were [D]singing o-[Em]ver [C]me
You have [G]been so, so [D]good to [G]me
Before I [Em]took a [C]breath
You breathed Your [D]life in-[Em]to [C]me
You have [G]been so, so [D]good to [G]me
{end_of_verse}

{start_of_chorus}
Oh the [C]overwhelm-[G]ing, never-[D]ending, re-[Em]ckless [C]love of [G]God
Oh it [C]chases me [G]down, fights till [D]I'm found
Leaves the [C]ninety-[G]nine
And I couldn't [Em]earn it, I don't [C]deserve it
Still You [G]give Your-[D]self a-[G]way
{end_of_chorus}

{start_of_verse: Verse 2}
When I was [Em]your foe, still Your [C]love fought for [G]me
You have [D]been so, so [G]good to [G]me
When I felt [Em]no worth, You paid it [C]all for [G]me
You have [D]been so, so [D]good to [G]me
{end_of_verse}

{start_of_chorus}
Oh the [C]overwhelm-[G]ing, never-[D]ending, re-[Em]ckless [C]love of [G]God
Oh it [C]chases me [G]down, fights till [D]I'm found
Leaves the [C]ninety-[G]nine
And I couldn't [Em]earn it, I don't [C]deserve it
Still You [G]give Your-[D]self a-[G]way
{end_of_chorus}

{start_of_bridge}
There's no [C]wall You won't kick [G]down
Lie You won't [D]tear [Em]down
Com-[C]ing after [G]me
There's no [D]shore You won't [G]wash a-[C]way
[D]Lie You won't [G]tear [Em]down
Com-[C]ing after [G]me
{end_of_bridge}

{start_of_outro}
[Em] [C] [G] [D]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:17},{type:"chorus",label:"Chorus",startLine:19,endLine:26},{type:"verse",label:"Verse 2",startLine:28,endLine:33},{type:"chorus",label:"Chorus",startLine:35,endLine:42},{type:"bridge",label:"Bridge",startLine:44,endLine:51},{type:"outro",label:"Outro",startLine:53,endLine:54}],createdAt:m,updatedAt:m},{id:"song-006",title:"Good Good Father",artist:"Chris Tomlin",key:"G",bpm:78,lyrics:"",chordChart:`{title: Good Good Father}
{artist: Chris Tomlin}
{key: G}
{tempo: 78}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]I've heard a [C]thousand sto-[G]ries
Of what they [D]think You're like
And I've heard the [Em]tender [C]whispers
Of love in the [D]dead of night
And You tell me [Em]that You're pleased and that [C]I'm never a-[G]lone
{end_of_verse}

{start_of_chorus}
You're a [C]good, good [G]Father
It's who You [D]are, it's who You [Em]are
It's who You [C]are
And I'm [C]loved by [G]you
It's who I [D]am, it's who I [Em]am
It's who I [C]am
{end_of_chorus}

{start_of_verse: Verse 2}
I've seen many [C]searching for [G]answers
Far and [D]wide
But I know we're all [Em]searching for [C]answers
Only You [D]provide 'cause You know
Just what we [Em]need before we [C]say a [G]word
{end_of_verse}

{start_of_chorus}
You're a [C]good, good [G]Father
It's who You [D]are, it's who You [Em]are
It's who You [C]are
And I'm [C]loved by [G]you
It's who I [D]am, it's who I [Em]am
It's who I [C]am
{end_of_chorus}

{start_of_bridge}
[C]Perfect in all [G]of Your [D]ways
You are [Em]perfect in all [C]of Your [G]ways
You are [D]perfect in all [C]of Your [D]ways
{end_of_bridge}

{start_of_outro}
[Em] [C] [G] [D]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:14},{type:"chorus",label:"Chorus",startLine:16,endLine:24},{type:"verse",label:"Verse 2",startLine:26,endLine:33},{type:"chorus",label:"Chorus",startLine:35,endLine:43},{type:"bridge",label:"Bridge",startLine:45,endLine:48},{type:"outro",label:"Outro",startLine:50,endLine:51}],createdAt:m,updatedAt:m},{id:"song-007",title:"What A Beautiful Name",artist:"Hillsong Worship",key:"D",bpm:66,lyrics:"",chordChart:`{title: What A Beautiful Name}
{artist: Hillsong Worship}
{key: D}
{tempo: 66}

{start_of_intro}
[D] [A] [Bm] [G]
{end_of_intro}

{start_of_verse: Verse 1}
You were the [D]Word at the [A]beginning
One with [Bm]God, the Lord most [G]high
Your hidden [D]glory in [A]creation
Now re-[Bm]vealed in You our [G]Christ
{end_of_verse}

{start_of_chorus}
What a [A]beautiful [Bm]name it [G]is
The name of [D]Jesus [A]Christ my [Bm]King
What a [G]beautiful [D]name it [A]is
Nothing com-[Bm]pares to [G]this
What a [A]beautiful [Bm]name it [G]is
The name of [D]Jesus
{end_of_chorus}

{start_of_verse: Verse 2}
You didn't [D]want heaven with-[A]out us
So [Bm]Jesus, You brought [G]heaven [D]down
My sin was [D]great, Your love was [A]greater
What could [Bm]separate us [G]now
{end_of_verse}

{start_of_chorus}
What a [A]wonderful [Bm]name it [G]is
The name of [D]Jesus [A]Christ my [Bm]King
What a [G]wonderful [D]name it [A]is
Nothing com-[Bm]pares to [G]this
What a [A]wonderful [Bm]name it [G]is
The name of [D]Jesus
{end_of_chorus}

{start_of_bridge}
Death could not [A]hold You
The veil tore be-[Bm]fore You
You si-[G]lenced the boast of [D]sin and [A]grave
The [Bm]heavens are [G]roaning
The praise of Your [D]glory
For You are [A]risen to [D]life a-[A]gain
{end_of_bridge}

{start_of_chorus}
You have no [A]rival, You have no [Bm]equal
Now and for-[G]ever, God You [D]reign
Yours is the [A]kingdom, Yours is the [Bm]glory
Yours is the [G]name above all [D]names
{end_of_chorus}

{start_of_outro}
[D] [A] [Bm] [G]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:12},{type:"chorus",label:"Chorus",startLine:14,endLine:22},{type:"verse",label:"Verse 2",startLine:24,endLine:28},{type:"chorus",label:"Chorus",startLine:30,endLine:38},{type:"bridge",label:"Bridge",startLine:40,endLine:47},{type:"chorus",label:"Final Chorus",startLine:49,endLine:53},{type:"outro",label:"Outro",startLine:55,endLine:56}],createdAt:m,updatedAt:m},{id:"song-008",title:"Great Are You Lord",artist:"All Sons & Daughters",key:"A",bpm:70,lyrics:"",chordChart:`{title: Great Are You Lord}
{artist: All Sons & Daughters}
{key: A}
{tempo: 70}

{start_of_intro}
[A] [D] [A] [E]
{end_of_intro}

{start_of_verse: Verse 1}
You give [D]life, You are [A]love
You bring [E]light to the [D]darkness
You give [D]hope, You re-[A]store
Every [E]heart that is [D]bro-[A]ken
And [D]great are You, [A]Lord
{end_of_verse}

{start_of_chorus}
It's Your [D]breath in our [A]lungs
So we [E]pour out our [D]praise
We pour [D]out our praise
It's Your [E]breath in our [A]lungs
So we [D]pour out our praise to [A]You [E]only
{end_of_chorus}

{start_of_verse: Verse 2}
You give [D]life, You are [A]love
You bring [E]light to the [D]darkness
You give [D]hope, You re-[A]store
Every [E]heart that is [D]bro-[A]ken
And [D]great are You, [A]Lord
{end_of_verse}

{start_of_chorus}
It's Your [D]breath in our [A]lungs
So we [E]pour out our [D]praise
We pour [D]out our praise
It's Your [E]breath in our [A]lungs
So we [D]pour out our praise to [A]You [E]only
{end_of_chorus}

{start_of_bridge}
And all the [A]earth will shout Your [E]praise
Our hearts will [D]cry, these bones will [A]sing
Great are You [D]Lord
{end_of_bridge}

{start_of_outro}
[A] [D] [A] [E]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:15},{type:"chorus",label:"Chorus",startLine:17,endLine:24},{type:"verse",label:"Verse 2",startLine:26,endLine:33},{type:"chorus",label:"Chorus",startLine:35,endLine:42},{type:"bridge",label:"Bridge",startLine:44,endLine:48},{type:"outro",label:"Outro",startLine:50,endLine:51}],createdAt:m,updatedAt:m},{id:"song-009",title:"Build My Life",artist:"Housefires",key:"C",bpm:72,lyrics:"",chordChart:`{title: Build My Life}
{artist: Housefires}
{key: C}
{tempo: 72}

{start_of_intro}
[C] [F] [Am] [G]
{end_of_intro}

{start_of_verse: Verse 1}
Worthy of [F]every song we could [Am]ever [G]sing
Worthy of [F]all the praise we could [Am]ever [G]bring
Worthy of [F]every breath we could [Am]ever [G]breathe
We live for [C]You
{end_of_verse}

{start_of_chorus}
Jesus, the [F]name above [Am]every [G]other name
Jesus, the [F]only one who could [Am]ever [G]save
Worthy of [F]every breath we could [Am]ever [G]breathe
We live for [C]You, oh we live for [F]You
{end_of_chorus}

{start_of_verse: Verse 2}
Holy, there is [F]no one like [Am]You
There is [G]none beside [F]You
Open up my [Am]eyes in won-[G]der
Show me who [F]You are and [Am]fill me with Your [G]heart
And lead me in Your [C]love to those a-[F]round
{end_of_verse}

{start_of_chorus}
Jesus, the [F]name above [Am]every [G]other name
Jesus, the [F]only one who could [Am]ever [G]save
Worthy of [F]every breath we could [Am]ever [G]breathe
We live for [C]You, oh we live for [F]You
{end_of_chorus}

{start_of_bridge}
I will [Am]build my life [G]upon Your [F]love
It is a [C]firm foun-[F]dation
I will [Am]put my trust in [G]You a-[F]lone
And I will [C]not be [F]shaken
{end_of_bridge}

{start_of_outro}
[C] [F] [Am] [G]
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:13},{type:"chorus",label:"Chorus",startLine:15,endLine:21},{type:"verse",label:"Verse 2",startLine:23,endLine:30},{type:"chorus",label:"Chorus",startLine:32,endLine:38},{type:"bridge",label:"Bridge",startLine:40,endLine:45},{type:"outro",label:"Outro",startLine:47,endLine:48}],createdAt:m,updatedAt:m},{id:"song-010",title:"Living Hope",artist:"Phil Wickham",key:"G",bpm:76,lyrics:"",chordChart:`{title: Living Hope}
{artist: Phil Wickham}
{key: G}
{tempo: 76}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
How great the [C]chasm that lay be-[G]tween us
How high the [D]mountain I could not [Em]climb
In desper-[C]ation, I turned to [G]heaven
And spoke Your [D]name into the [G]night
{end_of_verse}

{start_of_verse: Verse 2}
Then through the [C]darkness, Your loving-[G]kindness
Tore through the [D]shadows of my [Em]soul
The work is [C]finished, the end is [G]written
Jesus Christ, my living [D]hope
{end_of_verse}

{start_of_chorus}
Hallelujah, praise the [C]one who set me [G]free
Hallelujah, death has [D]lost its grip on [Em]me
You have [C]broken every chain
There's sal-[G]vation in Your [D]name
Jesus Christ, my living [G]hope
{end_of_chorus}

{start_of_verse: Verse 3}
Who could i-[C]magine so great a [G]mercy
What heart could [D]fathom such boundless [Em]grace
The God of [C]ages stepped down from [G]glory
To wear my [D]sin and bear my [G]shame
{end_of_verse}

{start_of_chorus}
Hallelujah, praise the [C]one who set me [G]free
Hallelujah, death has [D]lost its grip on [Em]me
You have [C]broken every chain
There's sal-[G]vation in Your [D]name
Jesus Christ, my living [G]hope
{end_of_chorus}

{start_of_bridge}
Then came the [C]morning that sealed the [G]promise
Your buried [D]body began to [Em]breathe
Out of the [C]silence, the Roaring [G]Lion
Declared the [D]grave has no claim on [G]me
Then came the [C]morning that sealed the [G]promise
Your buried [D]body began to [Em]breathe
Out of the [C]silence, the Roaring [G]Lion
Declared the [D]grave has no claim on [G]me
{end_of_bridge}

{start_of_chorus}
Hallelujah, praise the [C]one who set me [G]free
Hallelujah, death has [D]lost its grip on [Em]me
You have [C]broken every chain
There's sal-[G]vation in Your [D]name
Jesus Christ, my living [G]hope
{end_of_chorus}

{start_of_outro}
[Em] [C] [G] [D]
Jesus Christ, my living [G]hope
{end_of_outro}`,nashvilleChart:"",structure:[{type:"intro",label:"Intro",startLine:5,endLine:6},{type:"verse",label:"Verse 1",startLine:8,endLine:12},{type:"verse",label:"Verse 2",startLine:14,endLine:18},{type:"chorus",label:"Chorus",startLine:20,endLine:26},{type:"verse",label:"Verse 3",startLine:28,endLine:32},{type:"chorus",label:"Chorus",startLine:34,endLine:40},{type:"bridge",label:"Bridge",startLine:42,endLine:51},{type:"chorus",label:"Final Chorus",startLine:53,endLine:59},{type:"outro",label:"Outro",startLine:61,endLine:63}],createdAt:m,updatedAt:m}],Je={class:"app grain-overlay"},Ke=E({__name:"App",setup(e){const a=W(),{hasRole:s,initializeRole:d}=K(),{initializeTheme:t}=J(),o=se(),n=X(),r=y(()=>a.name==="practice");return H(()=>{t(),d(),o.seedSongs(ze),n.fetchNotifications()}),(c,h)=>{const f=M("router-view");return u(),p("div",Je,[w(s)&&!r.value?(u(),G(je,{key:0})):(u(),G(f,{key:1}))])}}}),Ue="modulepreload",Xe=function(e){return"/"+e},q={},v=function(a,s,d){let t=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),r=n?.nonce||n?.getAttribute("nonce");t=Promise.allSettled(s.map(c=>{if(c=Xe(c),c in q)return;q[c]=!0;const h=c.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const i=document.createElement("link");if(i.rel=h?"stylesheet":Ue,h||(i.as="script"),i.crossOrigin="",i.href=c,r&&i.setAttribute("nonce",r),document.head.appendChild(i),h)return new Promise((_,D)=>{i.addEventListener("load",_),i.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return t.then(n=>{for(const r of n||[])r.status==="rejected"&&o(r.reason);return a().catch(o)})},Z=ae({history:ie(),routes:[{path:"/",name:"role-selector",component:()=>v(()=>import("./RoleSelectorView-SiVilBln.js"),__vite__mapDeps([0,1,2,3])),meta:{requiresRole:!1}},{path:"/home",name:"home",component:()=>v(()=>import("./HomeView-BT4cqH8c.js"),__vite__mapDeps([4,1,2,5,6,7,8,9])),meta:{requiresRole:!0}},{path:"/songs",name:"song-list",component:()=>v(()=>import("./SongListView-Dr1luY02.js"),__vite__mapDeps([10,1,2,11,12,7,8,13,14,15])),meta:{requiresRole:!0}},{path:"/songs/new",name:"song-new",component:()=>v(()=>import("./SongFormView-BFk_9o_y.js"),__vite__mapDeps([16,1,2,17,18,19])),meta:{requiresRole:!0,requiresLeader:!0}},{path:"/songs/:id",name:"song-detail",component:()=>v(()=>import("./SongDetailView-Dsh1QfLw.js"),__vite__mapDeps([20,1,2,17,18,21,22,7,8,13,14,23])),meta:{requiresRole:!0}},{path:"/songs/:id/edit",name:"song-edit",component:()=>v(()=>import("./SongFormView-BFk_9o_y.js"),__vite__mapDeps([16,1,2,17,18,19])),meta:{requiresRole:!0,requiresLeader:!0}},{path:"/lineups",name:"lineup-list",component:()=>v(()=>import("./LineupListView-CPjIw204.js"),__vite__mapDeps([24,5,1,2,6,7,8,13,14,25])),meta:{requiresRole:!0}},{path:"/lineups/new",name:"lineup-new",component:()=>v(()=>import("./LineupFormView-AcQR660u.js"),__vite__mapDeps([26,1,2,5,6,27,28,11,12,29])),meta:{requiresRole:!0,requiresLeader:!0}},{path:"/lineups/:id",name:"lineup-detail",component:()=>v(()=>import("./LineupDetailView-CTAKb5B_.js"),__vite__mapDeps([30,1,2,5,6,27,28,7,8,13,14,21,22,31])),meta:{requiresRole:!0}},{path:"/lineups/:id/edit",name:"lineup-edit",component:()=>v(()=>import("./LineupFormView-AcQR660u.js"),__vite__mapDeps([26,1,2,5,6,27,28,11,12,29])),meta:{requiresRole:!0,requiresLeader:!0}},{path:"/templates",name:"template-list",component:()=>v(()=>import("./TemplateListView-BZWr_jzS.js"),__vite__mapDeps([32,5,1,2,6,7,8,13,14,33])),meta:{requiresRole:!0}},{path:"/templates/:id",name:"template-detail",component:()=>v(()=>import("./TemplateDetailView-x7fVsTZj.js"),__vite__mapDeps([34,1,2,5,6,27,28,7,8,13,14,35])),meta:{requiresRole:!0}},{path:"/practice/:songId",name:"practice",component:()=>v(()=>import("./PracticeView-CIECLTIR.js"),__vite__mapDeps([36,1,2])),meta:{requiresRole:!0,hideLayout:!0}},{path:"/notifications",name:"notifications",component:()=>v(()=>import("./NotificationListView-DzPzVXyP.js"),__vite__mapDeps([37,1,2,6,13,14,7,8,38])),meta:{requiresRole:!0,requiresLeader:!0}},{path:"/:pathMatch(.*)*",redirect:"/home"}]});Z.beforeEach(e=>{const s=localStorage.getItem("lhcc-role");if(e.meta.requiresRole&&!s)return{name:"role-selector"};if(e.meta.requiresLeader&&s!=="leader")return{name:"home"};if(e.name==="role-selector"&&s)return{name:"home"}});const F=le(Ke),Ze=de();F.use(Ze);F.use(Z);F.mount("#app");export{V as R,X as a,K as u};
