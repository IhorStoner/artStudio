import React, { useState, useCallback, useRef } from 'react'
import './NewPictureForm.scss'
import axios from 'axios'
import config from '../../config/default.json'
import { getTypesOfClothing } from '../../redux/selector/picturesSelector'
import { useSelector } from 'react-redux'

export default function NewPictureForm() {
  const stateTypes = useSelector(getTypesOfClothing);
  const checkedInput = useRef(null);
  const inputVal = useRef(null);

  const [result, setResult] = useState({
    chart: {
      xxxs: { in: false, include: false },
      xxs: { in: false, include: false },
      xs: { in: false, include: false },
      s: { in: false, include: false },
      m: { in: false, include: false },
      l: { in: false, include: false },
      xl: { in: false, include: false },
      xxl: { in: false, include: false },
      xxxl: { in: false, include: false },
    },
		type: "newCategory",
		newVal: "",
    postionMenu: 0,
  })
  const [images, setImages] = useState([])
  const [successForm, setSuccessForm] = useState(false)

  async function wrap(ev, cb) {
    const btn = ev.target;

    ev.preventDefault();
    btn.setAttribute('disabled', true);

    const formData = getFormData();
    let json;
    try {
      json = await cb(formData);
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

  const showSuccess = () => {
    setSuccessForm(true)
    setTimeout(() => {
      setSuccessForm(false)
    }, [2000])
  }


  const setReset = () => {
    setResult({
      chart: {
        xxxs: { in: false, include: false },
        xxs: { in: false, include: false },
        xs: { in: false, include: false },
        s: { in: false, include: false },
        m: { in: false, include: false },
        l: { in: false, include: false },
        xl: { in: false, include: false },
        xxl: { in: false, include: false },
        xxxl: { in: false, include: false },
      }
    })
    setImages([])
    showSuccess()
  }

  const onSubmit = useCallback(async (ev) => {

    const resultImg = await submitAxios(ev)
    const InpNewCategory = inputVal.current
    const checkNewCategory = checkedInput.current

    if(checkNewCategory.checked === true && InpNewCategory.value === "") return undefined

    let finnalyData = result

    finnalyData.images = resultImg
    finnalyData.vendorCode = parseInt(+new Date() / 1000)

    const adId = await axios.post(`${config.serverUrl}/api/pictures`, finnalyData).then(res => setReset())

  }, [result])

  const handleDeleteImage = (file) => {
    setImages([...images].filter(img => img.name !== file.name))
  }

  const swithSizes = e => {
    setResult({ ...result, chart: { ...result.chart, [e.target.name]: { in: e.target.checked } } })
  }

  const setAvailabel = e => {
    let name = e.target.value
    let checked = e.target.checked
    setResult({ ...result, chart: { ...result.chart, [name]: { ...result.chart[name], include: checked } } })
  }

  const positionMenu = (e) => {
    const toDigit = parseInt(e.target.value);
    if(isNaN(toDigit)) return e.target.value = 0;
    setResult((prevState) => {
      return {...prevState, postionMenu: toDigit};
    })
  }
  console.log(result)
  return (
    <div className="container">
      {successForm && <div style={{ color: 'green', textAlign: 'center' }}>Картина добавлена</div>}
      <form className='newPictureForm'>
        <div className='newPictureForm__photos'>
          <p className="newPicture__text">
            Фото:
          </p>
          <div className='newPictureForm__images'>
            <label htmlFor="files" className="newPictureForm__labelFile">
              <input className='newPictureForm__inputFile' id='files' name='files' type="file" multiple onChange={(e) => { setImages((images) => [...images, ...e.target.files]) }} />
            </label>
            {[...images].map((file, i) =>
              <div key={i} className="newPictureForm__imgContainer">
                <button type='button' className="newPictureForm__btnDelImg" onClick={() => handleDeleteImage(file)}>
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                      <path d="M25 5C13.9543 5 5 13.9543 5 25C5 36.0457 13.9543 45 25 45C36.0457 45 45 36.0457 45 25C45 13.9543 36.0457 5 25 5ZM25 41.0284C16.1478 41.0284 8.97163 33.8522 8.97163 25C8.97163 16.1478 16.1478 8.97163 25 8.97163C33.8522 8.97163 41.0284 16.1478 41.0284 25C41.0284 33.8522 33.8522 41.0284 25 41.0284Z" fill="white" />
                      <path d="M32.9675 31.4806L26.5111 25.0243L32.9675 18.568C33.3781 18.1573 33.3781 17.4917 32.9675 17.081C32.5568 16.6704 31.8911 16.6704 31.4805 17.081L25.0242 23.5373L18.5679 17.081C18.1572 16.6704 17.4916 16.6704 17.0809 17.081C16.6703 17.4917 16.6703 18.1573 17.0809 18.568L23.5372 25.0243L17.0809 31.4806C16.6703 31.8912 16.6703 32.5569 17.0809 32.9675C17.4916 33.3782 18.1572 33.3782 18.5679 32.9675L25.0242 26.5112L31.4805 32.9675C31.8911 33.3782 32.5568 33.3782 32.9675 32.9675C33.3781 32.557 33.3781 31.8912 32.9675 31.4806Z" fill="white" />
                    </g>
                    <defs>
                      <filter id="filter0_d" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
            )
            }
          </div>
        </div>
        <div className="newPictureForm__text newPictureForm__container">
          <span>Название</span>
          <input className="newPictureForm__input" type="text" value={result.title} onInput={(e) => setResult({ ...result, title: e.target.value })} />
        </div>
        <div className="newPictureForm__text newPictureForm__container">
          <span>Описание</span>
          <textarea className="newPictureForm__input" type="text" value={result.text} onInput={(e) => setResult({ ...result, text: e.target.value })} ></textarea>
        </div>
        <div className="newPictureForm__container">
          <span>Тип</span>

          <div className='newPictureForm__labelContainer'>
						<span className="newPictureForm__checkbox" onClick = {() => {setResult({ ...result, type: inputVal.current.value })}}>
							<input className="newPictureForm__dote" ref={checkedInput} id="update" value={result.newVal} name='type' type='radio' checked = {result.type === result.newVal ? true : false} />
							<label  htmlFor="update" className='newPictureForm__radioContainer'>
								<input  ref={inputVal} onInput = {(e) => { setResult({ ...result, type: e.target.value, newVal: e.target.value }); checkedInput.current.checked = true; checkedInput.current.value = e.target.value}} className="newPictureForm__new-category" name="newCategory" type="text" placeholder="Добавить новую категорию" />
							</label>
            </span>
            {
              stateTypes.map((typeClothes,i) => {	return (
                <span key={typeClothes+i} className="newPictureForm__checkbox">
                  <input className="newPictureForm__dote" type='radio' id={typeClothes} name='type' value={typeClothes} onChange={(e) => {setResult({ ...result, type: e.target.value })}} />
									<label key={i} htmlFor={typeClothes} className='newPictureForm__radioContainer'>{typeClothes}</label>
                </span>
              )})
            }
            {/* <label htmlFor="t-shirts" className='newPictureForm__radioContainer'>
              <input type='radio' id='t-shirts' name='type' value="t-shirts" onChange={(e) => setResult({ ...result, type: e.target.value })} />
              <span>Футболки</span>
            </label>
            <label htmlFor="jackets" className='newPictureForm__radioContainer'>
              <input type='radio' id='jackets' name='type' value="jackets" onChange={(e) => setResult({ ...result, type: e.target.value })} />
              <span >Куртки</span>
            </label>
            <label htmlFor="jumpsuits" className='newPictureForm__radioContainer'>
              <input type='radio' id='jumpsuits' name='type' value="jumpsuits" onChange={(e) => setResult({ ...result, type: e.target.value })} />
              <span >Комбинизоны</span>
            </label> */}
          </div>
        </div>
        {/* <div className="newPictureForm__container newPictureForm__container__override-shift">
          <span>Добавить</span>
          <label className='newPictureForm__radioContainer  newPictureForm__center'></label>
            <input ref={checkedInput} value="newCategory" name='type' type='radio' checked="checked" />
            <input ref={inputVal} onInput = {(e) => {setResult({ ...result, type: e.target.value }); checkedInput.current.checked = true}} className="newPictureForm__new-category" name="newCategory" type="text" placeholder="Новую Категорию" />
        </div> */}
        <div className="newPictureForm__container">
          <span>Позиция</span>
          <span className="newPictureForm__container-position-wrapper">
            <input onChange={positionMenu} name="position" type="number" defaultValue={0} className="newPictureForm__new-category newPictureForm__new-category-position-menu"/>
          </span>
        </div>
        <div className="newPictureForm__sizes">
          Размеры
          <div className="newPictureForm__checkboxContainer">
            <div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.xxxl.in} id="xxxl" onChange={(e) => swithSizes(e)} name="xxxl" />
                <label htmlFor="xxxl">XXXL</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.xxl.in} id="xxl" onChange={(e) => swithSizes(e)} name="xxl" />
                <label htmlFor="xxl">XXL</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.xl.in} id="xl" onChange={(e) => swithSizes(e)} name="xl" />
                <label htmlFor="xl">XL</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.l.in} id="l" onChange={(e) => swithSizes(e)} name="l" />
                <label htmlFor="l">L</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.m.in} id="m" onChange={(e) => swithSizes(e)} name="m" />
                <label htmlFor="m">M</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.s.in} id="s" onChange={(e) => swithSizes(e)} name="s" />
                <label htmlFor="s">S</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.xs.in} id="xs" onChange={(e) => swithSizes(e)} name="xs" />
                <label htmlFor="xs">XS</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" checked={result.chart.xxs.in} id="xxs" onChange={(e) => swithSizes(e)} name="xxs" />
                <label htmlFor="xxs">XXS</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" id="xxxs" onChange={(e) => swithSizes(e)} name="xxxs" checked={result.chart.xxxs.in} />
                <label htmlFor="xxxs">XXXS</label>
              </div>
            </div>

            <div>
							<div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="iclude_XXL" disabled={!result.chart.xxxl.in} onClick={(e) => setAvailabel(e)} name="iclude_XXL" value="xxxl" />
                <label htmlFor="iclude_XXL">Есть в наличии</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="iclude_XXL" disabled={!result.chart.xxl.in} onClick={(e) => setAvailabel(e)} name="iclude_XXL" value="xxl" />
                <label htmlFor="iclude_XXL">Есть в наличии</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="include_XL" disabled={!result.chart.xl.in} onClick={(e) => setAvailabel(e)} name="include_XL" value="xl" />
                <label htmlFor="include_XL">Есть в наличии</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="include_L" disabled={!result.chart.l.in} onClick={(e) => setAvailabel(e)} name="include_L" value="l" />
                <label htmlFor="include_L">Есть в наличии</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="include_M" disabled={!result.chart.m.in} onClick={(e) => setAvailabel(e)} name="include_M" value="m" />
                <label htmlFor="include_M">Есть в наличии</label>
              </div>

              <div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="Include_S" disabled={!result.chart.s.in} onClick={(e) => setAvailabel(e)} name="Include_S" value="s" />
                <label htmlFor="Include_S">Есть в наличии</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="include_XS" disabled={!result.chart.xs.in} onClick={(e) => setAvailabel(e)} name="include_XS" value="xs" />
                <label htmlFor="include_XS">Есть в наличии</label>
              </div>
							<div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="include_XXS" disabled={!result.chart.xxs.in} onClick={(e) => setAvailabel(e)} name="include_XXS" value="xxs" />
                <label htmlFor="include_XXS">Есть в наличии</label>
              </div>
              <div className="newPictureForm__boxContainer">
                <input type="checkbox" defaultChecked={false} id="include_XXXS" disabled={!result.chart.xxxs.in} onClick={(e) => setAvailabel(e)} name="includeXXXS" value="xxxs" />
                <label htmlFor="include_XXXS">Есть в наличии</label>
              </div>

            </  div>

          </div>

        </div>
        <div className="newPictureForm__showIncludes">
          <span>На сайте</span>
          <div>
            <div>
              <input type='radio' id='turnON' name='includesInSite' value="exist" onChange={(e) => setResult({ ...result, onSite: e.target.value })} />
              <label htmlFor="turnON" className='newPictureForm__radioContainer'>
                <span>Да</span></label>
            </div>
            <div>
              <input type='radio' id='turnOff' name='includesInSite' value="unExist" onChange={(e) => delete result.onSite} />
              {/* <input type='radio' id='turnOff' name='includesInSite' value="turnOff" onChange={(e) => setResult({ ...result, onSite: e.target.value })} /> */}
              <label htmlFor="turnOff" className='newPictureForm__radioContainer'>
                <span>Нет</span></label>
            </div>
          </div>

        </div>
        <div className="newPictureForm__text newPictureForm__container">
          <span>Цена</span>
          <input className="newPictureForm__input" type="number" value={result.price} onChange={(e) => {
            console.log(e.target.value)
            setResult({ ...result, price: e.target.value })
          }} />
        </div>
        <div className="newPictureForm__submitContainer">
          <button type='submit' className='newPictureForm__btnSubmit' onClick={(ev) => {ev.preventDefault(); onSubmit(ev) }}> Добавить </button>
        </div>
      </form>
    </div>

  )
}
