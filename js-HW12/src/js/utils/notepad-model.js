class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) {
        return note;
      }
    }
  }

  saveNote(note) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._notes.push(note);
        resolve(note);
      }, 300);
    });
  }

  deleteNote(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let i = 0; i < this._notes.length; i += 1) {
          const note = this._notes[i];
          if (note.id === id) {
            this._notes.splice(i, 1);
          }
          resolve(this._notes);
        }
      }, 300);
    });
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (!note) return;
    if (updatedContent.title !== undefined) {
      note.title = updatedContent.title;
    }
    if (updatedContent.body !== undefined) {
      note.body = updatedContent.body;
    }
    return note;
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
  }

  filterNotesByQuery(query = "") {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredNotes = [];
        for (const note of this._notes) {
          const noteContent = `${note.title} ${note.body}`;
          const hasQuery = noteContent
            .toLowerCase()
            .includes(query.toLowerCase());
          if (hasQuery) {
            filteredNotes.push(note);
          }
        }
        resolve(filteredNotes);
      }, 300);
    });
    
  }

  filterNotesByPriority(queryPriority) {
    const filteredNotes = [];
    for (const note of this._notes) {
      if (note.priority === queryPriority) {
        filteredNotes.push(note);
      }
    }
    return filteredNotes;
  }

  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }
}

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: "Low" },
  1: { id: 1, value: 1, name: "Normal" },
  2: { id: 2, value: 2, name: "High" }
};

export default Notepad;
