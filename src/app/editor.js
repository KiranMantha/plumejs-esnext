import MarkdownIt from 'markdown-it';
import { Component, html, signal } from '../lib';

@Component({ selector: 'app-editor', styles: import('./editor.scss?inline') })
class Editor {
  md;
  text = signal('');
  inEditMode = signal(true);
  markup = signal();

  beforeMount() {
    this.md = new MarkdownIt();
  }

  editOrPreview() {
    if (this.inEditMode()) {
      const html = this.md.render(this.text());
      this.markup.set(html);
    }
    this.inEditMode.set(!this.inEditMode());
  }

  render() {
    return html`
      <button
        onclick=${() => {
          this.editOrPreview();
        }}
      >
        Edit / Preview
      </button>
      <textarea
        class="editor ${this.inEditMode() ? 'show' : ''}"
        placeholder="write your post here.."
        value="${this.text()}"
        oninput=${(e) => {
          this.text.set(e.target.value);
        }}
      ></textarea>
      <div class="preview ${!this.inEditMode() ? 'show' : ''}">${this.markup()}</div>
    `;
  }
}
