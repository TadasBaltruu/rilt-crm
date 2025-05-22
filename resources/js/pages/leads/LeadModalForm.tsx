import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function LeadModalForm({ lead = null, onClose }) {
    const isEdit = !!lead;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
    });


    console.log(lead);
    useEffect(() => {
        if (lead) {
            setData({
                name: lead.name || '',
                email: lead.email || '',
                phone: lead.phone || '',
                source: lead.source || '',
                status: lead.status || '',
                notes: lead.notes || '',
            });
        } else {
            reset();
        }
    }, [lead]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = isEdit ? route('leads.update', lead.id) : route('leads.store');

        const method = isEdit ? put : post;

        method(url, {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-lg border-4 border-b-gray-600">
                <h2 className="text-lg font-semibold mb-4">{isEdit ? 'Edit Lead' : 'Add Lead'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {['name', 'email', 'phone', 'status','source', 'notes'].map((field) => (
                        <div key={field}>
                            <label className="block capitalize">{field}</label>
                            <input
                                type={field === 'email'}
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            {errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-lime-600 text-white px-4 py-2 rounded"
                        >
                            {isEdit ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
