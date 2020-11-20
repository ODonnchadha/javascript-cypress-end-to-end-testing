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
        - A chat application needs to be 'stubbed.'
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
    - You can set the root Url within /cyrpess.json:
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
    - Interacting with elements. With some fine-tuned control. e.g.: mouse down or (x,y).
    - .trigger('touchstart'), for example. trigger() allows for extra elements within as well. e.g. x & y coordinates and/or drag/drop.
    - Common assertions: 
        - .should('equal', '')
        - .should('have.length', '') e.g.: a To-do list with items added.
        - .should('exist') e.g.: an element that displays only after certain circimstances. e.g.: successful login with security triming.
        - .should('not.exist')
        - .should('have.class', 'list-tem-selected') e.g.: CSS classes, for example.
        - .should('have.css', 'background-color', 'blue') e.g.: cutting out the middle man with CSS classes.
        - .invoke('text')
        - .should('contain')
        - .should('not.contain')
    - Automatic retrying:
        - Flaky tests. Network calls and their associated 'timing.'
        - e.g.: Display a list of people culled from server with a spinner. Instead of adding a timeout, automatically retry the assertion until it passes or times out. (4 seconds.)
        - NOTE: Cypress does not retry interactive commands such as .click() or type().
        - DOM queries such as .get() will be retryed. And, only the chained command that fails will be retryed.
    - Debugging in Cypress.io:
        - Several nice tools: add 'debugger;' within our test code when we want to pause. Remember the Cypress runs asynchronously.
        - So after each command that we want to inspect we perform the following: .then(() => { debugger; });
        - And, nothing will 'change' until the DevTools are open.
        - And here's the shortcut. chain .debug();
        - ASlso, during testing Cypress.io prints to the console.
    - Environment variables:
        - Set and use: Urls. Secret keys.
            1. Adding these variables directly to the machine: Linux example in the terminal:
                ```javascript
                    export CYPRESS_MY_ENV_VAR = "Hello"
                ```
                - Then, within code:
                ```javascript
                    Cypress.env('MY_ENV_VAR');
                ```
                - It is not entirely obvious when the variable comes from, and it is not too easy to share this between machines.
            2. Passing a flag when running Cypress from the commandline.
                ```javascript
                    npx cypress open --env MY_ENV_VAR="Hello"
                ```
            3. Adding variables to the /cypress.json file:
                - Values that *should* be the very same across all machines.
                ```javascript
                    {
                        "baseUrl": "http://localhost:3000",
                        "env": {
                            "MY_ENV_VAR": "Hello"
                        }
                    }
                ```
            4. Create another file within the root directory. It needs to be called: cypress.env.json:
                ```javascript
                    {
                        "MY_ENV_VAR": "Hello"
                    }
                ```
                - NOTE: Secret keys? Add the file to .gitignore.
    - Test doubles:
        - App should mimic production as close as possible. Stay away from Mock or Stub, unless:
            - Create a server stub that creates an error. Or allow our application to 'think' that it is logged in.
            - Sinon library: Cypress.io wraps Sinon.js and allows us to stub and spy: 
                1. cy.stub() 
                    - e.g.: DAL with getUser(). Import the API object within our testing and fake it:
                    - cy.stub(api, 'getUser').returns({ name: 'authUser' });
                    - cy.stub(api, 'getUser').resolves({ name: 'authUser' });
                    - cy.stub(api, 'getUser').rejects({ name: 'authUser' });
                2. cy.spy()
                    - spy *watches* the method(s) and allows us to then make some assertions.
                    ```javascript
                        const mySpy = cy.spy(api, 'getUser');
                        expect(mySpy).to.be.called;
                    ```
                    - NOTE: How many times the function is called, and with which arguments.

- Other Useful Commands:

