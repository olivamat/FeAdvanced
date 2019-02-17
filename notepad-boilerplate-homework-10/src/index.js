import './sass/main.scss';
import {PRIORITY_TYPES}  from './js/utils/constants';
import initialNotes from './assets/notes.json';
import Notepad from './js/utils/notepad-model';
import {listRef,renderNoteList, createListItem} from './js/utils/wiev'; 


const notePad = new Notepad(initialNotes);


renderNoteList(listRef, notePad.notes);



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
