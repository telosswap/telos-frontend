import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  const { fill, ...otherProps } = props
  return (
    <Svg
      viewBox="0 0 114 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
      style={{ ...otherProps.style, fill: 'none' }}
    >
      <circle cx="57" cy="57" r="57" fill="url(#paint0_linear_qwe)" />
      <g filter="url(#filter0_i_qwe)">
        <circle cx="57" cy="57" r="57" fill="url(#paint1_linear_qwe)" />
      </g>
      <circle cx="57" cy="57" r="56.4062" stroke="url(#paint2_linear_qwe)" strokeOpacity="0.12" strokeWidth="1.1875" />
      <g filter="url(#filter1_di_qwe)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M78.1902 29.5337C78.432 28.9047 77.9953 28.2215 77.323 28.1769L65.9858 27.425C65.6353 27.4018 65.2984 27.5641 65.0981 27.8526L62.0942 32.1799C61.9062 32.4508 61.5966 32.6116 61.2669 32.6097L41.3099 32.4919C40.3307 32.4861 39.3835 32.8397 38.6476 33.4856L33.1104 38.3457C31.8784 39.427 31.4309 41.1507 31.9812 42.6948L34.6187 50.0948C34.6322 50.133 34.6258 50.1754 34.6014 50.2077V50.2077C33.1195 52.1776 32.258 54.5443 32.1266 57.0059L32.0819 57.8444C31.8028 63.0749 32.4187 68.3138 33.9037 73.337C35.1274 77.4764 36.5298 82.2203 37.3894 85.128C37.8429 86.6621 39.4098 87.5672 40.9653 87.1936C44.3144 86.3893 50.0664 85.0074 54.5963 83.9167C58.5798 82.9575 62.3674 81.3222 65.8017 79.0873L67.9506 77.6889C70.0167 76.3444 71.6355 74.4149 72.6006 72.1465V72.1465C72.6164 72.1093 72.6499 72.0825 72.6897 72.0752L80.4171 70.6592C82.0295 70.3638 83.2984 69.1144 83.6189 67.5068L85.0593 60.2814C85.2508 59.3211 85.0833 58.324 84.5887 57.4789L75.2139 41.4603C74.5997 40.4109 74.4962 39.139 74.9327 38.0041L78.1902 29.5337Z"
          stroke="white"
          strokeWidth="5.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_qwe"
          x="-9.5"
          y="0"
          width="123.5"
          height="114"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-14.25" />
          <feGaussianBlur stdDeviation="4.75" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.682353 0 0 0 0 0.45098 0 0 0 0 0.980392 0 0 0 0.56 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter
          id="filter1_di_qwe"
          x="28.0378"
          y="24.1923"
          width="60.8097"
          height="67.2773"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.480491" />
          <feGaussianBlur stdDeviation="0.480491" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.480491" />
          <feGaussianBlur stdDeviation="0.480491" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
        <linearGradient id="paint0_linear_qwe" x1="57" y1="0" x2="57" y2="114" gradientUnits="userSpaceOnUse">
          <stop stopColor="#130C3F" />
          <stop offset="1" stopColor="#15197B" />
        </linearGradient>
        <linearGradient id="paint1_linear_qwe" x1="0" y1="57" x2="114" y2="57" gradientUnits="userSpaceOnUse">
          <stop stop-color="#AE73FA" />
          <stop offset="1" stopColor="#AE73FA" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_qwe"
          x1="114"
          y1="57"
          x2="-1.66555e-06"
          y2="57"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#AE73FA" />
          <stop offset="1" stopColor="#AE73FA" stopOpacity="0" />
        </linearGradient>
      </defs>
    </Svg>
  )
}

export default Icon
