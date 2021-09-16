/**
 * 对象数组去重
 * @param {Array} arr 输入
 * @param {String} filed 根据某个字段去重
 * @returns {Array} 输出
 */
export function unique(arr = [], filed) {
  const res = new Map();
  return filed ? arr.filter(a => !res.has(a[filed]) && res.set(a[filed], 1)) : [...new Set(arr)];
}

/**
 * 获取文件流导出文件 请求 responseType = 'blob'
 * @param {Object} data 文件流对象输入
 * @param {String} name 文件类型
 */
export function exportFile(data, name = 'file.xlsx') {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(data, name);
  } else {
    const blob = new Blob([data]);
    const elink = document.createElement('a');
    elink.download = name;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  }
}

/**
 * 获取上传图片宽高
 * @param {Object} files 输入
 * */
export function fileSizeWH(files) {
  return new Promise(resolve => {
    if (files && files[0]) {
      if (files[0].type === 'image/jpeg' || files[0].type === 'image/gif' || files[0].type === 'image/png') {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (ev) => {
          const img = new Image();
          img.src = ev.target.result;
          img.onload = () => {
            resolve({ size: files[0].size / 1024, width: img.width, height: img.height });
          };
        };
      } else {
        console.log(`文件类型不对${files[0].type}`);
      }
    } else {
      console.log('没有上传，使用默认');
    }
  });
}

/**
 * 时间戳转换为指定格式日期
 * @param {Number} timestamp 时间戳
 * @param {String} format 日期格式
 * @returns {String} 输出 对应格式日期
 */
export function formatTime(timestamp, format = 'Y-M-D h:m:s') {
  function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
  }

  const time = new Date(timestamp);
  const newArr = [];
  const formatArr = ['Y', 'M', 'D', 'h', 'm', 's'];

  newArr.push(time.getFullYear());
  newArr.push(formatNumber(time.getMonth() + 1));
  newArr.push(formatNumber(time.getDate()));
  newArr.push(formatNumber(time.getHours()));
  newArr.push(formatNumber(time.getMinutes()));
  newArr.push(formatNumber(time.getSeconds()));

  for (const i in newArr) {
    if ({}.hasOwnProperty.call(newArr, i)) {
      format = format.replace(formatArr[i], newArr[i]);
    }
  }

  return format;
}

/**
 * 图片大小处理[oss服务器自带]
 * @param {String} url 图片链接
 * 文档链接 [https://help.aliyun.com/document_detail/44688.html]
 * @param param
 * @return {string}
 */
export function IMG_SIZE(url, param = {}) {
  var str = `${url}?x-oss-process=image/resize,m_pad`; // https://cc-west-usa.oss-us-west-1.aliyuncs.com/15330528/2076770670210.jpg?x-oss-process=image/resize,w_200,h_200
  for (var k in param) str += `,${k}_${param[k]}`;
  return str;
}

/**
 * @description 判断参数是否是其中之一
 * @param {*} value
 * @param {*} valueList
 */
export function oneOf(valueList, value) {
  return valueList.some(item => item === value);
}

/**
 * @description 判断数据类型
 * @param {*} value
 */
export function typeOf(value) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(value)];
}

/**
 * @description 深度克隆
 * @param {*} data
 */
export function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * @description 获取链接参数
 * @param {string} key
 */
export function getQueryString(key) {
  const queryString = window.location.search;
  if (queryString) {
    const reg = new RegExp(`(^|&)${ key }=([^&]*)(&|$)`, 'i');
    const r = queryString.substr(1).match(reg);
    if (r !== null) return r[2];
  }
  return null;
}

/**
 * @description 数组求和
 * @param {Array} arr 输入
 * @param {string} filed
 * @returns {Number} 输出
 */
export function sumTotal(arr, filed) {
  return arr.reduce(function (sum, current) {
    return sum + Number(filed ? current[filed] : current);
  }, 0);
}

/**
 * 将数字四舍五入到指定的小数位数。
 * @param {number} n 操作的数字
 * @param {number} decimals 精确到几位小数
 */
export const toRound = (n, decimals = 0) => {
  return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
};

/**
 * 指定根据位数输入数字。
 * @param {string} str 操作的数字
 * @param {number} length 精确到几位小数
 */
export const floatLength = (str = '', length) => {
  let _val = str
  .toString()
  .replace(/[^\d+.]/, '') // 限制输入数字和 .
  .replace(/^\./, '') // 不允许 . 开头
  .replace(/\./, '#') // 暂存第一次出现的小数点
  .replace(/\./g, '') // 干掉所有小数点
  .replace('#', '.'); // 还原第一个暂存的小数点
  const [str1 = '', str2 = ''] = _val.split('.');
  if (length && str2 && str2.length > length) {
    _val = `${str1}.${str2.substr(0, length)}`;
  }
  if (length === 0) {
    _val = str1;
  }
  return _val;
};

/**
 * @description 文字转语音 (h5 API)
 * @param {string} text
 */
export function textToAudio1(text) {
  const audio = new SpeechSynthesisUtterance();
  audio.text = text;
  audio.lang = 'zh';
  audio.rate = 0;
  audio.volume = 1;
  audio.pitch = 2;
  speechSynthesis.speak(audio);
  audio.onend = () => {
    console.log('播放完了');
  };
}

/**
 * @description 文字转语音 (调用百度API)
 * @param {string} text
 */
