class NotesClient {
    loadNotes(callback) {
        fetch('http://localhost:3000/notes')
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
    }

    createNote(data) {
        fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "content": data })})
                .then((response) => {return response.json()})
                .then((data) => {console.log("Success:", data);})
                .catch((error) => {console.error("Error:", error);});
    }
}

module.exports = NotesClient;