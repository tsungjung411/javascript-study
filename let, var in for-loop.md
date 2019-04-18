
## let, var 變數在 for-loop 裡的行為

### Case1
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

執行結果：
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
**說明：**
因為 JS 是單一執行緒，setTimeout 會在 for-loop 離開後才執行
就像是
```java
y = x++ + 10;
```
會解譯成
```java
y = x + 10;
x = x + 1;
```

<br>
<hr>
<br>

### Case2
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

執行結果：
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
