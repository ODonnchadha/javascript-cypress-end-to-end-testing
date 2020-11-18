## End-to-End JavaScript Testing with Cypress.io

- Overall:
    - Cypress.io with Shaun Wassell.
    - Needed: (1) A solid foundation with ES6 syntax. (2) A passion for software quality.
    - Tools and technologies needed: (a) Node.js. (b) npm.

- Introduction to Cypress.io:
    - What and why? 
        - Try not to break anything and push to production. Cross your fingers and hope that you didn't break something else. And... dedicated testers.
        - This does not scale well. New functionality adds new flows that need to be tested.
        - Other options: Automate the application with tests from hte users point of view. Clicking buttons and typing into text fields.
        - End-to-end testing. Cypress.io can conduct this type of automated testing. Open source. Free. Automatic, scalable E2E testing.
    - Advantages:
        - Tests run inside a real browser, and not a headless browser.
        - Access to the network layer of the application.
        - Visibility of elements into account when running tests. e.g.: a hidden or disabled button.
        - Has access to other resources that other framesworks do not use. Screenshots or videos, for example.
        - Cypress.io is very intuative and readable. At first glace, it looks fluent: cy.get('@text-input').type('Hello World!');
    - Limitations:
        - Data mining or web crawling.
        - It runs inside a real browser. It only support JavaScript.
        - You cannot test multiple tabs or browser windows. The feeling is that there is no good reason. Do not test browser functionality.
        - A chat application needds to be 'stubbed.'
        - Cannot visit two different super domains within the *same* test. e.g.: An OAUTH provider.

- The Basics:
    ```javascript
        npm init -y
        npm install --save-dev cypress
        npx cypress open
    ```
    - NOTE: Class instruction is on Chrome 77 with Cypress version 3.5.0. I am currently on Chrome 86 with Cypress version 5.6.0.
    - Cypress has Mocha baked in. And Cypress automatically waits about four seconds before it determines that something is wrong.

    - Best manerism in which to select a given element? 
    - Stay away from selecting the HTML tag. e.g.: Two spans. Two inputs. Error: "Your subject contained two elements."
    - We actually combine the, say, inner text of a span into one string.
    - We can use indexes. e.g.: cy.get('span').eq('1'). This is the Index of the element. It looks to be 1-based.
    - CSS class? This can be a little better. e.g.: cy.get('button.big-green');
    - Id or name attribute? Selecting elements by the text they contain? e.g.: cy.contains('Submit');

    - Cypress recommends "special data attributes" on the elements that we want to test. e.g.: <span data-cy="chars-left-count">
    - You can assign any unique value to this.

    - Aliasing elements. And Cypress commands ae async, yet they are not promises.
    - And other manner in which to alias elements.
    - You can set the root Url:
    ```javascript
        {
            "baseUrl": "http://localhost:3000"
        }
    ```
    - Obtain the DOM element with a function. Note: This is not a Promise.
    ```javascript
        cy.get('@charsLeftSpan').then($charsLeftSpan => {
            expect($charsLeftSpan.text()).to.equal('15');
        });
    ```

- Intermediate Concepts: