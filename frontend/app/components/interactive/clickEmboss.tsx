'use client'

import {useEffect} from 'react'

const svgShapes = [
  // Circle
  (color: string) => `
    <svg width="99" height="100" viewBox="0 0 99 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_dig_66_2)">
            <path d="M49.2002 0.200195C76.2621 0.200195 98.2002 22.1382 98.2002 49.2002C98.2002 76.2621 76.2621 98.2002 49.2002 98.2002C22.1382 98.2002 0.200195 76.2621 0.200195 49.2002C0.200195 22.1382 22.1382 0.200195 49.2002 0.200195ZM49.2002 3.7002C24.0712 3.7002 3.7002 24.0712 3.7002 49.2002C3.7002 74.3292 24.0712 94.7002 49.2002 94.7002C74.3292 94.7002 94.7002 74.3292 94.7002 49.2002C94.7002 24.0712 74.3292 3.7002 49.2002 3.7002ZM49.2002 6.7002C72.6723 6.7002 91.7002 25.7281 91.7002 49.2002C91.7002 72.6723 72.6723 91.7002 49.2002 91.7002C25.7281 91.7002 6.7002 72.6723 6.7002 49.2002C6.7002 25.7281 25.7281 6.7002 49.2002 6.7002ZM49.2002 7.7002C26.2804 7.7002 7.7002 26.2804 7.7002 49.2002C7.7002 72.12 26.2804 90.7002 49.2002 90.7002C72.12 90.7002 90.7002 72.12 90.7002 49.2002C90.7002 26.2804 72.12 7.7002 49.2002 7.7002ZM35.9023 32.7002C37.9075 32.7002 39.6932 33.0763 41.2598 33.8281C42.8578 34.5801 44.0963 35.6302 44.9736 36.9775C45.8508 38.3247 46.2891 39.8288 46.2891 41.4893C46.289 43.4945 45.6624 45.1237 44.4092 46.377C43.1559 47.5989 41.7143 48.4761 40.085 49.0088C39.7661 49.1088 39.4447 49.1998 39.1221 49.2861C39.6846 49.4081 40.2409 49.5491 40.79 49.7139C42.7014 50.2465 44.3469 51.1713 45.7256 52.4873C47.1354 53.7719 47.8398 55.5109 47.8398 57.7041C47.8398 59.6154 47.323 61.2289 46.2891 62.5449C45.2551 63.8608 43.861 64.8634 42.1064 65.5527C40.3831 66.2107 38.4714 66.54 36.3721 66.54L18.7002 66.54L18.7002 65.7881C19.4522 65.6314 20.0788 65.4274 20.5801 65.1768C21.1127 64.9261 21.5518 64.5035 21.8965 63.9082C22.2725 63.2816 22.46 62.4354 22.46 61.3701V37.8701C22.46 36.8048 22.2725 35.9742 21.8965 35.3789C21.5518 34.7523 21.1127 34.3141 20.5801 34.0635C20.0788 33.8128 19.4677 33.6088 18.7471 33.4521L18.7002 33.4521L18.7002 32.7002H35.9023ZM65.5518 32.7002C67.651 32.7002 69.4997 33.0606 71.0977 33.7812C72.6955 34.5019 73.9488 35.5201 74.8574 36.8359C75.7661 38.1519 76.2207 39.7033 76.2207 41.4893C76.2207 43.4317 75.7348 45.0766 74.7637 46.4238C73.7924 47.7398 72.4604 48.7423 70.7686 49.4316C70.2871 49.6224 69.7894 49.7832 69.2764 49.916L76.9258 61.9814C77.7403 63.2032 78.5079 64.0807 79.2285 64.6133C79.9491 65.1459 80.6856 65.5219 81.4375 65.7412L81.625 65.7881L81.625 66.54L71.8027 66.54L62.375 50.8887L59.3945 50.8887V61.3701C59.3945 62.4354 59.5665 63.2816 59.9111 63.9082C60.2558 64.5035 60.6949 64.9261 61.2275 65.1768C61.7602 65.4274 62.4024 65.6314 63.1543 65.7881V66.54H48.3965L48.3965 65.7881C49.1485 65.6314 49.775 65.4274 50.2764 65.1768C50.809 64.9261 51.2481 64.5035 51.5928 63.9082C51.9688 63.2816 52.1562 62.4354 52.1562 61.3701V37.8701C52.1562 36.8048 51.9688 35.9742 51.5928 35.3789C51.2481 34.7523 50.809 34.3141 50.2764 34.0635C49.775 33.8128 49.164 33.6088 48.4434 33.4521L48.3965 33.4521V32.7002L65.5518 32.7002ZM29.7451 64.9893H34.0693C36.2626 64.9892 37.8762 64.3937 38.9102 63.2031C39.9755 62.0125 40.5078 60.1638 40.5078 57.6572C40.5078 55.276 39.9288 53.4584 38.7695 52.2051C37.6102 50.9518 35.9491 50.3252 33.7871 50.3252L29.7451 50.3252L29.7451 64.9893ZM59.3945 49.291H63.4834C65.1754 49.291 66.4761 48.6333 67.3848 47.3174C68.3247 45.9701 68.7949 44.1525 68.7949 41.8652C68.7949 39.5781 68.3091 37.7293 67.3379 36.3193C66.3666 34.9093 64.9405 34.2041 63.0605 34.2041L59.3945 34.2041L59.3945 49.291ZM29.7451 48.4453L33.6934 48.4453C35.4793 48.4453 36.7956 47.8187 37.6416 46.5654C38.5189 45.3121 38.957 43.6199 38.957 41.4893C38.957 39.2646 38.5024 37.5102 37.5938 36.2256C36.7165 34.9097 35.3698 34.2511 33.5527 34.251H29.7451L29.7451 48.4453Z" fill="#FBFBF7" style="fill:#FBFBF7;fill:color(display-p3 0.9863 0.9832 0.9677);fill-opacity:1;"/>
        </g>
        <defs>
            <filter id="filter0_dig_66_2" x="0.00019531" y="0.00019531" width="98.4" height="99.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
                <feBlend mode="hard-light" in2="BackgroundImageFix" result="effect1_dropShadow_66_2"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_66_2" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.78525 0 0 0 0 0.78525 0 0 0 0 0.78525 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_66_2"/>
                <feTurbulence type="fractalNoise" baseFrequency="1 1" numOctaves="3" seed="1386" />
                <feDisplacementMap in="effect2_innerShadow_66_2" scale="0.40000000596046448" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                <feMerge result="effect3_texture_66_2">
                <feMergeNode in="displacedImage"/>
                </feMerge>
            </filter>
        </defs>
    </svg>
  `,
]

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

export default function ClickEmboss() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Don't fire on links
      const target = event.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('p') ||
        target.closest('h1') ||
        target.closest('h2') ||
        target.closest('h3') ||
        target.closest('h4') ||
        target.closest('h5') ||
        target.closest('h6')
      ) {
        return
      }

      const x = event.clientX
      const y = event.clientY

      // Pick random shape and color
      const randomShape = svgShapes[Math.floor(Math.random() * svgShapes.length)]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      // Create container div for the SVG
      const shapeContainer = document.createElement('div')
      shapeContainer.className = 'bg-secondary rounded-full'
      shapeContainer.style.position = 'fixed'
      shapeContainer.style.left = `${x - 50}px` // Center the 40px shape
      shapeContainer.style.top = `${y - 50}px`
      shapeContainer.style.pointerEvents = 'none'
      shapeContainer.style.zIndex = '0'
      shapeContainer.innerHTML = randomShape(randomColor)

      document.body.appendChild(shapeContainer)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return null
}
