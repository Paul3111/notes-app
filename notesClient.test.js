/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const NotesClient = require('./notesClient');
const NotesView = require('./notesView');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('Client class', () => {
    let view;

  it('Calls fetch and loads data.', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify({
      name: "Some value",
      id: 123
    }));

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toBe("Some value");
      expect(returnedDataFromApi.id).toBe(123);

      // 4. Tell Jest our test can now end.
      done();
    });
  });

    xit('Adds a note to the server.', () => {
        document.body.innerHTML = fs.readFileSync('./index.html');
        const mockData = ['Mock note 1', 'Mock note 2'];

        const mockModel = {
          setNotes: jest.fn(),
          getNotes: () => mockData,
          addNote: jest.fn()};

        const mockClient = { 
          loadNotes: jest.fn((callback, callbackErr) => { callback(['Mock note 1', 'Mock note 2'])}),
          createNote: jest.fn((data, callback, callbackErr) => { callback({ content: data, id: 1 })})
        };

        const view = new NotesView(mockModel, mockClient)
        const messageInput = document.querySelector('#message-input');
        messageInput.value = 'Go to the shop';
        view.addNewNote(); 

        expect(mockClient.createNote).toHaveBeenCalledWith('Go to the shop', expect.any(Function), expect.any(Function))});
});