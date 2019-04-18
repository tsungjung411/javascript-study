
## let, var 變數在 for-loop 裡的行為

```javascript
for (var x = 1; x <= 3; x++) {
    f = function() {
        console.log("x =", x);
    }
    setTimeout(f)
}

for (let x = 1; x <= 3; x++) {
    f = function() {
        console.log("x =", x);
    }
    setTimeout(f)
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
