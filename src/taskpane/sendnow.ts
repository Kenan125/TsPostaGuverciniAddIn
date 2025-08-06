import axios from 'axios';

type payloadProps = {
  
  messageContent:{
    messageInput: string;    
    recipients: Array<{ 
      phoneNumber: string;
      
     }>;

  }
    
}

export async function sendNow(payload:payloadProps,sendMethod:number): Promise<void> {
  
  try {
      const response = await axios.post(
        'https://localhost:5001/WeatherForecast/start?id=1',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            sendMethod:sendMethod
          }
        }
      );
      console.log('Post created successfully!', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      }
    }
}