import React, {memo} from 'react'
import { text } from '../ultis/dataIntro'
import icons from '../ultis/icons'
import {Button} from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultis/Common/fomatVietNameseToString'

const {FaStar} = icons 
const Intro = () => {
  const {categories} = useSelector(state => state.app)
  return (
    <div className='border border-red-500 w-4/5 gap-4 bg-white rounded-md p-4 flex flex-col justify-center items-center'>
      <h3 className='font-semibold text-lg'>{text.title}</h3>
      <p className='text-gray-600 text-center my-4'>
        {text.description} 
        <span>
          {categories?.response?.map((item,index) => (
            <Link key={index} to={formatVietnameseToString(item.value)} className='font-semibold hover:text-orange-500 text-blue-600'>{item.value}, </Link>
          ))}
        </span>
        {text.description2}
      </p>
      <div className='flex items-center justify-around w-full'> 
        {text.statistical?.map((item,index) => {
          return (
            <div className='flex flex-col justify-center items-center' key={index}>
                <h4 className='font-semibold text-lg'>{item.value}</h4>
                <p className='text-gray-600'>{item.name}</p>
            </div>
          )
        })}
      </div>
      <h3 className='font-semibold text-lg p-2'>{text.price}</h3>
      <div className='flex gap-2'>
        <FaStar className='text-yellow-400' />
        <FaStar className='text-yellow-400' />
        <FaStar className='text-yellow-400' />
        <FaStar className='text-yellow-400' />
        <FaStar className='text-yellow-400' />
      </div>
      <p className='text-gray-600 italic text-center'>{text.comment}</p>
      <span className='text-gray-600'>{text.author}</span>
      <h3 className='font-semibold text-lg p-2'>{text.question}</h3>
      <p className='text-gray-600'>{text.answer}</p>
      <Button text={'Đăng ký ngay'} bgColor='bg-secondary2' textColor='text-white'>Tin đăng ngay</Button>
    </div>
  )
}

export default memo(Intro)