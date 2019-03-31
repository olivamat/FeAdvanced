import Notyf from "notyf";
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES } from "./js/utils/constants";
import Notepad from "./js/utils/notepad-model";
import MicroModal from "micromodal";
import "./sass/main.scss";
import "./sass/micromodal.css";
import "notyf/dist/notyf.min.css";
import {
  renderDeletedSearchNoteList,
  renderNoteList,
  addListItem
} from "./js/utils/view";

MicroModal.init();

const notyf = new Notyf({
  delay: 2000,
  alertIcon: "fa fa-exclamation-circle",
  confirmIcon: "fa fa-check-circle"
});

const listRef = document.querySelector(".note-list");

const notePad = new Notepad();

const noteStart = async () => {
  try {
    const notes = await notePad.get();
    renderNoteList(listRef, notes);
    notyf.confirm("Start notes successful");
  } catch (error) {
    notyf.alert(`Error notes start:${error}`);
  }
};
noteStart();

// start submit form +++++++++++++++++++++++++++++++++++++++++++++++++++

const form = document.querySelector(".note-editor");
const titleInput = form.querySelector("input");
const bodyInput = form.querySelector("textarea");

const noteSave = async (newItem) => {
  try {
    const savedNote = await notePad.saveNote(newItem);
    notyf.confirm(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
    form.reset();
    addListItem(listRef, savedNote);
  } catch (error) {
    notyf.alert(`Error note save:${error}`);
  }
};

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
    priority: PRIORITY_TYPES.LOW
  };

  noteSave(newItem);
};

form.addEventListener("submit", handleSubmit);
// end submit form +++++++++++++++++++++++++++++++++++++++++++++++++++

// start delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++
const noteDelete = async (idDelete) => {
  try {
    const newNotes = await notePad.deleteNote(idDelete);
    listRef.innerHTML = "";
    renderDeletedSearchNoteList(listRef, newNotes);
    notyf.confirm(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
  } catch (error){
    notyf.alert(`Error note delete:${error}`);
  }
};

const removeListItem = evt => {
  const target = evt.target;
  if (target.textContent !== "delete") return;
  const liDelete = target.closest("li");
  const idDelete = liDelete.dataset.id;

  noteDelete(idDelete);
 };

listRef.addEventListener("click", removeListItem);

// end delete Item++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// start create search++++++++++++++++++++++++++++++++++++++++++++++++++++++
const inputSerchForm = document.querySelector(".search-form__input");

const noteFilter = async (query) => {
  try {
    const searchedNotes = await notePad.filterNotesByQuery(query);
    listRef.innerHTML = "";
    renderDeletedSearchNoteList(listRef, searchedNotes);
  } catch (error) {
    notyf.alert(`Error note search:${error}`);
  }
  
};

const curentInputValue = evt => {
  const target = evt.target;
  noteFilter(target.value);
  
};

const search = evt => {
  const target = evt.target;
  target.oninput = curentInputValue;
};

inputSerchForm.addEventListener("focus", search);

// end create serch++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
