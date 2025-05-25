import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CustomerModalForm from './CustomerModalForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    created_at: string;
};

type Direction = 'asc' | 'desc';
type SortField = {
    field: string;
    direction: Direction;
};

type Filters = {
    [field: string]: {
        direction: Direction;
    };
};

type Props = {
    customers: {
        data: Customer[];
        current_page: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: Filters;
};

export default function CustomersIndex({ customers, filters }: Props) {
    const [sortFields, setSortFields] = useState<SortField[]>(() => {
        // Convert initial object filters to array (if provided from server)
        return Object.entries(filters).map(([field, { direction }]) => ({
            field,
            direction,
        }));
    });

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            router.delete(`/customers/${id}`);
        }
    };

    const sort = (field: string) => {
        const existingIndex = sortFields.findIndex(f => f.field === field);
        let updatedSortFields = [...sortFields];

        if (existingIndex === -1) {
            updatedSortFields.push({ field, direction: 'asc' }); // First click
        } else {
            const current = updatedSortFields[existingIndex];
            if (current.direction === 'asc') {
                updatedSortFields[existingIndex].direction = 'desc'; // Second click
            } else {
                updatedSortFields.splice(existingIndex, 1); // Third click
            }
        }

        setSortFields(updatedSortFields);

        const newFilters: Filters = {};
        updatedSortFields.forEach(({ field, direction }) => {
            newFilters[field] = { direction };
        });

        router.get('/customers', { filters: newFilters }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openModal = (contact: Customer | null = null) => {
        setSelectedCustomer(contact);
        setModalOpen(true);
    };

    const { props } = usePage();
    const flash = props.flash;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContact, setSelectedCustomer] = useState<Customer | null>(null);

    const renderSortIndicator = (field: string) => {
        const index = sortFields.findIndex(f => f.field === field);
        if (index === -1) return '';
        const arrow = sortFields[index].direction === 'asc' ? '↑' : '↓';
        return ` ${arrow} (${index + 1})`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />

            {flash.success && (
                <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
                    {flash.success}
                </div>
            )}

            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Customers</h1>
                <Button onClick={() => openModal()} variant="create">Create new Customer</Button>

                <div className="overflow-x-auto bg-white shadow rounded-lg mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th
                                className="cursor-pointer px-6 py-3 text-sm font-medium text-gray-500"
                                onClick={() => sort('name')}
                            >
                                Name{renderSortIndicator('name')}
                            </th>
                            <th
                                className="cursor-pointer px-6 py-3 text-sm font-medium text-gray-500"
                                onClick={() => sort('email')}
                            >
                                Email{renderSortIndicator('email')}
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Phone</th>
                            <th
                                className="cursor-pointer px-6 py-3 text-sm font-medium text-gray-500"
                                onClick={() => sort('created_at')}
                            >
                                Created At{renderSortIndicator('created_at')}
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Update</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Delete</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {customers.data.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.created_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <Button variant="outline" onClick={() => openModal(customer)}>Update</Button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <Button onClick={() => handleDelete(customer.id)} variant="destructive">Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-4">
                    {customers.links.map((link, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 rounded text-sm ${
                                link.active
                                    ? 'bg-blue-600 text-white hover:bg-blue-300'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                            }`}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
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
