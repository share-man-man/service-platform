<template>
  <!--  <ckeditor-->
  <!--    :editor="editor"-->
  <!--    v-model="editorData"-->
  <!--    :config="editorConfig"-->
  <!--    v-bind="$attrs"-->
  <!--  ></ckeditor>-->
  <ckeditor
    v-model="editorData"
    :editor="editor"
    :config="editorConfig"
    v-bind="$attrs"
  />
</template>

<script>
// import CKEditor from '@ckeditor/ckeditor5-vue';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'OmspEditor',
  components: {
    // ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // editor: ClassicEditor,
      editor: this.$OmspClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: '请输入······',
        // 不显示工具框
        toolbar: []
      }
    }
  },
  watch: {
    value: function(changeValue) {
      this.editorData = changeValue
      // this.$emit('input', changeValue)
    },
    editorData: function(changeValue) {
      this.$emit('input', changeValue)
    }
  },
  mounted() {
    this.editorData = this.value
  }
}
</script>

<style scoped>

</style>
