import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((item) => item.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        amount,
        color,
        max: product.stock,
        image: product.images[0].url,
        price: product.price,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const newCart = state.cart.map((item) => {
      if (item.id === id) {
        let amount = item.amount
        if (value === 'inc') {
          amount = amount + 1
          if (amount > item.max) {
            amount = item.max
          }
        }
        if (value === 'dec') {
          amount = amount - 1
          if (amount < 1) {
            amount = 1
          }
        }
        item.amount = amount
        return item
      } else {
        return item
      }
    })
    return {
      ...state,
      cart: newCart,
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter((item) => item.id !== action.payload)
    return {
      ...state,
      cart: newCart,
    }
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_amount, total_items } = state.cart.reduce(
      (acc, current) => {
        acc.total_amount += current.price * current.amount
        acc.total_items += current.amount
        return acc
      },
      { total_amount: 0, total_items: 0 }
    )

    return {
      ...state,
      total_amount,
      total_items,
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
