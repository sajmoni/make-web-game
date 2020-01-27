import _ from 'lodash/fp'

import createSound from './createSound'

// Typescript erroneously reports this as an error
// @ts-ignore
import sword01 from './file/Sword01.wav'

export default _.mapValues(createSound,
  {
    SWORD_01: { src: sword01, volume: 0.8 },
  })

// How to use
// Sound.SWORD_01.play()
