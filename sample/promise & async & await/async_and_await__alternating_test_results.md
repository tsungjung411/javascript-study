
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

<br>

## [猜想] 程式碼轉換

轉換前：
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

轉換後：
```javascript
new Promise((resolve, reject) => {
    try {
        task0(
            () => {}, // resolve
            () => {}  // reject
        );
        task1();
        resolve();
    } catch (e) {
        reject();
    }
})
.then(() => {
    task2();
    task3();
})
.then(() => {
    task4();
})

```

- await 區塊範圍，是從最初或是上一個 await 的下一行開始，直到遇到 await 那一行
- 第一個 await 是放在 Promise() 建構子的 executor 區塊
- 第二個 await 和之後的 await 是放在 .then() 區塊
