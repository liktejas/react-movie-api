import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { API_URL } from './Context'

const SingleMovie = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState('')

    const getMovies = async (url) => {
        setIsLoading(true)
        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            if (data.Response === 'True') {
                setIsLoading(false)
                setMovie(data)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            getMovies(`${API_URL}&i=${id}`)
        }, 1000)

        return () => clearTimeout(timer)

    }, [id])

    return (
        <>
            <div className="bg-sky-800 flex justify-center items-center h-screen">
                {!isLoading 
                    ?
                    <div className="card bg-white">
                        <div className="flex">
                            <img src={movie.Poster} alt="Movie Title" />
                            <div className="movie_details flex justify-center ml-8 flex-col">
                                <h1 className="text-2xl font-semibold mb-5">{movie.Title}</h1>
                                <p className="mt-1.5">{movie.Released}</p>
                                <p className="my-1.5">{movie.Genre}</p>
                                <p className="my-1.5">{movie.imdbRating}/10</p>
                                <p className="my-1.5">{movie.Country}</p>
                                <NavLink to={'/'} className="text-center w-[6.25rem] mt-2.5 rounded-full border-2 p-1.5 hover:bg-sky-800 hover:text-white border-sky-800">Go Back</NavLink>
                            </div>
                        </div>
                    </div>
                    :
                    <p className="text-center text-white text-2xl">Loading...</p>
                }
            </div>
        </>
    )
}

export default SingleMovie