import React, { useState, useEffect, useRef } from "react";
import "./Footer.css"

const Footer = () => {

  const [html, setHtml] = useState("")

  useEffect(() => {
    fetch("https://encomponent.ru/php/modules/footer.php")
      .then(res => res.text())
      .then(setHtml)
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
};


export default Footer;