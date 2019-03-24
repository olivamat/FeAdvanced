import Notyf from "notyf";
import {PRIORITY_TYPES, NOTIFICATION_MESSAGES } from "./js/utils/constants";
import Notepad from "./js/utils/notepad-model";
import MicroModal from "micromodal";
import "./sass/main.scss";
import "./sass/micromodal.css";
import "notyf/dist/notyf.min.css";
import {renderDeletedSearchNoteList, renderNoteList, addListItem} from './js/utils/view';

MicroModal.init();

const listRef = document.querySelector(".note-list");

const notePad = new Notepad();

notePad.get().then((notes) =>{
renderNoteList(listRef, notes)}  
);

const notyf = new Notyf({
  delay: 2000,
  alertIcon: "fa fa-exclamation-circle",
  confirmIcon: "fa fa-check-circle"
});


// start submit form +++++++++++++++++++++++++++++++++++++++++++++++++++

const form = document.querySelector(".note-editor");
const titleInput = form.querySelector("input");
const bodyInput = form.querySelector("textarea");

const handleSubmit = evt => {
  evt.preventDefault();
  const newtitle = titleInput.value.trim();
  const newbody = bodyInput.value.trim();

  if (newtitle === "" || newbody === "") {
    return notyf.alert(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }
  const newItem = {
    title: `${newtitle}`,
    body: `${newbody}`,
    priority: PRIORITY_TYPES.LOW,
  };
  
  notePad
  .saveNote(newItem)
  .then(savedNote => {
    notyf.confirm(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    form.reset();
   
    addListItem(listRef, savedNote);
    console.log(MicroModal);
    // MicroModal.close("note-editor-modal"); 
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
renderDeletedSearchNoteList(listRef, notes) ; 
    notyf.confirm(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
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
    renderDeletedSearchNoteList(listRef, searchedItem);
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


