// Import the required modules from electron
const { app, BrowserWindow } = require('electron/main')

// Function to create the main application window
const createWindow = () => {
  // Create a new BrowserWindow instance with specified width and height
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // Load the application's main HTML file into the window
  win.loadFile('index.html')
}

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