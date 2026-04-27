'use client';

import { useState } from 'react';
import AdminDataTable from '@/components/AdminDataTable';

const columns = [
  { key: 'image', label: 'Banner Image' },
  { key: 'title', label: 'Title' },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'status', label: 'Status' },
  { key: 'order', label: 'Order' },
];

const initialData = [
  { id: 1, image: '', title: 'Welcome to AVCONEXPO', subtitle: 'Your trusted industrial partner', status: 'Active', order: 1 },
  { id: 2, image: '', title: 'Industrial Solutions', subtitle: 'Engineering excellence', status: 'Active', order: 2 },
  { id: 3, image: '', title: 'Quality Services', subtitle: 'Delivering results', status: 'Inactive', order: 3 },
  { id: 4, image: '', title: 'Expert Team', subtitle: 'Professional consultants', status: 'Active', order: 4 },
  { id: 5, image: '', title: 'Global Reach', subtitle: 'Worldwide presence', status: 'Active', order: 5 },
];

export default function BannerPage() {
  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const newItem = {
      id: data.length + 1,
      image: '',
      title: 'New Banner',
      subtitle: 'Subtitle here',
      status: 'Active',
      order: data.length + 1,
    };
    setData([...data, newItem]);
  };

  const handleEdit = (item: any) => {
    console.log('Edit banner:', item);
  };

  const handleDelete = (item: any) => {
    setData(data.filter((d) => d.id !== item.id));
  };

  return (
    <AdminDataTable
      title="Banner Management"
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      addButtonLabel="Add Banner"
    />
  );
}
