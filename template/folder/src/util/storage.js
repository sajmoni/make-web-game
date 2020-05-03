// TODO: Make this dynamic with mustache template
const keyPrefix = 'my-web-game'

const { localStorage } = window

const prefixKey = (key) => `${keyPrefix}.${key}`

export const save = (key, object) => {
  localStorage.setItem(prefixKey(key), JSON.stringify(object))
}

export const restore = (key) =>
  JSON.parse(localStorage.getItem(prefixKey(key)) || null)

export const remove = (key) => {
  localStorage.removeItem(prefixKey(key))
}