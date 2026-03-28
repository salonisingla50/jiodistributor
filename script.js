
const scriptURL = 'https://script.google.com/macros/s/AKfycbzpheluS5smQVcTPOhYsXF3x8xHIL7aSgUd71NlHPFJp9cBllQNM8L5LsUIH1p5-Oj_/exec';
const form = document.getElementById('leadForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  // Change button text to show loading
  const submitBtn = form.querySelector('button');
  submitBtn.innerText = "Submitting...";
  submitBtn.disabled = true;

  fetch(scriptURL, { 
    method: 'POST', 
    body: new FormData(form)
  })
  .then(response => {
    alert("Success!");
    form.reset();
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert("Error submitting form. Please try again.");
  })
  .finally(() => {
    submitBtn.innerText = "Submit Details";
    submitBtn.disabled = false;
  });
});