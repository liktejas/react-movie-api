import React from 'react'
import { useGlobalContext } from './Context'

const Search = () => {
  const { query, setQuery, isError, isLoading } = useGlobalContext()
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
              </span>
              <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>
        </div>
        {isError.show && query != '' && <p className="text-center text-red-700">{isError.msg}</p>}
        {isLoading && query != '' && <p className="text-center text-green-600">Loading...</p>}
      </section>
    </>
  )
}

export default Search