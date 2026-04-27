'use client';

import { useState } from 'react';
import AdminDataTable from '@/components/AdminDataTable';

const columns = [
  { key: 'image', label: 'Project Image' },
  { key: 'name', label: 'Project Name' },
  { key: 'client', label: 'Client' },
  { key: 'sector', label: 'Sector' },
  { key: 'status', label: 'Status' },
  { key: 'completion', label: 'Completion %' },
];

const initialData = [
  { id: 1, image: '', name: 'Industrial Plant Setup', client: 'ABC Industries', sector: 'Manufacturing', status: 'Active', completion: '85%' },
  { id: 2, image: '', name: 'Warehouse Automation', client: 'XYZ Logistics', sector: 'Logistics', status: 'Completed', completion: '100%' },
  { id: 3, image: '', name: 'Green Energy Project', client: 'EcoPower Ltd', sector: 'Energy', status: 'Active', completion: '60%' },
];

export default function ProjectPage() {
  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const newItem = {
      id: data.length + 1,
      image: '',
      name: 'New Project',
      client: 'New Client',
      sector: 'General',
      status: 'Active',
      completion: '0%',
    };
    setData([...data, newItem]);
  };

  const handleEdit = (item: any) => {
    console.log('Edit project:', item);
  };

  const handleDelete = (item: any) => {
    setData(data.filter((d) => d.id !== item.id));
  };

  return (
    <AdminDataTable
      title="Project Management"
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      addButtonLabel="Add Project"
    />
  );
}
