## method 繼承問題
- 在 function-based 的類別定義中
  - 使用 this.method = f() 的定義，該函數無法被繼承
  - 使用 ClassName.prototype.method = f() 的定義，該函數無法被繼承

### 程式範例：
```javascript
function Animal(name) {
    this.name = name;
    this.eat = function() { // 注意此函數
        console.log("eat: this:", this);
        console.log("name:", this.name);
    };
}

Animal.prototype.speak = function() {
    console.log("speak: this:", this);
    console.log("name:", this.name);
}

class Dog extends Animal {
    eat() {
        super.eat();
        console.log("Dog: eat:this: ", this);
        console.log("Dog: name:", this.name);
    }
    speak() {
        super.speak();
        console.log("Dog: speak: this: ", this);
        console.log("Dog: name:", this.name);
    }
}

var dog = new Dog('Jack');
dog.eat();
dog.speak();
```

### 執行結果：
- 在 Dog 定義的 eat 沒有被繼承下來
```
eat: this: Dog {name: "Jack", eat: ƒ}
name: Jack
speak: this: Dog {name: "Jack", eat: ƒ}
name: Jack
Dog: speak: this:  Dog {name: "Jack", eat: ƒ}
og: name: Jack
```
