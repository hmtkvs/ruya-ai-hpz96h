import { useEffect, useRef } from 'react'
import { Howl } from 'howler'

const AUDIO_FILES = {
  ambient: 'https://res.cloudinary.com/dviyuiqic/video/upload/v1732387358/ambient_akrmlv.mp3',
  click: 'https://res.cloudinary.com/dviyuiqic/video/upload/v1732387358/click_miw3lp.mp3',
  success: 'https://res.cloudinary.com/dviyuiqic/video/upload/v1732387358/success_ttukti.mp3',
  notification: 'https://res.cloudinary.com/dviyuiqic/video/upload/v1732387358/notification_jifswc.mp3'
}

export function useAudio() {
  const audioEnabled = useRef(false)
  const ambientSound = useRef<Howl | null>(null)
  const effects = useRef<Record<string, Howl>>({})

  useEffect(() => {
    // Initialize sound effects
    effects.current = {
      click: new Howl({ src: [AUDIO_FILES.click], volume: 0.3 }),
      success: new Howl({ src: [AUDIO_FILES.success], volume: 0.4 }),
      notification: new Howl({ src: [AUDIO_FILES.notification], volume: 0.4 })
    }

    // Initialize ambient sound
    ambientSound.current = new Howl({
      src: [AUDIO_FILES.ambient],
      loop: true,
      volume: 0.1
    })

    return () => {
      // Cleanup
      Object.values(effects.current).forEach(sound => sound.unload())
      if (ambientSound.current) {
        ambientSound.current.unload()
      }
    }
  }, [])

  const toggleAudio = () => {
    audioEnabled.current = !audioEnabled.current
    if (audioEnabled.current && ambientSound.current) {
      ambientSound.current.play()
    } else if (ambientSound.current) {
      ambientSound.current.pause()
    }
  }

  const playEffect = (effect: keyof typeof AUDIO_FILES) => {
    if (audioEnabled.current && effects.current[effect]) {
      effects.current[effect].play()
    }
  }

  return {
    audioEnabled: audioEnabled.current,
    toggleAudio,
    playEffect
  }
}