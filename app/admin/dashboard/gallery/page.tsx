'use client';

import { useState } from 'react';
import AdminDataTable from '@/components/AdminDataTable';

const columns = [
  { key: 'image', label: 'Image' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
];

const initialData = [
  { id: 1, image: '', title: 'Factory Floor', category: 'Industrial', description: 'Main production area', status: 'Active' },
  { id: 2, image: '', title: 'Team Meeting', category: 'Corporate', description: 'Quarterly review', status: 'Active' },
  { id: 3, image: '', title: 'Equipment Setup', category: 'Technical', description: 'New machinery installation', status: 'Active' },
  { id: 4, image: '', title: 'Site Visit', category: 'Projects', description: 'Client inspection', status: 'Inactive' },
];

export default function GalleryPage() {
  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const newItem = {
      id: data.length + 1,
      image: '',
      title: 'New Image',
      category: 'General',
      description: 'Description here',
      status: 'Active',
    };
    setData([...data, newItem]);
  };

  const handleEdit = (item: any) => {
    console.log('Edit gallery:', item);
  };

  const handleDelete = (item: any) => {
    setData(data.filter((d) => d.id !== item.id));
  };

  return (
    <AdminDataTable
      title="Gallery Management"
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      addButtonLabel="Add Image"
    />
  );
}
