import React from 'react';
import DirectoryGroups from "../Home/DirectoryGroups.jsx";
import Header from '../Header/Header';
// import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx";
import CardComponetGroopLocalData from "../CardComponetGroop/CardComponetGroopLocalData.jsx";
import Footer from '../Footer/Footer.jsx';

const CatalogSection = ({nomenclature}) => {
  const chapter = new URLSearchParams(window.location.search).get("chapter");
  const newChapter = chapter === "Модульные автоматы" ? "Модульное оборудование" : chapter;

  console.log();

  return (
    <>
      <Header />
      <DirectoryGroups />
      {/* <CardComponetGroop h2={newChapter} api={"/api/CatalogSectionSearchItem/" + chapter} /> */}
      <CardComponetGroopLocalData h2={newChapter} item={nomenclature} />
      <Footer />
    </>
  );
};


export default CatalogSection;