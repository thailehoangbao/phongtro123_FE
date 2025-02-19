import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { formatVietnameseToString } from "../../ultis/Common/fomatVietNameseToString";
import {path} from '../../ultis/constant'


const Navigation = ({isAdmin}) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  return (
    <div className={`w-full hidden md:block text-white lg:h-[39px] h-[280px] bg-secondary1 ${isAdmin ? '' : 'mb-4'} flex justify-center items-center`}>
      <div className="w-4/5 lg:flex lg:justify-start lg:items-center h-full p-4 text-white font-semibold text-sm">
        <div className="lg:mb-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "p-[9px] bg-secondary2 hover:bg-secondary2"
                : "bg-secondary1 p-[9px] hover:bg-secondary2"
            }
            to={"/"}
          >
            Trang Chủ
          </NavLink>
        </div>
        {categories?.response?.map((item,index) => (
          <div className="mb-4 mt-4" key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-[9px] bg-secondary2 hover:bg-secondary2  cursor-pointer "
                  : "bg-secondary1 cursor-pointer p-[9px] hover:bg-secondary2"
              }
              to={`/${formatVietnameseToString(item?.value)}`}
            >
              {item?.value}
            </NavLink>
            <br />
          </div>
        ))}
        <div className="lg:mb-0">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "p-[9px] bg-secondary2 hover:bg-secondary2"
                : "bg-secondary1 p-[9px] hover:bg-secondary2"
            }
            to={path.CONTACT}
          >
            Liên hệ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
