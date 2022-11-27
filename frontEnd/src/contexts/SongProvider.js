import axios from 'axios'
import { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import SongContext from './SongContext'

export const SongProvider = (props) => {

  const baseUrl = 'http://localhost:3001/songs/'

  function addSong(title, artist, albumUrl) {
 
    let song = { title, artist, albumUrl }
    return axios
      .post(baseUrl, song)
      .then((response) => {
        return new Promise((resolve) => resolve(response.data))
      })
  }

  return (
    <SongContext.Provider
      value={{
        addSong,
      }}
    >
      {props.children}
    </SongContext.Provider>
  )
}
