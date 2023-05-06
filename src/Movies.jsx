import React from 'react'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from './context'

const Movies = () => {

  const { movie, query, isLoading, isError } = useGlobalContext()

  return (
    <>
      {!isLoading && query != '' && !isError.show &&
      <section className="text-gray-600 body-font">
        <div className="container lg:max-w-screen-lg px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {
              movie.map((currentMovie, index) => {
                return (
                  <div key={index} className="lg:w-1/4 md:w-1/2 p-2 w-full">
                    <div className="p-2 border-gray-600 border-2 rounded">
                        <NavLink to={`movie/${currentMovie.imdbID}`} className="block relative h-80 rounded overflow-hidden">
                          <img alt={currentMovie.imdbID} className="object-cover object-center w-full h-full block" src={currentMovie.Poster} />
                        </NavLink>
                      <div className="mt-4">
                        <NavLink to={`movie/${currentMovie.imdbID}`}>
                          <h3 className="text-gray-500 text-center text-xs tracking-widest title-font mb-1">{currentMovie.Title}</h3>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      }
    </>
  )
}

export default Movies