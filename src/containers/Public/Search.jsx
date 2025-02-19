import React, { useEffect, useState } from "react";
import { SearchItem, Modal } from "../../components";
import icons from "../../ultis/icons";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation} from "react-router-dom";
import { path } from "../../ultis/constant";
const {
  GrNext,
  FiDelete,
  FaHouse,
  FaLocationDot,
  IoIosPricetags,
  CiSquareMore,
  CiSearch,
} = icons;

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { provinces, areas, prices, categories } = useSelector(state => state.app)
  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [arrMinMax, setArrMinMax] = useState({})
  const [name, setName] = useState('')
  const [queries, setQueries] = useState({})
  const [defaultText, setDefaultText] = useState('')

  useEffect(() => {
    if(!location.pathname.includes(path.SEARCH)) {
      setArrMinMax({})
      setQueries({})
    }
  },[location])

  const handleShowModal = (content,name,defaultText) => {
    setContent(content)
    setName(name)
    setDefaultText(defaultText)
    setIsShowModal(true)
  }
  const handleSubmit = (e,query,arrMaxMin) => {
    e.stopPropagation()
    setQueries(prev => ({...prev, ...query}))
    arrMaxMin && setArrMinMax(prev => ({...prev,...arrMaxMin}))
    setIsShowModal(false)
  }
  const handleSearch = () => {
    const queriesCode = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
    const result = {}
    queriesCode.forEach(item => {
      result[item[0]] = item[1]
    })
    const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
    let queryTextObj = {}
    queryText.forEach(item => {queryTextObj[item[0]] = item[1]})
    let titleSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê tất cả' } ${queryTextObj.province ? `tại ${queryTextObj.province}` : ''} ${queryTextObj.price ? `giá ${queryTextObj.price}` : ''} ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ''}`
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams(result).toString(),
    }, { state: {titleSearch}})
  }
  return (
    <>
      <div className="lg:h-[55px] w-4/5 h-full p-[10px] bg-[#efbb02] gap-2 rounded-lg flex-col flex items-center justify-around lg:flex-row">
        <div onClick={() =>handleShowModal(categories.response, 'category',"Tìm tất cả")} className="cursor-pointer flex-auto">
          <SearchItem
            text={queries.category || "Tìm tất cả"}
            IconAfter={FiDelete}
            IconBefore={FaHouse}
            width="lg:w-[200px] w-[400px] text-xs md:text-base"
          />
        </div>
        <div onClick={() =>handleShowModal(provinces, 'province',"Toàn quốc")} className="cursor-pointer flex-auto">
          <SearchItem
            text={queries.province || "Toàn quốc"}
            IconAfter={GrNext}
            IconBefore={FaLocationDot}
            color={"text-gray-400 text-xs md:text-base"}
            width="lg:w-[250px] w-[400px] text-sm"
          />
        </div>
        <div  onClick={() =>handleShowModal(prices,'price',"Chọn giá")} className="cursor-pointer flex-auto">
          <SearchItem
            text={queries.price || "Chọn giá"}
            IconAfter={GrNext}
            IconBefore={IoIosPricetags}
            color={"text-gray-400 text-xs md:text-base"}
            width="lg:w-[200px] w-[400px]"
          />
        </div>
        <div onClick={() =>handleShowModal(areas,'area',"Diện tích")} className="cursor-pointer flex-auto">
          <SearchItem
            text={queries.area || "Diện tích"}
            IconAfter={GrNext}
            IconBefore={CiSquareMore}
            color={"text-gray-400 text-xs md:text-base"}
            width="lg:w-[180px] w-[400px]"
          />
        </div>
        <div className="lg:w-[200px] w-[400px]">
          <button className="w-full bg-secondary1 p-2 rounded-md text-sm text-white hover:bg-secondary2" onClick={handleSearch}>
            <div className="flex items-center justify-center gap-3">
              <CiSearch />
              <div>Tìm kiếm</div>
            </div>
          </button>
        </div>
      </div>
      {isShowModal && <Modal queries={queries} setIsShowModal={setIsShowModal} content={content} name={name} handleSubmit={handleSubmit} arrMinMax={arrMinMax} defaultText={defaultText}/>}
    </>
  );
};

export default Search;
