import React from 'react'
import './Pagination.scss'


export const Pagination =   ({allPages, setcurrentPage, currentPage }) => {

    return (
        <div className="pagination-container" >
            <div><span onClick={() => setcurrentPage(1)} className='pagination-container__pointer'>Первая</span></div>
            <div><span onClick={() => setcurrentPage(currentPage-1)} className='pagination-container__pointer'>Предидущая</span></div>
            <div className='pagination-container__pages'>
                {
                    new Array(allPages).fill(1).map((_, i) => (
                        <div 
                            key={i}
                            onClick={() => {setcurrentPage(i+1); console.log(i+1)}}
                            className={`pagination-container__number${currentPage === (i + 1) ? '--active': ''}`}
                        >
                            {i + 1}
                        </div>
                    ))
                }
            </div>
            <div><span onClick={() => setcurrentPage(currentPage+2)} className='pagination-container__pointer'>Следующая</span></div>
            <div><span onClick={() => setcurrentPage(allPages)} className='pagination-container__pointer'>Последняя</span></div>
        </div>
    )
}