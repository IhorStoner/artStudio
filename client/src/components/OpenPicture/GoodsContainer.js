import React from 'react'

import { removeProduct, rewriteOrderItem, setEmptyBasket } from '../../redux/action/storageAction'
import { ReactComponent as DeleteSVG } from '../../assets/svg/basketDelete.svg'
import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import config from '../../config/default.json'
import { useDispatch, useSelector } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector'



export const GoodsContainer = () => {
    const dispatch = useDispatch()
    const stateOrder = useSelector(getStateOrder)

    return (
        <div className="sent-to-basket__goods-container">
            <div className="sent-to-basket__cards-container">
                {stateOrder.map((elem, i) => (
                    <div key={i} className='sent-to-basket__card-goods'>
                        <img className='sent-to-basket__card-goods--img' src={`${config.serverUrl}/api/images/${elem.image}`}></img>
                        <div className='sent-to-basket__card-goods--info'>
                            <span>
                                <p>{elem.title}</p>
                                <p>Размер - {elem.size?.toUpperCase()}</p>
                            </span>
                            <div className="sent-to-basket__choose-size">
                                <button
                                    className="sent-to-basket__choose-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        elem.amount > 1 && dispatch(rewriteOrderItem({ ...elem, amount: elem.amount - 1 }))
                                    }}
                                >
                                    <Discreate />
                                </button>
                                {elem.amount}
                                <button
                                    className="sent-to-basket__choose-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(rewriteOrderItem({ ...elem, amount: elem.amount + 1 }))
                                    }}
                                >
                                    <Increate />
                                </button>
                            </div>
                        </div>
                        <div className='sent-to-basket__card-goods--amount'>
                            <DeleteSVG onClick={() => { dispatch(removeProduct(elem._id)) }} />
                            <p>{elem.price} грн</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="sent-to-basket__card-goods--total">
                <span> Итог <span ></span>{stateOrder.reduce((accum, elem) => { return accum + (elem.price * elem.amount) }, 0)} грн</span>
            </div>
        </div>
    )
}