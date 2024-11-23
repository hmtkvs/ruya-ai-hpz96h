import { Mail, MessageCircle, Phone, BookOpen } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="mt-2 text-purple-200">Get help with your dream interpretation journey</p>
      </header>

      <div className="grid gap-6">
        <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
          <h2 className="flex items-center text-xl font-semibold text-white">
            <MessageCircle className="mr-2 h-6 w-6" />
            FAQ
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-purple-200">How accurate are the interpretations?</h3>
              <p className="mt-1 text-purple-300">
                Our AI provides insights based on psychological symbolism and common dream themes, but interpretations should be considered as guidance rather than absolute truth.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-purple-200">Is my dream data private?</h3>
              <p className="mt-1 text-purple-300">
                Yes, your dreams are private by default. You can choose to share specific dreams publicly through the sharing feature.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
          <h2 className="flex items-center text-xl font-semibold text-white">
            <BookOpen className="mr-2 h-6 w-6" />
            Our Approach to Dream Interpretation
          </h2>
          <div className="mt-4 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-purple-200 mb-2">Psychological Analysis</h3>
              <p className="text-purple-300">
                We combine Jungian psychology with modern cognitive science to analyze dream symbols and patterns. Our AI considers personal context, universal archetypes, and emotional resonance to provide meaningful interpretations.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-purple-200 mb-2">Scientific Foundation</h3>
              <p className="text-purple-300">
                Our dream analysis is grounded in contemporary sleep science and neuroscience research. We incorporate findings about REM sleep, memory consolidation, and emotional processing to enhance interpretation accuracy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-purple-200 mb-2">Cultural Context</h3>
              <p className="text-purple-300">
                Dreams are influenced by cultural background and personal experiences. Our system recognizes diverse cultural symbols and their varying interpretations across different societies and traditions.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-purple-200 mb-2">AI-Enhanced Analysis</h3>
              <p className="text-purple-300">
                Using advanced natural language processing and machine learning, we analyze dream narratives to identify patterns, symbols, and emotional themes. This technology allows for deeper, more nuanced interpretations while maintaining personal relevance.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-purple-200 mb-2">Privacy and Security</h3>
              <p className="text-purple-300">
                We employ end-to-end encryption and strict data protection measures to ensure your dream narratives remain private and secure. Your personal dream journal is protected with industry-standard security protocols.
              </p>
            </section>
          </div>
        </div>

        <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
          <h2 className="flex items-center text-xl font-semibold text-white">
            <Phone className="mr-2 h-6 w-6" />
            Contact Us
          </h2>
          <div className="mt-4 space-y-4">
            <a
              href="mailto:support@dreaminterpreter.com"
              className="flex items-center text-purple-200 hover:text-purple-100"
            >
              <Mail className="mr-2 h-5 w-5" />
              support@dreaminterpreter.com
            </a>
            <p className="text-purple-300">
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}