import React from "react";
import './Delivery.scss';

export default function Delivery(props){
    return(
        <div className="delivery">
            <div className="delivery__container">
                <div className="delivery__header">
                    <h4 className="delivery__h4">Доставка</h4>
                </div>
                <div className="delivery__country">
                    <h6 className="delivery__h6">Украина</h6>
                    <span className="delivery__text">
                        Доставка заказов осуществляется Транспортной Компанией «Новая Почта». Срок доставки 2-3 дня с момента подтверждения заказа при наличии товара на складе (при отсутствии товара на складе срок доставки может быть увеличен до 6 календарных дней), по Одессе доставка 24 часа с момента подтверждения заказа. Стоимость доставки согласно тарифов ТК «Новая Почта». При заказе товара от 5единиц доставка осуществляется бесплатно.
                    </span>
                    <h6 className="delivery__h6">Другие страны.</h6>
                    <span className="delivery__text">
                        Международная почта – срок доставки 10-16 рабочих дней. Стоимость доставки 15$.
                    </span>
                </div>
                <div className="delivery__pay">
                    <h4 className="delivery__h4 delivery__h4--shifting">
                        Оплата
                    </h4>
                    <h6 className="delivery__h6">Украина</h6>
                    <span className="delivery__text delivery__text--shift">
                        Безналичный расчет
                    </span>
                    <span className="delivery__text">
                        Оплата производится в гривне на карту Приват Банка через приложение Приват24 или терминал с учетом комиссии Вашего Банка.
                    </span>
                </div>
                <div className="delivery__send-pay">
                    <h4 className="delivery__h4 delivery__h4--bold">
                        Наложенный платеж
                    </h4>
                    <span className="delivery__text">
                        Оплата при получении в отделении «Нова Почта» + 2% комиссии от суммы заказа за наложенный платеж
                        Заказы отправляются по предоплате 10% от стоимости заказа, но не менее 100 UAH. Эта сумма является страховочным платежом, который покрывает издержки доставки в обе стороны, если Вы по какой то причине не забрали посылку.
                        Внимание! Данный способ оплаты (наложенный платеж) является безопасным, но экономически не выгодным, комиссия за наложенный платеж взымается при доставке Новой Почтой. 
                    </span>
                </div>
                <div className="delivery__different-country">
                    <h6 className="delivery__h6">Другие страны</h6>
                    <span className="delivery__text">
                        Полная оплата заказа. Оплата любой картой мира.
                    </span>
                </div>
            </div>
        </div>
    )
}