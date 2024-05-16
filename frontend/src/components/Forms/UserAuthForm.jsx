import React from "react";
import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";

import avatar from "../../assets/avatar.webp";

const UserAuthForm = ({
  title,
  imageSrc,
  imageTitle,
  alt,
  form,
  footer,
  footerLink,
  footerLinkPath,
}) => {
  return (
    <div className="w-full h-[85%] sm:size-[80%] box-shadow rounded-3xl flex items-center">
      <div className="hidden lg:flex flex-col justify-center items-center w-[50%]">
        <h4 className="text-3xl xl:text-4xl text-primary relative animateBottom">
          {imageTitle}
        </h4>
        <img src={imageSrc} alt={alt} className="w-[24rem]" />
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-[50%] h-full bg-primary rounded-3xl relative">
        <Avatar
          src={avatar}
          name="Avatar"
          className="w-20 h-20 sm:w-24 sm:h-24 text-lg absolute top-[-2.7rem]"
          isBordered
          color="secondary"
          showFallback
        />
        <h3 className="text-black text-2xl md:text-3xl xl:text-4xl mb-4">
          {title}
        </h3>
        <div className="w-[85%] sm:w-[70%] flex flex-col justify-center items-center">
          {form}
        </div>
        {footer && (
          <span className="font-calSans text-base text-center mt-4 text-black">
            <span className="block sm:inline">{footer}</span>
            <Link to={footerLinkPath} className="ml-1 action-btn">
              {footerLink}
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default UserAuthForm;
