// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer } = require('electron');

ipcRenderer.on('python-data', (event, data) => {
  console.log(data);
  // do something with the data...
});