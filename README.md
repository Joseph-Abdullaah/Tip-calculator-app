# Frontend Mentor - Tip Calculator App Solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Implementation Flow](#implementation-flow)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person
- Input validation for numbers only
- Default to 15% tip selection
- Show error when number of people is zero

### Screenshot

![](./design/desktop-preview.jpg)

### Links

- Solution: [Here](https://www.frontendmentor.io/solutions/tip-calculator-app-r1nW9NrLnr)
- Live Site: [Here](https://joseph-abdullaah.github.io/Tip-calculator-app/)

## My process

### Built with


- CSS custom properties
- Flexbox
- CSS Grid
- Vanilla JavaScript
- CSS Variables for theming
- Input validation
- Error handling

### Implementation Flow

Below is the flow diagram of how the tip calculator works:

![Tip Calculator Flow Diagram](images/flow-diagram.svg)

The diagram above illustrates:
- Initial page load and default value setup
- User input handling and validation
- Tip calculation process
- Error handling for edge cases
- Reset functionality



### What I learned

1. **Input Validation**
   - Implemented real-time number validation
   - Handled edge cases like zero values
   - Used event listeners effectively

```js
function validateNumericInput(event, inputElement) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '.'];
    
    if (event.key === '.' && inputElement === inputBill) {
        if (inputElement.value.includes('.')) {
            event.preventDefault();
            return;
        }
        return;
    }
    
    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
        event.preventDefault();
        return;
    }

    setTimeout(() => {
        const value = inputElement.value;
        const regex = inputElement === inputBill ? /[^\d.]/g : /[^\d]/g;
        const numericValue = value.replace(regex, '');
        
        if (inputElement === inputBill) {
            const parts = numericValue.split('.');
            if (parts.length > 2) {
                inputElement.value = parts[0] + '.' + parts.slice(1).join('');
            } else {
                inputElement.value = numericValue || '0';
            }
        } else {
            inputElement.value = numericValue;
        }
        calculate();
    }, 0);
}
```

2. **CSS Custom Properties**
   - Used variables for consistent theming
   - Implemented responsive design

```css
:root {
  --strong-cyan: hsl(172, 67%, 45%);
  --very-dark-cyan: hsl(183, 100%, 15%);
  --dark-grayish-cyan: hsl(186, 14%, 43%);
}
```

3. **Error Handling**
   - Implemented user-friendly error messages
   - Added visual feedback for invalid inputs

### Continued development

Areas I want to focus on in future projects:

- Implementing more advanced input validation patterns
- Exploring CSS Grid for complex layouts
- Adding animation effects for better user feedback
- Implementing accessibility features
- Adding unit tests for JavaScript functions

### Useful resources

- [MDN Web Docs](https://developer.mozilla.org) - Comprehensive documentation for HTML, CSS, and JavaScript
- [CSS-Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Helped with CSS Grid implementation
- [JavaScript.info](https://javascript.info/) - Detailed explanations of JavaScript concepts
- [Mermaid JS](https://mermaid.js.org/) - For creating flow diagrams

## Author

- Frontend Mentor - [@Joseph-Abdullaah](https://www.frontendmentor.io/profile/Joseph-Abdullaah)
- Twitter - [@Joseph-Abdullaah](https://x.com/JosephAbdullaah)
