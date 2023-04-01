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
        fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {"content": data} )})
            .then((response) => { 
                return response.json()
            })
          
            .then((data) => callback(data))
            .catch((error) => {callbackErr(error);});
    }

    reset(callback, callbackErr) {
        fetch("http://localhost:3000/notes", {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                callback();
            } else {
                throw new Error("Failed to reset notes.");
            }
        })
        .catch(error => { callbackErr(error) });
    }
}

module.exports = NotesClient;