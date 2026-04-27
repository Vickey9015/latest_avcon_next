'use client';

import { useState } from 'react';
import AdminDataTable from '@/components/AdminDataTable';

const columns = [
  { key: 'title', label: 'Job Title' },
  { key: 'department', label: 'Department' },
  { key: 'location', label: 'Location' },
  { key: 'type', label: 'Job Type' },
  { key: 'experience', label: 'Experience' },
  { key: 'status', label: 'Status' },
  { key: 'applications', label: 'Applications' },
];

const initialData = [
  { id: 1, title: 'Project Manager', department: 'Operations', location: 'Delhi', type: 'Full-time', experience: '5+ years', status: 'Active', applications: 12 },
  { id: 2, title: 'Industrial Engineer', department: 'Engineering', location: 'Mumbai', type: 'Full-time', experience: '3-5 years', status: 'Active', applications: 8 },
  { id: 3, title: 'Business Analyst', department: 'Consulting', location: 'Bangalore', type: 'Full-time', experience: '2-4 years', status: 'Closed', applications: 25 },
  { id: 4, title: 'Safety Supervisor', department: 'HSE', location: 'Chennai', type: 'Contract', experience: '4+ years', status: 'Active', applications: 5 },
];

export default function JobsPage() {
  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const newItem = {
      id: data.length + 1,
      title: 'New Position',
      department: 'General',
      location: 'India',
      type: 'Full-time',
      experience: '1+ years',
      status: 'Active',
      applications: 0,
    };
    setData([...data, newItem]);
  };

  const handleEdit = (item: any) => {
    console.log('Edit job:', item);
  };

  const handleDelete = (item: any) => {
    setData(data.filter((d) => d.id !== item.id));
  };

  return (
    <AdminDataTable
      title="Jobs Management"
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      addButtonLabel="Add Job"
    />
  );
}
