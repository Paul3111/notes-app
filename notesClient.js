class NotesClient {
    loadNotes(callback, callbackErr) {
        fetch('http://localhost:3000/notes')
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch((error) => {callbackErr(error)})
    }

    createNote(data, callback, callbackErr) {
        console.log("data", data)
        fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {"content": data} )})
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => {callbackErr(error);});
    }
}

module.exports = NotesClient;