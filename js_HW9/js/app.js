"use strict";

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
};

const ICON_TYPES = {
  EDIT: "edit",
  DELETE: "delete",
  ARROW_DOWN: "expand_more",
  ARROW_UP: "expand_less"
};

const NOTE_ACTIONS = {
  DELETE: "delete-note",
  EDIT: "edit-note",
  INCREASE_PRIORITY: "increase-priority",
  DECREASE_PRIORITY: "decrease-priority"
};

const initialNotes = [
  {
    id: 1,
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: PRIORITY_TYPES.HIGH
  },
  {
    id: 2,
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: PRIORITY_TYPES.NORMAL
  },
  {
    id: 3,
    title: "Get comfy with Frontend frameworks",
    body:
      "First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
    priority: PRIORITY_TYPES.NORMAL
  },
  {
    id: 4,
    title: "Winter clothes",
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW
  }
];
// class NOTEPAD==================================
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
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    // const i = 0;
    // for (const note of this._notes){

    //   if (note.id === id) {
    //     this._notes.splice(i, 1);
    //     return;
    //   } else i+=1;
    // }
    // const note = this._note;
    // console.log(note);
    // const i = note.key;
    // this._notes.splice(i, 1);
    // return;
    // const note = this.nones;
    // const noteID = note.map(note => (if (note.id === id) {
    //       this._notes.splice(note, 1);
    //       return;
    //     }  ))

    for (let i = 0; i < this._notes.length; i += 1) {
      const note = this._notes[i];
      if (note.id === id) {
        this._notes.splice(i, 1);
        return;
      }
    }
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
    const filteredNotes = [];
    for (const note of this._notes) {
      const noteContent = `${note.title} ${note.body}`;
      const hasQuery = noteContent.toLowerCase().includes(query.toLowerCase());
      if (hasQuery) {
        filteredNotes.push(note);
      }
    }
    return filteredNotes;
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

const notePad = new Notepad(initialNotes);

const createNoteContent = (title, body) => {
  const noteContent = document.createElement("div");
  noteContent.classList.add("note__content");
  const noteTitle = document.createElement("h2");
  noteTitle.classList.add("note__title");
  noteTitle.textContent = title;
  const noteBody = document.createElement("p");
  noteBody.classList.add("note__body");
  noteBody.textContent = body;
  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);
  return noteContent;
};

const createActionButton = (content, button) => {
  const action = document.createElement("button");
  action.classList.add("action");
  action.setAttribute("data-action", button);

  const materialIcons = document.createElement("i");
  materialIcons.classList.add("material-icons");
  materialIcons.classList.add("action__icon");
  materialIcons.textContent = content;
  action.appendChild(materialIcons);
  return action;
};

const createNoteFooter = priority => {
  const noteFooter = document.createElement("footer");
  noteFooter.classList.add("note__footer");
  const noteSection1 = document.createElement("section");
  noteSection1.classList.add("note__section");
  noteFooter.appendChild(noteSection1);
  const noteSection2 = document.createElement("section");
  noteSection2.classList.add("note__section");
  noteSection1.appendChild(
    createActionButton("expand_more", ICON_TYPES.DECREASE_PRIORITY)
  );

  noteSection1.appendChild(
    createActionButton("expand_less", ICON_TYPES.INCREASE_PRIORITY)
  );
  const span = document.createElement("span");
  noteSection1.appendChild(span);
  span.classList.add("note__priority");
  span.textContent = `Priority ${Notepad.getPriorityName(priority)}`;
  noteFooter.appendChild(noteSection2);
  noteSection2.appendChild(createActionButton("edit", ICON_TYPES.EDIT));

  noteSection2.appendChild(createActionButton("delete", ICON_TYPES.DELETE));
  return noteFooter;
};

const createListItem = ({ id, title, body, priority }) => {
  const noteListItem = document.createElement("li");
  noteListItem.dataset.id = id;
  noteListItem.classList.add("note-list__item");
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteListItem.appendChild(noteDiv);
  noteDiv.appendChild(createNoteContent(title, body));
  noteDiv.appendChild(createNoteFooter(priority));
  return noteListItem;
};

const listRef = document.querySelector(".note-list");

const renderNoteList = (listRef, notes) => {
  const renderListItem = notes.map(note => createListItem(note));
  listRef.append(...renderListItem);
  return listRef;
};

renderNoteList(listRef, notePad.notes);
const listRefItem = document.querySelector(".note-list__item");

// start submit form +++++++++++++++++++++++++++++++++++++++++++++++++++
const form = document.querySelector(".note-editor");
const titleInput = form.querySelector("input");
const bodyInput = form.querySelector("textarea");

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const handleSubmit = evt => {
  evt.preventDefault();
  const newtitle = titleInput.value.trim();
  const newbody = bodyInput.value.trim();

  if (newtitle === "" || newbody === "") {
    return alert("Please enter title and body!");
  }
  const newItem = {
    id: `${generateUniqueId()}`,
    title: `${newtitle}`,
    body: `${newbody}`,
    priority: PRIORITY_TYPES.LOW
  };
  notePad.saveNote(newItem);
  form.reset();
  addListItem(listRef, newItem);
};

form.addEventListener("submit", handleSubmit);
// end submit form +++++++++++++++++++++++++++++++++++++++++++++++++++

// start create function  addListItem(listRef, note)++++++++++++++++++
const addListItem = (listRef, note) => {
  const renderNewListItem = createListItem(note);
  listRef.append(renderNewListItem);
};
// end create function  addListItem(listRef, note)+++++++++++++++++++++++

// start delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++
const removeListItem = evt => {
  const target = evt.target;
  if (target.textContent !== "delete") return;
  const liDelete = target.closest("li");
  const idDelete = liDelete.dataset.id;
  notePad.deleteNote(idDelete);
  liDelete.remove();
};

listRef.addEventListener("click", removeListItem);
// end delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// start create serch++++++++++++++++++++++++++++++++++++++++++++++++++++++
const inputSerchForm = document.querySelector(".search-form__input");

const curentInputValue = evt => {
  const target = evt.target;
  const serchedItem = notePad.filterNotesByQuery(target.value);
  listRef.innerHTML = "";
  renderNoteList(listRef, serchedItem);
};

const serch = evt => {
  const target = evt.target;
  target.oninput = curentInputValue;
};

inputSerchForm.addEventListener("focus", serch);

// end create serch++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
