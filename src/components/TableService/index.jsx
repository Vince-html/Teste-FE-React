import React from 'react';
import { useData } from '../../Context/DataContext';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';
import './styles.css';

import ThService from '../ThService';

const category = [
  { type: 'select', title: 'Select' },
  { type: 'hostname', title: 'Hostname' },
  { type: 'memoryProvisioned', title: 'Memória' },
  { type: 'cpuProvisioned', title: 'vCPUs' },
  { type: 'totalDiskGB', title: 'Disco' },
  { type: 'ip', title: 'IP' },
];

export function TableService() {
  const { dataJson } = useData();

  return (
    <TableHeader title='Tabela de servidores'>
      <table className='table-service'>
        <thead>
          <tr className='main-summary'>
            {category.map((item) => (
              <ThService item={item} key={item.type} />
            ))}
          </tr>
        </thead>
        <tbody className='tb-service'>
          {!!dataJson &&
            dataJson?.map((item) => <TableRow key={item?.id_vm} item={item} />)}
        </tbody>
      </table>
    </TableHeader>
  );
}
