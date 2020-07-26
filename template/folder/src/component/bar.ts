import * as PIXI from 'pixi.js'

const HEIGHT = 7

type render = (value: number) => void

type arguments = {
  readonly initialValue?: number
  readonly onColor?: string
  readonly offColor?: string
  readonly backgroundColor?: string
  readonly width?: number
}

const bar = ({
  initialValue = 1,
  onColor = '#ff0000',
  offColor = '#ff00ff',
  backgroundColor = '#000000',
  width = 100,
}: arguments = {}): [PIXI.Container, render] => {
  const component = new PIXI.Graphics()

  const paddedWidth = width + 2

  const BAR_X = -(paddedWidth / 2)

  const render = (value) => {
    component.clear()
    component.beginFill(PIXI.utils.string2hex(backgroundColor))
    component.drawRect(BAR_X, 0, paddedWidth, HEIGHT + 2)

    component.beginFill(PIXI.utils.string2hex(offColor))
    component.drawRect(BAR_X + 1, 1, width, HEIGHT)

    component.beginFill(PIXI.utils.string2hex(onColor))
    const valueWidth = Math.max(Math.floor(width * value), 0)
    component.drawRect(BAR_X + 1, 1, valueWidth, HEIGHT)
  }

  render(initialValue)

  return [component, render]
}

export default bar
