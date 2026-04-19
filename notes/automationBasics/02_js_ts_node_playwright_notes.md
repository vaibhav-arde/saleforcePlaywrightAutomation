# JavaScript, TypeScript & Node.js for Playwright Automation

---

## 1. Introduction to JavaScript

### Concept
JavaScript is a programming language used to build dynamic web applications and automation scripts.

### Example
```javascript
console.log("Hello Automation");
```

### ⚡ Important
- Core language for Playwright (JS/TS)
- Runs in browser + Node.js

---

## 2. Features of JavaScript

### Concept
- Dynamic typing
- Event-driven
- Asynchronous

### Example
```javascript
let x = 10;
x = "text"; // dynamic typing
```

### ⚡ Important
- Can cause bugs if not handled properly
- Prefer TypeScript in production

---

## 3. Variables (var, let, const)

### Concept
- var → function scoped
- let → block scoped
- const → constant

### Example
```javascript
let name = "Vaibhav";
const age = 30;
```

### ⚡ Important
- Always use `const` or `let`
- Avoid `var`

---

## 4. Data Types

### Concept
Primitive: string, number, boolean  
Non-Primitive: object, array

### Example
```javascript
let user = { name: "Vaibhav" };
let arr = [1, 2, 3];
```

### ⚡ Important
- Objects are reference-based

---

## 5. Functions & Arrow Functions

### Concept
Reusable blocks of code

### Example
```javascript
function add(a, b) {
  return a + b;
}

const addArrow = (a, b) => a + b;
```

### ⚡ Important
- Arrow functions don’t bind `this`

---

## 6. Arrays & Methods

### Concept
Collection of data

### Example
```javascript
let nums = [1,2,3];
nums.map(n => n * 2);
```

### ⚡ Important
- Use map/filter instead of loops

---

## 7. Objects

### Concept
Key-value structure

### Example
```javascript
let user = {
  name: "Vaibhav",
  login() {
    return "logged in";
  }
};
```

### ⚡ Important
- Used heavily in test data

---

## 8. Scope & Closures

### Concept
Scope defines visibility of variables

### Example
```javascript
function outer() {
  let x = 10;
  return function inner() {
    return x;
  }
}
```

### ⚡ Important
- Closures used in frameworks

---

## 9. Async JavaScript (CRITICAL)

### Concept
Handles asynchronous operations

### Example
```javascript
async function getData() {
  const res = await fetch("api");
}
```

### ⚡ Important
🔥 Most Playwright code is async  
🔥 Always use async/await

---

## 10. Promises

### Concept
Handles future values

### Example
```javascript
fetch("api")
  .then(res => res.json())
  .then(data => console.log(data));
```

### ⚡ Important
- Avoid callback hell

---

## 11. Error Handling

### Concept
Handle runtime errors

### Example
```javascript
try {
  throw new Error("fail");
} catch(e) {
  console.log(e.message);
}
```

### ⚡ Important
- Always handle async errors

---

## 12. Classes & Inheritance

### Concept
Blueprint for objects

### Example
```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
```

### ⚡ Important
- Used in Page Object Model

---

## 13. Regular Expressions

### Concept
Pattern matching

### Example
```javascript
const regex = /test/;
regex.test("test123");
```

### ⚡ Important
- Useful for validation

---

## 14. JavaScript for Testing

### Concept
Used with frameworks like Jest/Mocha

### Example
```javascript
test("sum", () => {
  expect(1+1).toBe(2);
});
```

### ⚡ Important
- Foundation before Playwright Test

---

## 15. ES6 Features

### Concept
Modern JS improvements

### Example
```javascript
const {name} = user;
const arr = [...nums];
```

### ⚡ Important
- Must know for interviews

---

## 16. TypeScript (VERY IMPORTANT)

### Concept
Typed superset of JS

### Example
```typescript
let name: string = "Vaibhav";
```

### ⚡ Important
🔥 Industry standard for Playwright  
🔥 Prevents runtime bugs  

---

## 17. Node.js

### Concept
Runtime to execute JS outside browser

### Example
```javascript
console.log("Running in Node");
```

### ⚡ Important
- Required for Playwright

---

## 18. NPM

### Concept
Package manager

### Example
```bash
npm install playwright
```

### ⚡ Important
- Used to manage dependencies

---

## 19. Node Modules

### Concept
Reusable code

### Example
```javascript
const fs = require('fs');
```

### ⚡ Important
- Core for framework building

---

## 20. First Node App

### Example
```javascript
console.log("Hello Node");
```

### ⚡ Important
- Entry point for automation scripts

