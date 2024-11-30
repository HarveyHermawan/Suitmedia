import React, { useEffect, useState } from 'react'
import './List.css'
import { Data } from '../../Data'

const List = () => {
    const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false)
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        return parseInt(localStorage.getItem('itemsperpage')) || 10
    })
    const [sortOrder, setSortOrder] = useState(() => {
        return localStorage.getItem('sortorder') || 'Newest'
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedData, setSortedData] = useState(Data)
    
    const pageOption = ['10', '20', '50']
    const sortOption = ['Newest', 'Oldest']

    const totalPages = Math.ceil(sortedData.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const handleItemsPerPageChange = (size) => {
        setItemsPerPage(size)
        setCurrentPage(1)
    }

    useEffect(() => {
        localStorage.setItem('itemsperpage', itemsPerPage)
    }, [itemsPerPage])

    useEffect(() => {
        localStorage.setItem('sortorder', sortOrder)
    }, [sortOrder])

    const handlePageDropdownToggle = () =>{
        setIsPageDropdownOpen(!isPageDropdownOpen)
    }

    const handleSortDropdownToggle = () =>{
        setIsSortDropdownOpen(!isSortDropdownOpen)
    }

    const handlePageOptionClick = (option) => {
        setItemsPerPage(option)
        setIsPageDropdownOpen(false)
    }

    const handleSortOptionClick = (option) => {
        setSortOrder(option)
        setIsSortDropdownOpen(false)
    }

    useEffect(() => {
        const sorted = [...Data].sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB
        })
        setSortedData(sorted)
    }, [sortOrder])

  return (
    <div className='list'>
        <div className='container'>
            <div className='title-container'>
                <div className='showing'>
                    showing {indexOfFirstItem + 1} - {indexOfLastItem} of {sortedData.length}
                </div>
                <div className='sort'>
                    <div className='sort-by-page'>
                        <div className='sort-by-page-title'>
                        Show per page:
                        </div>
                        <button className='sort-by-page-option' onClick={handlePageDropdownToggle}>
                            {itemsPerPage}
                            <img className='size-5' src="./down-arrow.png" alt="arrow" />
                        </button>
                        {isPageDropdownOpen && (
                            <ul className='sort-by-page-dropdown'>
                                {pageOption.map((option) => (
                                    <li key={option} onClick={() => handlePageOptionClick(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='sort-by'>
                        <div className='sort-by-title' >
                            Sort by: 
                        </div>
                        <button className='sort-by-option' onClick={handleSortDropdownToggle}>
                            {sortOrder}
                            <img className='size-5' src="./down-arrow.png" alt="arrow" />
                        </button>
                        {isSortDropdownOpen && (
                            <ul className='sort-by-dropdown'>
                                {sortOption.map((option) => (
                                    <li key={option} onClick={() => handleSortOptionClick(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className='content'>
                {currentItems.map((Data) =>(
                    <div className='content-item' key={Data.id}>
                        <div><img className='content-image' src={Data.image} loading='lazy'/></div>
                        <div className='content-date text-gray-400 font-medium'>{Data.date}</div>
                        <div className='content-title font-medium text-lg'>{Data.title}</div>
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous 
                </button>
                <span>Page {currentPage} of {totalPages} </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default List