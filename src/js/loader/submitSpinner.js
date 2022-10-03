//  export {displayLoading, hideLoading }

  const loading = document.querySelector('#loading');
console.log(loading)
// showing Loading
  export function displayLoading() {
    const loading = document.querySelector('#loading');
    loading.classList.add("display");
    // to stop Loading after some time
    // const display = document.querySelector('.display');
    setTimeout(() => {
      loading.classList.remove("display");
    }, 2000);
  };


// hiding Loading
export function hideLoading() {
  //  const display = document.querySelector('#loading.display');
  loading.classList.remove("display");
}

