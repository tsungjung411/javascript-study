<html>
<body>

<div id="log">

</div>

<h3>Block you!!</h3>

<div id="root" >
    <h3>{{msg}}</h3>
    <button @click="click">Test async</button>
    
    <br><button>Test click,do nothing</button>
</div>


<div style="white-space: pre">
執行結果：
>> async created
<< async created (Elapsed 4.302 sec)

>> click
>> clickInBackground
>> a: actIncrement
>> m: mutIncrement: {__ob__: Observer}
<< m: mutIncrement (Elapsed 5.482 sec)
<< a: actIncrement: value: undefined
<< clickInBackground: value: Promise {<pending>}
<< click
</div>

<script src="https://unpkg.com/vue" ></script>
<script src="https://unpkg.com/vuex" ></script>

<script>
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

    const store = new Vuex.Store({
        actions: {
            actIncrement(context) {
                console.log(">> a: actIncrement");
                var value = context.commit('mutIncrement');
                console.log("<< a: actIncrement: value:", value); // 沒有回傳值
            }
        },
        mutations: {
            mutIncrement(state) {
                console.log(">> m: mutIncrement:", state);
                var startTime = Date.now();
                Timer.wait(5);
                var diff = (Date.now() - startTime) / 1000.;
                console.log("<< m: mutIncrement", `(Elapsed ${diff} sec)`);
            }
        },
    })

    new Vue({
        el: '#root',
        store: store,
        data: {
            msg: "Hello, vue-async",
        },

        async created() { // <- 即使加了 async，仍然會阻斷當前的執行
            console.log(">> async created");
            var startTime = Date.now();
            Timer.wait(3);
            var diff = (Date.now() - startTime) / 1000.;
            console.log("<< async created", `(Elapsed ${diff} sec)`);
        },

        methods: {
            click() {
                console.log(">> click");
                this.clickInBackground();
                console.log("<< click");
            },
            clickInBackground() {
                console.log(">> clickInBackground");
                var value = this.$store.dispatch('actIncrement');
                console.log("<< clickInBackground: value:", value);
            },
        },
    });
</script>

</body>
</html>
