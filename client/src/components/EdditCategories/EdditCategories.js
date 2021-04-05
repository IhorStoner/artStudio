import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTypesOfClothing, setTypesOfClothing, setDeleteOfClothing, setPositionCategory } from '../../redux/action/picturesAction'
import { getTypesOfClothing } from '../../redux/selector/picturesSelector'
import { ReactComponent as DeleteSVG } from '../../assets/svg/delete.svg'
import { ReactComponent as CreateNewSVG } from '../../assets/svg/CreateNewTypeOfClothing.svg'
import { ReactComponent as CorrectSVG } from '../../assets/svg/correct.svg'
import config from '../../config/default.json'


import './EdditCategories.scss'
import axios from 'axios'

export const EdditCategories = () => {
	const stateTypes = useSelector(getTypesOfClothing);
    const [newType, setNewType] = useState('')
    const [oldType, setOldType] = useState('')
		const [orderMenu, setOrderMenu] = useState(() => {
			return stateTypes.map((el, i) => {return  {name: el, pos: i +1}})
		})
    const dispatch = useDispatch()
    const renameInput = useRef();

    const handleRename = async () => {
        await axios.post(`${config.serverUrl}/api/pictures/rename/`, { oldType, newType }).then(response => { setOldType(null); console.log('it\'s ok') })
    }

    useEffect(() => {
        dispatch(fetchTypesOfClothing())
    }, [])




    const addNewType = () => {
        if (newType.length < 3) { return }
        if (stateTypes.includes(newType)) { alert('Такой тип уже существует'); return }
        // if (oldType) {handleRename()}
        dispatch(setTypesOfClothing({oldName: oldType, newType: newType}))
    }

    const handleCorrect = (elem) => {
        // dispatch(setTypesOfClothing([...stateTypes.filter(el => el !== elem)]))
        setNewType(elem)
        setOldType(elem)
    }

    const handleDelete = (name) => {
			dispatch(setDeleteOfClothing(name))
        // dispatch(setTypesOfClothing([...stateTypes.filter(el => el !== elem)]))
    }


		const setPositionInMenu = (e) => {
			const val = parseInt(e.target.value) 
			const name = e.target.name;
			setOrderMenu((prevState) => {
				const index = prevState.findIndex( el => el.name === name);
				prevState[index].pos = val;
				return prevState
			})
		}

		const sendOrderMenu = () => {
			dispatch(setPositionCategory(orderMenu))
		}

    return (
        <div className="container">
            <div className='eddit-categories'>
                {stateTypes.map((elem,i) => { return(
                    <div key = {i} className='eddit-categories__select'>
                        <div key={elem} className='eddit-categories__select--span'><span>{elem}</span></div>
                        <div className='eddit-categories__select--svg'>
                            <CorrectSVG onClick={() => handleCorrect(elem)} />
                            <DeleteSVG onClick={() => handleDelete(elem)} />
														<input name={elem} type="number" defaultValue={i +1} onChange = {setPositionInMenu} />
                        </div>
                    </div>
                )}
                )}
                <div className="eddit-categories__input">
                    <input ref={renameInput} type='text' onChange={(e) => setNewType(e.target.value)} value={newType} />
                    <CreateNewSVG onClick={() => addNewType()} />
					<button className="eddit-categories__orders-menu" onClick={sendOrderMenu}>Вывод меню</button>
                </div>
            </div>
        </div>
    )
}