let ConfigSite = {};

// Development
if (process.env.NODE_ENV !== 'production') {
  ConfigSite = {
    SERVICE_URL: 'http://localhost:8000/api',
    APP_URL: 'http://localhost:3001',
    TIME_DISPLAY_MESSAGES: 5,
    ENTERPRISE_NAME: {
      PART_1: 'PHARMACY',
      PART_2: 'SYSTEM'
    }
  };
}
// Production
else {
  ConfigSite = {
    SERVICE_URL: 'https://darkslategray-lion-273794.hostingersite.com/api',
    APP_URL: 'https://web-pharmacy.miquna.com',
    TIME_DISPLAY_MESSAGES: 5,
    ENTERPRISE_NAME: {
      PART_1: 'PHARMACY',
      PART_2: 'SYSTEM'
    }
  };
}

export default ConfigSite;