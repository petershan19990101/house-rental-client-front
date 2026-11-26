<script lang="ts">
export default {
  onLaunch() {
    console.log('App Launch')
  }
}
</script>

<style>
@import './styles/tokens.css';
/* v1.1 覆盖层：设计 token 与四页样式统一，必须在 tokens.css 之后引入以保证覆盖顺序 */
@import './styles/v11.css';
</style>
