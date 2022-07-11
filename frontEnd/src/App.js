import { useState } from 'react'
import axios from 'axios'



async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("name", "khaled")
  formData.append("email", "marah.m.naser@gmail.com")
  formData.append("password", "khaled123456")
  formData.append("city", "gaza"),
  formData.append("address", "khaled")
  formData.append("gender", "man")
  formData.append("phoneNumber", 12345467864)

  const result = await axios.post("http://localhost:5000/api/auth/signup", formData)
  return result.data
}


function App() {

  const [file, setFile] = useState()
 
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}

      <img src="/images/9fa06d3c5da7aec7f932beb5b3e60f1d"></img>

    </div>
  );
}

export default App;