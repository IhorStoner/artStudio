import React, {useState, useEffect} from 'react'
import { removeProduct, rewriteOrderItem, setEmptyBasket,writeAndReplaceBasket } from '../../redux/action/storageAction'
import { ReactComponent as DeleteSVG } from '../../assets/svg/basketDelete.svg'
import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import config from '../../config/default.json'
import { useDispatch, useSelector } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector';

export const GoodsContainer = () => {
    const dispatch = useDispatch();
    const stateOrder = useSelector(getStateOrder);
    const [clothes, setClothes] = useState(useSelector(getStateOrder));

    useEffect(() => {
      setClothes(stateOrder);
    },[stateOrder]);

    return (
        <div className="sent-to-basket__goods-container">
            <div className="sent-to-basket__cards-container">
                {clothes.map((elem, i) => { return (
                    <div key={i} className='sent-to-basket__card-goods'>
                        <div className='sent-to-basket__addition-info'>
                          <div className="sent-to-basket__img-wrap">
                              <img className='sent-to-basket__picture-image' src={`${config.serverUrl}/api/images/${elem.image}`} />
                          </div>
                          <div className='sent-to-basket__card-goods--info'>
                              <div className="sent-to-basket__card-description">
                                <p>{elem.title}</p>
                                <p>Размер - {elem.size?.toUpperCase()}</p>
                              </div>
                          </div>
                        </div>
                        <div className='sent-to-basket__card-goods--amount'>
                            <div className="sent-to-basket__choose-size">
                                <button
                                    className="sent-to-basket__choose-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if(elem.amount > 1) dispatch(rewriteOrderItem({ ...elem, amount: elem.amount - 1 }))
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
                            <span className="sent-to-basket__cost-thangs">
                              <span className={`sent-to-basket__normal-price-basket ${elem.amount >= 10? "sent-to-basket__normal-price-basket--line-throught":""}`} >{elem.price * elem.amount} грн</span>
                              {elem.amount >= 10 ? <span className="sent-to-basket__sale-price-basket">{((elem.price * 0.9).toFixed(0) * elem.amount).toFixed(0)} грн  -10%</span>: ""}
                            </span>
                            <DeleteSVG className="sent-to-basket__remove-thangs-svg" onClick={() => { dispatch(removeProduct(elem._id)) }} />
                        </div>
                    </div>
                )})}
            </div>
            <div className="sent-to-basket__card-goods--total">
                <span> Итог <span ></span>{clothes.reduce((accum, elem) => { 
                  const price = elem.amount >= 10 ? (elem.price * .9).toFixed(0) : elem.price;
                  return accum + (price * elem.amount) }, 0).toFixed(0)} грн</span>
            </div>
        </div>
    )
}