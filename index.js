import{a as y,S as h,i as d}from"./assets/vendor-BH9GyP-n.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const L="49442933-c5db9ffac96cc4cef7ce5cd82",v="https://pixabay.com/api/";let p=0;async function b(r,s,a){try{const e=await y.get(v,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:a}});return p=e.data.totalHits,e.data.hits}catch(e){throw new Error(e.response?e.response.status:e.message)}}const n={searchForm:document.querySelector("form"),gallery:document.querySelector(".gallery"),notFoundText:document.querySelector(".js-not-found-text"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")},q=new h(".gallery_link",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});async function f(r,s,a){try{l(!0),s===1&&u();const e=await b(r,s,a);if(console.log(e),!e.length){d.error({title:"Error",message:`No results for query <span>${r}</span>`,position:"topRight"});return}n.gallery.insertAdjacentHTML("beforeend",M(e)),q.refresh(),p>s*a?w():u()}catch(e){console.error("Error fetching images:",e)}finally{l(!1)}}function l(r){r?n.loader.classList.add("active"):n.loader.classList.remove("active")}function w(){n.loadMoreBtn.classList.remove("is-hidden")}function u(){n.loadMoreBtn.classList.add("is-hidden")}function M(r){return r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:t,views:o,comments:c,downloads:g})=>`<li class="gallery_item">
            <a class="gallery_link" href="${a}">
                <img class="gallery_image" src="${s}" alt="${e}" />
            </a>
            <div class="info">
                <p>Likes <span>${t}</span></p>
                <p>Views <span>${o}</span></p>
                <p>Comments <span>${c}</span></p>
                <p>Downloads <span>${g}</span></p>
            </div>
        </li>`).join("")}const m=15,i={curPageNum:1,savedQuery:""};n.searchForm.addEventListener("submit",function(r){r.preventDefault();const a=r.currentTarget.elements.query.value.trim();if(a===""){d.warning({title:"Caution",message:"Please enter a query!",position:"topRight"});return}i.savedQuery=a,i.curPageNum=1,n.gallery.innerHTML="",f(i.savedQuery,i.curPageNum,m)});n.loadMoreBtn.addEventListener("click",function(r){i.curPageNum+=1,f(i.savedQuery,i.curPageNum,m)});
//# sourceMappingURL=index.js.map
