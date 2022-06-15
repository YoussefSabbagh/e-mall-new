import { Fragment, useEffect, useState } from 'react';

import styles from './ExchangeRate.module.scss';
import ExchangeRateRowRO from './ExchangeRateRowRO';
import ExchangeRateRowUpdate from './ExchangeRateRowUpdate';
import ExchangeRateTableHeader from './ExchangeRateTableHeader';
import HelpersFinder from '../../apis/HelperFinder';

export const ExchangeRatesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [editExchangeRateId, setEditExchangeRateId] = useState(null);

  const getExchangeRateData = async () => {
    const response = await HelpersFinder.exchangeRateAll();
    setExchangeRates(response.data);
    setIsLoading(true);
    return response;
  };

  useEffect(() => {
    getExchangeRateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [addExchangeRateData, setAddExchangeRateData] = useState({
    _id: '',
    date: '',
    rate: '',
  });

  const [editExchangeRateData, setEditExchangeRateData] = useState({
    _id: '',
    date: '',
    rate: '',
  });

  const handleAddChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    const newFormData = { ...addExchangeRateData };
    newFormData[fieldName] = fieldValue;

    setAddExchangeRateData(newFormData);
  };

  const handleEditChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    const newFormData = { ...editExchangeRateData };
    newFormData[fieldName] = fieldValue;

    setEditExchangeRateData(newFormData);
  };

  const AddExchangeRate = async (exchangeRate) => {
    try {
      const response = await HelpersFinder.create(exchangeRate);
      if (response.success) {
        const newExchangeRate = {
          _id: response.data.insertId,
          date: addExchangeRateData.date,
          rate: addExchangeRateData.rate,
        };

        const newExchangeRates = [...exchangeRates, newExchangeRate];
        setExchangeRates(newExchangeRates);
      } else {
        alert('error' + response.message);
        console.log('error', response.message);
      }
    } catch (err) {}
  };

  const EditExchangeRate = async (exchangeRate) => {
    try {
      const response = await HelpersFinder.update(exchangeRate);
      if (response.success) {
        const editedExchangeRate = {
          _id: editExchangeRateData._id,
          date: editExchangeRateData.date,
          rate: editExchangeRateData.rate,
        };

        const newExchangeRate = [...exchangeRates];

        const index = exchangeRates.findIndex(
          (exchangeRate) => exchangeRate._id === editExchangeRateId
        );

        newExchangeRate[index] = editedExchangeRate;

        setExchangeRates(newExchangeRate);
        setEditExchangeRateId(null);
      } else {
        alert('error' + response.message);
        console.log('error', response.message);
      }
    } catch (err) {}
  };

  const DeleteExchangeRate = async (exchangeRateId) => {
    try {
      const response = await HelpersFinder.delete(exchangeRateId);
      if (response.success) {
        const newExchangeRate = [...exchangeRates];

        const index = exchangeRates.findIndex(
          (exchangeRate) => exchangeRate._id === exchangeRateId
        );
        newExchangeRate.splice(index, 1);
        setExchangeRates(newExchangeRate);
      } else {
        alert('error' + response.message);
        console.log('error', response.message);
      }
    } catch (err) {}
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    /**
     * TODO: VALIDATE INPUT
     * 
  
    *---------------------------------------------------
      Se ingresa en la base de datos el nuevo registros 
    ----------------------------------------------------*/

    AddExchangeRate(addExchangeRateData);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    /*----------------------------------------
      Se debe validar los datos introducidos 
    ----------------------------------------*/

    /*---------------------------------------------------
      Se actualiza el viaje en la base de datos 
    ----------------------------------------------------*/
    EditExchangeRate(editExchangeRateData);
  };

  const handleUpdate = (e, exchangeRate) => {
    e.preventDefault();
    setEditExchangeRateId(exchangeRate._id);

    const formValues = {
      _id: exchangeRate._id,
      date: exchangeRate.date,
      rate: exchangeRate.rate,
    };

    setEditExchangeRateData(formValues);
  };

  const handleCancel = () => {
    setEditExchangeRateId(null);
  };

  const handleReset = () => {
    setAddExchangeRateData({
      _id: '',
      date: '',
      rate: '',
    });
  };

  const handleDelete = (exchangeRateId) => {
    let confirmation = window.confirm(
      `Esta seguro de eliminar el esta tasa ${exchangeRateId}`
    );
    if (confirmation) {
      DeleteExchangeRate(exchangeRateId);
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}> Listado de Tasas de Cambios</h1>
      {/* Add a new Exchange */}
      <form className={styles.form} onSubmit={handleAddSubmit}>
        <table className={styles.table}>
          <ExchangeRateTableHeader />
          <tbody>
            <ExchangeRateRowUpdate
              accion="ADD"
              exchangeRate={addExchangeRateData}
              handleEditChange={handleAddChange}
              handleEditSubmit={handleAddSubmit}
              handleCancel={handleReset}
            />
          </tbody>
        </table>
      </form>

      {/* Show and Update Exchange Rates */}
      <form className={styles.form} onSubmit={handleEditSubmit}>
        <table className={styles.table}>
          <ExchangeRateTableHeader />
          {isLoading && (
            <tbody>
              {exchangeRates.map((rate) => {
                return (
                  <Fragment key={rate._id}>
                    {editExchangeRateId === rate._id ? (
                      <ExchangeRateRowUpdate
                        key={rate._id}
                        accion="UPDATE"
                        exchangeRate={editExchangeRateData}
                        handleEditChange={handleEditChange}
                        handleEditSubmit={handleEditSubmit}
                        handleCancel={handleCancel}
                      />
                    ) : (
                      <ExchangeRateRowRO
                        key={rate._id}
                        exchangeRate={rate}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                      />
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          )}
        </table>
      </form>
    </section>
  );
};
