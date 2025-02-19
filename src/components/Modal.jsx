import React,{ memo, useState, useEffect } from 'react'
import icons from '../ultis/icons'
import { getNumbersPrice,getNumbersArea } from '../ultis/Common/getNumbers'
const { GrPrevious } = icons

const Modal = ({setIsShowModal,content,name,handleSubmit,queries,arrMinMax,defaultText}) => {
    let dfvalue1 = 0
    let dfvalue2 = 100
    if(name === 'price' && arrMinMax?.priceArr?.length > 0) {
        dfvalue1 = arrMinMax.priceArr[0]
        dfvalue2 = arrMinMax.priceArr[1]
    } else if(name === 'area' && arrMinMax?.areaArr?.length > 0) {
        dfvalue1 = arrMinMax.areaArr[0]
        dfvalue2 = arrMinMax.areaArr[1]
    }
    const [persent1, setPersent1] = useState(dfvalue1)
    const [persent2, setPersent2] = useState(dfvalue2)
    const [activedEl,setActivedEl] = useState('')
    useEffect(() => {
        const activeTrackEl = document.getElementById('track-active')
        if(activeTrackEl) {
            if(persent2 <= persent1 ) {
                activeTrackEl.style.left = `${persent2}%`
                activeTrackEl.style.right = `${100-persent1}%`
            }else {
                activeTrackEl.style.left = `${persent1}%`
                activeTrackEl.style.right = `${100-persent2}%`
            }
        }
    },[persent1,persent2])

    const handleClickTrack = (e,value) => {
        e.stopPropagation()
        const stackEl= document.getElementById('track')
        const stackRect = stackEl.getBoundingClientRect()
        let percent = value ? value : Math.round((e.clientX - stackRect.left)*100/stackRect.width)
        if( Math.abs(percent - persent1) <= (Math.abs(percent - persent2))) {
            setPersent1(percent)
        } else {
            setPersent2(percent)
        }
    }

    const convert100toTarget = percent =>  {
        return name === 'price' 
        ? (Math.ceil(Math.round((percent * 1.5)) / 5 ) * 5 ) / 10 
        : name === 'area' 
            ? (Math.ceil(Math.round((percent *0.9)) / 5 ) * 5 ) 
            : 0
    }
    const convertto100 = percent =>  {
        let target = name === 'price' ? 15 : name === 'area' ? 90 : 1
        return Math.floor((percent/target)*100)
    }
    const handleActive = (code,value) => {
        setActivedEl(code)
        let arrMaxMin = name === 'area' ? getNumbersArea(value) : getNumbersPrice(value)
        if(arrMaxMin.length === 1) {
            if(arrMaxMin[0] === 1) {
                setPersent1(0)
                setPersent2(convertto100(1))
            }
            if(arrMaxMin[0] === 20) {
                setPersent1(0)
                setPersent2(convertto100(20))
            }
            if(arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPersent1(100)
                setPersent2(100)
            }
        } 
        if(arrMaxMin.length === 2 ) {
            setPersent1(convertto100(arrMaxMin[0]))
            setPersent2(convertto100(arrMaxMin[1]))
        }
    }

    const handleBeforeSubmit = (e) => {
        let min = persent1 < persent2 ? persent1 : persent2
        let max = persent1 < persent2 ? persent2 : persent1
        let arrMinMax = [convert100toTarget(min),convert100toTarget(max)]
        let string = ((convert100toTarget(persent1) === 90) || (convert100toTarget(persent1) === 15)) ? `Trên ${convert100toTarget(persent1)}${name === 'price' ? 'tr' : 'm2'}` : `${convert100toTarget(min)}${name === 'price' ? 'tr' : 'm2'} - ${convert100toTarget(max)}${name === 'price' ? 'tr' : 'm2'}`
        handleSubmit(e,{
            [`${name}Number`]: arrMinMax,
            [name]: string
        },{[`${name}Arr`]: [min,max]})
    }

    return (
        <div onClick={() => {setIsShowModal(false)}} className='fixed top-0 left-0 right-0 bottom-0 z-20 bg-overlay30 flex justify-center items-center'>
            <div 
                onClick={(e) =>{
                    e.stopPropagation()
                    setIsShowModal(true)
                }} 
                className='md:w-2/5 w-full bg-white rounded-md h-[370px] relative m-2 md:m-0'>
                <div className='h-[45px] flex items-center px-4 border-b border-gray-200'>
                    <span className='hover:text-red-500 cursor-pointer'
                        onClick={(e) =>{
                            e.stopPropagation()
                            setIsShowModal(false)
                        }}
                    ><GrPrevious size={24}/></span>
                </div>
                {/* {(name === 'category' || name === 'province') && <div className='p-4 flex flex-col'>
                    <span className='py-2 flex gap-2 items-center border-b border-gray-200' >
                            <input defaultChecked={!queries[`${name}Code`] ? true : false}
                                type='radio' id='default' name={name} value={defaultText || ''} onClick={(e) => handleSubmit(e,{[name]: defaultText,[`${name}Code`]: null})}/>
                            <label htmlFor='default' >{defaultText}</label>
                    </span>
                    {content.map(((item,index) => (
                        <span className='py-2 flex gap-2 items-center border-b border-gray-200' key={index}>
                            <input defaultChecked={item.code === queries[`${name}Code`] ? true : false}
                                type='radio' id={item.code} name={name} value={item.code} onClick={(e) => handleSubmit(e,{[name]: item.value,[`${name}Code`]: item.code})}/>
                            <label htmlFor={item.code} >{item.value}</label>
                        </span>
                    )))}
                </div>} */}
                {(name === 'category' || name === 'province') && (
                    <div className="p-4 flex flex-col max-h-80 overflow-y-auto">
                        <span className="py-2 flex gap-2 items-center border-b border-gray-200">
                        <input
                            defaultChecked={!queries[`${name}Code`] ? true : false}
                            type="radio"
                            id="default"
                            name={name}
                            value={defaultText || ""}
                            onClick={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                        />
                        <label htmlFor="default">{defaultText}</label>
                        </span>
                        {content.map((item, index) => (
                        <span className="py-2 flex gap-2 items-center border-b border-gray-200" key={index}>
                            <input
                            defaultChecked={item.code === queries[`${name}Code`] ? true : false}
                            type="radio"
                            id={item.code}
                            name={name}
                            value={item.code}
                            onClick={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })}
                            />
                            <label htmlFor={item.code}>{item.value}</label>
                        </span>
                        ))}
                    </div>
                )}

                {(name === 'price' || name === 'area') && <div className={`px-8 py-12 ${name === 'price' ? 'h-[320px]' : 'h-[280px]'}`}>
                    <div className='flex items-center justify-center flex-col relative'>
                        <div className='z-30 absolute top-[-40px] text-orange-600 font-semibold'>
                            {(persent1 === 100 && persent2 === 100) ? `Trên ${convert100toTarget(persent1)} ${name === 'price' ? 'triệu' : 'm2'} +` 
                                : `Từ ${persent1 >= persent2 ? convert100toTarget(persent2): convert100toTarget(persent1)} - ${persent2 >= persent1 ? convert100toTarget(persent2) : convert100toTarget(persent1)} ${name === 'price' ? 'triệu' : 'm2'} +`
                            }
                        </div>
                        <div onClick={handleClickTrack} id='track' className='slider-track md:h-[5px] bg-gray-300 w-full absolute top-0 bottom-0'></div>
                        <div onClick={handleClickTrack} id='track-active' className='slider-track-active h-[5px] bg-orange-600 absolute top-0 bottom-0'></div>
                        <input type="range" max='100' min='0' step='5' className='w-full appearance-none pointer-events-none absolute top-0 bottom-0' value={persent1} 
                            onChange={(e) => {
                                setPersent1(+e.target.value)
                                activedEl && setActivedEl('')
                            }}
                        />
                        <input type="range" max='100' min='0' step='5' className='w-full appearance-none pointer-events-none absolute top-0 bottom-0' value={persent2}
                            onChange={(e) => {
                                setPersent2(+e.target.value)
                                activedEl && setActivedEl('')
                            }}
                        />
                        <div className='absolute top-6 left-0 right-0 flex justify-between items-center px-2'>
                            <span className='cursor-pointer' onClick={(e) => {
                                e.stopPropagation()
                                handleClickTrack(e,0)
                            }}>0</span>
                            <span className='cursor-pointer' onClick={(e) => {
                                e.stopPropagation()
                                handleClickTrack(e,100)
                            }}>
                                {name === "price" ? "15tr" : name === "area" ? "Trên 90m2" : ""}
                            </span>
                        </div>
                    </div>
                    <div className='mt-14 flex gap-1 items-center flex-wrap w-full'>
                        <h3 className='font-semibold'>Chọn nhanh</h3>
                        <div className='flex gap-1 items-center flex-wrap w-full'>
                            {content?.map((item) => (
                                <button 
                                    className={`px-4 py-1 bg-gray-200 rounded-md cursor-pointer ${activedEl === item.code ? 'bg-blue-400 text-white' : ''}`} 
                                    onClick={() => handleActive(item.code,item.value)}
                                    key={item.code}>{item.value}</button>
                            ))}
                        </div>
                    </div>
                </div>}
                {(name === 'price' || name === 'area') && <button
                    type='button'
                    className='absolute bottom-0 w-full uppercase bg-orange-400 py-2 font-medium rounded-bl-md rounded-br-md'
                    onClick={handleBeforeSubmit}
                >
                    Áp dụng
                </button>}    
            </div>
        </div>
    )
}

export default memo(Modal)