export function textToAudio2(text) {
  const url = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&vol=15&text=${text}`;
  const audio = new Audio(url);
  audio.src = url;
  audio.play();
}

/**
 * @description 文本转链接
 * @param {string} text
 */
export function textToLink(text) {
  if (!text) return;
  const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|#|%|:)+)/g;
  return text.replace(reg, '<a href=\'$1$2\' id=\'url\' target=\'_blank\'>$1$2</a>').replace(/\n/g, '<br />');
}

/**
 * @description 获取图片大小 宽高
 * @param {Object} files
 */
export function getImgSizeWH(files) {
  return new Promise(resolve => {
    if (files && files[0]) {
      if (files[0].type === 'image/jpeg' || files[0].type === 'image/gif' || files[0].type === 'image/png') {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = ev => {
          const img = new Image();
          img.src = ev.target.result;
          img.onload = () => {
            resolve({ size: files[0].size / 1024, width: img.width, height: img.height });
          };
        };
      } else {
        console.log('文件类型不对 ' + files[0].type);
      }
    } else {
      console.log('没有上传，使用默认');
    }
  });
}

/**
 * @description 筛选出包含 val 的新数组
 * @param {Array} arr 输入
 * @param {string} filed
 * @param {string} val
 * @returns {Array} 输出
 */
export function filedFilter(arr, filed, val) {
  return arr.reduce(function (newArr, item) {
    if (item[filed] === val) {
      newArr.push(item);
    }
    return newArr;
  }, []);
}

/**
 * url 序列化和反序列化
 * @param {Object|String} param
 */
export const URLSearchParams = (param) => {
  if (param.toString() === '[object Object]') {
    return Object.keys(param).map(key => `${key}=${encodeURIComponent(JSON.stringify(param[key]))}`).join('&');
  } else if (typeof (param) === 'string') {
    let maps = {};
    let _params = param.match(/(([^&?]+)=([^&]*)?)/ig);
    _params && _params.forEach(res => {
      let row = decodeURIComponent(res).split('=');
      try {
        maps[row[0]] = JSON.parse(decodeURIComponent(row[1]));
      } catch (err) {
        try {
          maps[row[0]] = decodeURIComponent(row[1]);
        }
          //特殊字符情况
        catch (err) {
          try {
            maps[row[0]] = JSON.parse(row[1]);
          } catch (err) {
            maps[row[0]] = row[1];
          }
        }
      }
    });
    return maps;
  }
};

/**
 * 函数防抖 (立即执行版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 */
export const debounceStart = (fn, delay = 2000) => debounce(fn, delay, true);

/**
 * 函数防抖 (非立即执行版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 */
export const debounceEnd = (fn, delay = 2000) => debounce(fn, delay, false);

/**
 * 函数防抖 (完全版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 * @param {boolean} immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (fn, delay, immediate = false) => {
  let timer = null;
  let status = true;
  if (!immediate) return function () {
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
  else return function () {
    clearTimeout(timer);
    if (status) {
      status = false;
      fn.call(this, arguments);
    }
    timer = setTimeout(() => status = true, delay);
  };
};

/**
 * 函数节流
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 */
export const throttle = (fn, delay) => {
  let timer = null;
  return function () {
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
};

/**
 * 评分组件
 * @param {Number} rate max 5
 */
export const getRate = (rate) => {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);
};

/**
 * 返回按属性(props)和顺序(orders)排序的对象数组。
 * @param {array} arr
 * @param {array} props
 * @param {array} orders 'desc升序' 、 'asc降序'
 * @example const users = [
 { name: 'a', age: 48 },
 { name: 'b', age: 36 },
 { name: 'c', age: 40 }
 ];
 utils.orderBy(users, ['age'],['asc']) // => [{"name":"b","age":36},{"name":"c","age":40},{"a":"aaa","age":48}]
 */
export const orderBy = (arr, props, orders) => {
  return [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0),
  );
};

/**
 * 根据 key 递归查找链带关系
 * @param {string} leafIdName
 * @param {any} leafId
 * @param {array} nodes 被查找的数组
 * @param {array} path 非必填
 */
export const findPathByLeafId = (nodes, leafIdName, leafId, path = []) => {
  for (var i = 0; i < nodes.length; i++) {
    var tmpPath = [...path];
    if (leafId == nodes[i][leafIdName]) {
      return tmpPath;
    }

    tmpPath.push({
      [leafIdName]: nodes[i][leafIdName],
      value: nodes[i].name,
    });
    if (nodes[i].children) {
      let findResult = findPathByLeafId(nodes[i].children, leafIdName, leafId, tmpPath);
      if (findResult) {
        return findResult;
      }
    }
  }
};

/**
 * 从对象中检索出给定选择器指定的一组属性
 * @param {Object|Array} from
 * @param {string} selectors
 * @param {string} keys
 */
export const selector = (from, selectors, keys = null) => {
  keys = keys || selectors.match(/([\w]+)/g);
  if (!!keys && !!keys.length && !!from) {
    let key = keys.splice(0, 1);
    let value = from[key];
    return selector(value, selectors, keys);
  } else return from;
};

/**
 * ajax 请求
 * @param {string} url 请求地址
 * @param {string} type 请求方式 GET POST
 * @param {Object} hearders 请求头配置项
 * @param {Object} parmas 请求参数
 * @param {function} success 请求成功回调
 * @param {function} failed 请求失败回调
 */
export const ajax = ({ url, type = 'POST', hearders = {}, parmas, success, failed }) => {
  const xhr = new XMLHttpRequest();
  let _url = url;
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 304) {
      success(JSON.parse(xhr.responseText) || {});
    } else {
      failed(xhr);
    }
  };
  if (type.toUpperCase() === 'GET') {
    let params = [];

    for (let k in parmas) {
      params.push(`${k}=${parmas[k]}`);
    }
    _url = `${_url}?${params.join('&')}&v=${Date.now()}`;
  }
  xhr.open(type, _url);
  for (let k in hearders) {
    xhr.setRequestHeader(k, hearders[k]);
  }
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(Object.assign({}, parmas)));
};
