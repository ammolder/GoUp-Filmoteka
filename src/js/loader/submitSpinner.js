const loading = document.querySelector('#loading');
// showing Loading
  export function displayLoading() {
    loading.classList.add("display");
    // to stop Loading after some time
    setTimeout(() => {
      loading.classList.remove("display");
    }, 5000);
  };


// hiding Loading
export function hideLoading() {
  loading.classList.remove("display");
}