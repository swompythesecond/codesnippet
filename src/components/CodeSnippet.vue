<template>
        <div ref="draggableContainer" class="draggable-container" :style="{ top: setTop+'px' , left: setLeft+'px' }">
          <div class="draggable-header">
            {{title}}
            <img id ="drag" class="image" src="../assets/codesnippet/drag.png" @mousedown="dragMouseDown" @mouseup="dragMouseUp">
            <img class="image" src="../assets/codesnippet/copy.png" @click="clickCopy">
            <img class="image" src="../assets/codesnippet/edit.png">
          <p id="date">21.7.2001</p></div>
          <textarea class="textField" :value="codeContent" readonly></textarea>
        </div>
</template>
<script>
import {codeSnippetSysthem} from '../../globalVar.js'
  export default {
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
      this.$refs.draggableContainer.style.zIndex = "9";
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    dragMouseUp: function () {
      codeSnippetSysthem.checkUpdate = true;
      let _step = codeSnippetSysthem.rasterStep
      let _positionX = this.$refs.draggableContainer.offsetLeft - this.positions.movementX -codeSnippetSysthem.startX
      let _positionY = this.$refs.draggableContainer.offsetTop - this.positions.movementY -codeSnippetSysthem.startY
      let _cancel = false;
      let _swapRow = ((_positionX + _step/2) - (_positionX + _step/2)%_step)/_step
      if (_swapRow > 3){
        _cancel = true;
      }
      let _swapSplit = ((_positionY + _step/2) - (_positionY + _step/2)%_step)/_step
      let _swapPosition = _swapSplit*3+_swapRow;
      let _swapItem = codeSnippetSysthem.codeSnippetarray[_swapPosition];
      if (_swapItem == undefined){
        _cancel = true;
      }
      if (_cancel == false){
        codeSnippetSysthem.codeSnippetarray[_swapPosition] = codeSnippetSysthem.codeSnippetarray[this.codeSnippetPosition];
        codeSnippetSysthem.codeSnippetarray[this.codeSnippetPosition] = _swapItem;
      }

      this.$refs.draggableContainer.style.zIndex = "8";
    },
    clickCopy: function(){
      console.log("hey")
    },
  }
  
  }
</script>










<style>
    div{
      font-family:Work Sans;
      font-weight: bold;
      font-size: 35px;
      text-align: left;
      border-radius: 10px     10px      0           0;
    }

    #date{
      font-family: Work Sans;
      font-weight: lighter;
      font-size: 12px;
      margin-top: 5px;
      margin-bottom: -5px;
      border-bottom: 2px solid #1E1E1Eed;
      color: #9EA5AD;
    }

    .textField{
        font-family:Work Sans;
        resize: none;
        width:400px;
        height:200px;
        padding: 12px 20px;
        border: 8px solid #2C2C2C;
        background-color: #1E1E1E;
        color: #fff;
        border-radius: 0px     0px      10px           10px;
    }
    .draggable-container {
      position: absolute;
      text-align: center;
      z-index: 8;
    }


    .draggable-header {
      padding: 10px;
      background-color: #2C2C2C;
      color: #fff;
    }

    .image{
      float: right;
      width: 20px;
      margin-left: 5px;
      cursor: pointer;
    }

    #drag{
      cursor: move;
    }
</style>