"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[1],{7001:(e,i,t)=>{t.r(i);var o=t(8975),s=t(9980),d=t.n(s),r=t(3752);(0,o.wA)({selector:"app-editor",styles:r.Z},class{constructor(){this.editorNode=void 0,this.previewNode=void 0,this.md=void 0,this.inEditMode=!0}beforeMount(){this.md=new(d())}editOrPreview(){if(this.editorNode.classList.toggle("show"),this.previewNode.classList.toggle("show"),this.inEditMode=!this.inEditMode,!this.inEditMode){const e=this.md.render(this.editorNode.value);this.previewNode.innerHTML=e}}render(){var e=this;return o.dy`
      <button
        onclick=${function(){e.editOrPreview()}}
      >
        Edit / Preview
      </button>
      <textarea
        ref=${function(i){e.editorNode=i}}
        class="editor show"
        placeholder="write your post here.."
      ></textarea>
      <div
        ref=${function(i){e.previewNode=i}}
        class="preview"
      ></div>
    `}})},3752:(e,i,t)=>{t.d(i,{Z:()=>n});var o=t(8081),s=t.n(o),d=t(3645),r=t.n(d)()(s());r.push([e.id,".actions{display:flex}.actions button{width:auto;margin-left:10px}.editor,.preview{display:none;height:500px;font-size:100%;overflow:auto;border:1px solid #ccc;border-radius:10px;padding:20px}.editor.show,.preview.show{display:block}.editor{resize:none;width:100%}",""]);const n=r}}]);