<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        return inertia::render("customers/index", compact("customers"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerRequest $customer_request)
    {
        Customer::create([
            ...$customer_request->validated(),
            'user_id'=>Auth::id()

        ]);
        return redirect()->back()->with('success', 'Customer created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer, CustomerRequest $customer_request)
    {


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerRequest $customer_request, Customer $customer)
    {
        $customer->update([...$customer_request->validated()]);
        return redirect()->route("customers.index")->with('success', 'Customer updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route("customers.index")->with('success', 'Customer deleted successfully.');;
    }
}
