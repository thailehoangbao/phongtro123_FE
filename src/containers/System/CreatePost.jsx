import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Address, Button, Overview} from '../../components'
import { getCodeArea, getCodePrice,getCodePriceExactly,getCodeAreaExactly } from '../../ultis/Common/getCodes'
import { FaCamera } from 'react-icons/fa6'
import { apiCreateNewPost, apiUpdatePost, apiUploadImages } from '../../services'
import { MdDelete } from 'react-icons/md'
import { ColorRing } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import * as actions from '../../store/actions'
import validate from '../../ultis/Common/validateFields'
const CreatePost = ({isEdit}) => {
    const dispatch = useDispatch()
    const {dataEdit} = useSelector(state => state.post)
    const [payload, setPayload] = useState(() => {
        let initData = {
            categoryCode: dataEdit?.categoryCode || '',
            title: dataEdit?.title || '',
            description: dataEdit?.description || '',
            star: dataEdit?.star || 1,
            priceNumber: dataEdit?.priceNumber*1000000 || 0,
            areaNumber: dataEdit?.areaNumber || 0,
            images: dataEdit?.images ? JSON.parse(dataEdit?.images?.image) : [],
            address: dataEdit?.address || '',
            priceCode: dataEdit?.priceCode || '',
            areaCode: dataEdit?.areaCode || '',
            target: dataEdit?.overviews?.target || '',
            provinceCode:dataEdit?.provinceCode || '',
            overviews:dataEdit?.overviews || {} 
        }

        return initData
    })
    const { currentData } = useSelector(state => state.user)
    const {prices,areas} = useSelector(state => state.app)
    const [imagesPreview, setImagesPreview] = useState(isEdit ? (JSON.parse(dataEdit?.images?.image)) : [])
    const [isLoading, setisLoading] = useState(false)
    const [invalideFields, setInvalideFields] = useState([])
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            priceCode: getCodePriceExactly(payload.priceNumber/1000000,getCodePrice(prices)),
            areaCode: getCodeAreaExactly(payload.areaNumber,getCodeArea(areas))
        }))
    },[payload.priceNumber,payload.areaNumber])
    useEffect(() => {
        if(!isEdit) setPayload({})
    },[])
    const handleFiles = async (e) => {
        e.stopPropagation()
        const files = e.target.files
        let images = []
        const formData = new FormData()
        setisLoading(true)
        for(let i of files) {
            formData.append('file',i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            const response = await apiUploadImages(formData)
            if( response.status === 200) {
                setisLoading(false)
                images = [...images,response.data?.secure_url]
            }
        }
        setImagesPreview(prev => [...prev,...images])
        setPayload(prev => ({...prev,images: payload.images ? [...payload.images,...images] : [...images]}))
    }
    const handleDeleteImages = (index) => {
        imagesPreview.splice(index,1)
        setImagesPreview(imagesPreview)
        setPayload(prev => ({...prev,images: imagesPreview}))
    }
    const handleSubmit = async () => {
        let finalPayload = {
            ...payload,
            userId: currentData.id,
            priceNumber: +payload.priceNumber/1000000,
            areaNumber: +payload.areaNumber,
            target: payload.target,
        }
        const result = validate(finalPayload,setInvalideFields)
        if( result === 0) {
            if(isEdit) {
                finalPayload.postId = dataEdit.id
                finalPayload.overviewId = dataEdit.overviewId
                finalPayload.imagesId = dataEdit.imagesId
                finalPayload.attributesId =dataEdit.attributesId
                const data = await apiUpdatePost(finalPayload)
                if(data.status === 200) {
                    dispatch(actions.getPostsLimitAdmin())
                    notify()
                }
            } else {
                const data = await apiCreateNewPost(finalPayload)
                if(data.status === 200) {
                    notify()
                }
            }
        }
    }
    const notify = () => toast('Đăng tin thành công!');
    return (
        <div className='px-6 py-2'>
            <h1 className='text-2xl font-medium border-b-2 pb-2'>{isEdit ? 'Chỉnh sửa tin đăng': 'Đăng tin mới'}</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-4 flex-auto'>
                    <Address invalideFields={invalideFields} setInvalideFields={setInvalideFields} payload={payload} setPayload={setPayload} />
                    <Overview invalideFields={invalideFields} setInvalideFields={setInvalideFields} payload={payload} setPayload={setPayload}/>
                    <div className='w-full'>
                        <h2 className='font-semibold text-lg'>Hình ảnh</h2>
                        <small>Cập nhật hình ảnh rõ ràng cho thuê nhanh hơn</small>
                        <div className='w-full mb-6'>
                            <label htmlFor="file" className='w-full h-[300px] border-dashed rounded-md flex border-2 items-center justify-center border-gray-300 my-4 flex-col'>
                                {!isLoading ? (<><FaCamera className='text-4xl gap-2 text-blue-500'/><span>Thêm ảnh</span></>) : <ColorRing /> }
                            </label>
                            <input type="file" id='file' hidden multiple onChange={handleFiles}/>
                            <div>
                                <h3 className='font-semibold py-4'>Ảnh đã chọn</h3>
                                    <div className='flex flex-wrap gap-4 items-center w-full'>
                                        {imagesPreview.length > 0 && imagesPreview?.map((item,index) => {
                                            return (
                                                <div key={index} className='relative'>
                                                    <img  src={item} alt="preview" className='w-[300px] h-[300px] object-cover' />
                                                    <span title='Xóa' className='absolute top-5 right-5 p-2 cursor-pointer rounded-[50%] bg-slate-200' onClick={() => handleDeleteImages(index)}><MdDelete className='text-red-500 size-8 hover:opacity-70'/></span>
                                                </div>
                                            )
                                        })}
                                    </div>
                            </div>
                            <small className='text-red-500'>{invalideFields?.find(item => item.name === 'images')?.message}</small>
                        </div>
                        <Button text={isEdit ? 'Cập nhật' : 'Tạo mới'} bgColor='bg-green-500 text-white uppercase py-2 px-1' fullWidth='100%' onClick={handleSubmit}/>
                        <div className='h-[500px]'></div>
                    </div>
                </div>
                <div className='w-1/3 py-4 flex-none hidden md:block'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71988.36670315915!2d106.63302345195835!3d10.783747031859436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f3129e64d%3A0x8d6b2d79522c7f30!2zQ2jhu6MgQuG6v24gVGjDoG5o!5e0!3m2!1svi!2s!4v1738914577990!5m2!1svi!2s" width={400} height={400} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreatePost