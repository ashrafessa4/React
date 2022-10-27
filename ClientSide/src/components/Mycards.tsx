import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../interfaces/Card";
import { deleteCard, getCardByUserId } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { getBiz } from "../services/userService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MycardsProps {}

const Mycards: FunctionComponent<MycardsProps> = () => {
  const [isBiz, setIsBiz] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const handleDelete = (card: Card) => {
    if (
      window.confirm(
        `${card.business_name} will be deleted permanently, are you sure?`
      )
    )
      deleteCard(card)
        .then(() => {
          setIsChanged(!isChanged);
          successMsg(`${card.business_name} Deleted Successfully!`);
        })
        .catch((err) => {
          console.log(err);

          errorMsg("Something went wrong, Try agian.");
        });
  };
  const [card, setCard] = useState<Card[]>([]);
  useEffect(() => {
    setIsBiz(getBiz());
    getCardByUserId()
      .then((result) => {
        console.log(result.data);
        setCard(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isChanged]);
  return (
    <>
      <Navbar />
      <h1 className="display-4 text-center my-5 page-title">
        <i className="fa-regular fa-address-card"></i> My Cards{" "}
        <span style={{ color: "#eeeeee" }}>({card.length})</span>
      </h1>
      <div className="container-fluid w-75 mb-5">
        <div className="row allCards">
          {card.length ? (
            card.map((card: Card) => {
              return (
                <div key={card.card_id} className="col-lg-4 card bizCard">
                  <div className="top">
                    <div className="col-lg-11 text-center mx-2">
                      <img
                        src={card.business_image}
                        className="card-img-top m-2"
                        alt="..."
                      />
                    </div>
                  </div>

                  <div className="card-body overflow">
                    <h3 className="card-title text-center">
                      {card.business_name}
                    </h3>
                    <hr />
                    <div className="card-text mb-2 mt-4 text-center">
                      {card.business_desc}
                    </div>
                    <hr />
                    <div className="card-text mb-2 text-center">
                      <i className="fa-solid fa-phone"></i>{" "}
                      {card.business_phone}
                    </div>
                    <hr />
                    <div className="card-text mb-2 text-center">
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      {card.business_address}
                    </div>
                    {isBiz ? (
                      <div className="card-text text-center">
                        <hr />
                        <button className="btn btn-secondary m-2">
                          <Link
                            className="dropdown-item"
                            to={`edit/${card._id}`}
                          >
                            <i className="fa-regular fa-pen-to-square"></i> Edit
                            Card
                          </Link>
                        </button>
                        <button
                          className="btn btn-danger m-2"
                          onClick={() => handleDelete(card)}
                        >
                          <i className="fa-solid fa-trash-can"></i> Delete Card
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <h4 className="text-center mt-5">No Cards added..</h4>
              <img
                className="image mx-auto img-fluid mt-5"
                src="nocards.png"
                alt=""
              />
            </>
          )}
        </div>
      </div>
      <div className="text-center">
        <Footer />
      </div>
    </>
  );
};

export default Mycards;
