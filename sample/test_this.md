
## 在一般函數/箭頭函數裡，測試 this 指標

 - [Who’s “this” in Javascript](https://medium.com/%E5%89%8D%E7%AB%AF%E6%97%A5%E8%A8%98/whos-this-in-javascript-c9dbac17a7b0?fbclid=IwAR2i0zjCukCDVtWtGQK2asp3fEQ4xX1nE0bqE9OrXJW7-MetOARUn880IIE)

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

console.log('---------- execute function pointers ----------');
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

---------- execute function pointers ----------
>> this2: [object Window]
>> name2:
>> balance2:undefined

>>> this3: [object Object]
>>> name3:tj_tsai
>>> balance3:1000
```
