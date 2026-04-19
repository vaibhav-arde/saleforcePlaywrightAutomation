# Web Basics for Test Automation (Playwright)

## 1. HTML Basics (Structure of Web Page)

### Concept
HTML defines the structure of a web page using elements like:
- `<html>` → root
- `<head>` → metadata
- `<body>` → visible content

### Example
```html
<html>
  <body>
    <h1>Login</h1>
    <input id="username" />
    <button>Submit</button>
  </body>
</html>
```

```python
page.fill("#username", "admin")
page.click("text=Submit")
```

### ⚡ Important
- DOM understanding = strong locator strategy
- Most flaky tests = poor HTML understanding
- Always inspect elements before writing tests


## 2. Semantic Elements (HTML5)

### Concept
Semantic elements give meaning to content like `<header>`, `<footer>`, `<section>`, `<article>`.

### Example
```html
<article>
  <button>Add to Cart</button>
</article>
```

```javascript
await page.getByRole('button', { name: 'Add to Cart' }).click()
```

### ⚡ Important
- Prefer getByRole()
- Avoid deep CSS selectors


## 3. Text Formatting & Spacing

### Concept
HTML provides tags like `<b>`, `<i>`, `<strong>`.

### Example
```html
<p>This is <strong>important</strong></p>
```

```javascript
await expect(page.locator("strong")).toHaveText("important")
```

### ⚡ Important
- Text validation is common
- Use text locators carefully


## 4. Tables

### Concept
Tables use `<table>`, `<tr>`, `<td>` to structure data.

### Example
```html
<table>
  <tr><td>Product</td><td>Price</td></tr>
  <tr><td>Laptop</td><td>1000</td></tr>
</table>
```

```javascript
const price = await page.locator("text=Laptop")
  .locator("..")
  .locator("td")
  .nth(1)
  .textContent()
```

### ⚡ Important
- Used in dashboards
- Learn dynamic row handling


## 5. Lists

### Concept
Lists display grouped items using `<ul>` or `<ol>`.

### Example
```html
<ul>
  <li>Login</li>
  <li>Dashboard</li>
</ul>
```

```javascript
await page.click("text=Dashboard")
```

### ⚡ Important
- Common in navigation
- Avoid index-based selection


## 6. Working with Links

### Concept
Links (`<a>`) navigate pages.

### Example
```html
<a href="/home">Go Home</a>
```

```python
page.click("text=Go Home")
page.wait_for_url("**/home")
```

### ⚡ Important
- Always validate navigation


## 7. Image Handling

### Concept
Images use `<img>` and can be interactive.

### Example
```html
<img src="logo.png" alt="logo" />
```

```javascript
await expect(page.locator("img[alt='logo']")).toBeVisible()
```

### ⚡ Important
- Validate visibility and alt text


## 8. Frames / Iframes

### Concept
Frames embed other pages.

### Example
```javascript
const frame = page.frameLocator("#frame-id")
await frame.locator("button").click()
```

### ⚡ Important
- Must switch context


## 9. HTML Forms

### Concept
Forms collect user input.

### Example
```html
<input type="text" id="email" />
<input type="password" id="password" />
<button>Login</button>
```

```python
page.fill("#email", "test@mail.com")
page.fill("#password", "1234")
page.click("text=Login")
```

### ⚡ Important
- 80% automation = forms
- Test valid & invalid cases


## 10. New HTML5 Form Elements

### Concept
Includes email, date, number, range inputs.

### Example
```html
<input type="email" />
```

```javascript
await page.fill("input[type='email']", "test@mail.com")
```

### ⚡ Important
- Browser validation matters


## 11. CSS Basics

### Concept
CSS styles UI and helps selectors.

### Example
```css
#login-btn { color: blue; }
```

```javascript
await page.click("#login-btn")
```

### ⚡ Important
- Prefer stable selectors


## 12. Text & Fonts

### Concept
Controls UI appearance.

### Example
```css
h1 { font-size: 20px; }
```

```javascript
await expect(page.locator("h1")).toHaveCSS("font-size", "20px")
```

### ⚡ Important
- Rare in functional testing


## 13. CSS Selectors

### Concept
Selectors: id, class, tag, attribute.

### Example
```javascript
page.locator("input[type='text']")
```

### ⚡ Important
Priority:
1. getByRole
2. getByText
3. data-testid
4. CSS
5. XPath


## 14. XML

### Concept
XML is structured data for APIs/configs.

### Example
```xml
<user>
  <name>Vaibhav</name>
</user>
```

### ⚡ Important
- Used in API automation
