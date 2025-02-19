import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
    const [payload, setPayload] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const handleSubmit = () => {
        notify()
    }
    const notify = () => toast('Gửi thông tin thành công!');

    return (
        <div className='w-full'>
            <h1 className='md:text-2xl font-semibold pb-4 text-base'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-4 '>
                <div className='bg-blue-500 p-8 rounded-2xl text-white w-[50%]'>
                    <h4 className='font-semibold md:text-xl pb-2 text-sm'>Thông tin liên hệ</h4>
                    <p className='pb-2 md:text-base text-sm'>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Cảm ơn bạn đã chọn phongtro123.com</p>
                    <p className='pb-2 md:text-base text-sm'><span className='font-semibold'>Điện thoại</span>: 0901 307 303</p>
                    <p className='pb-2 md:text-base text-sm'><span className='font-semibold'>Email</span>: cskh.phongtro123@gmail.com</p>
                    <p className='pb-2 md:text-base text-sm'><span className='font-semibold' >Zalo</span>: 0901 307 393</p>
                    <p className='pb-2 md:text-base text-sm'><span className='font-semibold'>Viper</span>: 0901 307 303</p>
                    <p className='pb-2 md:text-base text-sm'><span className='font-semibold'>Địa chỉ</span>: 160 Lê Thúc Hoạch, Phường Tân Quý, Quận Tân Phú, TPHCM</p>
                </div>
                <div className='md:w-[50%] pr-2 md:pr-0'>
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Liên hệ trực tuyến</h2>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" onChange={(e) => setPayload(prev => ({...prev, name: e.target.value}))} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="text" id="phone" name="phone" onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}))} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" onChange={(e) => setPayload(prev => ({...prev, email: e.target.value}))} className={`w-full rounded border  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3`} />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Câu hỏi của bạn?</label>
                        <textarea type="text" id="description" name="description" onChange={(e) => setPayload(prev => ({...prev, description: e.target.value}))} className={`w-full rounded border  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3`} />
                    </div>
                    <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded md:text-lg uppercase w-full text-base" onClick={handleSubmit}>Gửi liên hệ</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Contact