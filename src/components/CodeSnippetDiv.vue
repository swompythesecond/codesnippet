<template>
  <div ref="container">
  </div>
  <button @click="createCodeSnippet">Click to create Snippet</button>
</template>
  
<script>

import CodeSnippet from './CodeSnippet.vue'
import { defineComponent, createApp } from 'vue'
import { codeSnippetSysthem } from '../../globalVar.js'
export default {
  data() {
    return {
      startX: codeSnippetSysthem.startX,
      startY: codeSnippetSysthem.startY,
      rowAmount: codeSnippetSysthem.rowAmount,
    }
  },
  components: {
  },
  methods: {
    createCodeSnippet() {
      let _title = prompt("EnterTitle", "Title");
      let _codeContent = prompt("Enter Code", "myArray.push('hello')");
      codeSnippetSysthem.codeSnippetarray.push(
        {
          title: _title,
          codeContent: _codeContent
        }
      )
      this.RenderCodeSnippet();

    },
    RenderCodeSnippet() {
      if (codeSnippetSysthem.checkUpdate == true) {
        this.$refs.container.innerHTML = '';
        for (let i = 0; i < codeSnippetSysthem.codeSnippetarray.length; i++) {
          let buttonView;
          let currentPosition = i;
          let _setTop = this.startX + (currentPosition % this.rowAmount) * codeSnippetSysthem.rasterStep;
          let _setLeft = this.startY + Math.floor(currentPosition / this.rowAmount) * codeSnippetSysthem.rasterStep;
          buttonView = defineComponent({
            extends: CodeSnippet, data() {
              return {
              }
            }
          })
          const CodeSnippetElement = document.createElement('CodeSnippet');
          CodeSnippetElement.addEventListener('mouseup', this.RenderCodeSnippet);
          this.$refs.container.appendChild(CodeSnippetElement);
          createApp(buttonView, {
            setTop: _setLeft.toString(),
            setLeft: _setTop.toString(),
            title: codeSnippetSysthem.codeSnippetarray[i].title,
            codeContent: codeSnippetSysthem.codeSnippetarray[i].codeContent,
            codeSnippetPosition: currentPosition,
          }).mount(CodeSnippetElement)
        }
      }
      codeSnippetSysthem.checkUpdate = false;
    }

  },
  mounted() {
    this.RenderCodeSnippet()
  },
}
</script>
  
<style>

</style>
  