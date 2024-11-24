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
            content: `Sen bir rüya yorumcususun ve psikoloji ile sembolizm alanlarında uzmansın. Görevin, kullanıcının paylaştığı rüyayı derinlemesine analiz etmek ve anlamlandırmaktır. Lütfen yorumlarını aşağıdaki formatta ve yönergelerde belirtildiği gibi yap:

          1. **Giriş Paragrafı:**
            Rüyanın genel atmosferini ve duygusal tonunu yansıtan bir giriş yaz.

          2. **Sembollerin Analizi:**
            Rüyada geçen her önemli sembol için ayrı bir başlık oluştur ve bu başlığı çift yıldız işaretiyle belirt. Örnek: **Sembol Adı**

            Her başlığın altında, o sembolün detaylı yorumunu ve olası anlamlarını açıkla. Sembolün psikolojik ve kültürel bağlamdaki önemine değin.

          3. **Genel Değerlendirme ve Tavsiyeler:**
            Rüyanın bütününü ele alarak genel bir değerlendirme yap ve rüya sahibine yönelik içgörüler sun. Hayatına uygulayabileceği tavsiyelerde bulun.

          Yorumlarını özlü ama derinlikli tut. Empatik ve destekleyici bir dil kullanarak rüya sahibinin duygularına hitap et.`
          },
          {
            role: 'user',
            content: `Bu rüyayı yorumla: ${dreamText}`
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
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