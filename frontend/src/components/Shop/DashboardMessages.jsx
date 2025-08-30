import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/style";
import { TfiGallery } from "react-icons/tfi";

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-seller-conversation/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => console.log(error));
  }, [seller]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-auto rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-family-poppins">
            All Messages
          </h1>
          {/* messages list */}
          {conversations?.map((item, index) => (
            <MessageList
              data={item}
              index={index}
              key={index}
              setOpen={setOpen}
            />
          ))}
        </>
      )}

      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, index, setOpen }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    console.log("fdfjasd");
  };

  return (
    <div
      className={`w-full flex p-3  
        cursor-pointer ${
          active === index ? " bg-[#f2f1f1]" : "bg - transparent"
        }`}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setOpen(true)
      }
    >
      <div className="relative">
        <img
          src="http://localhost:3000/dress1-1756374862363-885265362.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full "
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[4px] right-[0px]" />
      </div>

      <div className="pl-3">
        <h1 className="pl-3 text-[18px]">Azra javed</h1>
        <p>hi how are you i am so excited to code and i am currently doing</p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col  justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200 ">
        <div className="flex ">
          <img
            src="http://localhost:3000/dress1-1756374862363-885265362.png"
            alt=""
            className="w-[60px] h-[60px] rounded-full "
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">Azra javed</h1>
            <h1>Active now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          onClick={() => setOpen(false)}
          className="cursor-pointer"
        />
      </div>

      {/* messages */}
      <div
        className="px-3 h-[65vh] py-1 
      overflow-y-auto"
      >
        <div className="flex w-full my-2">
          <img
            src="http://localhost:3000/dress1-1756374862363-885265362.png"
            alt=""
            className="w-[40px] h-[40px] rounded-full mr-3 "
          />
          <div className="w-max rounded p-2 bg-[#47ca56] text-white h-min">
            <p>Hello there</p>
          </div>
        </div>

        <div className="flex w-full justify-end my-2">
          <div className="w-max rounded p-2 bg-[#47ca56] text-white h-min">
            <p>Hello there!</p>
          </div>
        </div>
      </div>

      {/* send message input */}
      <form className=" w-full relative flex justify-between items-center p-3">
        <div className="w-[3%]">
          <TfiGallery className="cursor-pointer" size={20} />
        </div>
        <div className="w-[97%] ml-3">
          <input
            type="text"
            placeholder="Enter your message..."
            className={`${styles.input}`}
            required
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-5 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
