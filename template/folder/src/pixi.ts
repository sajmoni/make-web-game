import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import { TextStyle } from './enum'

export const sprite = (textureName: string): PIXI.Sprite => {
  const s = new PIXI.Sprite(ex.getTexture(textureName))
  s.anchor.set(0.5)
  return s
}

export const animatedSprite = (
  textureNames: readonly string[],
): PIXI.AnimatedSprite => {
  const a = new PIXI.AnimatedSprite(
    textureNames.map((textureName) => ex.getTexture(textureName)),
  )
  a.anchor.set(0.5)
  a.animationSpeed = 0.02
  a.play()
  return a
}

export const text = (string: string, textStyle?: PIXI.TextStyle): PIXI.Text => {
  const t = new PIXI.Text(string)

  t.style = textStyle ? textStyle : new PIXI.TextStyle(TextStyle.MAIN)

  ex.makeResizable(t)

  t.anchor.set(0.5)

  return t
}

export const graphics = (): PIXI.Graphics => {
  const g = new PIXI.Graphics()
  return g
}

export const container = (): PIXI.Container => {
  const c = new PIXI.Container()
  return c
}
