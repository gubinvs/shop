import React, { useEffect, useState } from 'react';
import DirectoryGroups from "../Home/DirectoryGroups.jsx";
import Header from '../Header/Header';
import CardComponetGroopLocalData from "../CardComponetGroop/CardComponetGroop.jsx";
import Footer from '../Footer/Footer.jsx';

const CatalogSection = ({ nomenclature }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const chapter = new URLSearchParams(window.location.search).get("chapter");
  const newChapter = chapter === "Модульные автоматы" ? "Модульное оборудование" : chapter;

  useEffect(() => {
    if (Array.isArray(nomenclature) && nomenclature.length > 0) {
      setData(nomenclature);
      setLoading(false);
    }
  }, [nomenclature]);

  if (loading) {
    return <div>Загрузка товаров...</div>;
  }

  console.log("CatalogSection получил:", data.length, "товаров");

  return (
    <>
      <Header />
      <DirectoryGroups />
      <CardComponetGroopLocalData h2={newChapter} nomenclature={nomenclature} />
      <Footer />
    </>
  );
};

export default CatalogSection;
