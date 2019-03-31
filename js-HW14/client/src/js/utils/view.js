import Notepad from './notepad-model';
import noteTemplate from '../../templates/note.hbs';




  export const renderDeletedSearchNoteList = (listRef, notes) => {
    
    const renderSerchListItem = notes.map(note => noteTemplate(note)).join("");
    listRef.insertAdjacentHTML("beforeend",renderSerchListItem);
  };
export const renderNoteList = (listRef, notes) => {
  notes.map(note => note.priority = Notepad.getPriorityName(note.priority));
  const renderSerchListItem = notes.map(note => noteTemplate(note)).join("");
  listRef.insertAdjacentHTML("beforeend",renderSerchListItem);
};

export const addListItem = (listRef, note) => {
    note.priority = Notepad.getPriorityName(note.priority);
    const renderNewListItem = noteTemplate(note);
    listRef.insertAdjacentHTML("beforeend",renderNewListItem);
  };