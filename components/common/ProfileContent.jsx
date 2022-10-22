import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function ProfileContent(props) {
  const router = useRouter();

  return (
    <Wrapper {...props}>
      <Content onClick={() => router.push(`/profile/${props.congressmanId}`)}>
        <Span>
          <ProfileImg>
            {props.profileImage && (
              <Image
                src={props.profileImage}
                alt="profile_img"
                width={80}
                height={90}
              ></Image>
            )}
          </ProfileImg>
        </Span>
        <Span>
          <Name>
            <Text> {props.name}</Text>
          </Name>
          <Party>
            <SubText>{props.party}</SubText>
          </Party>
          <Region>
            <SubText>{props.region}</SubText>
          </Region>
        </Span>
      </Content>
    </Wrapper>
  );
}

export default ProfileContent;

ProfileContent.defaultProps = {
  congressmanId: "",
  profileImage: "",
  name: "",
  party: "",
  region: "",
  margin: "0px",
  padding: "0px",
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;
const Text = styled.div`
  ${Styles.large_m}
`;
const SubText = styled.div`
  ${Styles.small_m}
`;
const Content = styled.div`
  display: flex;
  cursor: pointer;
`;
const Span = styled.span``;
const ProfileImg = styled.div`
  width: 80px;
  height: 90px;
  border-radius: 10px;
  margin-right: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const Name = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;
const Party = styled.div`
  margin-bottom: 2px;
`;
const Region = styled.div``;
