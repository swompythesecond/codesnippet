<template>
      <pre v-highlightjs="css">
          <code class="code">
              <div v-html="description"></div>
          </code>
      </pre>
      <div ref="draggableContainer" class="draggable-container" :style="{ top: setTop+'px' , left: setLeft+'px' }">
        <div class="draggable-header" @mousedown="dragMouseDown" @mouseup="dragMouseUp">{{title}}</div>
        <textarea class="textField" :value="codeContent"></textarea>
      </div>
  </template>
  
  <script>
  import {codeSnippetSysthem} from '../../globalVar.js'
  import { reactive, ref } from "vue";
  export default {
    setup() {
      const value = `.loginIdCompContainer {
                      margin: 20px;
                      display: flex;
                      }
                      
                      .loginIdCompContainer > button{
                      padding: 12px;
                      background-color: #444;
                      border-radius: 6px;
                      border-color: white;
                      margin: 20px;
                      color: white;
                      }`;
      const description = ref(value);
      const editorConfigs = reactive({
        codeBlock: {
          languages: [
            { language: "css", label: "CSS" },
            { language: "html", label: "HTML" },
          ],
        },
      });
      return { description, editorConfigs };
    },
    data() {
      return {
          positions: {
          clientX: undefined,
          clientY: undefined,
          movementX: 0,
          movementY: 0,
        }
      }
    },

    props: {
      setTop: String,
      setLeft: String,
      codeSnippetPosition: Number,
      title: String,
      codeContent: String,
    },

    methods: {
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    dragMouseUp: function () {
      codeSnippetSysthem.codeSnippetarray
      //console.log(this.$refs.draggableContainer.offsetTop - this.positions.movementY)
      //console.log(this.$refs.draggableContainer.offsetLeft - this.positions.movementX)
    },
  }
  };
  </script>
  
  <style>
  .textField{
      resize: none;
      width:250px;
      height:150px;
      border: 8px solid #2C2C2C;
      background-color: #1E1E1E;
      color: #fff;
  }
  .draggable-container {
    position: absolute;
    z-index: 9;
    background-color: #f1f1f1;
    border: 1px solid #d3d3d3;
    text-align: center;
    z-index: 9;
  }


  .draggable-header {
    padding: 10px;
    cursor: move;
    z-index: 10;
    background-color: #2196F3;
    color: #fff;
    z-index: 10;
  }
</style>