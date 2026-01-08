import * as sessions from './web_utils/sessions.js'

// Use the exposed electronAPI from preload.js
window.electronAPI.invoke('get-rows').then(rows => {
  const testDiv = document.getElementById('test');
  const textarea = testDiv.querySelector('textarea');
  if (textarea) {
    textarea.value = JSON.stringify(rows, null, 2);
  }



}).catch(error => {
  console.error('Error fetching rows:', error);
});