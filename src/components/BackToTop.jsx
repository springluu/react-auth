import React, { useState } from 'react'
import { ReactComponent as Scroll } from '../assets/svgs/icon_scroll.svg'

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop
    setIsVisible(scrollTop > 0)
  }

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', handleScroll)

  return (
    <button className={`btn btn-back-to-top ${isVisible ? 'visible' : ''}`} onClick={handleClick}>
      <Scroll/>
    </button>
  )
}

export {BackToTop}