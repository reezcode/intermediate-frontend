const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      if (!response.ok) throw new Error("Failed to fetch notes");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      if (!response.ok) throw new Error("Failed to fetch archived notes");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  }

  static async getDetailNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`);
      if (!response.ok) throw new Error("Failed to fetch note details");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete note");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  }

  static async createNote(data) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create note");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to archive note");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to unarchive note");
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      return null;
    }
  }
}

export default NotesApi;
