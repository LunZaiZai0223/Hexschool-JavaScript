// import content from "./views/homePage.js";
import { render } from "./utils.js";

// import views
import HomePage from './views/homePage.js';

// import api data 
import getAllProductsData from './api.js'

const rootEle = document.querySelector('#root');
const [...navbarLinks] = document.querySelectorAll('[data-navbar-link]');
console.log(navbarLinks);
navbarLinks.forEach((aTag) => {
  aTag.addEventListener('click', (event) => {
    // event.preventDefault();
    console.log(event);
  });

});


// const routes = {
// "#bedAdvantage": 'homePage',
// "#recommendation": 'homePage',
// "#transport": 'homePage',
// "#cartInfo": 'cartInfo',
// "#customerInfo": 'customerInfo'

// };

// 測試
const routes = {
  "#bedAdvantage": 'homePage',
  "#recommendation": 'homePage',
  "#transport": 'homePage',
  "#homepage": 'homePage',
  null: 'homePage',
  "#cartInfo": 'cartInfo',
  "#customerInfo": 'customerInfo',

};

const noNeedToRenderHashArr = ['#recommendation', "#transport"];

let lastHash = location.hash || null;
console.log('first render', lastHash);

function initialize (rootEle) {
  console.log('init from index.js');
  console.log(location.hash);
  const currentHash = location.hash || null;
  console.log(currentHash);
  const currentView = routes[currentHash];
  console.log(currentView);
  changePage2(currentView, rootEle);
  // console.log(routes[currentHash]);
}

async function changePage2 (view, rootEle) {

  console.log(view);
  if (view === 'homePage') {
    console.log(HomePage.getAllProductsDataLocally());
    // const alreadyHasDataLocally = HomePage.checkHaveAllProductsDataLocally();
    // if (!alreadyHasDataLocally) {
    // await HomePage.updateAllProductsDataLocally();
    // }
    // console.log(await HomePage.getAllProductsDataLocally());
    // console.log(alreadyHasDataLocally);
    // 先更新資料再渲染
    await HomePage.updateAllProductsDataLocally();
    render(rootEle, await HomePage.item());
    await HomePage.addEvent();
    await HomePage.addProductListClickEvent();
    // HomePage.insertSelectOptionEles();
    console.log(await getAllProductsData());
    // 把得到的資料塞進 dom 裡面
    // loading 的 class 蓋住頁面，讓使用者知道目前正在載入資料
  }

}

/**
 * 
 * @param {event} 
 * 1. 確認是否要 render 
 *    - 依照上一個 hash 判斷是否需要 render（上一頁不在 homePage 的才要 render）
 */
// lastHash, routes 靠 ref. 往外找
// 目前 #hash 是正常的了，但是程式碼有點亂
// **************
// todo: navbar 的標籤更改、change2 名稱更改、刪除不需要的程式碼
// **************
function handleHashchange (event) {

  console.log('hash change: lastHash', lastHash);
  console.log('current hash', location.hash);
  // const currentHash = getCurrentHash();
  // const hasToRender = 

  // null 代表一開始進入頁面的時候的狀態
  const homeHashesArr = ['#recommendation', "#transport", "#homepage", null];
  const currentHash = location.hash || null;
  const isCurrentHashEqualHomeHash = checkCurrentHashIsEqualHomeHashes(currentHash, homeHashesArr);

  console.log(isCurrentHashEqualHomeHash);

  if (!isCurrentHashEqualHomeHash) {
    console.log('可以直接 render，因為不用做錨點移動');
    const contentItem = getRouteDOM(isCurrentHashEqualHomeHash, currentHash);
    render(rootEle, '<p>測試可不可以</p>');
    console.log(contentItem);

  } else {
    // true => 上一步及下一步都在主頁，不用 render
    // false => 有更動，要 render
    const result = checkUserIsAlreadyOnHomePage(homeHashesArr);
    const contentItem = getRouteDOM(result, currentHash);
    changePage2(contentItem, rootEle);
    // render(rootEle, contentItem);

  }

  changeLastHash();

  // 靠 ref. 找 routes
  function getRouteDOM (cantRender, contentType) {
    let content;

    if (!cantRender) {
      content = routes[contentType];
    } else {
      content = null;
    }

    return content;
  }

  function checkUserIsAlreadyOnHomePage (homeHashesArr, currentHash) {
    let ans = false;
    console.log(homeHashesArr);
    console.log(lastHash);

    // 已經在 homepage 了
    // 用 ref. 讀取外層的 lashHash
    const already = homeHashesArr.find((hash) => hash === lastHash);
    console.log(already);
    if (currentHash === null || already || already === null) {
      ans = true;
      console.log('我目前在 homepage 的守備範圍');
      return ans;
    }

    console.log('已經不在 homepage 了喔');
    return ans;

  }

  function checkCurrentHashIsEqualHomeHashes (currentHash, homeHashesArr) {

    const result = homeHashesArr.find((homeHash) => homeHash === currentHash) || false;

    return result;
  }
  // const isUserOnHomePage = checkUserIsOnHomePage(homeHashesArr);
  // console.log(isUserOnHomePage);
  // console.log(lastHash);
  // const isNeededToRender = checkHasRender(noNeedToRenderHashArr);
  // console.log(isNeededToRender);
  // console.log(lastHash);
  // console.log(changePage(isNeededToRender, currentHash));

  //if (isUserOnHomePage) {
  // changeLastHash();
  // return;
  //}
  //console.log('目前不在 homepage');
  //console.log(currentHash);
  //changePage(currentHash);
  //// 最後再換 lastHash
  //changeLastHash();

  function changePage (currentHash) {
    console.log(currentHash);
    console.log(routes[currentHash]);
  }

}

// 用 ref. 讀取外部的 lastHash
function checkUserIsOnHomePage (noNeedToRender) {
  // 用 lastHash 判斷 user 是不是在 homepage
  //   => 藉由 lastHash 找 homepage 的 hashes 得出是不是在 homepage
  //   => 沒在 homepage 就一定要 render 
  return lastHash === null || noNeedToRender.find((hash) => hash === lastHash) ? true : false;
  // return lastHash === null ? true : false;
}



/**
* @param {noNeedToRender<Array>} 
* @returns {Boolean} 
*/
function checkHasRender (noNeedToRender) {
  // 找到就會是字串再 ! 變成 false
  // 找不到就會是 undefined 再 ! 變成 true 
  // lastHash 靠 ref. 往外找
  console.log(noNeedToRender);
  console.log(lastHash);
  const isNeededToRender = !noNeedToRender.find((hash) => hash === lastHash);
  console.log(isNeededToRender);

  return isNeededToRender;
}

/**
 * 
 * @param {Boolean} isNeededToRender 
 * @param {String} currentHash 
 * @returns 
 */
// routes 靠 ref. 往外找
// function changePage (isNeededToRender, currentHash) {
// if (isNeededToRender === false) return null;

// console.log(routes[currentHash]);
// return routes[currentHash];
// // return function () {
// // console.log(routes, lastHash);
// // return routes[lastHash];
// // };

// }

function changeLastHash () {
  lastHash = location.hash;
}
// hashchange => 當 hash 改變時觸發
//  1. 判斷 hash 是什麼
//    - 要記得從上一個 hash 判斷要不要換頁（如果上一個是 homepage 的就不用）
//    - render or homepage 移動到指定的 tag
//  2. render  
window.addEventListener('hashchange', handleHashchange);

initialize(rootEle);