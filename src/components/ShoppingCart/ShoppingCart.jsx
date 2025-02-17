import React, { useMemo, useState } from "react";
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';
import CountItems from '../constants';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import RecommendedShapes from "../../shapes/RecShapes";
import CartShapes from "../../shapes/CartShapes";

function CartItemList ({list}) {
    return (
        <div className={styles.leftBody}>
            {list.length && list.map((el) => (typeof(el) === 'object') ? <CartItem item={el} key={el.key}/> : '')}
        </div>
    );
}

function ShoppingCart ({cartId, rec}) {
     const itemList = useMemo(() => cartId.map((item) => {
        const equalId = rec.find(recVal => recVal.id === item.id);
        return { ...item, ...equalId, ...{key: nanoid()} };
    }), [cartId, rec]);
    const [x, setX] = useState(true);
    return (
        <div className={styles.cart}>
            <div className={styles.content}>
                <div className={styles.cartHead}>
                    <span>{CountItems}</span>
                    <h1>Корзина</h1>
                </div>
                <div className={styles.cartWrapper}>
                    <div className={styles.cartLeft}>
                        <div className={styles.leftHead}>
                            <div className={styles.headWrapper}>
                                <input type="checkbox" checked={x} onChange={() => setX(!x)} />
                                <span>Выбрать все</span>
                                <span className={styles.red}>Удалить выбранное</span>
                            </div>
                        </div>
                        <CartItemList list={itemList}/>
                    </div>
                    <div className={styles.cartRight}>
                    <div className={styles.rightGreenButton}>
                        <button>Перейти к оформлению</button>
                    </div>
                    <div className={styles.rightSum}>
                        <div className={styles.sumCount}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Ваша корзина</th>
                                        <td>{CountItems} товар * 600гр</td>
                                    </tr>
                                    <tr>
                                        <td>Товары ({CountItems})</td>
                                        <td className={styles.bolder}>12000 ₽</td>
                                    </tr>
                                    <tr>
                                        <td>Скидка</td>
                                        <td className={`${styles.bolder} ${styles.red}`}>- 5023 ₽</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <div className={styles.sumFinal}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Общая стоимость</th>
                                        <th>12000 ₽</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
        </div>
                </div>
            </div>
        </div>
    )
}
CartItemList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            weight: PropTypes.string.isRequired,
        })
    ),
}
ShoppingCart.propTypes = {
    rec: PropTypes.arrayOf(RecommendedShapes).isRequired,
    cartId: PropTypes.arrayOf(CartShapes).isRequired,
}
export default ShoppingCart;