
## 在一般函數/箭頭函數裡，測試 this 指標

 - [Who’s “this” in Javascript](https://medium.com/%E5%89%8D%E7%AB%AF%E6%97%A5%E8%A8%98/whos-this-in-javascript-c9dbac17a7b0?fbclid=IwAR2i0zjCukCDVtWtGQK2asp3fEQ4xX1nE0bqE9OrXJW7-MetOARUn880IIE)

### 請先注意，再看程式
- 在一般函數(function)裡，this 所參考的對象決取於：**是不是由物件來執行，而非函數定義所在位置**
  - 由物件來執行一般函數時<br>
    如 abcObj.run()，則 run() 裡拿到的 this 是 abcObj 本身。<br>
    
  - 不透過物件，直接執行 function 時<br>
    如 run()，則 run() 裡拿到的 this 是 window 物件本身（也就是 global object）。<br>
    
  - inner function 規則同此。<br>
  
- 在箭頭函數(arrow function)裡，this 所參考的對象決取於：**箭頭函數定義所在位置**
  - 箭頭函數如果定義在物件裡，this 所參考的對象就是該物件<br>
  - 因為箭頭函數本身並沒有 this 資訊，它會往外層找<br>
    如果外層又是箭頭函數，則繼續往外層找<br>
  - inner function 規則同此。<br>

### 範例程式
```html
<html>
<body>

<script>
const person = {
    name: 'tj_tsai',
    balance: 1000,
    showAsset: function() {
        console.log('---------- showAsset ----------');
        console.log(`> this1: ${this}`);
        console.log(`> name1:${this.name}`);
        
            // inner functions
        const getBalance2 = function() {
            console.log(`>> this2: ${this}`);
            console.log(`>> name2:${this.name}`);
            console.log(`>> balance2:${this.balance}`);
        };
        getBalance2();

        const getBalance3 = () => {
            console.log(`>>> this3: ${this}`);
            console.log(`>>> name3:${this.name}`);
            console.log(`>>> balance3:${this.balance}`);
        };
        getBalance3();

        return [getBalance2, getBalance3];
    }
}

const getBalances = person.showAsset();
const getBalance2 = getBalances[0];
const getBalance3 = getBalances[1];

console.log('---------- test inner functions ----------');
getBalance2();
getBalance3();
</script>

</body>
</html>
```

### 執行結果
```
---------- showAsset ----------
> this1: [object Object]
> name1:tj_tsai

>> this2: [object Window]
>> name2:
>> balance2:undefined

>>> this3: [object Object]
>>> name3:tj_tsai
>>> balance3:1000

---------- test inner function ----------
>> this2: [object Window]
>> name2:
>> balance2:undefined

>>> this3: [object Object]
>>> name3:tj_tsai
>>> balance3:1000
```
