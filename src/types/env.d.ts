declare namespace NodeJS {
  interface ProcessEnv {
    // Environment
    NODE_ENV: 'development' | 'production' | 'test';
    
    // Application
    REACT_APP_API_URL: string;
    REACT_APP_APP_NAME: string;
    REACT_APP_VERSION: string;
    REACT_APP_DEBUG: string;
  }
}