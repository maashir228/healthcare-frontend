import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:5000/translate';

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(apiEndpoint, {
      text: text,
      target_language: targetLanguage
    });

    //console.log('Translation API response:', response.data);

    if (response.data && response.data.translated_text) {
      return response.data.translated_text.trim();
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Translation error:', error.response ? error.response.data : error.message);
    return 'Translation failed';
  }
};

// Function to test if the API key and API are working
export const testAPI = async () => {
  try {
    const response = await translateText("Hello, how are you?", "es");
    //console.log("API is working. Response received:");
    console.log(response);
  } catch (error) {
    console.error("Error: API is not working.");
    console.error(error.response ? error.response.data : error.message);
  }
};