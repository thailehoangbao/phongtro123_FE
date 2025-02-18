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
    <div className="w-4/5">
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-3">
          <small>Phongtro123.com Xin chào!</small>
          {isLoggedIn ? (
            <div className="relative">
                <div className="flex gap-2">
                  <User />
                  <Button
                    text="Quản lý tài khoản"
                    textColor="text-white"
                    bgColor="bg-blue-700"
                    onClick={() => setIsShowMenu(prev => !prev)}
                    IconAfter={IoIosArrowDown}
                  ></Button>
                </div>
                {isShowMenu && (<div className="absolute min-w-300 right-0 top-full bg-white shadow-md rounded-md p-4 z-10">
                  <div className="flex flex-col">
                    {menuManage.map((item,index) => (
                      <div key={index} className=" border-b border-gray-200 flex gap-2 items-center">{item.icon}<Link className="hover:text-orange-600 text-blue-500 py-2 " to={item.path} key={item.id}>{item.text}</Link></div>
                    ))}
                    <div className="flex gap-2 items-center cursor-pointer text-orange-500"><IoLogOutOutline /><span className="cursor-pointer hover:text-orange-600 text-blue-500 py-2" onClick={logout}>Đăng xuất</span></div>
                  </div>
                </div>)}
            </div>
          ) : (
            <>
              <Button
                text="Đăng nhập"
                textColor="text-white"
                bgColor="bg-secondary1"
                onClick={() => goLogin(false)}
              ></Button>
              <Button
                text="Đăng ký"
                textColor="text-white"
                bgColor="bg-secondary1"
                onClick={() => goLogin(true)}
              ></Button>
            </>
          )}
          <Button
            text="Đăng tin mới"
            textColor="text-white"
            bgColor="bg-secondary2"
            IconAfter={CiCirclePlus}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
