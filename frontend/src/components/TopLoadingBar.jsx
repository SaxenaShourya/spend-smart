import React from "react";
import LoadingBar from "react-top-loading-bar";
import { useSelector, useDispatch } from "react-redux";

import { resetLoader } from "../features/loader/loaderSlice";

const TopLoadingBar = () => {
  const progress = useSelector((state) => state.loader.progress);

  const dispatch = useDispatch();

  return (
    <LoadingBar
      color="#3B82F6"
      height={3}
      progress={progress}
      onLoaderFinished={() => dispatch(resetLoader())}
    />
  );
};

export default TopLoadingBar;
