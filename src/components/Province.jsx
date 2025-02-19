import React from 'react'
import { location } from '../ultis/constant'
import ProvinceButton from './ProvinceButton'

const Province = () => {
    return (
        <div className='py-5 flex justify-center gap-3 p-2'>
            {location.map((item,index) => (
                <ProvinceButton key={index} name={item.name} image={item.image}/>
            ))}
        </div>
    )
}

export default Province