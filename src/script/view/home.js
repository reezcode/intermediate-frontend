import NotesApi from "../data/network/notes_api.js";
import Utils from "../utils.js";

const home = () => {
  const noteListContainerElement = document.querySelector(
    "#notesListContainer",
  );
  const noteLoadingElement =
    noteListContainerElement.querySelector(".search-loading");
  const noteListElement = noteListContainerElement.querySelector(".notes-list");
  const listElement = noteListElement.querySelector(".list");
  const noteFormElement = document.querySelector("note-form");
  const noteFilterElement = document.querySelector("#noteFilter");

  const showNote = async (filter = "unarchived") => {
    showLoading();

    try {
      let result;
      if (filter === "archived") {
        result = await NotesApi.getArchivedNotes();
      } else {
        result = await NotesApi.getNotes();
      }

      if (result) {
        displayResult(result);
        animateCards();
        shownoteList();
      }
    } catch (error) {
      alert("Error fetching notes: " + error.message);
    }
  };

  const displayResult = (notes) => {
    listElement.innerHTML = "";
    if (notes.length === 0) {
      const emptyCard = document.createElement("div");
      emptyCard.classList.add("note-card");
      emptyCard.innerHTML = `
        <h2>No Notes Available</h2>
        <p>Start adding some notes to see them here.</p>
      `;
      listElement.appendChild(emptyCard);
    } else {
      notes.forEach((note) => {
        const noteCard = document.createElement("note-card");
        noteCard.setAttribute("id", note.id);
        noteCard.setAttribute("title", note.title);
        noteCard.setAttribute("body", note.body);
        noteCard.setAttribute("createdAt", note.createdAt);
        noteCard.setAttribute("archived", note.archived.toString());
        listElement.appendChild(noteCard);
      });
    }
  };

  const animateCards = () => {
    anime({
      targets: ".note-card",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: "easeOutExpo",
      delay: anime.stagger(100),
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

  noteFormElement.addEventListener("note-added", async (event) => {
    const newNote = event.detail;
    try {
      await NotesApi.createNote(newNote);
      const updatedNotes = await NotesApi.getNotes();
      displayResult(updatedNotes);
      animateCards();
    } catch (error) {
      alert("Error adding new note: " + error.message);
    }
  });

  noteFilterElement.addEventListener("change", (event) => {
    const filter = event.target.value;
    showNote(filter);
  });

  showNote();
};

export default home;
