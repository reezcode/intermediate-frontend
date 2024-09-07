class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          .app-bar {
            background-color: #ebeced;
            padding: 16px;
            text-align: center;
            border-radius: 8px;
          }
          .brand-name {
            font-size: 2rem;
            margin: 0;
          }
        </style>
        <header>
          <div class="app-bar">
            <h1 class="brand-name">Notes App</h1>
          </div>
        </header>
      `;
  }
}
customElements.define("app-header", AppHeader);
