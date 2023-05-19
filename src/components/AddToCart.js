import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  const { colors, stock, id } = product

  const { addToCart } = useCartContext()

  const [aboutProduct, setAboutProduct] = useState({
    color: colors[0],
    amount: 1,
  })

  const increase = () => {
    let newAmount = aboutProduct.amount + 1
    if (newAmount > stock) {
      newAmount = stock
    }
    setAboutProduct({ ...aboutProduct, amount: newAmount })
  }

  const decrease = () => {
    let newAmount = aboutProduct.amount - 1
    if (newAmount < 1) {
      newAmount = 1
    }
    setAboutProduct({ ...aboutProduct, amount: newAmount })
  }

  return (
    <Wrapper>
      <div className='colors'>
        <span>colors : </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setAboutProduct({ ...aboutProduct, color })
                }}
                className={`${
                  aboutProduct.color === color
                    ? 'color-btn active'
                    : 'color-btn'
                }`}
                style={{ background: color }}
              >
                {aboutProduct.color === color ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButtons
          amount={aboutProduct.amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          className='btn'
          to='/cart'
          onClick={() =>
            addToCart(id, aboutProduct.color, aboutProduct.amount, product)
          }
        >
          add to card
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
