import getAllProductsData from '../api.js';

console.log(getAllProductsData);

// 把全部的商品資料接到本地裡面
let allProductsData = [];

// 得到篩選的 section
function getSelectOptionKeys (allProductsData) {
  const keys = allProductsData.map((product) => product.category);
  const optionsArr = keys.filter((key, indexNum) => {
    return keys.indexOf(key) === indexNum;
  });
  console.log(optionsArr);
  return optionsArr;
}

// 創造 option
function createSelectOptionsEle (optionsArr) {
  console.log(optionsArr);
  let optionEles = '<option value="全部" selected>全部</option>';
  optionsArr.forEach((option) => {
    optionEles += `<option value="${option}">${option}</option>`;
  });

  console.log(optionEles);
  return optionEles;
}

// 創造商品卡片
function createProductCardLiELe (allProductsData) {
  // data-product-list 要放的地方
  let card = '';
  allProductsData.forEach((product) => {
    card += `<li class="productCard">
          <h4 class="productType">新品</h4>
          <img
            src="${product.images}"
            alt="">
          <a href="#" class="addCardBtn" data-product-id="${product.id}">加入購物車</a>
          <h3>${product.title}</h3>
          <del class="originPrice">NT$${product.origin_price}</del>
          <p class="nowPrice">NT$${product.price}</p>
        </li>`;
  });

  return card;
}

