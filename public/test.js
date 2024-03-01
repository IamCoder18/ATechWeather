const response = await axios.post(
    'https://chatgpt-api.shn.hk/v1/',
    {
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'system',
          'content': 'You are a helpful assistant.'
        },
        {
          'role': 'user',
          'content': 'Hello!'
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then((r)=>{console.log(r)});