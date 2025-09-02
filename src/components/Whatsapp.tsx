import "./Whatsapp.css";

import whatsapp from "../assets/img/whatsapp.png";

const Whatsapp: React.FC = () => {
  const phoneNumber = "+16182274072";
  const WhatsappClick = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="whatsapp-img-div">
        <div className="whatsapp-img-size" onClick={WhatsappClick}>
          <img src={whatsapp} alt="whatsapp" className="whatsapp-img" />
        </div>{" "}
      </div>
    </div>
  );
};

export default Whatsapp;
