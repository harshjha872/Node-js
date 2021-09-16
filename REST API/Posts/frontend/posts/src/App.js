import { Fragment, useEffect, useState } from "react";

function App() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  let files;
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((result) => {
        setContent(result);
      });
  }, []);

  const imageHandler = (e) => {
    files = e.target.files[0];
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", files);

    fetch("http://localhost:8080/sendpost", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  const inputTextHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Fragment>
      <div>{content}</div>
      <form onSubmit={onsubmitHandler}>
        <input type="text" onChange={inputTextHandler} value={message} />
        <input type="file" onChange={imageHandler} name="image" />
        {/* <img src={imageUrl} alt="upload image" /> */}
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
}

export default App;
