import { Component, html } from '../lib';
import MarkdownIt from 'markdown-it';
import editorStyles from './editor.scss';

class Editor {
  editorNode;
  previewNode;
  md;
  inEditMode = true;

  beforeMount() {
    this.md = new MarkdownIt();
  }

  editOrPreview() {
    this.editorNode.classList.toggle('show');
    this.previewNode.classList.toggle('show');
    this.inEditMode = !this.inEditMode;
    if (!this.inEditMode) {
      const html = this.md.render(this.editorNode.value);
      this.previewNode.innerHTML = html;
    }
  }

  render() {
    return html`
      <button onclick=${() => {
        this.editOrPreview();
      }}>Edit / Preview</button>
      <textarea ref=${(node) => {
        this.editorNode = node;
      }} class='editor show' placeholder='write your post here..'></textarea>
      <div ref=${(node) => {
        this.previewNode = node;
      }} class='preview'></div>
    `;
  }
}

Component({ selector: 'app-editor', styles: editorStyles }, Editor);
