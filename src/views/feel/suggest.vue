<template>
  <div>
    沟通反馈
        <Editor :catchData="catchData"></Editor>
    <button @click="gets">get</button>
    <!-- <div v-html="pData.content">

    </div> -->
  </div>
</template>

<script>
import Editor from "../../components/editor";
export default {
  data() {
    return {
      pData: {
        content: ""
      }
    };
  },
  methods: {
    //富文本
    catchData(content) {
      this.pData.content = content;
    },
    gets() {
      console.log(this.pData.content);
    }
  },
  components: {
    Editor
  }
};
</script>