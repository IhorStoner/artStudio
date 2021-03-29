import React, {useEffect, useState} from 'react'
import { removeProduct, rewriteOrderItem, setEmptyBasket } from '../../redux/action/storageAction'
import { ReactComponent as DeleteSVG } from '../../assets/svg/basketDelete.svg'
import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import config from '../../config/default.json'
import { useDispatch, useSelector } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector'



export const GoodsContainer = () => {
    const dispatch = useDispatch()
    const stateOrder = useSelector(getStateOrder);
    const [goods,setGoods] = useState(stateOrder);

    useEffect(() => {
        setGoods(stateOrder)
    },[stateOrder])

    return (
        <div className="order-form__goods-container">
            <div className="order-form__cards-container">
                {stateOrder.map((elem, i) => {return (
                    <div key={i} className='order-form__card-goods'>
                        <div className='order-form__card-goods--info'>
                            <img className='order-form__card-goods--img' src={`${config.serverUrl}/api/images/${elem.image}`}/>
                            <div className="order-form__count-label-area">
                                <span>
                                    <p>{elem.title}</p>
                                    <p>Размер - {elem.size?.toUpperCase()}</p>
                                </span>
                                <div className="order-form__choose-size">
                                    <button
                                        className="order-form__choose-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            elem.amount > 1 && dispatch(rewriteOrderItem({ ...elem, amount: elem.amount - 1 }))
                                        }}
                                    >
                                        <Discreate />
                                    </button>
                                    {elem.amount}
                                    <button
                                        className="order-form__choose-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(rewriteOrderItem({ ...elem, amount: elem.amount + 1 }))
                                        }}
                                    >
                                        <Increate />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='order-form__card-goods--amount'>
                            <DeleteSVG onClick={() => { dispatch(removeProduct(elem._id)) }} />
                            <span className={`sent-to-basket__normal-price-basket ${elem.amount >= 10? "sent-to-basket__normal-price-basket--line-throught":""}`} >{elem.price * elem.amount} грн</span>
                            {elem.amount >= 10 ? <span className="sent-to-basket__sale-price-basket">{((elem.price * 0.9).toFixed(1) * elem.amount).toFixed(1)} грн  -10%</span>: ""}
                        </div>
                    </div>
                )})}
            </div>
            <div className="order-form__card-goods--total">
                <span className="order-form__card-goods-summ"> Итог: </span>
                <span className="order-form__card-goods-summ">{goods.reduce((accum, elem) => { 
                  const price = elem.amount >= 10 ? (elem.price * .9).toFixed(1) : elem.price;
                  return accum + (price * elem.amount) }, 0).toFixed(1)} грн</span> 
            </div>
        </div>
    )
}