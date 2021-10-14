import React from 'react';
import { useData } from '../../Context/DataContext';
import './styles.css';

export function TableRow({ item }) {
  const { CalcSummary } = useData();

  return (
    <tr>
      <td className='td-service'>
        <input
          type='checkbox'
          className='input-table-row'
          onClick={() => CalcSummary(item.id_vm)}
        />
      </td>

      <td className='td-service'>{item.hostname}</td>
      <td className='td-service'>{item.configuracao.memoryProvisioned} GB</td>
      <td className='td-service'>{item.configuracao.cpuProvisioned} vCPUs</td>
      <td className='td-service'>{item.configuracao.totalDiskGB} GB</td>
      <td className='td-service'>{item.ip}</td>
    </tr>
  );
}
