class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
    this.setUpEventListeners();
  }
  render() {
    this.shadowRoot.innerHTML = `
        <style>
          .note-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
          }
  
          .form-group {
            display: flex;
            flex-direction: column;
          }
  
          label {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
          }
  
          input, textarea {
            padding: 10px;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid #ccc;
            outline: none;
            transition: border 0.3s ease;
          }
  
          input:focus, textarea:focus {
            border-color: #4b6584;
          }
  
          .error-message {
            font-size: 12px;
            color: #d9534f;
            display: none;
            margin-top: 5px;
          }
  
          .btn-submit {
            padding: 10px;
            background-color: #4b6584;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
  
          .btn-submit:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
  
        </style>
  
        <form id="noteForm" class="note-form" novalidate>
          <div class="form-group">
            <label for="noteTitle">Title</label>
            <input type="text" id="noteTitle" name="title" placeholder="Enter note title" required />
            <small class="error-message">Title is required</small>
          </div>
  
          <div class="form-group">
            <label for="noteBody">Body</label>
            <textarea id="noteBody" name="body" rows="4" placeholder="Enter note body" required></textarea>
            <small class="error-message">Body is required</small>
          </div>
  
          <button type="submit" class="btn btn-submit">Add Note</button>
        </form>
      `;
  }

  setUpEventListeners() {
    const form = this.shadowRoot.querySelector('#noteForm');
    const titleInput = this.shadowRoot.querySelector('#noteTitle');
    const bodyInput = this.shadowRoot.querySelector('#noteBody');
    const submitButton = this.shadowRoot.querySelector('.btn-submit');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = this.validateForm();
      if (isValid) {
        const note = {
          title: titleInput.value,
          body: bodyInput.value,
          createdAt: new Date().toISOString(),
          archived: false,
        };
        this.dispatchEvent(new CustomEvent('note-added', { detail: note }));
        form.reset();
      }
    });

    titleInput.addEventListener('input', () => this.validateInput(titleInput));
    bodyInput.addEventListener('input', () => this.validateInput(bodyInput));
  }

  validateForm() {
    const titleInput = this.shadowRoot.querySelector('#noteTitle');
    const bodyInput = this.shadowRoot.querySelector('#noteBody');

    const isTitleValid = this.validateInput(titleInput);
    const isBodyValid = this.validateInput(bodyInput);

    return isTitleValid && isBodyValid;
  }

  validateInput(input) {
    const errorMessage = input.nextElementSibling;
    if (!input.value.trim()) {
      input.classList.add('invalid');
      errorMessage.style.display = 'block';
      return false;
    } else {
      input.classList.remove('invalid');
      errorMessage.style.display = 'none';
      return true;
    }
  }
}

customElements.define('note-form', NoteForm);