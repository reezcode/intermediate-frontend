import NotesApi from "../../data/network/notes_api.js";

class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute("id") || "No Id";
    const title = this.getAttribute("title") || "No Title";
    const body = this.getAttribute("body") || "No Body";
    const createdAt =
      this.getAttribute("createdAt") || new Date().toISOString();
    const archived = this.getAttribute("archived") === "true";

    this.shadowRoot.innerHTML = `
        <style>
          .card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 100%;
            margin-bottom: 20px;
            cursor: pointer;
            display: block;
          }

          .card:hover {
            transform: translateY(-5px);
          }

          .note-info__title h2 {
            font-size: 1.2rem;
            color: #333;
            margin: 0;
            display: flex;
            align-items: center;
          }
  
          .note-info__description p {
            font-size: 1rem;
            color: #666;
            margin: 10px 0;
          }
  
          .note-info__meta {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
  
          .meta-item {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.9rem;
          }
  
          .meta-date {
            background-color: #d3e0ea;
            color: #4b6584;
          }
  
          .meta-archive.archived {
            background-color: #a0c0e0;
            color: #2f3e46;
          }
  
          .meta-archive.not-archived {
            background-color: #d3d3d3;
            color: #4b6584;
          }

          .buttons {
            margin-top: 10px;
          }

          button {
            padding: 8px 12px;
            margin-right: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .delete-btn {
            background-color: #ff6b6b;
            color: white;
          }

          .archive-btn {
            background-color: #4b6584;
            color: white;
          }

        </style>
  
        <div class="card">
          <div class="note-info">
            <div class="note-info__title">
              <h2><i class="fas fa-sticky-note"></i> ${title}</h2>
            </div>
            <div class="note-info__description">
              <p>${body}</p>
            </div>
            <div class="note-info__meta">
              <div class="meta-item meta-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${new Date(createdAt).toLocaleDateString()}</span>
              </div>
              <div class="meta-item meta-archive ${archived ? "archived" : "not-archived"}">
                <i class="fas ${archived ? "fa-archive" : "fa-box-open"}"></i>
                <span>${archived ? "Archived" : "Not Archived"}</span>
              </div>
            </div>
            <div class="buttons">
              <button class="delete-btn">Delete</button>
              <button class="archive-btn">${archived ? "Unarchive" : "Archive"}</button>
            </div>
          </div>
        </div>
      `;

    this.shadowRoot
      .querySelector(".card")
      .addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() !== "button") {
          this.showDetail(id);
        }
      });

    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        this.deleteNote(id);
      });

    this.shadowRoot
      .querySelector(".archive-btn")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleArchive(id, archived);
      });
  }

  async showDetail(id) {
    try {
      const note = await NotesApi.getDetailNote(id);
      if (note) {
        alert(
          `Note Detail\nTitle: ${note.title}\nBody: ${note.body}\nCreated At: ${note.createdAt}`,
        );
      }
    } catch (error) {
      alert("Error fetching note detail: " + error.message);
    }
  }

  async deleteNote(id) {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await NotesApi.deleteNote(id);
        alert("Note deleted successfully");
        this.remove();
      } catch (error) {
        alert("Error deleting note: " + error.message);
      }
    }
  }

  async toggleArchive(id, isArchived) {
    try {
      if (isArchived) {
        await NotesApi.unarchiveNote(id);
        alert("Note unarchived successfully");
      } else {
        await NotesApi.archiveNote(id);
        alert("Note archived successfully");
      }
      window.location.reload();
    } catch (error) {
      alert(
        `Error ${isArchived ? "unarchiving" : "archiving"} note: ` +
          error.message,
      );
    }
  }
}

customElements.define("note-card", NoteCard);
