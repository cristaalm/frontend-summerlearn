export default {
  mounted(el) {
    el.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    })
  }
}
