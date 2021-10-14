import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataJson, setDataJson] = useState();

  const [summaryData, setSummaryData] = useState({
    data: {
      memory: 0,
      vcpus: 0,
      disk: 0,
      quantity: 0,
    },
  });

  useEffect(() => {
    function SummaryResumeFilter() {
      if (dataJson) {
        const separatedItems = dataJson.filter(
          (item) => item.selected === true
        );

        const reduceMemory = separatedItems?.reduce((sum, item) => {
          const sumMemory = item.configuracao.memoryProvisioned + sum;
          return sumMemory;
        }, 0);
        const reduceDisk = separatedItems?.reduce((sum, item) => {
          const sumDisk = item.configuracao.totalDiskGB + sum;
          return sumDisk;
        }, 0);
        const reduceCpus = separatedItems?.reduce((sum, item) => {
          const sumCpus = item.configuracao.cpuProvisioned + sum;
          return sumCpus;
        }, 0);
        const quantityServer = separatedItems.length;
        setSummaryData({
          data: {
            quantity: quantityServer,
            memory: reduceMemory,
            vcpus: reduceCpus,
            disk: reduceDisk,
          },
        });
      }
    }

    SummaryResumeFilter();
  }, [dataJson]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('servers');
        setDataJson(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const CalcSummary = async (itemId) => {
    const selectItem = dataJson.map((item) =>
      item.id_vm === itemId
        ? {
            ...item,
            selected: !item.selected,
          }
        : item
    );

    setDataJson(selectItem);
  };

  return (
    <DataContext.Provider
      value={{
        dataJson,
        CalcSummary,
        summaryData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

function useData() {
  const context = useContext(DataContext);
  return context;
}

export { DataProvider, useData };
