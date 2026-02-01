/* eslint-disable react/prop-types */

import React, { useState,useCallback } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // Store the API endpoint in the host constant
    const host = process.env.REACT_APP_URL;

    // Initialize notesInital variable as an empty array
    let notesInital = [];

    // Create a state variable 'notes' using useState hook and set it to notesInital
    const [notes, setNotes] = useState(notesInital)

    // Create a function 'getNotes' to fetch all notes from the server
   const getNotes = useCallback(async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
        },
    });
    const json = await response.json();
    setNotes(json);
}, [host]);


    // Create a function 'addNote' to add a note to the server
  const addNote = useCallback(async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(prev => prev.concat(note));
}, [host]);


    // Create a function 'deleteNote' to delete a note from the server
   const deleteNote = useCallback(async (id) => {
    await fetch(`${host}api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
        },
    });
    setNotes(prev => prev.filter(note => note._id !== id));
}, [host]);

    // Create a function 'editNote' to edit a note on the server
   const editNote = useCallback(async (id, title, description, tag) => {
    await fetch(`${host}api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
    });
    getNotes(); // safe now
}, [host, getNotes]);

    // Return the NoteContext provider component with notes, addNote, deleteNote, editNote and getNotes as values
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
