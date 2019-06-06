
## 程式碼：
[async_and_await__alternating_test.js](async_and_await__alternating_test.js)

<br>

## 執行結果：
```
[main] start
>>> [Task 0] init task
<<< [Task 0] init task
>>> [Task-1] params: undefined
<<< [Task-1]
[main] take a rest
>>> [Task 0] init task
<<< [Task 0] init task
>>> [Task-5] params: undefined
<<< [Task-5] 
[main] end
>>> [Task-2] params: undefined
<<< [Task-2] 
>>> [Task-3] params: undefined
<<< [Task-3] 
>>> [Task-6] params: undefined
<<< [Task-6] 
>>> [Task-7] params: undefined
<<< [Task-7] 
>>> [Task-4] params: undefined
<<< [Task-4] 
>>> [Task-8] params: undefined
<<< [Task-8] 
undefined
>>> [timeout-1] 0
<<< [timeout-1] 0
>>> [timeout-2] 100
<<< [timeout-2] 100
>>> [timeout-3] 10
<<< [timeout-3] 10
```

## [猜想] 程式碼轉換
```javascript
async function myPromise1() {
    try {
        task0(
            () => {}, // resolve
            () => {}  // reject
        );
        await task1();
        task2();
        await task3();
        task4()
    } catch (e) {
    }
}
myPromise1(); // 執行 promise 鏈
```

```
new Promise((resolve, reject) => {
    task0(
        () => {}, // resolve
        () => {}  // reject
    );
    task1();
})
.then(() => {
    task2();
    task3();
})
.then(() => {
    task4();
})


```

### 第一個 async 是放在 Promise() 建構子的 executor 區塊
