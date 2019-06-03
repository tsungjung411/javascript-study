
# Promise

<br>

## 什麽是 Promise
- Promise 是一種工具
- Promise 是一種協助非同步的工具
- Promise 是一種協助非同步「**回呼(回傳呼叫/callback)**」的工具
- Promise 是一種協助「即將完成或失敗」的非同步回呼工具

- https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises
  <br>Promise 是一個表示非同步運算的最終完成或失敗的物件。

- https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise
  <br>Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

<br>

## [Promise 起源](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)

### 共同的回傳呼叫函數(Callback)
```javascript
// 成功後要回傳呼叫的函數(Callback)，這樣才可以讓呼叫者知道狀況
function successCallback(result) {
    console.log("成功: 結果:", result);
}

// 失敗後要回傳呼叫的函數(Callback)，這樣才可以讓呼叫者知道狀況
function failureCallback(error) {
    console.log("失敗: 錯誤訊息:", error);
}
```

### 傳統作法
範例程式：
```javascript
function doSomething(successCallback, failureCallback) {
    // 隨機產生 true(50%) 或 false(50%)
    var trueOfFalse = parseInt(Math.floor(Math.random() * 2));
    if (trueOfFalse) {
        successCallback('Done');
    } else {
        failureCallback('(T＿T)');
    }
}
doSomething(successCallback, failureCallback)
doSomething(successCallback, failureCallback)
doSomething(successCallback, failureCallback)
```

執行結果：
```
成功: 結果: Done
失敗: 錯誤訊息: (T＿T)
成功: 結果: Done
```

### 新的作法(Promise)
Promise 概念：
```javascript
let promise = doSomething();
promise.then(successCallback, failureCallback);
```

個人看法：這跟傳統的 listener 作法，根本沒差別啊？？(繼續看下去)
```javascript
let promise = doSomething();
promise.setSuccessListener(successCallback);
promise.setFailureListener(failureCallback);
```

> 新的作法會回傳 promise 物件, 可以在事後附加 callback
> <br>我們稱為非同步呼叫。[出處](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)



<br>

## 參考資料
- [[Mozilla] Promise 建構式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [[Mozilla] Promise 使用方式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)
- [[Mozilla] async function](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function)
- [[難] JavaScript Promise：簡介](https://developers.google.com/web/fundamentals/primers/promises)
