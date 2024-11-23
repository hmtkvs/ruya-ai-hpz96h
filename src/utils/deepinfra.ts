const DEEPINFRA_API_KEY = import.meta.env.VITE_DEEPINFRA_API_KEY

export const interpretDreamWithAI = async (dreamText: string) => {
  if (!DEEPINFRA_API_KEY) {
    throw new Error('DeepInfra API anahtarı bulunamadı')
  }

  try {
    console.log('DeepInfra API isteği yapılıyor...')
    
    const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPINFRA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
        messages: [
          {
            role: 'system',
            content: 'Sen bir rüya yorumcususun ve psikoloji ve sembolizm konusunda uzmansın. Psikolojik sembolizmi, kişisel gelişim perspektiflerini ve potansiyel anlamları göz önünde bulundurarak düşünceli yorumlar sağla. Yorumları özlü ama derinlikli tut.'
          },
          {
            role: 'user',
            content: `Bu rüyayı yorumla: ${dreamText}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DeepInfra API Hatası:', errorText)
      throw new Error(`API Hatası: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('DeepInfra API Yanıtı:', data)

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Servisten yorum alınamadı')
    }

    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('DeepInfra API Hatası:', error)
    throw new Error('Rüya yorumlanamadı. Lütfen daha sonra tekrar deneyin.')
  }
}