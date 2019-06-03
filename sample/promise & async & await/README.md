
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

## Promise 起源

### 共同的 Callback
```javascript
function successCallback(value) {
    console.log("Success: value:", value);
}

function failureCallback(error) {
    console.log("Failure: error:", error);
}
```

### 傳統作法
```javascript
function doSomething(successCallback, failureCallback) {
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
Success: value: Done
Failure: error: (T＿T)
Success: value: Done
```

## 參考資料
- [[Mozilla] Promise 建構式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [[Mozilla] Promise 使用方式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)
- [[Mozilla] async function](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function)
- [[難] JavaScript Promise：簡介](https://developers.google.com/web/fundamentals/primers/promises)
