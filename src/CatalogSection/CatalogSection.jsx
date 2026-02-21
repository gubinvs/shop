import React from 'react';
import "./catalogSection.css";
// import DirectoryGroups from "../Home/DirectoryGroups.jsx";
import Header from '../Header/Header';
// import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx";
import CardComponetGroopLocalData from "../CardComponetGroop/CardComponetGroopLocalData.jsx";
import Footer from '../Footer/Footer.jsx';

const CatalogSection = ({nomenclature}) => {
  const chapter = new URLSearchParams(window.location.search).get("chapter");
  const newChapter = chapter === "Модульные автоматы" ? "Модульное оборудование" : chapter;

  return (
    <>
      <Header />
      <div className="title-catalog-section">
        <div className="container">
          <h4 className='title-catalog-section__name'>Компоненты энергии</h4>
          <h1 className='title-catalog-section__title'>{chapter}</h1>
        </div>
      </div>
      {/* <DirectoryGroups /> */}
      {/* <CardComponetGroop h2={newChapter} api={"/api/CatalogSectionSearchItem/" + chapter} /> */}
      <CardComponetGroopLocalData h2={newChapter} item={nomenclature} chapter={chapter} />
      <Footer />
    </>
  );
};


export default CatalogSection;