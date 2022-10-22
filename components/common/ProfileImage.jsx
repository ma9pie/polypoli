import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

function ProfileImage(props) {
  return (
    <Wrapper {...props}>
      {props.src ? (
        <Image
          src={props.src}
          alt="profile_img"
          width={props.width}
          height={props.height}
        ></Image>
      ) : (
        <BlankImage width={props.width} height={props.height}></BlankImage>
      )}
    </Wrapper>
  );
}

export default ProfileImage;

ProfileImage.defaultProps = {
  width: "60px",
  height: "60px",
  borderRadius: "10px",
  margin: "0px",
  padding: "0px",
};

const Wrapper = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const BlankImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 10px;
  background-color: var(--bg20);
`;
