!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).gen=t()}}(function(){return function(){return function t(n,e,r){function o(i,u){if(!e[i]){if(!n[i]){var s="function"==typeof require&&require;if(!u&&s)return s(i,!0);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var f=e[i]={exports:{}};n[i][0].call(f.exports,function(t){return o(n[i][1][t]||t)},f,f.exports,t,n,e,r)}return e[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}}()({1:[function(t,n,e){},{}],2:[function(t,n,e){const r=t("seedrandom"),o={nSamples:100,noise:0,seed:null,X:null};function a(t,n){for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));t&&([t[e],t[r]]=[t[r],t[e]]),n&&([n[e],n[r]]=[n[r],n[e]])}}function i(t){return t?new r(t):Math.random}function u(t){let n=0,e=0;for(;0===n;)n=t();for(;0===e;)e=t();return Math.sqrt(-2*Math.log(n))*Math.cos(2*Math.PI*e)}function s(t,n=1,e=0,r){const o=i(r);return Array(t).fill(0).map((r,a)=>{const i=a*n/t;if(x1=(2*i+1)*Math.cos(2*Math.PI*i)/3,x2=(2*i+1)*Math.sin(2*Math.PI*i)/3,e>0){const t=u(o)*e,n=Math.cos(2*Math.PI*i)-Math.PI*(2*i+1)*Math.sin(2*Math.PI*i),r=Math.sin(2*Math.PI*i)+Math.PI*(2*i+1)*Math.cos(2*Math.PI*i),a=Math.sqrt(n*n+r*r);x1+=t*r/a,x2-=t*n/a}return[x1,x2]})}n.exports={friedman1:function(t){const n=Object.assign({},o,{nFeatures:10},t),e=i(n.seed);if(n.nFeatures<5)throw new Error("nFeatures must be at least five");const r=[],a=[],u=t=>10*Math.sin(Math.PI*t[0]*t[1])+20*Math.pow(t[2]-.5,2)+10*t[3]+5*t[4]+n.noise*e();for(let t=0;t<n.nSamples;t++){const t=[];for(let r=0;r<n.nFeatures;r++)t.push(e());r.push(t),a.push(u(t))}return[r,a,u]},friedman2:function(t){const n=Object.assign({},o,t),e=i(n.seed),r=[],a=[],u=t=>Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1]*t[2]-1/(t[1]*t[3]),2))+n.noise*e();for(let t=0;t<n.nSamples;t++){const t=[100*e(),520*e()*Math.PI+40*Math.PI,e(),10*e()+1];r.push(t),a.push(u(t))}return[r,a,u]},friedman3:function(t){const n=Object.assign({},o,t),e=i(n.seed),r=[],a=[],u=t=>Math.atan(t[1]*t[2]-1/(t[1]*t[3])/t[0])+n.noise*e();for(let t=0;t<n.nSamples;t++){const t=[100*e(),520*e()*Math.PI+40*Math.PI,e(),10*e()+1];r.push(t),a.push(u(t))}return[r,a,u]},hastie:function(t){const n=Object.assign({},o,t),e=i(n.seed),r=[],a=[],s=t=>+(t.reduce((t,n)=>t+n*n,0)>9.34);for(let t=0;t<n.nSamples;t++){const t=[];for(let n=0;n<10;n++){const n=u(e);t.push(n)}r.push(t),a.push(s(t))}return[r,a]},moons:function(t){const n=Object.assign({},o,{shuffle:!0},t);let e,r;Array.isArray(n.nSamples)?(r=n.nSamples[0],e=n.nSamples[1]):(r=Math.floor(n.nSamples/2),e=n.nSamples-r);const i=[],u=[],s=Math.PI/r;for(let t=0;t<Math.PI;t+=s)i.push([Math.cos(t),Math.sin(t)]),u.push(0);const c=Math.PI/e;for(let t=0;t<Math.PI;t+=c)i.push([.5-Math.cos(t),1-Math.sin(t)]),u.push(1);return n.shuffle&&a(i,u),[i,u]},peak:function(t){const n=Object.assign({},o,{nFeatures:10},t),e=i(n.seed),r=[],a=[],s=t=>25*Math.exp(-.5*t*t);for(let t=0;t<n.nSamples;t++){let t=[];for(let r=0;r<n.nFeatures;r++)t.push(u(e));const o=3*Math.random(),i=Math.sqrt(t.reduce((t,n)=>t+n*n,0));t=t.map(t=>o*(t/i)),r.push(t),a.push(s(o))}return[r,a]},ringnorm:function(t){const n=Object.assign({},o,{nFeatures:10},t),e=i(n.seed),r=n.nSamples/2,a=Array(Math.floor(r)).fill(0).concat(Array(Math.ceil(r)).fill(1)),s=1/Math.sqrt(n.nFeatures);return[a.map(t=>t?Array(n.nFeatures).fill(0).map(t=>2*u(e)):Array(n.nFeatures).fill(0).map(t=>u(e)+s)),a]},spirals:function(t){const n=Object.assign({},o,{cycles:1},t),e=(i(n.seed),n.nSamples/2),r=Array(Math.floor(e)).fill(0).concat(Array(Math.ceil(e)).fill(1)),u=s(Math.floor(e),n.cycles,n.noise,n.seed).concat(function(t){return t.map(t=>t.map(t=>-t))}(s(Math.ceil(e),n.cycles,n.noise,n.seed)));return n.shuffle&&a(u,r),[u,r]}}},{seedrandom:3}],3:[function(t,n,e){var r=t("./lib/alea"),o=t("./lib/xor128"),a=t("./lib/xorwow"),i=t("./lib/xorshift7"),u=t("./lib/xor4096"),s=t("./lib/tychei"),c=t("./seedrandom");c.alea=r,c.xor128=o,c.xorwow=a,c.xorshift7=i,c.xor4096=u,c.tychei=s,n.exports=c},{"./lib/alea":4,"./lib/tychei":5,"./lib/xor128":6,"./lib/xor4096":7,"./lib/xorshift7":8,"./lib/xorwow":9,"./seedrandom":10}],4:[function(t,n,e){!function(t,n,e){function r(t){var n,e=this,r=(n=4022871197,function(t){t=String(t);for(var e=0;e<t.length;e++){var r=.02519603282416938*(n+=t.charCodeAt(e));r-=n=r>>>0,n=(r*=n)>>>0,n+=4294967296*(r-=n)}return 2.3283064365386963e-10*(n>>>0)});e.next=function(){var t=2091639*e.s0+2.3283064365386963e-10*e.c;return e.s0=e.s1,e.s1=e.s2,e.s2=t-(e.c=0|t)},e.c=1,e.s0=r(" "),e.s1=r(" "),e.s2=r(" "),e.s0-=r(t),e.s0<0&&(e.s0+=1),e.s1-=r(t),e.s1<0&&(e.s1+=1),e.s2-=r(t),e.s2<0&&(e.s2+=1),r=null}function o(t,n){return n.c=t.c,n.s0=t.s0,n.s1=t.s1,n.s2=t.s2,n}function a(t,n){var e=new r(t),a=n&&n.state,i=e.next;return i.int32=function(){return 4294967296*e.next()|0},i.double=function(){return i()+1.1102230246251565e-16*(2097152*i()|0)},i.quick=i,a&&("object"==typeof a&&o(a,e),i.state=function(){return o(e,{})}),i}n&&n.exports?n.exports=a:e&&e.amd?e(function(){return a}):this.alea=a}(0,"object"==typeof n&&n,!1)},{}],5:[function(t,n,e){!function(t,n,e){function r(t,n){return n.a=t.a,n.b=t.b,n.c=t.c,n.d=t.d,n}function o(t,n){var e=new function(t){var n=this,e="";n.next=function(){var t=n.b,e=n.c,r=n.d,o=n.a;return t=t<<25^t>>>7^e,e=e-r|0,r=r<<24^r>>>8^o,o=o-t|0,n.b=t=t<<20^t>>>12^e,n.c=e=e-r|0,n.d=r<<16^e>>>16^o,n.a=o-t|0},n.a=0,n.b=0,n.c=-1640531527,n.d=1367130551,t===Math.floor(t)?(n.a=t/4294967296|0,n.b=0|t):e+=t;for(var r=0;r<e.length+20;r++)n.b^=0|e.charCodeAt(r),n.next()}(t),o=n&&n.state,a=function(){return(e.next()>>>0)/4294967296};return a.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},a.int32=e.next,a.quick=a,o&&("object"==typeof o&&r(o,e),a.state=function(){return r(e,{})}),a}n&&n.exports?n.exports=o:e&&e.amd?e(function(){return o}):this.tychei=o}(0,"object"==typeof n&&n,!1)},{}],6:[function(t,n,e){!function(t,n,e){function r(t,n){return n.x=t.x,n.y=t.y,n.z=t.z,n.w=t.w,n}function o(t,n){var e=new function(t){var n=this,e="";n.x=0,n.y=0,n.z=0,n.w=0,n.next=function(){var t=n.x^n.x<<11;return n.x=n.y,n.y=n.z,n.z=n.w,n.w^=n.w>>>19^t^t>>>8},t===(0|t)?n.x=t:e+=t;for(var r=0;r<e.length+64;r++)n.x^=0|e.charCodeAt(r),n.next()}(t),o=n&&n.state,a=function(){return(e.next()>>>0)/4294967296};return a.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},a.int32=e.next,a.quick=a,o&&("object"==typeof o&&r(o,e),a.state=function(){return r(e,{})}),a}n&&n.exports?n.exports=o:e&&e.amd?e(function(){return o}):this.xor128=o}(0,"object"==typeof n&&n,!1)},{}],7:[function(t,n,e){!function(t,n,e){function r(t,n){return n.i=t.i,n.w=t.w,n.X=t.X.slice(),n}function o(t,n){null==t&&(t=+new Date);var e=new function(t){var n=this;n.next=function(){var t,e,r=n.w,o=n.X,a=n.i;return n.w=r=r+1640531527|0,e=o[a+34&127],t=o[a=a+1&127],e^=e<<13,t^=t<<17,e^=e>>>15,t^=t>>>12,e=o[a]=e^t,n.i=a,e+(r^r>>>16)|0},function(t,n){var e,r,o,a,i,u=[],s=128;for(n===(0|n)?(r=n,n=null):(n+="\0",r=0,s=Math.max(s,n.length)),o=0,a=-32;a<s;++a)n&&(r^=n.charCodeAt((a+32)%n.length)),0===a&&(i=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,a>=0&&(i=i+1640531527|0,o=0==(e=u[127&a]^=r+i)?o+1:0);for(o>=128&&(u[127&(n&&n.length||0)]=-1),o=127,a=512;a>0;--a)r=u[o+34&127],e=u[o=o+1&127],r^=r<<13,e^=e<<17,r^=r>>>15,e^=e>>>12,u[o]=r^e;t.w=i,t.X=u,t.i=o}(n,t)}(t),o=n&&n.state,a=function(){return(e.next()>>>0)/4294967296};return a.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},a.int32=e.next,a.quick=a,o&&(o.X&&r(o,e),a.state=function(){return r(e,{})}),a}n&&n.exports?n.exports=o:e&&e.amd?e(function(){return o}):this.xor4096=o}(0,"object"==typeof n&&n,!1)},{}],8:[function(t,n,e){!function(t,n,e){function r(t,n){return n.x=t.x.slice(),n.i=t.i,n}function o(t,n){null==t&&(t=+new Date);var e=new function(t){var n=this;n.next=function(){var t,e,r=n.x,o=n.i;return t=r[o],e=(t^=t>>>7)^t<<24,e^=(t=r[o+1&7])^t>>>10,e^=(t=r[o+3&7])^t>>>3,e^=(t=r[o+4&7])^t<<7,t=r[o+7&7],e^=(t^=t<<13)^t<<9,r[o]=e,n.i=o+1&7,e},function(t,n){var e,r=[];if(n===(0|n))r[0]=n;else for(n=""+n,e=0;e<n.length;++e)r[7&e]=r[7&e]<<15^n.charCodeAt(e)+r[e+1&7]<<13;for(;r.length<8;)r.push(0);for(e=0;e<8&&0===r[e];++e);for(8==e?r[7]=-1:r[e],t.x=r,t.i=0,e=256;e>0;--e)t.next()}(n,t)}(t),o=n&&n.state,a=function(){return(e.next()>>>0)/4294967296};return a.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},a.int32=e.next,a.quick=a,o&&(o.x&&r(o,e),a.state=function(){return r(e,{})}),a}n&&n.exports?n.exports=o:e&&e.amd?e(function(){return o}):this.xorshift7=o}(0,"object"==typeof n&&n,!1)},{}],9:[function(t,n,e){!function(t,n,e){function r(t,n){return n.x=t.x,n.y=t.y,n.z=t.z,n.w=t.w,n.v=t.v,n.d=t.d,n}function o(t,n){var e=new function(t){var n=this,e="";n.next=function(){var t=n.x^n.x>>>2;return n.x=n.y,n.y=n.z,n.z=n.w,n.w=n.v,(n.d=n.d+362437|0)+(n.v=n.v^n.v<<4^t^t<<1)|0},n.x=0,n.y=0,n.z=0,n.w=0,n.v=0,t===(0|t)?n.x=t:e+=t;for(var r=0;r<e.length+64;r++)n.x^=0|e.charCodeAt(r),r==e.length&&(n.d=n.x<<10^n.x>>>4),n.next()}(t),o=n&&n.state,a=function(){return(e.next()>>>0)/4294967296};return a.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},a.int32=e.next,a.quick=a,o&&("object"==typeof o&&r(o,e),a.state=function(){return r(e,{})}),a}n&&n.exports?n.exports=o:e&&e.amd?e(function(){return o}):this.xorwow=o}(0,"object"==typeof n&&n,!1)},{}],10:[function(t,n,e){!function(e,r,o){var a,i=256,u=6,s="random",c=o.pow(i,u),f=o.pow(2,52),l=2*f,h=i-1;function p(t,n,p){var y=[],w=d(function t(n,e){var r,o=[],a=typeof n;if(e&&"object"==a)for(r in n)try{o.push(t(n[r],e-1))}catch(t){}return o.length?o:"string"==a?n:n+"\0"}((n=1==n?{entropy:!0}:n||{}).entropy?[t,m(r)]:null==t?function(){try{var t;return a&&(t=a.randomBytes)?t=t(i):(t=new Uint8Array(i),(e.crypto||e.msCrypto).getRandomValues(t)),m(t)}catch(t){var n=e.navigator,o=n&&n.plugins;return[+new Date,e,o,e.screen,m(r)]}}():t,3),y),M=new function(t){var n,e=t.length,r=this,o=0,a=r.i=r.j=0,u=r.S=[];e||(t=[e++]);for(;o<i;)u[o]=o++;for(o=0;o<i;o++)u[o]=u[a=h&a+t[o%e]+(n=u[o])],u[a]=n;(r.g=function(t){for(var n,e=0,o=r.i,a=r.j,u=r.S;t--;)n=u[o=h&o+1],e=e*i+u[h&(u[o]=u[a=h&a+n])+(u[a]=n)];return r.i=o,r.j=a,e})(i)}(y),v=function(){for(var t=M.g(u),n=c,e=0;t<f;)t=(t+e)*i,n*=i,e=M.g(1);for(;t>=l;)t/=2,n/=2,e>>>=1;return(t+e)/n};return v.int32=function(){return 0|M.g(4)},v.quick=function(){return M.g(4)/4294967296},v.double=v,d(m(M.S),r),(n.pass||p||function(t,n,e,r){return r&&(r.S&&x(r,M),t.state=function(){return x(M,{})}),e?(o[s]=t,n):t})(v,w,"global"in n?n.global:this==o,n.state)}function x(t,n){return n.i=t.i,n.j=t.j,n.S=t.S.slice(),n}function d(t,n){for(var e,r=t+"",o=0;o<r.length;)n[h&o]=h&(e^=19*n[h&o])+r.charCodeAt(o++);return m(n)}function m(t){return String.fromCharCode.apply(0,t)}if(d(o.random(),r),"object"==typeof n&&n.exports){n.exports=p;try{a=t("crypto")}catch(t){}}else o["seed"+s]=p}("undefined"!=typeof self?self:this,[],Math)},{crypto:1}],11:[function(t,n,e){const r=t("mkdata");n.exports=function(t){const n={dataset:t["Dataset type"].toLowerCase().replace(/\s+/g,""),format:t["File format"].toLowerCase(),n:t["Number of samples"]};console.log("[Gen] Generate data with parameters:",n);const[e,o]=r[n.dataset]({nSamples:n.n}),a=e[0].map((t,n)=>"x"+(n+1)).concat("y"),i=e.map((t,n)=>t.concat(o[n]));let u="";return"csv"===n.format?(u=a.join(",")+"\n",u+=i.map(t=>t.map(t=>{const n=t.toString();return n.includes("e")?t.toFixed(15).replace(/0*$/,""):n}).join(",")).join("\n")+"\n"):u=JSON.stringify({data:i.map(t=>{const n={};return a.forEach((e,r)=>{n[e]=t[r]}),n}),name:t["Dataset type"],n:n.n}),{file:{content:u,filename:n.dataset+"."+n.format}}}},{mkdata:2}]},{},[11])(11)});
