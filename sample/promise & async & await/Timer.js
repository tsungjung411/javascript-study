
class Timer {
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
