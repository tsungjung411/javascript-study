
// 成功後要回傳呼叫的函數(Callback)，這樣才可以讓呼叫者知道狀況
function successCallback(result) {
    console.log("成功: 結果:", result);
}

// 失敗後要回傳呼叫的函數(Callback)，這樣才可以讓呼叫者知道狀況
function failureCallback(error) {
    console.log("失敗: 錯誤訊息:", error);
}

// 做某些事
function doSomething() {
    // 隨機產生 true(50%) 或 false(50%)
    var trueOfFalse = parseInt(Math.floor(Math.random() * 2));
    var executor;
    if (trueOfFalse) {
        executor = (resolve, reject) => {resolve('Done');};
    } else {
        executor = (resolve, reject) => {reject('T__T');};
    }
    return new Promise(executor);
}

// 使用不同的寫法，來呼叫三次
var promise1 = doSomething();
promise1.then(successCallback, failureCallback);

doSomething().then(successCallback, failureCallback);

doSomething()
.then(successCallback)
.catch(failureCallback);

