// Import the required modules from electron
const { app, BrowserWindow, ipcMain } = require('electron/main');
require('dotenv').config();
const path = require('path');
const pool = require('./db');

// Function to create the main application window
const createWindow = () => {
  // Create a new BrowserWindow instance with specified width and height
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // Load the application's main HTML file into the window
  win.loadFile('index.html')
};

// Handle IPC request to get up to 10 rows from the 'raw_data' table
ipcMain.handle('get-rows', async () => {
  try {
    const res = await pool.query('SELECT * FROM raw_data LIMIT 10');
    return res.rows;
  } catch (error) {
    console.error('Database error in get-rows:', error);
    throw error; // This will be caught by the renderer's .catch() handler
  }
});

// Run this block when Electron has finished initialization
app.whenReady().then(() => {
  createWindow()

  // On macOS, re-create a window when the dock icon is clicked and there are no open windows
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit the application when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})