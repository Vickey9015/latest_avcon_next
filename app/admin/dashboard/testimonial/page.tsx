'use client';

import { useState } from 'react';
import AdminDataTable from '@/components/AdminDataTable';

const columns = [
  { key: 'photo', label: 'Photo' },
  { key: 'name', label: 'Client Name' },
  { key: 'company', label: 'Company' },
  { key: 'designation', label: 'Designation' },
  { key: 'rating', label: 'Rating' },
  { key: 'status', label: 'Status' },
];

const initialData = [
  { id: 1, photo: '', name: 'Robert Chen', company: 'TechCorp Industries', designation: 'CEO', rating: '5', status: 'Active' },
  { id: 2, photo: '', name: 'Lisa Anderson', company: 'Global Solutions', designation: 'Director', rating: '5', status: 'Active' },
  { id: 3, photo: '', name: 'Michael Park', company: 'Future Systems', designation: 'Manager', rating: '4', status: 'Active' },
];

export default function TestimonialPage() {
  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const newItem = {
      id: data.length + 1,
      photo: '',
      name: 'New Client',
      company: 'Company Name',
      designation: 'Position',
      rating: '5',
      status: 'Active',
    };
    setData([...data, newItem]);
  };

  const handleEdit = (item: any) => {
    console.log('Edit testimonial:', item);
  };

  const handleDelete = (item: any) => {
    setData(data.filter((d) => d.id !== item.id));
  };

  return (
    <AdminDataTable
      title="Testimonial Management"
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      addButtonLabel="Add Testimonial"
    />
  );
}
