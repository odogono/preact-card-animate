import { Component } from "preact";

import { BoundingClientRectComponent } from "./bounding_client_rect";

export const WIDTH = 90;
export const HEIGHT = 125;
export const HALF_WIDTH = WIDTH / 2;
export const HALF_HEIGHT = HEIGHT / 2;

const PlaceHolder = ({ scale = 1.0, position = [0, 0], refCallback }) => {
  // const width = 90 * scale;
  // const height = 125 * scale;

  // // console.log("[Placeholder]", refCallback);

  // // to ensure the origin is around the center
  // position[0] = position[0] - width / 2 + HALF_WIDTH;
  // position[1] = position[1] - height / 2 + HALF_HEIGHT;

  // const style = {
  //   width,
  //   height,
  //   top: position[1],
  //   left: position[0]
  // };

  return (
    <div ref={r => refCallback.call(refCallback, r)} className="placeholder" />
  );
};

// return (
//   <svg className="placeholder" xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 90 125">
//     <path
//       d="M75.31 0H14.687C6.623 0 .227 6.535.227 14.46v96.08c0 8.064 6.535 14.46 14.46 14.46H75.31c8.065 0 14.46-6.535 14.46-14.46V14.46C89.91 6.536 83.376 0 75.31 0z"
//       fill="#686868"
//     />
//   </svg>
// );

export default BoundingClientRectComponent(PlaceHolder);
