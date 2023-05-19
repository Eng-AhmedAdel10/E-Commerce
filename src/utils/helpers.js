export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
}

export const getUniqueValues = (products, type) => {
  let data = products.map((product) => product[type])

  if (type === 'colors') {
    data = data.flat()
  }

  return ['all', ...new Set(data)]
}
