import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiDetailPost, apiRelativeAddressPost } from '../../services/post'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Button} from '../../components'
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import icons from '../../ultis/icons';

const DetailPost = () => {
    const params = useParams()
    const {currentData} = useSelector(state => state.user)
    const [detailPost, setdetailPost] = useState({})
    const [imagePreview,setImagePreview] = useState([])
    const [relativePost,setRelativePost] = useState([])
    useEffect(() => {
        const fetchApiDetailPost = async () => {
            const res = await apiDetailPost(params.postId.replace('}', ''))
            setdetailPost(res?.data?.response?.rows[0])
        }
        fetchApiDetailPost()
    },[])
    useEffect(() => {
        const fetchApiRelativeAddressPost = async () => {
            let payload = {
                address: detailPost?.address?.split(',')[1]
            }
            const res = await apiRelativeAddressPost(payload)
            if(res.status === 200) setRelativePost(res.data.response)
        }
        fetchApiRelativeAddressPost()
        let image = detailPost?.images?.image.length > 0 && JSON.parse(detailPost?.images?.image)
        setImagePreview(image)
    },[detailPost])

    const StarRating = ({ i }) => {
        return (
            <div className="flex">
            {Array.from({ length: i }, (_, index) => (
                <icons.FaStar key={index} className="text-yellow-500 text-md" />
            ))}
            </div>
        );
    };

    return (
        <>
            <div className='flex gap-4 w-full'>
                <div className='w-[70%]'>
                    <div className='h-[500px]'>
                        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                            {imagePreview.length > 0 && imagePreview?.map((item,index) => (
                                <SwiperSlide key={index}>
                                    <img src={item} alt="img" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='flex flex-col gap-2 mt-4 bg-white p-4 rounded-md'>
                        <div className='flex gap-2 bg-red-600 px-2 py-1 rounded-md w-fit'>
                            <StarRating i={+detailPost?.star}/>
                            {+detailPost?.star > 3 ? <small className='text-white uppercase font-semibold'>Tin Vip nổi bật</small> : <small className='font-semibold text-white uppercase'>Tin thường</small>}
                        </div>
                        <h1 className='text-red-600 font-semibold text-xl'>{detailPost?.title}</h1>           
                        <small className='flex gap-1 items-center'><icons.FaLocationPin />{detailPost?.address}- <Link className='text-blue-600'>Xem bản đồ</Link></small>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                                <span className='font-semibold text-green-600 text-xl'>{detailPost?.attributes?.price}</span>
                                <span>* {detailPost?.attributes?.acreage}</span>
                                <span>* {detailPost?.attributes?.hashtag}</span>
                            </div>
                            <div>
                                <span><span className='font-semibold'></span>{detailPost?.overviews?.code}</span>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-semibold text-xl py-4'>Thông tin mô tả</h1>
                            <p>{detailPost?.description}</p>
                        </div>
                        <div className='border border-b-1 border-gray-100 my-4'>
                        </div>
                        <div>
                            <h1 className='font-semibold text-xl mb-2'>Vị trí bản đồ</h1>
                            <p className='flex gap-1 items-center'><icons.FaLocationPin />Địa chỉ: {detailPost?.address}- <Link className='text-blue-600'>Xem bản đồ</Link></p>
                        </div>
                        <div className='border border-b-1 border-gray-100 my-4'>
                        </div>
                        <div>
                            <h1 className='font-semibold text-xl mb-2'>Đặc điểm tin đăng</h1>
                            <div className='flex'>
                                <p className='w-[50%]'>{detailPost?.overviews?.code}</p>
                                <p >Gói tin: {+detailPost?.star > 3 ? <small className='uppercase font-semibold text-red-500'>Tin Vip nổi bật</small> : <small className='font-semibold uppercase text-red-500'>Tin thường</small>}</p> 
                            </div>
                            <div className='flex mt-4'>
                                <p className='w-[50%]'>Ngày đăng: {detailPost?.overviews?.created}</p>
                                <p>Ngày hết hạn: {detailPost?.overviews?.expired}</p> 
                            </div>
                        </div>
                        <div className='border border-b-1 border-gray-100 my-4'>
                        </div>
                        <div>
                            <h1 className='font-semibold text-xl mb-2'>Thông tin liên hệ</h1>
                            <div className='flex'>
                                <div className='flex items-center justify-center mr-4'><img src={currentData?.avatar} alt="avatar" className='w-[150px] h-[150px] rounded-[50%]' /></div>
                                <div className='mb-4'>
                                    <h1 className='font-semibold'>{currentData?.name}</h1>
                                    <small className='text-green-600 flex items-center gap-1'><icons.FaCircle/>Đang hoạt động</small>
                                    <div>
                                        <span>10 tin đăng </span>
                                        <span>Tham gia từ: 19/09/2023</span>
                                    </div>
                                    <div className='mt-2 w-full'>
                                        <Button text={currentData?.phone} bgColor="bg-green-500" textColor="text-white" fullWidth IconBefore={icons.FaPhone}/>
                                        <Button text="Nhắn Zalo" bgColor="mt-2 bg-blue-500" textColor="text-white" fullWidth IconBefore={icons.MdOutlineMessage}/>
                                    </div>
                                </div>
                            </div>
                            <p className='bg-yellow-50 rounded-md p-4 text-md border border-yellow-400'>
                            <p className='font-semibold'>Lưu ý: </p>
                                Chỉ đặt khi cọc xác định được chủ nhà và có thỏa thuận biên nhận rõ ràng. Kiểm tra mọi điều khoản và yêu cầu liệt kê tất cả chi phí hàng tháng vào hợp đồng. Xem thêm
                                Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn thấy rằng tin đăng này không đúng hoặc có dấu hiệu lừa đảo, hãy phản ánh với chúng tôi.
                            </p>
                        </div>
                        
                    </div>
    
                </div>
                <div className='w-[30%] flex flex-col gap-2 items-center bg-white rounded-md p-2 justify-center h-[500px]'>
                    <img src={currentData?.avatar} alt="avatar" className='w-[150px] h-[150px] rounded-[50%]' />
                    <h1 className='font-semibold'>{currentData?.name}</h1>
                    <small className='text-green-600 flex items-center gap-1'><icons.FaCircle/>Đang hoạt động</small>
                    <div>
                        <span>10 tin đăng </span>
                        <span>Tham gia từ: 19/09/2023</span>
                    </div>
                    <div className='mt-2 w-full'>
                        <Button text={currentData?.phone} bgColor="bg-green-500" textColor="text-white" fullWidth IconBefore={icons.FaPhone}/>
                        <Button text="Nhắn Zalo" bgColor="mt-2 bg-blue-500" textColor="text-white" fullWidth IconBefore={icons.MdOutlineMessage}/>
                    </div>
                    <div className='flex gap-1'>
                        <button className='mr-2 bg-white hover:bg-slate-100 px-2 py-1 rounded-md flex gap-1 items-center'><icons.FaHeart/><small>Lưu tin này</small></button>
                        <button className='mr-2 bg-white hover:bg-slate-100 px-2 py-1 rounded-md flex gap-1 items-center'><icons.CiShare2/><small>Chia sẽ</small></button>
                        <button className='mr-2 bg-white hover:bg-slate-100 px-2 py-1 rounded-md flex gap-1 items-center'><icons.MdError/><small>Báo xấu</small></button>
                    </div>
                </div>
                    
            </div>
            <div className='w-full'>
                <div className='mt-4'>
                    <h1 className='text-xl font-semibold rounded-t-md bg-white w-fit py-2 px-4 '>Tin đăng cùng khu vực</h1>
                    <div className='flex gap-2 bg-white p-4 rounded-md w-full'>
                        {relativePost?.map((item,index) => (
                            <div key={index} className='w-[250px]'>
                                <img src={JSON.parse(item?.images?.image)[0]} alt="img" className='w-[250px] h-[200px] rounded-md' />
                                <div className='text-sm font-semibold text-blue-700 h-[40px] mt-2'>{item.title}</div>
                                <div className='flex gap-1'>
                                    <small className='text-green-700 font-semibold'>{item?.attributes?.price}</small>
                                    <small className='text-gray-300 flex items-center gap-1'><icons.FaCircle /></small>
                                    <small >{item?.attributes?.acreage}</small>
                                </div>
                                <div>
                                    <small >{item?.address}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPost