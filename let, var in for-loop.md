
## let, var 變數在 for-loop 裡的行為

### Case1
#### 程式碼
```javascript
for (var x = 1; x <= 3; x++) {
    f = function() {
        console.log("x =", x);
    }
    f();
}

for (let x = 1; x <= 3; x++) {
    f = function() {
        console.log("x =", x);
    }
    f();
}
```

#### 執行結果：
```
# 第一個 for-loop 
x = 1
x = 2
x = 3

# 第二個 for-loop 
x = 1
x = 2
x = 3
```

#### 說明：
看起來沒有什麽差異性

<br>
<hr>
<br>

### Case2
#### 程式碼
- setTimeout 的概念，就是設定「多少時間過後，開始執行」的函數。
- 就像是 todo list，後面要做哪些事
- 若沒有指定時間，則 elapsed time = 0

```javascript
for (var x = 1; x <= 3; x++) {
    f = function() {
        console.log("x =", x);
    }
    setTimeout(f);
}

for (let x = 1; x <= 3; x++) {
    f = function() {
        console.log("x =", x);
    }
    setTimeout(f);
}
```

#### 執行結果：
```
# 第一個 for-loop 
x = 4
x = 4
x = 4

# 第二個 for-loop 
x = 1
x = 2
x = 3
```

#### 說明：
因為 JS 不支援多執行緒，setTimeout 會在 for-loop 離開後才執行

就像是
```java
y = x++ + 10;
```
會解譯成
```java
y = x + 10;
x = x + 1;
```

所以，setTimeout 直譯後的結果：
```javascript
for (var x = 1; x <= 3; x++) {
}
// TODO List
{
    console.log("x =", x);
}
{
    console.log("x =", x);
}
{
    console.log("x =", x);
}


for (let x = 1; x <= 3; x++) {
}
// TODO List
{
    const x = 1;
    console.log("x =", x);
}
{
    const x = 2;
    console.log("x =", x);
}
{
    const x = 3;
    console.log("x =", x);
}
```

<br>
<hr>
<br>

### Case3
#### 程式碼1
```javascript
for (var x = 1; x <= 3; x++) {
    console.log(`for: x = ${x}`)
    var var_x = 100 + x;
    let let_x = 100 + x;
    f = function() {
        console.log("(var) x =", x);
        console.log("var_x =", var_x);
        console.log("let_x =", let_x);
    }
    setTimeout(f);
}
```

#### 直譯結果1:
```javascript
for (var x = 1; x <= 3; x++) {
    console.log(`for: x = ${x}`)
    var var_x = 100 + x;
    let let_x = 100 + x;
}

// TODO List
{
    const let_x = 100 + 1; // x=1
    console.log("(var) x =", x);
    console.log("var_x =", var_x);
    console.log("let_x =", let_x);
}
{
    const let_x = 100 + 2; // x=2
    console.log("(var) x =", x);
    console.log("var_x =", var_x);
    console.log("let_x =", let_x);
}
{
    const t_x = 100 + 3; // x=3
    console.log("(var) x =", x);
    console.log("var_x =", var_x);
    console.log("let_x =", let_x);
}
```

#### 執行結果1：
```
for: x = 1
for: x = 2
for: x = 3

(var) x = 4
var_x = 103
let_x = 101

(var) x = 4
var_x = 103
let_x = 102

(var) x = 4
var_x = 103
let_x = 103
```

#### 程式碼2
```javascript
for (let x = 1; x <= 3; x++) {
    console.log(`for: x = ${x}`)
    var var_x = 100 + x;
    let let_x = 100 + x;
    f = function() {
        console.log("(let) x =", x);
        console.log("var_x =", var_x);
        console.log("let_x =", let_x);
    }
    setTimeout(f);
}
```

#### 直譯結果2:
```javascript
for (let x = 1; x <= 3; x++) {
    console.log(`for: x = ${x}`)
    var var_x = 100 + x;
    let let_x = 100 + x;
}

// TODO List
{
    const x = 1;
    const let_x = 100 + 1; // x=1
    console.log("(let) x =", x);
    console.log("var_x =", var_x);
    console.log("let_x =", let_x);
}
{
    const x = 2;
    const let_x = 100 + 2; // x=2
    console.log("(let) x =", x);
    console.log("var_x =", var_x);
    console.log("let_x =", let_x);
}
{
    const x = 3;
    const let_x = 100 + 3; // x=3
    console.log("(let) x =", x);
    console.log("var_x =", var_x);
    console.log("let_x =", let_x);
}
```

#### 執行結果2：
```
for: x = 1
for: x = 2
for: x = 3

(let) x = 1
var_x = 103
let_x = 101

(let) x = 2
var_x = 103
let_x = 102

(let) x = 3
var_x = 103
let_x = 103
```
