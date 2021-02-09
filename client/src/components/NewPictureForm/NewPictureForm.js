import React,{useState,useCallback} from 'react'
import './NewPictureForm.scss'
import axios from 'axios'
import config from '../../config/default.json'

export default function NewPictureForm() {
  const [result,setResult] = useState({})
  const [images,setImages] = useState([])


  
  async function wrap(ev, cb) {
    const btn = ev.target;

    ev.preventDefault();
    btn.setAttribute('disabled', true);

    const formData = getFormData();
    let json;
    try {
      json = await cb(formData);
      console.log(json)
    } catch (err) {
      console.error(err);
    }

    btn.removeAttribute('disabled');
    return json
  }

  function getFormData() {
    const formData = new FormData();
    [...images].map(img => formData.append('pictures',img))

    return formData;
  }
  /// сохранение картинок
  async function submitAxios(ev) {

    return wrap(ev, async (formData) => {
      
      const { data } = await axios.post(
        `${config.serverUrl}/api/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      )

      return data;
    });
  }

  const onSubmit = useCallback(async (ev) => {
    const resultImg = await submitAxios(ev)
    let finnalyData = result
    finnalyData.images = resultImg
    
    const adId = await axios.post(`${config.serverUrl}/api/pictures`, finnalyData)

  }, [result])

  return (
    <form className='newPictureForm'>
      <div className='newPictureForm__container'>
        Добавление фото
        <input type="file" multiple onChange={(e) =>setImages(e.target.files)}/>
      </div>
      <div className="newPictureForm__text newPictureForm__container">
        Введите описание
        <input type="text" value={result.text} onChange={(e) => setResult({...result,text: e.target.value})}/>
      </div>
      <div className="newPictureForm__text newPictureForm__container">
        Введите цену
        <input type="number" value={result.price} onChange={(e) => setResult({...result,price: e.target.value})}/>
      </div>
      <div className="newPictureForm__container">
        Выберете тип:
        <select name="type">
          <option value="oil">Масло</option>
          <option value="acrylic">Акрил</option>
        </select>
      </div>
      <button type='button' onClick={(ev) => onSubmit(ev)}>Добавить в галерею</button>
    </form>
  )
}
