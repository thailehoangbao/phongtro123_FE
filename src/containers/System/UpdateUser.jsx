import React, { useEffect, useState } from 'react'
import { apiUpdatePassword, apiUpdateUser } from '../../services/user'
import { useSelector } from 'react-redux'
import { FaCamera } from 'react-icons/fa6'
import { apiUploadImages } from '../../services'
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import avatar from '../../assets/avatar.png'
import { FileToBase64 } from '../../ultis/Common/tobase64'
const UpdateUser = () => {
    const { currentData } = useSelector(state => state.user)
    const [imagesPreview, setimagesPreview] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [password,setPassword] = useState('')
    const [disablePassword,setdisablePassword] = useState(true)
    const [payload, setPayload] = useState({
        name: "",
        phone: "",
        avatar: "",
        zalo: ""
    })
    
    useEffect(() => {
        if (currentData) {
            setPayload({
                name: currentData.name || "",
                phone: currentData.phone || "",
                avatar: currentData.avatar || "",
                zalo: currentData.zalo || ""
            })
        }
    }, [currentData])
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!payload.name) newErrors.name = "Tên không được bỏ trống."
        if (!payload.phone) newErrors.phone = "Số điện thoại không được bỏ trống."
        if (!payload.zalo) newErrors.zalo = "Zalo không được bỏ trống."
        else if (!/^(0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/.test(payload.phone)) newErrors.phone = "Số điện thoại không hợp lệ."

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            const result = await apiUpdateUser(payload)
            if(result.status === 200) notify()
        }
    }

    const handleFiles = async (e) => {
        // const imageToBase64 = await FileToBase64(e.target.files[0])
        // console.log(imageToBase64)
        // setPayload(prev => ({...prev,
        //     avatar: imageToBase64
        // }))
        e.stopPropagation()
        const files = e.target.files
        let images = ''
        const formData = new FormData()
        setisLoading(true)
        formData.append('file', files[0])
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_AVATAR)
        const response = await apiUploadImages(formData)
        if (response.status === 200) {
            setisLoading(false)
            images = response.data?.secure_url
        }
        setimagesPreview(images)
        setPayload(prev => ({ ...prev, avatar: images }))
    }

    const notify = () => toast('Cập nhật thành công!');
    const handleUpdatePassword = async() => {
        let newPayload = {
            password: password
        }
        const response = await apiUpdatePassword(newPayload)
        if(response.status === 200) {
            setdisablePassword(true)
            notify()
        }
    }
    return (
        <section className="text-gray-600 body-font relative">
            <h1 className='font-semibold text-2xl'>Chỉnh sửa thông tin cá nhân</h1>
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71988.36670315915!2d106.63302345195835!3d10.783747031859436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f3129e64d%3A0x8d6b2d79522c7f30!2zQ2jhu6MgQuG6v24gVGjDoG5o!5e0!3m2!1svi!2s!4v1738914577990!5m2!1svi!2s" width={600} height={800} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Thông tin cá nhân</h2>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input value={payload.name} onChange={(e) => setPayload(prev => ({ ...prev, name: e.target.value }))} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input value={payload.phone} onChange={(e) => setPayload(prev => ({ ...prev, phone: e.target.value }))} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="zalo" className="leading-7 text-sm text-gray-600">Zalo</label>
                        <input disabled value={payload.zalo} onChange={(e) => setPayload(prev => ({ ...prev, zalo: e.target.value }))} type="text" id="zalo" name="zalo" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3" />
                        {errors.zalo && <p className="text-red-500 text-xs mt-1">{errors.zalo}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input disabled={disablePassword} value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className={`w-full rounded border ${disablePassword ? "bg-slate-300" : "bg-white"} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3`} />
                        <small className='text-blue-500 cursor-pointer hover:text-orange-500' onClick={() => setdisablePassword(false)}>Đổi mật khẩu</small> 
                        {!disablePassword && <small className='text-blue-500 cursor-pointer ml-2 hover:text-orange-500' onClick={handleUpdatePassword}>Cập nhật </small>}
                    </div>
                    <div className="relative mb-4" bis_skin_checked={1}>
                        <label htmlFor="avatar" className="leading-7 text-sm text-gray-600">
                            {!isLoading ? (<><FaCamera className='text-4xl gap-2 text-blue-500'/><span>Thêm ảnh</span></>) : <ColorRing /> }    
                        </label>
                        <input onChange={handleFiles} type="file" hidden id="avatar" name="avatar" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <div>
                            <h3 className='font-semibold py-4'>Ảnh đã chọn</h3>
                            <div className='flex flex-wrap gap-4 items-center w-full'>
                                <div className='relative'>
                                    <img src={imagesPreview ? imagesPreview : currentData.avatar ? currentData.avatar : avatar} alt="avatar" className='w-[300px] h-[300px] object-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg uppercase" onClick={handleSubmit}>Cập nhật</button>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default UpdateUser
