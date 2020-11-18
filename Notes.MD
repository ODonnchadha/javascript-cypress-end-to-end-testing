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