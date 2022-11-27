import React from "react";
import PropTypes from "prop-types";
import { Cathegory, Header, PictureData, MyLi, Comments, MyBtn, ImageContainer, BtnContainer } from "./ModalNotice.styled";
import { useSelector } from "react-redux";
import { useGetNoticesByIdQuery } from "redux/noticesApi";
import defoultImage from "../../img/cat.jpg";
import { toast } from "react-toastify";
function ModalNotice({ onClose }) {
  const id = useSelector(({ notice }) => notice.modalViewNotice.id);
  const token = useSelector(({ auth }) => auth.token);
  const { data, isLoading } = useGetNoticesByIdQuery(id);

  const image = data?.notice?.avatar;
  const hadleClickAddFavorite = () => {
    if (!token) {
      return toast.warn("😹 signUp or login first");
    }
    return console.log("add to favorite");
  };

  const BASE_URL = "https://petly-be.herokuapp.com/";
  return (
    <div>
      {!isLoading && (
        <>
          <ImageContainer>
            <PictureData>
              <img src={image ? BASE_URL + image : defoultImage} alt={data.notice.title}></img>
              <Cathegory>{data.notice.category}</Cathegory>
            </PictureData>
            <div>
              <Header>Cute dog looking for a home</Header>
              <ul>
                <MyLi>
                  <p>Name:</p>
                  <span>{data.notice.name}</span>
                </MyLi>
                <MyLi>
                  <p>Birthday:</p>
                  <span>{data.notice.birthday}</span>
                </MyLi>
                <MyLi>
                  <p>Breed:</p>
                  <span>{data.notice.breed}</span>
                </MyLi>
                <MyLi>
                  <p>Location:</p>
                  <span>{data.notice.location}</span>
                </MyLi>
                <MyLi>
                  <p>The sex:</p>
                  <span>{data.notice.male}</span>
                </MyLi>
                <MyLi>
                  <p>Email:</p>
                  <span>{data?.notice?.owner?.email}</span>
                </MyLi>
                <MyLi>
                  <p>Phone:</p>
                  <span>{data?.notice?.owner?.phone}</span>
                </MyLi>

                {data.notice.cathegory === "sell" && (
                  <MyLi>
                    <p>Sell:</p>
                    <span>{data.notice.price}</span>
                  </MyLi>
                )}
              </ul>
            </div>
          </ImageContainer>

          <Comments>
            Comments: <span>{data.notice.comments}</span>
          </Comments>

          <BtnContainer>
            {
              <a href="tel:{data?.notice?.owner?.phone}">
                <MyBtn active={"active"}>Contact</MyBtn>
              </a>
            }

            <MyBtn onClick={hadleClickAddFavorite}>
              Add to <span>&#10084;</span>
            </MyBtn>
          </BtnContainer>
        </>
      )}
    </div>
  );
}

ModalNotice.propTypes = { id: PropTypes.string };

export default ModalNotice;
