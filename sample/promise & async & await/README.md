
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

// 呼叫三次
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
- 第一個任務（最初的任務，位於建構子）是透過「callback」來回報結果
- 後面的任務是透過「回傳值」來回報結果
```javascript
var MyPromise = class {
    constructor(initExecutor) {
        // 最初的任務沒有輸入值
        const resolve = (result) => {
            this.mResult = result;
            this.mState = true;
        };
        const reject = (reject) => {
            this.mError = error;
            this.mState = false;
        };
        initExecutor(resolve, reject);
    }

    then(taskExecutor) {
        if (this.mState) {
            try {
                // 上一個任務的輸出值，當做下一個任務的輸入值
                this.mResult = taskExecutor(this.mResult);
            } catch (error) {
                // 跳過後面接續的 .then(...)，直到遇到 .catch(...)
                this.mState = false;
                
                // error 物件屬性：name, message, stack
                this.mError = error;
            }
        }
        return this;
    }
    
    catch(errorHandler) {
        // 如果沒有錯誤訊息，就不會執行
        if (!this.mState) {
            // 處理目前的錯誤
            errorHandler(this.mError);
            
            // 錯誤已經處理完畢，回復狀態，可以接著執行後面的 .then(...)
            this.mState = true;
            this.mError = null;
        }
        return this;
    }
}
```

<br>
<br>

## 波動拳：傳統作法 v.s. MyPromise v.s. Promise

