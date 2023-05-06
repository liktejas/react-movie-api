import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const API_URL = `http://omdbapi.com/?apikey=${import.meta.env.VITE_OMDBAPI_KEY}`

const AppProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState([])
    const [isError, setIsError] = useState( { show: false, msg: ''} )
    const [query, setQuery] = useState("")

    const getMovies = async(url) => {
        setIsLoading(true)
        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            if( data.Response === 'True' ) {
                setIsLoading(false)
                setMovie( data.Search )
                setIsError( { show: false, msg: '' } )
            } else {
                setIsError( { show: true, msg: data.Error } )
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            if(!falsy(query)) {
                getMovies(`${API_URL}&s=${query}`)
            }
        }, 1000)

        return () => clearTimeout(timer)

    }, [query])

    return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>{children}</AppContext.Provider>
}

// global hook
const useGlobalContext = () => {
    return useContext(AppContext)
}

const falsy = ( val ) => {
    if( val == false || val == null || val == 0 || val == '') return true
}

export {AppProvider, AppContext, useGlobalContext, API_URL}