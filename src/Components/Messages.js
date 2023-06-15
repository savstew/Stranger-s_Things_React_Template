import * as React from "react"
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Message(){
    const postMessage = async (id) => {
        try {
          const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              message: {
                content: "Do you still have this?  Would you take $10 less?"
              }
            })
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }
      
       return(
        <>
        </>
    )
}