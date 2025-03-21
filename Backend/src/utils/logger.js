const log = (message, level = "info") => {
    const timestamp = new Date().toISOString();
    console.log(`[${level.toUpperCase()}] ${timestamp}: ${message}`);
  };
  
  export default log;
  