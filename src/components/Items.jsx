import React, { memo, useState } from "react";
import icons from "../ultis/icons";
import avatar from '../assets/avatar.png'
import { formatText } from "../ultis/Common/fomatText";
import { StarComponent } from '../ultis/Common/renderStar'
import {  Link } from "react-router-dom";
import { formatVietnameseToString } from '../ultis/Common/fomatVietNameseToString'
import { path } from "../ultis/constant";
const { FaStar, FaHeart, FaRegHeart,FaBookmark } = icons;
const urlImage = 'https://tenten.vn/tin-tuc/wp-content/uploads/2022/06/loi-http-error-4.png'

const Items = ({item}) => {
    const [heart,setHeart] = useState(false)
    const imgs = JSON.parse(item?.images.image)
    return (
        <div className="w-full flex flex-col lg:flex-row justify-center p-1 border-t border-orange-600">
            <div className="lg:w-2/5 w-full flex justify-center items-center">
                <Link to={`${path.DETAIL}${formatVietnameseToString(item?.title?.replaceAll('/',''))}/${item?.id}}`} className="p-1 border bg-slate-100 lg:justify-center shadow-md rounded-md cursor-pointer" >
                    <div className="flex gap-1">
                        <img
                            src={imgs[0] || urlImage}
                            alt="preview"
                            className="w-[120px] h-[120px] object-cover"
                        />
                        <img
                            src={imgs[1] || urlImage}
                            alt="preview"
                            className="w-[120px] h-[120px] object-cover"
                        />
                        
                    </div>
                    <div className="flex gap-1 pt-1 relative">
                        <img
                            src={imgs[2] || urlImage}
                            alt="preview"
                            className="w-[120px] h-[120px] object-cover"
                        />
                        <img
                            src={imgs[3] || urlImage}
                            alt="preview"
                            className="w-[120px] h-[120px] object-cover"
                        />
                        <span className="absolute bottom-0 right-2 mb-1" onMouseEnter={() => setHeart(true)} onMouseLeave={() => setHeart(false)}>
                            {heart ? <FaHeart color="pink"/> : <FaRegHeart color="pink"/>}
                        </span>
                        <span className="text-white text-[12px] px-[6px] bg-overlay30 rounded-sm absolute bottom-0 left-1 mb-1 flex items-center">{imgs.length} ảnh</span>
                    </div>
                </Link>
            </div>
            <div className="lg:w-3/5 w-full">
                <div>
                    <div className="flex items-center justify-between w-full">
                        <Link className="text-red-600 text-sm font-semibold">
                            <FaStar className="star-item pb-1" size={18} color="yellow"/>
                            <StarComponent x={item?.star}/>
                            {item?.title}
                        </Link>
                        <div className="w-[10%] flex justify-end">
                            <FaBookmark color="orange" size={24}/>
                        </div>
                    </div>
                    <div className="my-2">
                        <span className="font-bold text-[16px] pr-2 text-green-600">{item?.attributes.price}</span>
                        <span className="text-[16px] pr-2">{item?.attributes.acreage}</span>
                        <span className="text-[16px] italic">{formatText(item?.address,15)}</span>
                    </div>
                    <div className="flex justify-end">
                        <span className="text-sm italic">3 giờ trước</span>
                    </div>
                    <p className="text-gray-500">{formatText(item?.description,50)}...</p>
                    <div className="flex justify-between py-2">
                        <div className="flex items-center">
                            <img src={avatar} alt="avatar" className="object-cover border-r-[50%] opacity-80 w-[25px] h-[25px]"/>
                            <span className="text-sm font-semibold">{item?.user.name}</span>
                        </div>
                        <div className="flex gap-2 h-[30px]">
                            <button className="bg-blue-600 text-white rounded-lg px-2 py-1 cursor-pointer hover:opacity-90 text-sm">{item?.user.phone}</button>
                            <button className="bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:opacity-90 text-sm px-2 py-1 " >{item?.user.zalo}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Items);
