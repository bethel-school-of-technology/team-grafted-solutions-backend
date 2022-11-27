import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SongContext from './contexts/SongContext'
import axios from 'axios'
const baseUrl = 'http://localhost:3000/songs/'

export default function TrackSearchResult({ track, chooseTrack }) {
  let { addSong } = useContext(SongContext)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function handlePlay() {
    handleShow()
    // temporarily disabled this to see the modal, need to remove this comment, still working on it
    // chooseTrack(track);
  }

  function handleSubmit(event) {
    event.preventDefault()

    addSong(track.title, track.artist, track.albumUrl).catch((error) => {
      console.log(error)
    })
    handleClose()
  }

  return (
    <>
      <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={handlePlay}
      >
        <img src={track.albumUrl} style={{ height: '150px', width: '150px' }} />
        <div className="ml-3">
          <div>{track.title}</div>
          <div className="text-muted">{track.artist}</div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Song to Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Song
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
