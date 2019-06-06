
// 用來消耗 CPU 的計時器
var Timer = class {  // 等效於 class Timer {
	
    // 執行過程 CPU 會達到 100%
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


// 建立數個 task：
function task0(resolve, reject) {
    console.log('>>> [Task 0] init task');
    resolve();
    console.log('<<< [Task 0] init task');
}

function task1(params) {
    console.log('>>> [Task-1] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-1]');
}

function task2(params) {
    console.log('>>> [Task-2] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-2] ');
    return "task2-result";
}

function task3(params) {
    console.log('>>> [Task-3] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-3] ');
    return "task3-result";
}

function task4(params) {
    console.log('>>> [Task-4] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-4] ');
}

function task5(params) {
    console.log('>>> [Task-5] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-5] ');
}

function task6(params) {
    console.log('>>> [Task-6] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-6] ');
    return "task6-result";
}

function task7(params) {
    console.log('>>> [Task-7] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-7] ');
    return "task7-result";
}

function task8(params) {
    console.log('>>> [Task-8] params:', params);
    Timer.wait(5);
    console.log('<<< [Task-8] ');
}


// 主程式
console.log('[main] start');
setTimeout(()=>{
    console.log('>>> [timeout-1] 0');
    Timer.wait(5);
    console.log('<<< [timeout-1] 0');
}, 0);

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
myPromise1();

console.log('[main] take a rest');
setTimeout(()=>{
    console.log('>>> [timeout-2] 100');
    Timer.wait(5);
    console.log('<<< [timeout-2] 100');
}, 100);

async function myPromise2() {
    try {
        task0(
            () => {}, // resolve
            () => {}  // reject
        );
        await task5();
        task6();
        await task7();
        task8();
    } catch (e) {
    }
}
myPromise2();

setTimeout(()=>{
    console.log('>>> [timeout-3] 10');
    Timer.wait(5);
    console.log('<<< [timeout-3] 10');
}, 10);
console.log('[main] end');
