/**
 * @returns 
 * {Object} getData [取得 data]
 * {Object} pushNewData [把新資料新增至 data 中]
 */
const Tickets = (() => {
  const data = [
      {
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
      },
      {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
      },
      {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
      }
    ];
  const getData = () => {
    return data;
  };
  const pushNewData = (newData) => {
    data.push(newData);
  };
  return { getData, pushNewData };
})();

/**
 * @return {Object} 傳 Promise
 */
const UseAxiso = (() => {
  function _getData () {
    const baseURL = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
    return axios.get(baseURL);
  }
  return { _getData };
})();


const Controller = (() => {
  const _filterForm = document.querySelector('[data-filter-form]');
  const _ulEle = document.querySelector('[data-card-list]');
  const _addTicketsForm = document.querySelector('[data-add-tickets-form]');
  const _ticketNameInputEle = document.querySelector('#ticket-name');
  const _ticketImageUrlInputEle = document.querySelector('#ticket-image-url');
  const _ticketAreaInputEle = document.querySelector('#ticket-area');
  const _ticketPriceInputEle = document.querySelector('#ticket-price');
  const _ticketGroupInputEle = document.querySelector('#ticket-group');
  const _ticketRateInputEle = document.querySelector('#ticket-rate');
  const _ticketDescriptionTextAreaEle = document.querySelector('#ticket-description');



  // 新增資料後還需要遵照目前篩選狀態顯示資料
  // 把目前篩選的基準用出來，這樣子在其他狀態下也可以使用
  let _currentFilterValue = '';
  /**
   * 1. 新增 eventListener
   * 2. 顯示全部的資料
   */
  function _initialize () {
    _filterForm.addEventListener('change', _changeHandler);
    _addTicketsForm.addEventListener('submit', _submitHandler);
    UseAxiso._getData()
    .then(response => {
      const data = _destructuring(response);
      _makeDonut(_cleanData(data));
      _render(data);
    }).catch(error => console.log(error));
  }

  /*
  處理圖片的東西
    1. 整理資料
    2. 在畫面上顯示結果
   */
  function _cleanData (data) {
    let mappingObj = {};
    data.forEach(obj => {
      if (!mappingObj[obj.area]) {
        mappingObj[obj.area] = 1;
      } else {
        mappingObj[obj.area] ++;
      }
      // dountColumns.push(mapping);
    });
    mappingObj = Object.entries(mappingObj);
    return mappingObj;
  }
  function _makeDonut (arr) {
      const chart = c3.generate({
        bindto: '#chart',
          data: {
            columns: arr,
            type : 'donut',
            colors: {
            高雄: '#E68618',
            台北: '#26C0C7',
            台中: '#5151D3'
        },
          },
          donut: {
            title: "套票地區比重",
            width: 15,
            label: {
              show: false
            }
          },
          size: {
            height: 200
          }
      });
    }

  /**
   * 觸發事件時要執行的任務
   *   - 篩選
   *   - 渲染畫面
   */
  function _changeHandler () {
    _currentFilterValue = _filterForm.value;
    _filterData(_currentFilterValue);
  }
  /**
   * @param  {String} _currentFilterValue
   * 判斷現在篩選的值是什麼
   *   任意地區 => render 對應的資料
   *   全部地區 => render 全部的資料
   */
  function _filterData (formValue) {
    if (formValue !== 'all') {
    const result = Tickets.getData().filter(obj => obj.area === formValue);
    _render(result);
    } else {
      _render(Tickets.getData());
    }
  }
  function _submitHandler (event) {
    event.preventDefault();
    console.log(Tickets.getData());
    _organizingData(_ticketNameInputEle, _ticketImageUrlInputEle, _ticketAreaInputEle, _ticketPriceInputEle, _ticketGroupInputEle, _ticketRateInputEle, _ticketDescriptionTextAreaEle);
  } 
  function _organizingData (_ticketNameInputEle, _ticketImageUrlInputEle, _ticketAreaInputEle, _ticketPriceInputEle, _ticketGroupInputEle, _ticketRateInputEle, _ticketDescriptionTextAreaEle) {
    const name = _ticketNameInputEle.value.trim();
    const imgUrl = _ticketImageUrlInputEle.value.trim();
    const area = _ticketAreaInputEle.value === 'null' ? null : _ticketAreaInputEle.value;
    const price = parseInt(_ticketPriceInputEle.value) || null;
    const group = parseInt(_ticketGroupInputEle.value) || null;
    const rate = parseInt(_ticketRateInputEle.value) <= 10 && parseInt(_ticketRateInputEle.value) >= 1 ? parseInt(_ticketRateInputEle.value) : null;
    const description = _ticketDescriptionTextAreaEle.value.length <= 100 ? _ticketDescriptionTextAreaEle.value : null;
    _formValidation(name, imgUrl, area, price, group, rate, description);
  }
  function _formValidation (name, imgUrl, area, price, group, rate, description) {
    _addTicketsForm.classList.add('has-validation');
    if (!name) {
      const parentEle = _ticketNameInputEle.parentElement;
      _setInvalidFeedback(parentEle, '名稱必填');
    } else {
      const parentEle = _ticketNameInputEle.parentElement;
      _removeInvalidFeedback(parentEle);
    }
    if (!imgUrl) {
      const parentEle = _ticketImageUrlInputEle.parentElement;
      _setInvalidFeedback(parentEle, '圖片網址必填');
    } else {
      const parentEle = _ticketImageUrlInputEle.parentElement;
      _removeInvalidFeedback(parentEle);
    }
    if (!area) {
      const parentEle = _ticketAreaInputEle.parentElement;
      _setInvalidFeedback(parentEle, '圖片網址必填');
    } else {
      const parentEle = _ticketAreaInputEle.parentElement;
      _removeInvalidFeedback(parentEle);
    }
    if (!price) {
      const parentEle = _ticketPriceInputEle.parentElement;
      _setInvalidFeedback(parentEle, '價格必填');
    } else {
      const parentEle = _ticketPriceInputEle.parentElement;
      _removeInvalidFeedback(parentEle);
    }
    if (!group) {
      const parentEle = _ticketGroupInputEle.parentElement;
      _setInvalidFeedback(parentEle, '組數必填');
    } else {
      const parentEle = _ticketGroupInputEle.parentElement;
      _removeInvalidFeedback(parentEle);
    }
    if (!rate) {
      const parentEle = _ticketRateInputEle.parentElement;
      _setInvalidFeedback(parentEle, '星級必填且需介於 1 至 10 之間');
    } else {
      const parentEle = _ticketRateInputEle.parentElement;
      _removeInvalidFeedback(parentEle);
    }
    if (!description) {
      const parentEle = _ticketDescriptionTextAreaEle.parentElement;
      _setInvalidFeedback(parentEle, '描述必填且不可超過 100 字');
    } else {
      const parentEle = _ticketDescriptionTextAreaEle.parentElement;
      _removeInvalidFeedback(parentEle);
    }

    const inputValues = {id: Tickets.getData().length, name, imgUrl, area, price, group, rate, description};
    const invalidValuesArr = Object.values(inputValues).filter(value => value === '' || value === null);
    _saveNewTicket(invalidValuesArr, inputValues);
  }
  function _setInvalidFeedback (parentEle, errorMsg) {
    if (parentEle.children.length < 3) { 
      parentEle.classList.add('invalid');
      const validationFeedbackDivEle = document.createElement('div');
      validationFeedbackDivEle.classList.add('validation-feedback');
      validationFeedbackDivEle.innerHTML = `
        <span></span>
        <small class="validation-msg"><i class="fas fa-exclamation-circle" style="margin-right: 6px;"></i>${errorMsg}</small>
      `;
      parentEle.append(validationFeedbackDivEle);
    }
  }
  function _removeInvalidFeedback (parentEle) {
    parentEle.classList.remove('invalid');
    if (parentEle.children.length === 3) {
      if (parentEle.lastChild.className.includes('validation-feedback')) {
        parentEle.lastChild.remove();
      }
    }
  }
  function _saveNewTicket (invalidArr, validObj) {
    if (invalidArr.length === 0) {
      Tickets.pushNewData(validObj);
      console.log(Tickets.getData());
      _addTicketsForm.classList.remove('has-validation');
      _addTicketsForm.reset();
      if (_currentFilterValue !== 'all' && _currentFilterValue !== '') {
      // 還是要維持目前篩選的情況給資料
      const data = Tickets.getData().filter(obj => obj.area === _currentFilterValue);
      _render(data);
      // 但如果是連篩選都沒案就新增，就不用管，直接更新
      } else {
      _render(Tickets.getData());
      }
      _makeDonut(_cleanData(Tickets.getData()));
      window.scroll({top: 921, left:0 ,behavior: 'smooth'});
    }
  }
  /**
   * @param  {Array} data 
   */
  function _render (data) {
    const searchResultMsgEle = document.querySelector('[data-search-result-msg]');
    let content = '';
    data.forEach(obj => {
      const {name, imgUrl, area, description, group, price, rate} = obj;
      content += `
      <li>
        <div class="card">
          <div class="area-sticker">${area}</div>
          <div class="rate-sticker">${rate}</div>
          <div class="card-image-wrapper">
            <img src="${imgUrl}" alt="">
          </div>
          <div class="card-content">
            <div class="card-text-area">
              <h1 class="card-header">${name}</h1>
              <p class="card-text">${description}</p>
            </div>
            <div class="card-info">
              <div class="left-counter">
                <span><i class="fas fa-exclamation-circle"></i>剩下最後 ${group} 組</span>
              </div>
              <div class="price-wrapper">
                TWD <span class="price">${price}</span>
              </div>
            </div>
          </div>
      </li>
      `;
    });
    _ulEle.innerHTML = content;
    searchResultMsgEle.innerText = data.length;
  }
  function _destructuring (res) {
    const { data } = res.data;
    return data;
  }

  _initialize();

})();