const HomePage = {
  // 這邊用 async 確保 expression html tag 可以安全產生
  item: async () => {
    const ele = (`<section class="wrap" id="bedAdvantage">
      <div class="banner">
        <h2 class="banner-text">窩窩家居<br>跟您一起品味生活</h2>
      </div>
      <h3 class="section-title">床墊優勢</h3>
      <ul class="bedAdvantage">
        <li>
          <img class="bedAdvantage-img" src="./images/床墊優勢-原木料環保.png" alt="原木料環保">
          <p class="bedAdvantage-text">原木料環保</p>
        </li>
        <li>
          <img class="bedAdvantage-img" src="./images/床墊優勢-好收納.png" alt="好收納">
          <p class="bedAdvantage-text">好收納</p>
        </li>
        <li>
          <img class="bedAdvantage-img" src="./images/床墊優勢-好組裝.png" alt="好組裝">
          <p class="bedAdvantage-text">好組裝</p>
        </li>
      </ul>
    </section>

    <section class="furniture-compare">
      <div class="wrap">
        <h3 class="section-title">家具比較</h3>
        <div class="overflowWrap">
          <table class="compare-table">
            <thead>
              <tr>
                <th></th>
                <th>窩窩系統模組家具</th>
                <th class="text-muted">組合式家具</th>
                <th class="text-muted">實木家具</th>
              </tr>
            </thead>
            <tr>
              <td>可單人自行組裝</td>
              <td><span class="material-icons">done</span></td>
              <td class="text-muted">不一定</td>
              <td></td>
            </tr>
            <tr>
              <td>可多次重複拆裝</td>
              <td><span class="material-icons">done</span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>床墊規格彈性大</td>
              <td><span class="material-icons">done</span></td>
              <td class="text-muted">不一定</td>
              <td class="text-muted">不一定</td>
            </tr>
            <tr>
              <td>材質可長久使用</td>
              <td><span class="material-icons">done</span></td>
              <td></td>
              <td><span class="material-icons">done</span></td>
            </tr>
            <tr>
              <td>小客車即可搬運</td>
              <td><span class="material-icons">done</span></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </section>

    <section class="recommendation" id="recommendation">
      <div class="wrap">
        <h3 class="section-title">好評推薦</h3>
        <div class="recommendation-wall">
          <ul class="gallery-top">
            <li class="recommendation-card">
              <img src="./images/推薦產品-Jodan雙人床架.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-王六角.png" alt="">
                  <div>
                    <p>王六角</p>
                    <p class="recommend-text">Jodan 雙人床架</p>
                  </div>
                </div>
                <p>CP值很高。</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Antony雙人床架.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-Leaf.png" alt="">
                  <div>
                    <p>Leaf</p>
                    <p class="recommend-text">Antony 雙人床架</p>
                  </div>
                </div>
                <p>很喜歡～還有送三年保固～</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Charles系列儲物組合.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-鄧紫棋.png" alt="">
                  <div>
                    <p>美濃鄧子琪</p>
                    <p class="recommend-text">Charles 系列儲物組合</p>
                  </div>
                </div>
                <p>廚房必備美用品！</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Antony雙人床架2.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-isRayNoArray.png" alt="">
                  <div>
                    <p>isRaynotArray</p>
                    <p class="recommend-text">Antony 雙人床架</p>
                  </div>
                </div>
                <p>物超所值!</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Louvre雙人床架.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-鮭魚.png" alt="">
                  <div>
                    <p>程鮭魚</p>
                    <p class="recommend-text">Louvre 雙人床架</p>
                  </div>
                </div>
                <p>租屋用剛剛好</p>
              </div>
            </li>
          </ul>
          <ul class="gallery-bottom">
            <li class="recommendation-card">
              <img src="./images/推薦產品-小杰.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-小杰.png" alt="">
                  <div>
                    <p>小杰</p>
                    <p class="recommend-text">Louvre 雙人床架</p>
                  </div>
                </div>
                <p>非常舒適，有需要會再回購</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-江八角.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-江八角.png" alt="">
                  <div>
                    <p>江八角</p>
                    <p class="recommend-text">Charles 雙人床架</p>
                  </div>
                </div>
                <p>品質不錯～</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-讚神.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦產品-讚神.png" alt="">
                  <div>
                    <p>juni讚神</p>
                    <p class="recommend-text">Antony 床邊桌</p>
                  </div>
                </div>
                <p>讚ㄉ！</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-讚神.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-讚神.png" alt="">
                  <div>
                    <p>久安說安安</p>
                    <p class="recommend-text">Antony 單人床架</p>
                  </div>
                </div>
                <p>一個躺剛剛好。</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-PeiQun.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-PeiQun.png" alt="">
                  <div>
                    <p>PeiQun</p>
                    <p class="recommend-text">Antony 雙人床架</p>
                  </div>
                </div>
                <p>睡起來很舒適</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="transport" id="transport">
      <h3 class="section-title">運送方式</h3>
      <ul class="transport-intro">
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              shopping_cart
            </span>
          </div>
          <h4>STEP.1</h4>
          <p>選購商品</p>
        </li>
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              format_list_bulleted
            </span>
          </div>
          <h4>STEP.2</h4>
          <p>填寫預定資料</p>
        </li>
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              local_post_office
            </span>
          </div>
          <h4>STEP.3</h4>
          <p>預定成功</p>
        </li>
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              done
            </span>
          </div>
          <h4>STEP.4</h4>
          <p>Email 付款資訊</p>
        </li>
      </ul>
    </section>

    <section class="wrap productDisplay">
      <select name="" class="productSelect" data-product-select>
        ${createSelectOptionsEle(getSelectOptionKeys(allProductsData))}
      </select>
      <ul class="productWrap" data-product-list>
        ${createProductCardLiELe(allProductsData)}
      </ul>
    </section>
    <section class="shoppingCart">
      <h3 class="section-title">我的購物車</h3>
      <div class="overflowWrap">
        <table class="shoppingCart-table">
          <tr>
            <th width="40%">品項</th>
            <th width="15%">單價</th>
            <th width="15%">數量</th>
            <th width="15%">金額</th>
            <th width="15%"></th>
          </tr>
          <tr>
            <td>
              <div class="cardItem-title">
                <img src="https://i.imgur.com/HvT3zlU.png" alt="">
                <p>Antony 雙人床架／雙人加大</p>
              </div>
            </td>
            <td>NT$12,000</td>
            <td>1</td>
            <td>NT$12,000</td>
            <td class="discardBtn">
              <a href="#" class="material-icons">
                clear
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#" class="discardAllBtn">刪除所有品項</a>
            </td>
            <td></td>
            <td></td>
            <td>
              <p>總金額</p>
            </td>
            <td>NT$13,980</td>
          </tr>
        </table>
      </div>
    </section>

    <section class="orderInfo wrap" id="orderInfo">
      <h3 class="section-title">填寫預訂資料</h3>
      <form action="" class="orderInfo-form">
        <div class="orderInfo-formGroup">
          <label for="customerName" class="orderInfo-label">姓名</label>
          <div class="orderInfo-inputWrap">
            <input type="text" class="orderInfo-input" id="customerName" placeholder="請輸入姓名" name="姓名">
            <p class="orderInfo-message" data-message="姓名">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="customerPhone" class="orderInfo-label">電話</label>
          <div class="orderInfo-inputWrap">
            <input type="tel" class="orderInfo-input" id="customerPhone" placeholder="請輸入電話" name="電話">
            <p class="orderInfo-message" data-message="電話">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="customerEmail" class="orderInfo-label">Email</label>
          <div class="orderInfo-inputWrap">
            <input type="email" class="orderInfo-input" id="customerEmail" placeholder="請輸入 Email" name="Email">
            <p class="orderInfo-message" data-message="Email">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="customerAddress" class="orderInfo-label">寄送地址</label>
          <div class="orderInfo-inputWrap">
            <input type="text" class="orderInfo-input" id="customerAddress" placeholder="請輸入寄送地址" name="寄送地址">
            <p class="orderInfo-message" data-message="寄送地址">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="tradeWay" class="orderInfo-label">交易方式</label>
          <div class="orderInfo-inputWrap">
            <select id="tradeWay" class="orderInfo-input" name="交易方式">
              <option value="ATM" selected>ATM</option>
              <option value="信用卡">信用卡</option>
              <option value="超商付款">超商付款</option>
            </select>
          </div>
        </div>
        <input type="submit" value="送出預訂資料" class="orderInfo-btn">
      </form>
    </section>`);

    return ele;
  },

  addEvent: async () => {
    // 推薦卡片滑動
    // document.addEventListener('DOMContentLoaded', function () {
    const ele = document.querySelector('.recommendation-wall');
    ele.style.cursor = 'grab';
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
    // });

    // navbar hamburger
    // menu 切換
    let menuOpenBtn = document.querySelector('.menuToggle');
    let linkBtn = document.querySelectorAll('.topBar-menu a');
    let menu = document.querySelector('.topBar-menu');
    menuOpenBtn.addEventListener('click', menuToggle);

    linkBtn.forEach((item) => {
      item.addEventListener('click', closeMenu);
    })

    function menuToggle () {
      if (menu.classList.contains('openMenu')) {
        menu.classList.remove('openMenu');
      } else {
        menu.classList.add('openMenu');
      }
    }
    function closeMenu () {
      menu.classList.remove('openMenu');
    }
  },

  addProductListClickEvent: async () => {
    // data-product-list
    document.querySelector('[data-product-list]').addEventListener('click', (event) => console.log(event));

  },

  checkHaveAllProductsDataLocally: () => {
    return allProductsData.length === 0 ? false : true;
  },

  updateAllProductsDataLocally: async () => {
    allProductsData = await getAllProductsData();
    console.log(allProductsData);
    // allProductsData.push(getAllProductsData());
    // console.log(allProductsData);
  },

  getAllProductsDataLocally: () => {
    return allProductsData;
  }


};

export default HomePage;