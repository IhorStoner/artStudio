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
    const [newType, setNewType] = useState('')
    const [oldType, setOldType] = useState('')
    const stateTypes = useSelector(getTypesOfClothing)
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
        dispatch(setTypesOfClothing([...stateTypes.filter(el => el !== elem)]))
        setNewType(elem)
        setOldType(elem)
    }

    const handleDelete = (name) => {
				dispatch(setDeleteOfClothing(name))
        // dispatch(setTypesOfClothing([...stateTypes.filter(el => el !== elem)]))
    }

		const setInstall = (obj) => {
			dispatch(setPositionCategory(obj))
		}

    return (
        <div className="container">
            <div className='eddit-categories'>
                {stateTypes.map((elem,i) => {  return(
                    <div key = {i} className='eddit-categories__select'>
                        <div key={elem} className='eddit-categories__select--span'><span>{elem}</span></div >
                        <div className='eddit-categories__select--svg'>
                            <CorrectSVG onClick={() => handleCorrect(elem)} />
                            <DeleteSVG onClick={() => handleDelete(elem)} />
														<input name="position" type="number" onChange = {(e) => setInstall({name: elem, pos: parseInt(e.target.value)})} />
                        </div>
                    </div>
                )}
                )}
                <div className="eddit-categories__input">
                    <input ref={renameInput} type='text' onChange={(e) => setNewType(e.target.value)} value={newType} />
                    <CreateNewSVG onClick={() => addNewType()} />
                </div>
            </div>
        </div>
    )
}