## method 繼承問題
- 在 function-based 的類別定義中
  - 使用 this.method = f() 的定義，該函數無法被繼承
  - 使用 ClassName.prototype.method = f() 的定義，該函數可以被繼承

### 程式範例1：
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

### 執行結果1：
- 在 Dog 定義的 eat 沒有被繼承下來
```
eat: this: Dog {name: "Jack", eat: ƒ}
name: Jack

speak: this: Dog {name: "Jack", eat: ƒ}
name: Jack
Dog: speak: this:  Dog {name: "Jack", eat: ƒ}
Dog: name: Jack
```

<br>

- 使用 JS6 語法糖的類別定義中
  - 使用 method() {...} 的定義，該函數可以被繼承

### 程式範例2：
```javascript
class Animal {
    constructor(name) {
        this.name = name;
        this.eat = function() { // 注意此函數
            console.log("eat: this:", this);
            console.log("name:", this.name);
        };
    }
    
    greet() {
        console.log("greet: this:", this);
        console.log("my name is", this.name);
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
    greet() {
        super.greet();
        console.log("Dog: greet: this: ", this);
        console.log("Dog: just call me", this.name);
    }
}

var dog = new Dog('Jack');
dog.eat();
dog.speak();
dog.greet();
```

### 執行結果2：
- 在 Dog 定義的 eat 沒有被繼承下來
```
eat: this: Dog {name: "Jack", eat: ƒ}
name: Jack

speak: this: Dog {name: "Jack", eat: ƒ}
name: Jack
Dog: speak: this:  Dog {name: "Jack", eat: ƒ}
Dog: name: Jack

greet: this: Dog {name: "Jack", eat: ƒ}
my name is Jack
Dog: greet: this:  Dog {name: "Jack", eat: ƒ}
Dog: just call me Jack
```

## 結論
- JS 宣告函數有三種方法，其中一種無法被繼承
- 成員的屬性類型之函數，無法被繼承


## 參考資料
 - [定義類別](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)
