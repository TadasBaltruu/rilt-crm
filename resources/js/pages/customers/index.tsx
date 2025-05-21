import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {Button} from '@/components/ui/button'
import { useState, useEffect } from 'react';
import CustomerModalForm from './CustomerModalForm';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

type Props = {
    customers: Array<{
        id: number;
        name: string;
        email: string;
        phone: string;
        company: string;
        created_at: string;
    }>;
};


export default function CustomersIndex({customers}: Props) {

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            // Send delete request with Inertia
            router.delete(`/customers/${id}`);
        }
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContact, setSelectedCustomer] = useState(null);

    const openModal = (contact = null) => {
        setSelectedCustomer(contact);
        setModalOpen(true);
    };
    const { props } = usePage();
    const flash = props.flash;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {flash.success && (
                <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
                    {flash.success}
                </div>
            )}
            <Head title="Customers" />



            <div className="p-6">

                <h1 className="text-2xl font-semibold mb-4">Customers</h1>
                <Button onClick={() => openModal()} variant={"create"}>Create new Customer</Button>
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Phone</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Created At</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Update</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Delete</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.created_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><Button
                                    variant={"outline"} onClick={() => openModal(customer)} >Update</Button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><Button onClick={() => handleDelete(customer.id)} variant={"destructive"}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {modalOpen && (
                <CustomerModalForm
                    customer={selectedContact}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedCustomer(null);
                    }}
                />
            )}
        </AppLayout>
    );
}
