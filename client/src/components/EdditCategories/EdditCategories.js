import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTypesOfClothing, setTypesOfClothing } from '../../redux/action/picturesAction'
import { getTypesOfClothing } from '../../redux/selector/picturesSelector'
import { ReactComponent as DeleteSVG } from '../../assets/svg/delete.svg'
import { ReactComponent as CreateNewSVG } from '../../assets/svg/CreateNewTypeOfClothing.svg'
import { ReactComponent as CorrectSVG } from '../../assets/svg/correct.svg'


import './EdditCategories.scss'

export const EdditCategories = () => {
    const [newType, setNewType] = useState('')
    const stateTypes = useSelector(getTypesOfClothing)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTypesOfClothing())
    }, [])


    const addNewType = () => {
        if (newType.length < 3) { return }
        if (stateTypes.includes(newType)) { alert('Такой тип уже существует'); return }
        // const withCapitalLetter = newType.charAt(0).toUpperCase() + newType.substr(1).toLowerCase()
        dispatch(setTypesOfClothing([...stateTypes, newType]))
    }

    const handleCorrect = (elem) => {
        dispatch(setTypesOfClothing([...stateTypes.filter(el => el !== elem)]))
        setNewType(elem)
    }

    const handleDelete = (elem) => {
        dispatch(setTypesOfClothing([...stateTypes.filter(el => el !== elem)]))
    }

    return (
        <div className="container">
            <div className='eddit-categories'>
                {stateTypes.map(elem => (
                    <div className='eddit-categories__select'>
                        <div key={elem} className='eddit-categories__select--span'><span>{elem}</span></div >
                        <div className='eddit-categories__select--svg'>
                            <CorrectSVG onClick={() => handleCorrect(elem)} />
                            <DeleteSVG onClick={() => handleDelete(elem)} />
                        </div>
                    </div>
                )
                )}
                <div className="eddit-categories__input"> <input type='text' onChange={(e) => setNewType(e.target.value)} value={newType} /> <CreateNewSVG onClick={() => addNewType()} /></div>
            </div>
        </div>
    )
}