import Notyf from "notyf";
import {PRIORITY_TYPES, NOTIFICATION_MESSAGES } from "./js/utils/constants";
import initialNotes from "./assets/notes.json";
import Notepad from "./js/utils/notepad-model";
import MicroModal from "micromodal";
import "./sass/main.scss";
import "./sass/micromodal.css";
import "notyf/dist/notyf.min.css";
import {createListItemMarkup, renderNoteList, addListItem} from './js/utils/view';


MicroModal.init();

const notePad = new Notepad(initialNotes);

const listRef = document.querySelector(".note-list");


const notyf = new Notyf({
  delay: 2000,
  alertIcon: "fa fa-exclamation-circle",
  confirmIcon: "fa fa-check-circle"
});


const markup = createListItemMarkup(initialNotes);


listRef.insertAdjacentHTML("beforeend", markup);
 


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
  notePad.saveNote(newItem);
  notyf.confirm(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
  form.reset();
  addListItem(listRef, newItem);
};

form.addEventListener("submit", handleSubmit);
// end submit form +++++++++++++++++++++++++++++++++++++++++++++++++++


// start delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++
const removeListItem = evt => {
  const target = evt.target;
  if (target.textContent !== "delete") return;
  const liDelete = target.closest("li");
  const idDelete = liDelete.dataset.id;
  notePad.deleteNote(idDelete);
  liDelete.remove();
  notyf.confirm(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
};

listRef.addEventListener("click", removeListItem);
// end delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// start create search++++++++++++++++++++++++++++++++++++++++++++++++++++++
const inputSerchForm = document.querySelector(".search-form__input");

const curentInputValue = evt => {
  const target = evt.target;
  const searchedItem = notePad.filterNotesByQuery(target.value);
  listRef.innerHTML = "";
  renderNoteList(listRef, searchedItem);
};

const search = evt => {
  const target = evt.target;
  target.oninput = curentInputValue;
};

inputSerchForm.addEventListener("focus", search);

// end create serch++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
