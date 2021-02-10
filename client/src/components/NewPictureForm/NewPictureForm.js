import React, { useState, useCallback } from 'react'
import './NewPictureForm.scss'
import axios from 'axios'
import config from '../../config/default.json'

export default function NewPictureForm() {
  const [result, setResult] = useState({})
  const [images, setImages] = useState([])
  const [successForm,setSuccessForm] = useState(false)


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
    [...images].map(img => formData.append('pictures', img))

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

    const adId = await axios.post(`${config.serverUrl}/api/pictures`, finnalyData).then(res => setSuccessForm(true))

  }, [result])

  const handleDeleteImage = (file) => {
    setImages([...images].filter(img => img.name !== file.name))
  }

  return (
    <div className="container">
      {successForm && <div style={{color:'green',textAlign:'center'}}>Картина добавлена</div>}
      <form className='newPictureForm'>
        <div className='newPictureForm__photos'>
          <p className="newPicture__text">
            Фото:
          </p>
          {!images.length && <label htmlFor="files" className="newPictureForm__labelFile">
            <input className='newPictureForm__inputFile' id='files' name='files' type="file" multiple onChange={(e) => setImages(e.target.files)} />
          </label>}
          <div className='newPictureForm__images'>
            {[...images].map((file, i) => (
              <div className="newPictureForm__imgContainer">
                <button type='button' className="newPictureForm__btnDelImg" onClick={() => handleDeleteImage(file)}>
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                      <path d="M25 5C13.9543 5 5 13.9543 5 25C5 36.0457 13.9543 45 25 45C36.0457 45 45 36.0457 45 25C45 13.9543 36.0457 5 25 5ZM25 41.0284C16.1478 41.0284 8.97163 33.8522 8.97163 25C8.97163 16.1478 16.1478 8.97163 25 8.97163C33.8522 8.97163 41.0284 16.1478 41.0284 25C41.0284 33.8522 33.8522 41.0284 25 41.0284Z" fill="white" />
                      <path d="M32.9675 31.4806L26.5111 25.0243L32.9675 18.568C33.3781 18.1573 33.3781 17.4917 32.9675 17.081C32.5568 16.6704 31.8911 16.6704 31.4805 17.081L25.0242 23.5373L18.5679 17.081C18.1572 16.6704 17.4916 16.6704 17.0809 17.081C16.6703 17.4917 16.6703 18.1573 17.0809 18.568L23.5372 25.0243L17.0809 31.4806C16.6703 31.8912 16.6703 32.5569 17.0809 32.9675C17.4916 33.3782 18.1572 33.3782 18.5679 32.9675L25.0242 26.5112L31.4805 32.9675C31.8911 33.3782 32.5568 33.3782 32.9675 32.9675C33.3781 32.557 33.3781 31.8912 32.9675 31.4806Z" fill="white" />
                    </g>
                    <defs>
                      <filter id="filter0_d" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2.5" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </button>
                <img src={URL.createObjectURL(file)} className='newPicture__imgItem' width='200' height='200'></img>
              </div>
            ))}
          </div>
        </div>
        <div className="newPictureForm__text newPictureForm__container">
          <span>Название</span>
          <input className="newPictureForm__input" type="text" value={result.title} onChange={(e) => setResult({ ...result, title: e.target.value })} />
        </div>
        <div className="newPictureForm__text newPictureForm__container">
          <span>Описание</span>
          <textarea className="newPictureForm__input" type="text" value={result.text} onChange={(e) => setResult({ ...result, text: e.target.value })} />
        </div>
        <div className="newPictureForm__container">
          <span>Тип краски:</span>
          <div className='newPictureForm__labelContainer'>
            <label htmlFor="acrylic" className='newPictureForm__radioContainer'>
              <span>Акрил</span>
              <input className='newPictureForm__radio' type='radio' id='acrylic' name='type' value="acrylic" onChange={(e) => setResult({ ...result, type: e.target.value })} />
            </label>
            <label htmlFor="oil" className='newPictureForm__radioContainer'>
              <span className='newPictureForm__radioText'>Масло</span>
              <input className='newPictureForm__radio' type='radio' id='oil' name='type' value="oil" onChange={(e) => setResult({ ...result, type: e.target.value })} />
            </label>

          </div>
        </div>
        <div className="newPictureForm__text newPictureForm__container">
          <span>Цена</span>
          <input className="newPictureForm__input" type="number" value={result.price} onChange={(e) => setResult({ ...result, price: e.target.value })} />
        </div>
        <div className="newPictureForm__submitContainer">
          <button type='button' className='newPictureForm__btnSubmit' onClick={(ev) => onSubmit(ev)}>Добавить</button>
        </div>
      </form>
    </div>

  )
}
