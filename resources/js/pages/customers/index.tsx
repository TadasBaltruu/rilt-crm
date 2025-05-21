import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {Button} from '@/components/ui/button'
import { useState } from 'react';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Customers</h1>

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
                                    variant={"outline"}>Update</Button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><Button onClick={() => handleDelete(customer.id)} variant={"destructive"}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
