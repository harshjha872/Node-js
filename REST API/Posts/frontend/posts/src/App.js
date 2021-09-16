import { Fragment, useState } from "react";

function App() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  let files;
  fetch("http://localhost:8080/")
    .then((res) => res.json())
    .then((result) => {
      setContent(result);
    });

  const imageHandler = (e) => {
    console.log(e.target.files[0]);
    files = e.target.files[0];
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", message);
    formData.append("file", files);

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
        <input type="file" onChange={imageHandler} />
        {/* <img src={imageUrl} alt="upload image" /> */}
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
}

export default App;
