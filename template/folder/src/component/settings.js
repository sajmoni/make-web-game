import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import { t } from '@lingui/macro'

import state from '../state'
import { Render, Language, TextStyle } from '../constant'
import select from './select'
import { save } from '../util/storage'
import { getSoundVolume, getMusicVolume } from '../selector'
import i18n from '../i18n'
import { slider } from '.'
import Sound from '../sound'
import * as prism from '../util/prism'
import app from '../app'
import button from './button'
import { fadeIn, fadeOut } from '../effect'

const MAX_VOLUME = 10
const MIN_VOLUME = 0

const SOUND_Y = 200
const BUTTONS_Y = 520

const width = Render.GAME_WIDTH * 0.6
const height = Render.GAME_HEIGHT * 0.8

const LEFT_COLUMN = (width / 4) * 1
const CENTER_COLUMN = (width / 4) * 2
const RIGHT_COLUMN = (width / 4) * 3

// TODO: Skinable for different games
// TODO: Overlay that closes the menu
// TODO: Wipe all stored data - with confirm dialog
// Add "Warning - Data is only stored in your browser, if you
// erase your browser history, all data will be lost."

export default () => {
  const component = new PIXI.Container()
  component.zIndex = 10
  component.visible = false

  component.interactive = true
  component.position.set(Render.GAME_WIDTH / 2, Render.GAME_HEIGHT / 2)
  component.width = width
  component.height = height
  component.pivot.set(CENTER_COLUMN, height / 2)

  const background = new PIXI.Graphics()
  background
    .beginFill(ex.fromHex('#aaaaaa'))
    .drawRect(0, 0, width, height)
    .endFill()
    .lineStyle({ color: ex.fromHex('#ff00ff'), width: 2 })
    .moveTo(CENTER_COLUMN, 0)
    .lineTo(CENTER_COLUMN, height)
  component.addChild(background)

  const title = new PIXI.Text(
    i18n._(t('settings.settings')`Settings`),
    TextStyle.MAIN,
  )
  title.anchor.set(0.5)
  title.position.set(width / 2, 50)
  component.addChild(title)

  const [soundSlider, renderSoundSlider] = makeVolumeSlider({
    x: LEFT_COLUMN,
    y: SOUND_Y,
    volume: getSoundVolume(state),
    label: t('settings.sound')`Sound`,
    onMinus: () => {
      const currentVolume = getSoundVolume(state)
      state.application.volume.sound = Math.max(currentVolume - 1, MIN_VOLUME)
      Sound.SWORD_01.play()
    },
    onPlus: () => {
      const currentVolume = getSoundVolume(state)
      state.application.volume.sound = Math.min(currentVolume + 1, MAX_VOLUME)
      Sound.SWORD_01.play()
    },
  })
  component.addChild(soundSlider)

  const [musicSlider, renderMusicSlider] = makeVolumeSlider({
    volume: getMusicVolume(state),
    x: LEFT_COLUMN,
    y: SOUND_Y + 100,
    label: t('settings.music')`Music`,
    onMinus: () => {
      const currentVolume = getMusicVolume(state)
      state.application.volume.music = Math.max(currentVolume - 1, MIN_VOLUME)
      // Sound.SWORD_01.play()
    },
    onPlus: () => {
      const currentVolume = getMusicVolume(state)
      state.application.volume.music = Math.min(currentVolume + 1, MAX_VOLUME)
      // Sound.SWORD_01.play()
    },
  })
  component.addChild(soundSlider)
  component.addChild(musicSlider)

  const [languagePicker, renderLanguagePicker] = select({
    languages: Object.values(Language),
    onClick: (languageCode) => {
      save('language', languageCode)
      window.location.reload()
    },
  })

  renderLanguagePicker(state.application.language)
  languagePicker.position.set(RIGHT_COLUMN, SOUND_Y)
  component.addChild(languagePicker)

  prism.subscribe(['application.volume.sound'], (state) => {
    const newVolume = getSoundVolume(state)
    renderSoundSlider(newVolume)
  })
  prism.subscribe(['application.volume.music'], (state) => {
    const newVolume = getMusicVolume(state)
    renderMusicSlider(newVolume)
  })

  const [doneButton] = button({
    textStyle: TextStyle.MAIN,
    label: i18n._(t('settings.done')`Done`),
    onClick: () => {
      state.application.settingsVisible = false
    },
  })
  doneButton.position.set(CENTER_COLUMN, BUTTONS_Y)
  component.addChild(doneButton)

  app.stage.addChild(component)

  const render = (visible) => {
    if (visible) {
      component.visible = visible
      fadeIn(component, { duration: 15 })
    } else if (visible !== component.visible) {
      fadeOut(component, { resolveAt: 0.6, duration: 30 }).then(() => {
        component.visible = visible
      })
    }
  }

  return [component, render]
}

const makeVolumeSlider = ({ x, y, volume, onMinus, onPlus, label }) => {
  const container = new PIXI.Container()

  container.position.set(x, y)

  const text = new PIXI.Text(i18n._(label), TextStyle.MAIN)
  text.anchor.set(0.5)
  text.position.set(0, -40)
  container.addChild(text)

  const [volumeSlider, volumeSliderRender] = slider({
    initialValue: volume,
    onMinus,
    onPlus,
  })

  container.addChild(volumeSlider)

  return [container, volumeSliderRender]
}