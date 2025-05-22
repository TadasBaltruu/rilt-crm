import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {Button} from '@/components/ui/button'
import { useState } from 'react';
import LeadModalForm from '@/pages/leads/LeadModalForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leads',
        href: '/lead',
    },
];
type Props = {
    leads: Array<{
        id: number;
        name: string;
        email: string;
        phone: string;
        status: string;
        source: string;
        notes: string;
    }>;
}

export default function LeadsIndex({leads}: Props){

    const handleDelete = (id: number) =>{
        if(window.confirm('Are you sure want to delete this lead?')){
            router.delete(`/leads/${id}`);
        }
    }
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const openModal = (lead = null) =>{
        setModalOpen(true);
        setSelectedLead(lead);
    }

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Leads" />


          <div className="p-6">
              <h1 className="text-2xl font-semibold mb-4">Leads</h1>
              <Button onClick={() => openModal()} variant={'create'}>Create new lead</Button>
              <div className="overflow-x-auto bg-white shadow rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                      <tr>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Phone</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Source</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Notes</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Delete</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Update</th>

                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {leads.map((lead) => (
                          <tr key={lead.id}>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">{lead.name}</th>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">{lead.email}</th>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">{lead.phone}</th>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">{lead.status}</th>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">{lead.source}</th>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">{lead.notes}</th>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500"><Button
                                  onClick={() => handleDelete(lead.id)} variant={'destructive'}>Delete</Button></th>
                              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500"><Button
                                  onClick={() => openModal(lead)} variant={'secondary'}>Update</Button></th>
                          </tr>

                      ))}
                      </tbody>

                  </table>
              </div>

          </div>
          {modalOpen && (
              <LeadModalForm
                  lead={selectedLead}
                  onClose={() => {
                      setModalOpen(false);
                      setSelectedLead(null);
                  }}
              />
          )}
      </AppLayout>
  )
}
