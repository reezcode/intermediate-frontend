import notesData from "../data/local/notes.js";
import Utils from '../utils.js';

const home = () => {
  const noteListContainerElement = document.querySelector('#notesListContainer');
  const noteLoadingElement = noteListContainerElement.querySelector('.search-loading');
  const noteListElement = noteListContainerElement.querySelector('.notes-list');
  const listElement = noteListElement.querySelector('.list');
  const noteFormElement = document.querySelector('note-form');

  const showNote = () => {
    showLoading();

    const result = notesData;
    displayResult(result);

    shownoteList();
  };

  const displayResult = (notes) => {
    listElement.innerHTML = '';
    notes.forEach((note) => {
      const noteCard = document.createElement('note-card');
      noteCard.setAttribute('title', note.title);
      noteCard.setAttribute('body', note.body);
      noteCard.setAttribute('createdAt', note.createdAt);
      noteCard.setAttribute('archived', note.archived.toString());
      listElement.appendChild(noteCard);
    });
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const shownoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  noteFormElement.addEventListener('note-added', (event) => {
    const newNote = event.detail;
    notesData.push(newNote);
    displayResult(notesData);
  });

  showNote();
};

export default home;