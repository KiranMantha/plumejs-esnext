"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[551],{6551:(t,e,s)=>{s.r(e);var c=s(8975),i=s(1019),a=s(3707);(0,c.wA)({selector:"app-calculator",styles:a.Z,deps:[i.F]},class{constructor(t){this.btnValues=void 0,this.calc=void 0,this.setCalc=void 0,this.outputNode=void 0,this.toLocaleString=function(t){return String(t).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,"$1 ")},this.removeSpaces=function(t){return t.toString().replace(/\s/g,"")}}beforeMount(){this.btnValues=[["C","+-","%","/"],[7,8,9,"X"],[4,5,6,"-"],[1,2,3,"+"],[0,".","="]]}mount(){console.table(this.routerSrvc.getCurrentRoute()),[this.calc,this.setCalc]=(0,c.eJ)({sign:"",num:0,res:0})}handleKeyPress(t){switch(t){case"C":this.setCalc({...this.calc,sign:"",num:0,res:0});break;case"+-":this.setCalc({...this.calc,res:this.calc.res?this.toLocaleString(-1*this.removeSpaces(this.calc.res)):0,num:this.calc.num?this.toLocaleString(-1*this.removeSpaces(this.calc.num)):0,sign:""});break;case"%":{let t=this.calc.num?parseFloat(this.removeSpaces(this.calc.num)):0,e=this.calc.res?parseFloat(this.removeSpaces(this.calc.res)):0;this.setCalc({...this.calc,num:t/=Math.pow(100,1),res:e/=Math.pow(100,1),sign:""});break}case"=":if(this.calc.sign&&this.calc.num){const t=function(t,e,s){return"+"===s?t+e:"-"===s?t-e:"X"===s?t*e:t/e};this.setCalc({...this.calc,res:"0"===this.calc.num&&"/"===this.calc.sign?"Cannot divide with 0":this.toLocaleString(t(Number(this.removeSpaces(this.calc.res)),Number(this.removeSpaces(this.calc.num)),this.calc.sign)),sign:"",num:0})}break;case"/":case"X":case"-":case"+":this.setCalc({...this.calc,sign:t,res:!this.calc.res&&this.calc.num?this.calc.num:this.calc.res,num:0});break;case".":this.setCalc({...this.calc,num:this.calc.num.toString().includes(".")?this.calc.num:this.calc.num+t});break;default:this.removeSpaces(this.calc.num.length<16)&&this.setCalc({...this.calc,num:0===this.calc.num&&"0"===t?"0":this.removeSpaces(this.calc.num)%1==0?this.toLocaleString(Number(this.removeSpaces(this.calc.num+t))):this.toLocaleString(this.calc.num+t),res:this.calc.sign?this.calc.res:0})}this.outputNode.innerHTML=this.calc.num?this.calc.num:this.calc.res}render(){var t=this;return c.dy`
      <div class="wrapper">
        <div
          class="screen"
          ref=${function(e){t.outputNode=e}}
        >
          0
        </div>
        <div class="button-box">
          ${this.btnValues.flat().map((function(e,s){return c.dy`
              <button
                class="button is-light ${"="===e?"equals":""}"
                onclick=${function(){t.handleKeyPress(e)}}
              >
                ${e}
              </button>
            `}))}
        </div>
      </div>
    `}})},3707:(t,e,s)=>{s.d(e,{Z:()=>n});var c=s(8081),i=s.n(c),a=s(3645),r=s.n(a)()(i());r.push([t.id,".wrapper{width:340px;height:540px;padding:10px;border-radius:10px;background-color:#485461;background-image:linear-gradient(315deg, #485461 0%, #28313b 74%)}.wrapper .screen{height:100px;width:100%;margin-bottom:10px;padding:0 10px;background-color:#435769;border-radius:10px;display:flex;align-items:center;justify-content:flex-end;color:#fff;font-size:40px;font-weight:bold;box-sizing:border-box}.wrapper .button-box{width:100%;height:calc(100% - 110px);display:grid;grid-template-columns:repeat(4, 1fr);grid-template-rows:repeat(5, 1fr);grid-gap:10px}.wrapper .button-box button{border:none;font-size:24px;font-weight:bold;cursor:pointer;border-radius:10px;outline:none;margin:0}.wrapper .button-box button.equals{grid-column:3/5;background-color:#f33d1d}.wrapper .button-box button.equals:hover{background-color:#e4270f}",""]);const n=r}}]);