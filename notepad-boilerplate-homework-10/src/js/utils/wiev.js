import {ICON_TYPES, NOTE_ACTIONS} from './constants';
import Notepad  from './notepad-model';


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
    createActionButton(ICON_TYPES.ARROW_DOWN, NOTE_ACTIONS.DECREASE_PRIORITY)
  );

  noteSection1.appendChild(
    createActionButton(ICON_TYPES.ARROW_UP, NOTE_ACTIONS.INCREASE_PRIORITY)
  );
  const span = document.createElement("span");
  noteSection1.appendChild(span);
  span.classList.add("note__priority");
  span.textContent = `Priority: ${Notepad.getPriorityName(priority)}`;
  noteFooter.appendChild(noteSection2);
  noteSection2.appendChild(
    createActionButton(ICON_TYPES.EDIT, NOTE_ACTIONS.EDIT)
  );

  noteSection2.appendChild(
    createActionButton(ICON_TYPES.DELETE, NOTE_ACTIONS.DELETE)
  );
  return noteFooter;
};

export const createListItem = ({ id, title, body, priority }) => {
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


export const listRef = document.querySelector(".note-list");

export const renderNoteList = (listRef, notes) => {
  const renderListItem = notes.map(note => createListItem(note));
  listRef.append(...renderListItem);
  return listRef;
};