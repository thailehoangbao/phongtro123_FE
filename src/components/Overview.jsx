import React, { memo } from 'react'
import {InputArea, InputForm2, InputReadOnly, SelectOverview} from './'
import { useSelector } from 'react-redux'

const targets = [
    {code: 'all',value: 'Tất cả'},
    {code: 'male',value:'Nam'},
    {code: 'female',value:'Nữ'}
]

const Overview = ({payload,setPayload,invalideFields,setInvalideFields}) => {
    const { currentData } = useSelector(state => state.user)
    const {categories} = useSelector(state => state.app)
    return (
        <div>
            <h1 className=' font-medium text-lg mt-4'>Thông tin mô tả</h1>
            <SelectOverview invalideFields={invalideFields} setInvalideFields={setInvalideFields} type='categoryCode' value={categories?.response?.find(item => item.code === payload.categoryCode)?.value} setValue={setPayload} label='Loại chuyên mục' options={categories.response}/>
            <InputForm2 invalideFields={invalideFields} setInvalideFields={setInvalideFields} name='title' value={payload.title} setValue={setPayload} label='Tiêu đề'/>
            <InputArea invalideFields={invalideFields} setInvalideFields={setInvalideFields} label='Nội dung mô tả' name='description' setValue={setPayload} value={payload.description}/>
            <InputReadOnly label='Thông tin liên hệ' info={currentData?.name}/>
            <InputReadOnly label='Điện thoại' info={currentData?.phone}/>
            <InputForm2 invalideFields={invalideFields} setInvalideFields={setInvalideFields} name='priceNumber' value={payload.priceNumber} setValue={setPayload} label='Giá cho thuê' donvi='Đồng' small='Nhập số đầy đủ ví dụ: 1tr thì nhập là 1000000'/>
            <InputForm2 invalideFields={invalideFields} setInvalideFields={setInvalideFields} name='areaNumber' value={payload.areaNumber} setValue={setPayload} label='Diện tích' donvi='m2'/>
            <SelectOverview invalideFields={invalideFields} setInvalideFields={setInvalideFields}  type='target' value={targets.find(item => item.code === payload?.overviews?.target)?.value} setValue={setPayload} label='Đối tượng cho thuê' options={targets}/>
        </div>
    )
}

export default memo(Overview)