### 何謂波動拳
- Pyramid of Doom: 金字塔的厄運（中文用「波動拳」來形容）
- 連續執行多個相依任務，形成很深的巢狀結構，導致程式碼縮排太多
  - 如果 user_name 不為空
  - 如果 user_password_new 不為空
  - 如果 user_password_new === user_password_repeat (輸入兩次要一樣)
  - 如果 user_password_new > 5 (密碼程度至少要 6 位以上)
  - 如果 1 < user_name < 65 (使用者名稱符合長度規則)
  - ...
  <br>![](https://pbs.twimg.com/media/COYihdoWgAE9q3Y.jpg)
  <br>(圖片來源：https://twitter.com/piscis168/status/641237956070666240)
  <br>![](http://polyglot.ninja/wp-content/uploads/2017/08/pyramid.png)
  <br>(圖片來源：http://polyglot.ninja/promises-in-javascript/pyramid/)

<br>

### 範例展示，首先定義好要做的任務
- 最初的 task 沒有 input，然後接著有選擇性的 成功/失敗 callback
- 後面的 task 都有 input (上一個 task 的 output)，然後接著有選擇性的 成功/失敗 callback
- callback 敘述是回報給傳統方法
- return 敘述是回報給 Promise

```javascript
function doSomething(successCallback, failureCallback) { // 沒有 input
    console.log("[Task1] 瀏覽 FB 某頁面A");
    successCallback('HTTP 200');
}

function doSomethingElse(params, successCallback, failureCallback) {
    console.log("[Task2] params:", params);
    console.log("[Task2] 頁面自動轉到：使用者登入頁面");
    console.log("[Task2] 登入檢查中...");
    
    // 隨機產生 true(50%) 或 false(50%)
    var trueOfFalse = parseInt(Math.floor(Math.random() * 2));
    var result = {
        allowToAccess: trueOfFalse
    };
    
    if (trueOfFalse) {
        result.text = '登入成功';
        if (successCallback) {
            successCallback(result);
        }
    } else {
        result.text = '登入失敗';
        if (failureCallback) {
            failureCallback(result);
        } else {
            throw result;
        }
    }
    return result;
}

function doThirdThing(params, successCallback, failureCallback) {
    console.log("[Task3] params:", params);
    console.log("[Task3] 自動轉回原本頁面A");
}

function failureCallback(error) {
    console.log("[Error] 錯誤訊息：", error);
    console.log("[Error] 無權限可以瀏覽網頁");
}
```

<br>

### 使用「傳統作法」來串接任務：
```javascript
doSomething( // 瀏覽 FB 某頁面A
    function (result1) {
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

執行結果1：
```
[Task1] 瀏覽 FB 某頁面A
[Task2] params: HTTP 200
[Task2] 頁面自動轉到：使用者登入頁面
[Task2] 登入檢查中...
[Error] 錯誤訊息： {allowToAccess: false, text: "登入失敗"}
[Error] 無權限可以瀏覽網頁
```

執行結果2：
```
[Task1] 瀏覽 FB 某頁面A
[Task2] params: HTTP 200
[Task2] 頁面自動轉到：使用者登入頁面
[Task2] 登入檢查中...
[Task3] params: {allowToAccess: true, text: "登入成功"}
[Task3] 自動轉回原本頁面A
```

<br>

### 使用「MyPromise」來串接任務：
```javascript
new MyPromise(doSomething)
    .then(function(result0) {
        return doSomethingElse(result0) // =result1
    })
    .then(function(result1) {
        return doThirdThing(result1) // =result2
    })
    .catch(function(error) {
        return failureCallback(error)
    })

```

<br>

### 使用「Promise」來串接任務：
```javascript
new Promise(doSomething)
    .then(function(result0) {
        return doSomethingElse(result0) // =result1
    })
    .then(function(result1) {
        return doThirdThing(result1) // =result2
    })
    .catch(function(error) {
        return failureCallback(error)
    })
```
（又稱為 Promise 鏈）
<br>
<br>程式碼可在簡化為：
```javascript
new Promise(doSomething)
    .then(result0 => doSomethingElse(result0))
    .then(result1 => doThirdThing(result1))
    .catch(error => failureCallback(error))
```

或是更精簡成：
```javascript
new Promise(doSomething)
    .then(doSomethingElse)
    .then(doThirdThing)
    .catch(failureCallback)
```

<br>

### Promise v.s. 一般扁平式作法 的個人看法：
```javascript
function todo() {
    try {
        let result;
        let resolve = function(params) {result = params};
        let reject = function(result) {};
        doSomething(resolve, reject);

        result = doSomethingElse(result);
        result = doThirdThing(result);
    } catch (e) {
        failureCallback(e);
    }
}
todo();
```
- Promise 跟一般扁平式作法，其實沒兩樣
- 幾乎所有的程式語言都有 try-catch，好好善用 try-catch 就可以達到 promise 的效果
- 即便沒有 try-catch，也可以善用 return 來達到 promise 的效果
- 搞了半天，還是舊玩意...

<br>

### Promise v.s. 職責鏈 的個人看法：
- 職責鏈模式(Chain of responsiblity)：
  - 為了讓多個物件都有機會處理請求，透過職責鏈可以避免「發送者」與「接收者」之間的耦合。
  - 將這些物件連成一條鏈，沿著這條鏈傳遞該請求，並加以處理。
- 兩者的核心，看起來是一樣的

<br>
<br>

## Promise 的錯誤處理流程
- 若有錯誤，就會忽略接下來的 .then(...)，直到遇到 .catch(...)
- 錯誤處裡完後，可以處理接下來的 .then(...)

範例程式：
```javascript
new Promise((resolve, reject) => {
    console.log('Init tasks');
    resolve();
})
.then(() => {
    console.log('Do task 1');
})
.then(() => {
    throw new Error('Something failed');
    console.log('Do task 2');
})
.then(() => {
    console.log('Do task 3');
})
.catch(() => {
    console.log('check task errors');
})
.then(() => {
    console.log('Do task A');
})
.then(() => {
    console.log('Do task B');
});
```

執行結果：
```
Do task 1
check task errors
Do task A
Do task B
```

<br>
<br>

## 兩條交錯的 Promise，執行順序如何？

用來消耗 CPU 的計時器：
```javascript
class Timer {
    static costCpu(loop) {
        let sum = 0;
        for (var i of Array(loop).keys()) {
            sum += i / i;
        }
    }

    static evaluateLoop() {
        if (Timer.loopPerSec !== undefined) {
            return Timer.loopPerSec;
        }

        const LOOP_SIZE = 120 * 1000 * 1000;
	      let startTime = Date.now();
        Timer.costCpu(LOOP_SIZE);
        let endTime = Date.now();

        Timer.loopPerSec = LOOP_SIZE/ ((endTime - startTime) / 1000);
        return Timer.loopPerSec;
    }
    
    static wait(sec) {
        const totalLoop = parseInt(Timer.evaluateLoop() * sec);
        Timer.costCpu(totalLoop);
    }
}
```

建立數個 task：
```javascript
function task0(resolve, reject) {
    console.log('>>> [Task 0] init task');
    resolve();
    console.log('<<< [Task 0] init task');
}

function task1(params) {
    console.log('>>> [Task-1]');
    Timer.wait(5);
    console.log('<<< [Task-1]');
}

function task2(resolve, reject) {
    console.log('>>> [Task-2] ');
    Timer.wait(5);
    console.log('<<< [Task-2] ');
}

function task3(resolve, reject) {
    console.log('>>> [Task-3] ');
    Timer.wait(5);
    console.log('<<< [Task-3] ');
}

function task4(resolve, reject) {
    console.log('>>> [Task-4] ');
    Timer.wait(5);
    console.log('<<< [Task-4] ');
}
```

建立兩條 Promise，並執行
```javascript
console.log('[main] start');
setTimeout(()=>{
    console.log('>>> [timeout-1] 0');
    Timer.wait(5);
    console.log('<<< [timeout-1] 0');
}, 0);

new Promise(task0).then(task1).then(task2);

console.log('[main] take a rest');
setTimeout(()=>{
    console.log('>>> [timeout-2] 100');
    Timer.wait(5);
    console.log('<<< [timeout-2] 100');
}, 100);

new Promise(task0).then(task3).then(task4);

setTimeout(()=>{
    console.log('>>> [timeout-3] 10');
    Timer.wait(5);
    console.log('<<< [timeout-3] 10');
}, 10);
console.log('[main] end');
```

執行結果：
```
[main] start
>>> [Task 0] init task
<<< [Task 0] init task
[main] take a rest
>>> [Task 0] init task
<<< [Task 0] init task
[main] end
>>> [Task-1]
<<< [Task-1]
>>> [Task-3]
<<< [Task-3]
>>> [Task-2]
<<< [Task-2]
>>> [Task-4]
<<< [Task-4]
>>> [timeout-1] 0
<<< [timeout-1] 0
>>> [timeout-3] 10
<<< [timeout-3] 10
>>> [timeout-2] 100
<<< [timeout-2] 100
```
- Promise 不會卡住 main thread
- 尚未執行到的 then(...) 區塊是先放到 queue 中，還沒丟到 worker thread 中，所以產生 task 1,3,2,4 交錯
- 執行中的每一個 task 都不會交錯，一定是完整做完每一個 task，才會切到下一個 

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
