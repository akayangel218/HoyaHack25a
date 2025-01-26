import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import './ClassifierCheng.css';
import FileUpload from "../../components/Classification/FileUpload.jsx";
import LoadingModal from "../../components/UiElements/LoadingModal.jsx";
import chatpoint from '../../assets/ChatPoint.svg';

const ClassifierCheng = () => {
  const [messageList, setMessageList] = useState([]);
  const [messageLoaded, setMessageLoaded] = useState({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0); 
  const containerRef = useRef(null); 

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messageList]);

  async function handleImageUpload(event) {
    console.log(count);
    console.log("hlkj");
    const file = event.target.files[0];
    let imageUrl;
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
    setMessageList((prev) => [...prev, {id: count, image: imageUrl, classification: "loading"}])
    console.log(messageList);
    console.log("I am here!!!");
    const response = await chengModelQuery(file);
    console.log(response);
    if(!response){
      console.log("hceck");
      setMessageList((prev) => prev.map(message => {
        if(message.id === count){
          return {id: message.id, image: message.image, classification: "Error"}
        }
        return message;
      }));
      setCount((prev) => prev + 1);
      return;
    }
    setMessageList((prev) => prev.map(message => {
      if(message.id === count){
        return {id: message.id, image: imageUrl, classification: JSON.parse(JSON.stringify(response[0].label)).replace(/_/g, ' ')}
      }
      return message;
    }));
    setCount((prev) => prev + 1);
    console.log(messageList);
  };

  async function chengModelQuery(imageFile) {


      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('image', imageFile);

      setLoading(true);
        // fetch from backend
      const response = await fetch('https://hoyahacks25backend.onrender.com/chengml/upload', {
        method: 'POST',
        body: formData
      })

      
    // console.log("in Cheng model query function")

      //   process response
      const result  = await response.json().then(data => {

        // Handle the response from the backend
        console.log(data.predicted_class);
        
        const diseaseDictionary = {
          "0": "Actinic keratosis",
          "1": "Basal cell carcinoma",
          "2": "Benign keratosis",
          "3": "Dermatofibroma",
          "4": "Melanocytic nevus",
          "5": "Melanoma",
          "6": "Squamous cell carcinoma",
          "7": "Vascular lesion"
        };
  
        return diseaseDictionary[data.predicted_class]
  
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

      setLoading(false);

      return result;

  }

  return (
    <main className="classifier-page">
        <div className="classifier-page__message-container" ref={containerRef}>
          {messageList.map((message) => {
            return (
              <div className="classifier-page__message" key={message.id}>
                <div className="classifier-page__user-message">
                  <CSSTransition in={messageLoaded[message.id]}timeout={200} classNames="message" 
                  onEntered={() => {setMessageLoaded((prev) => ({ ...prev, [message.id]: true }))}} >
                  <img
                    src={message.image}
                    alt="Uploaded Preview"
                    onLoad={() => setMessageLoaded((prev) => ({ ...prev, [message.id]: true }))}
                  />
                  </CSSTransition>
                </div>
                  <CSSTransition in={messageLoaded[message.id]} timeout={900} classNames="messagef" mountOnEnter>
                  <div className="classifier-page__response-message">
                  {loading && message.classification == "loading" ? (
                    <LoadingModal />
                  ) : (
                    <>{message.classification}</>
                  )}
                  <img className="chat-point"src={chatpoint}/>
                </div>
                </CSSTransition>
              </div>
            );
          })}
        </div>
        <FileUpload onImageUpload={handleImageUpload}></FileUpload>
    </main>
  );
};

export default ClassifierCheng;
