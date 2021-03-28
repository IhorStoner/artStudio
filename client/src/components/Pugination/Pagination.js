import React from 'react'
import './Pagination.scss'


export const Pagination =   ({allPages, setcurrentPage, currentPage }) => {
		const setPage = (digit) => {
			if(digit <= allPages && digit >= 1) setcurrentPage(digit)
		}
    return (
        <div className="pagination-container" >
            <div><span onClick={() => setPage(1)} className='pagination-container__pointer'>Первая</span></div>
            <div><span onClick={() => setPage(currentPage-1)} className='pagination-container__pointer'>Предидущая</span></div>
            <div className='pagination-container__pages'>
                {
                    new Array(allPages).fill(1).map((_, i) => (
                        <div 
                            key={i}
                            onClick={() => {setPage(i+1); console.log(i+1)}}
                            className={`pagination-container__number${currentPage === (i + 1) ? '--active': ''}`}
                        >
                            {i + 1}
                        </div>
                    ))
                }
            </div>
            <div><span onClick={() => setPage(currentPage+1)} className='pagination-container__pointer'>Следующая</span></div>
            <div><span onClick={() => setPage(allPages)} className='pagination-container__pointer'>Последняя</span></div>
        </div>
    )
}