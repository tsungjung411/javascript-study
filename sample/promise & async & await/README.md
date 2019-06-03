
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
<br>

## [Promise 起源](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)

### 先準備共同的回傳呼叫函數(Callback)
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

<br>

### callback 的傳統作法
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

<br>

### callback 的新的作法 (= Promise)
Promise 概念：
```javascript
let promise = doSomething();
promise.then(successCallback, failureCallback);
```
等價於
```javascript
let promise = doSomething();
promise
.then(successCallback)
.catch(failureCallback);
```

個人看法：
- 這跟傳統的 listener 作法，根本沒差別啊？
- (繼續看下去)

```javascript
let promise = doSomething();
promise.setSuccessListener(successCallback);
promise.setFailureListener(failureCallback);
```

> 新的作法會回傳 promise 物件, 可以在事後附加 callback
> <br>我們稱為「非同步函數呼叫」。([出處](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises))

<br>

### async callback v.s. thread 的個人看法：
- 上面的作法，應該叫做「非同步函數回呼」比較適當吧?
- 因為「非同步函數呼叫」，會以為是「跑在其他執行緒(thread)上執行」
- 而 Promise 只是在事後呼叫 callback，並非是 thread

<br>

### promise v.s. listener 的個人看法：
- promise 並非只是當作 callback，而是用串接多個小任務
- 跟 listener 的差別在於：
  - listenr 函數通常是無回傳值，所以無法串接
  - 而 promise 可以一直串接
- 即便 listener 可以串接，它也只是設定 callback，並不是用來執行多個小任務
  ```
  setOnClickListener(listener) {
      this.mOnClickListener = listenerㄤ
      return this;
  }
  ```

<br>
<br>

## 實際模擬 Promise，感受一下

基本架構：
```javascript
var MyPromise = class {
    constructor(executor) {
        let resolve = () => {
            this.mState = true; 
        };
        let reject = () => {
            this.mState = false;
        };
        executor(resolve, reject);
    }
    then(taskExecutor) {
        if (this.mState) {
            try {
                taskExecutor();
            } catch (error) {
                // 跳過後面接續的 .then(...)，直到遇到 .catch(...)
                this.mState = false;
                // error 物件屬性：name, message / stack
                this.mError = error;
            }
        }
        return this;
    }
    catch(errorHandler) {
        // 處理目前的錯誤
        errorHandler(this.mError);
        // 錯誤已經處理完畢，回復狀態，可以接著執行後面的 .then(...)
        this.mState = true;
        this.mError = null;
        return this;
    }
}
```

## 波動拳：傳統作法 v.s. Promise
```javascript
function doSomething(successCallback, failureCallback) {
    console.log("瀏覽 FB 某頁面A");
    successCallback(true);
}

function doSomethingElse(successCallback, failureCallback) {
    console.log("頁面自動轉到：使用者登入頁面");
    console.log("登入檢查中...");
    
    // 隨機產生 true(50%) 或 false(50%)
    var trueOfFalse = parseInt(Math.floor(Math.random() * 2));
    if (trueOfFalse) {
        successCallback(true);
    } else {
        failureCallback('登入失敗');
    }
}

function doThirdThing(successCallback, failureCallback) {
    console.log("自動轉回原本頁面A");
    successCallback(true);
}

function failureCallback(error) {
    console.log("錯誤訊息：" + error);
    console.log("無權限可以瀏覽網頁");
}
```

串接任務：
```
doSomething( // 瀏覽 FB 某頁面A
    function (result1)) {
        doSomethingElse( // 頁面自動轉到：使用者登入頁面
            function (result2) {
                doThirdThing( // 自動轉回原本頁面A
                    function (result3) {
                        console.log("看到頁面內容了!!")
                    }
                )
            },
            failureCallback
        );
    },
    failureCallback
);
```


<br>
<br>

## Promise = 保證，是在保證什麽？
### 三大保證
- callback 不會在當前的任務執行結束前呼叫
- callback 可以透過 ```.then()``` 添加
- 多個 callback 可以透過「重複呼叫 ```.then()```」 來達成

(~~聽起來就像廢話~~)

<br>




  
<br>
<br>

## 參考資料
- [[Mozilla] Promise 建構式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [[Mozilla] Promise 使用方式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)
- [[Mozilla] async function](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function)
- [[難] JavaScript Promise：簡介](https://developers.google.com/web/fundamentals/primers/promises)
