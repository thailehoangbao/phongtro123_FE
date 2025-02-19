import React, { useCallback, useState } from "react";
import logo from "../../assets/logo.png";
import { Button,User } from "../../components";
import icons from "../../ultis/icons";
import { useNavigate, Link } from "react-router-dom";
import { path } from "../../ultis/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultis/menuManage";
const { CiCirclePlus,IoLogOutOutline,IoIosArrowDown } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowMenu,setIsShowMenu] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.auth);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  const logout = () => {
    setIsShowMenu(false)
    dispatch(actions.logout());
  };
  return (
    <div className="md:w-4/5 w-full">
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain hidden md:flex"
          />
        </Link>
        <div className="flex items-center gap-3">
          <small>Phongtro123.com Xin chào!</small>
          {isLoggedIn ? (
            <div className="relative">
                <div className="flex gap-2 items-center">
                  <User />
                  <Button
                    text="Quản lý tài khoản"
                    textColor="text-white text-xs py-1 md:text-base md:px-4 md:py-2 h-fit"
                    bgColor="bg-blue-700"
                    onClick={() => setIsShowMenu(prev => !prev)}
                    IconAfter={IoIosArrowDown}
                  ></Button>
                </div>
                {isShowMenu && (<div className="absolute min-w-300 right-0 top-full bg-white shadow-md rounded-md p-4 z-10">
                  <div className="flex flex-col">
                    {menuManage.map((item,index) => (
                      <div key={index} className=" border-b border-gray-200 flex gap-2 items-center">{item.icon}<Link className="hover:text-orange-600 text-blue-500 py-2 text-sm md:text-base" to={item.path} key={item.id}>{item.text}</Link></div>
                    ))}
                    <div className="flex gap-2 items-center cursor-pointer text-orange-500"><IoLogOutOutline /><span className="cursor-pointer hover:text-orange-600 text-blue-500 py-2 text-sm md:text-base" onClick={logout}>Đăng xuất</span></div>
                  </div>
                </div>)}
            </div>
          ) : (
            <>
              <Button
                text="Đăng nhập"
                textColor="text-white text-xs px-2 py-1 md:text-base md:px-4 md:py-2"
                bgColor="bg-secondary1"
                onClick={() => goLogin(false)}
              ></Button>
              <Button
                text="Đăng ký"
                textColor="text-white text-xs px-2 py-1 md:text-base md:px-4 md:py-2"
                bgColor="bg-secondary1"
                onClick={() => goLogin(true)}
              ></Button>
            </>
          )}
          <Button
            text="Đăng tin mới"
            textColor="text-white text-xs px-1 py-3 md:text-base md:px-4 md:py-2 w-[120px] md:w-auto"
            bgColor="bg-secondary2"
            IconAfter={CiCirclePlus}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
