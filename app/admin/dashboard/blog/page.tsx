'use client';

import { useState } from 'react';
import AdminDataTable from '@/components/AdminDataTable';

const columns = [
  { key: 'image', label: 'Featured Image' },
  { key: 'title', label: 'Blog Title' },
  { key: 'author', label: 'Author' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'publishDate', label: 'Publish Date' },
];

const initialData = [
  { id: 1, image: '', title: 'Industrial Trends 2024', author: 'John Smith', category: 'Industry News', status: 'Published', publishDate: '2024-01-15' },
  { id: 2, image: '', title: 'Sustainable Manufacturing', author: 'Jane Doe', category: 'Sustainability', status: 'Published', publishDate: '2024-01-10' },
  { id: 3, image: '', title: 'Automation Benefits', author: 'Mike Johnson', category: 'Technology', status: 'Draft', publishDate: '2024-01-08' },
  { id: 4, image: '', title: 'Supply Chain Optimization', author: 'Sarah Wilson', category: 'Logistics', status: 'Published', publishDate: '2024-01-05' },
  { id: 5, image: '', title: 'Future of Industry 4.0', author: 'David Brown', category: 'Technology', status: 'Draft', publishDate: '2024-01-01' },
];

export default function BlogPage() {
  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const newItem = {
      id: data.length + 1,
      image: '',
      title: 'New Blog Post',
      author: 'Admin',
      category: 'General',
      status: 'Draft',
      publishDate: new Date().toISOString().split('T')[0],
    };
    setData([...data, newItem]);
  };

  const handleEdit = (item: any) => {
    console.log('Edit blog:', item);
  };

  const handleDelete = (item: any) => {
    setData(data.filter((d) => d.id !== item.id));
  };

  return (
    <AdminDataTable
      title="Blog Management"
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      addButtonLabel="Add Blog"
    />
  );
}
