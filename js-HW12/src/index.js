import Notyf from "notyf";
import {PRIORITY_TYPES, NOTIFICATION_MESSAGES } from "./js/utils/constants";
import initialNotes from "./assets/notes.json";
import Notepad from "./js/utils/notepad-model";
import MicroModal from "micromodal";
import "./sass/main.scss";
import "./sass/micromodal.css";
import "notyf/dist/notyf.min.css";
import {createListItemMarkupFromStorage, createListItemMarkup, renderNoteList, addListItem} from './js/utils/view';
import { resolve, reject } from "q";


MicroModal.init();

const notesFromStorage = localStorage.getItem('notesStorage');
const initialNotesStorage = JSON.parse(notesFromStorage);
// console.log(initialNotesStorage);

let initialNotesDefiendStorage;

if (initialNotesStorage !== null) {
  initialNotesDefiendStorage = initialNotesStorage;
} else {
  initialNotesDefiendStorage = initialNotes;
}

const notePad = new Notepad(initialNotesDefiendStorage);

const listRef = document.querySelector(".note-list");


const notyf = new Notyf({
  delay: 2000,
  alertIcon: "fa fa-exclamation-circle",
  confirmIcon: "fa fa-check-circle"
});


const markupFromStorage = createListItemMarkupFromStorage(initialNotesStorage);


if (markupFromStorage === null) {
  const markup = createListItemMarkup(initialNotes);
  listRef.insertAdjacentHTML("beforeend", markup);

} else {
  
  listRef.insertAdjacentHTML("beforeend", markupFromStorage);  

}

 


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
    return notyf.alert(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }
  const newItem = {
    id: `${generateUniqueId()}`,
    title: `${newtitle}`,
    body: `${newbody}`,
    priority: PRIORITY_TYPES.LOW,
  };
  // console.log(newItem);
  notePad
  .saveNote(newItem)
  .then(savedNote => {
    notyf.confirm(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    form.reset();
    addListItem(listRef, savedNote);
    const notesForStorage = JSON.stringify(notePad.notes); 
    localStorage.setItem('notesStorage', notesForStorage);
    
  })
  .catch(error => {
    alert(error);
  });

};

form.addEventListener("submit", handleSubmit);
// end submit form +++++++++++++++++++++++++++++++++++++++++++++++++++


// start delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++
const removeListItem = evt => {
  const target = evt.target;
  if (target.textContent !== "delete") return;
  const liDelete = target.closest("li");
  const idDelete = liDelete.dataset.id;
  
  notePad
  .deleteNote(idDelete)
  .then((notes) => {
    listRef.innerHTML = "";
    renderNoteList(listRef, notes);
    notyf.confirm(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
    const notesForStorage = JSON.stringify(notePad.notes); 
    localStorage.setItem('notesStorage', notesForStorage);
  })
  .catch(error => {
    alert(error);
  });
  
};

listRef.addEventListener("click", removeListItem);
// end delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// start create search++++++++++++++++++++++++++++++++++++++++++++++++++++++
const inputSerchForm = document.querySelector(".search-form__input");

const curentInputValue = evt => {
  const target = evt.target;
  
  notePad
  .filterNotesByQuery(target.value)
  .then((searchedItem) => {
    listRef.innerHTML = "";
    renderNoteList(listRef, searchedItem);
  })
  .catch(error => {
    alert(error);
  });
};

const search = evt => {
  const target = evt.target;
  target.oninput = curentInputValue;
};

inputSerchForm.addEventListener("focus", search);

// end create serch++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


