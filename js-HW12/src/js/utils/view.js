import Notepad from './notepad-model';
import noteTemplate from '../../templates/note.hbs';



export  const createListItemMarkup = notes => {
    notes.map(note => note.priority = Notepad.getPriorityName(note.priority));
    const markup = notes.map(note => noteTemplate(note)).join("");
    return markup;
  };
  export  const createListItemMarkupFromStorage = notes => {
    if (notes === null) return null;
    const markup = notes.map(note => noteTemplate(note)).join("");
    return markup;
  };

export const renderNoteList = (listRef, notes) => {
    
  const renderSerchListItem = notes.map(note => noteTemplate(note)).join("");
  listRef.insertAdjacentHTML("beforeend",renderSerchListItem);
};

export const addListItem = (listRef, note) => {
    note.priority = Notepad.getPriorityName(note.priority);
    const renderNewListItem = noteTemplate(note);
    listRef.insertAdjacentHTML("beforeend",renderNewListItem);
  };