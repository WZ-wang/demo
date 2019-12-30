<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :fullscreen="true"
    title="文件预览"
  >
    <div class="agreement_picture">
      <div class="pdf">
        <iframe
          src="../../assets/q.pdf"
          frameborder="0"
          style="width: 100%; height: 100%"
        ></iframe>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="tip-left transfer">
        <el-button type="info" @click="dialogVisible=false">不同意</el-button>
        <el-button type="danger" >同意</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import pdf from "vue-pdf";

export default {
  data() {
    return {
      dialogVisible:true
    };
  },
  components: {
    pdf
  }
};
</script>