import React from 'react';
import { useLocation } from 'react-router-dom';

const OneWayDutySlip = () => {
    const location = useLocation();
    const offer = location.state?.offer || {};
    const passenger = JSON.parse(localStorage.getItem('passengerData')) || {};

    // Charges setup (use the values from the offer)
    const baseAmount = parseFloat(offer.baseAmount) || 0; // Ensure these properties exist in the booking object
    const distance = parseFloat(offer.distance) || 0;
    const driverAllowance = parseFloat(offer.driverAllowance) || 0;
    const haltingCharges = parseFloat(offer.haltingCharges) || 0;
    const tollTaxAndParking = parseFloat(offer.tollTaxAndParking) || 0;
    const extraHoursCharges = parseFloat(offer.extraHoursCharges) || 0;
    const extraKmCharges = parseFloat(offer.extraKmCharges) || 0;
    const advanceAmount = parseFloat(offer.advanceAmount) || 0; // new

    // Total calculation
    const totalAmount =
        baseAmount +
        driverAllowance +
        haltingCharges +
        tollTaxAndParking +
        extraHoursCharges +
        extraKmCharges;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white">
            <div className="border-2 border-black p-6 rounded-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-800">DUTY SLIP</h1>
                    <p className="text-sm text-gray-600">One Way Journey</p>
                </div>

                {/* Trip Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                    <div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Journey Details</h2>
                            <div className="space-y-2">
                                <p><span className="font-medium w-32 inline-block">Car Name:</span> {offer.vehicle || 'N/A'}</p>
                                <p><span className="font-medium w-32 inline-block">Passenger:</span> {passenger.name || 'N/A'}</p>
                                <p><span className="font-medium w-32 inline-block">From:</span> {offer.from || 'N/A'}</p>
                                <p><span className="font-medium w-32 inline-block">To:</span> {offer.to || 'N/A'}</p>
                                <p><span className="font-medium w-32 inline-block">Phone:</span> {passenger.phone || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-3">
                            <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Trip Metrics</h2>
                            <div className="space-y-2">
                                <p><span className="font-medium w-32 inline-block">Distance:</span> {distance} km</p>
                                <p><span className="font-medium w-32 inline-block">Time:</span> {offer.time || 'N/A'}</p>
                                <p><span className="font-medium w-32 inline-block">Date:</span> {offer.pickupDate || offer.date || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charges Breakdown */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-3">Charges Breakdown</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Base Fare:</span>
                            <span>₹{baseAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Driver Allowance:</span>
                            <span>₹{driverAllowance.toFixed(2)}</span>
                        </div>
                        {/* <div className="flex justify-between">
                            <span>Halting Charges:</span>
                            <span>₹{haltingCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Toll Tax & Parking:</span>
                            <span>₹{tollTaxAndParking.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Extra Hours Charges:</span>
                            <span>₹{extraHoursCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Extra KM Charges:</span>
                            <span>₹{extraKmCharges.toFixed(2)}</span>
                        </div> */}
                        <div className="flex justify-between border-t-2 border-gray-300 pt-2 font-bold">
                            <span>Total Amount:</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Advance Paid:</span>
                            <span>₹{advanceAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}

                <div className="mb-8">
                    <h1 className='text-2xl font-bold'>Other Information:-</h1>
                    <p>1. This duty slip confirms your travel booking and vehicle allocation for the mentioned date and time.</p>
                    <p>2. Please check the travel details carefully and keep this slip for reference during your journey.</p>
                    <p>3. The customer is requested to verify the vehicle, driver details, and travel route before starting the trip.</p>
                    <p>4. For any queries or support, kindly contact our travel desk immediately.</p>
                    <p>5. Any extra time or additional kilometers will be charged as per the applicable rates.</p>
                </div>

                {/* <div className="mb-5">
                    <h1 className="text-xl font-bold mb-3">
                        Charges for extra KM as per vehicle
                    </h1>
                    <div className="overflow-x-auto">
                        <table className="table-auto border border-gray-300 w-full text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border px-4 py-2">Vehicle</th>
                                    <th className="border px-4 py-2">Extra KM Charge</th>
                                    <th className="border px-4 py-2">Per Hour Charge</th>
                                    <th className="border px-4 py-2">Night Halting</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">Dzire</td>
                                    <td className="border px-4 py-2">₹22/km</td>
                                    <td className="border px-4 py-2">₹150/hr</td>
                                    <td className="border px-4 py-2">₹200/Night</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Zest</td>
                                    <td className="border px-4 py-2">₹21/km</td>
                                    <td className="border px-4 py-2">₹150/hr</td>
                                    <td className="border px-4 py-2">₹200/Night</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Tavera</td>
                                    <td className="border px-4 py-2">₹27/km</td>
                                    <td className="border px-4 py-2">₹150/hr</td>
                                    <td className="border px-4 py-2">₹200/Night</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Crysta</td>
                                    <td className="border px-4 py-2">₹34/km</td>
                                    <td className="border px-4 py-2">₹150/hr</td>
                                    <td className="border px-4 py-2">₹300/Night</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Innova</td>
                                    <td className="border px-4 py-2">₹32/km</td>
                                    <td className="border px-4 py-2">₹150/hr</td>
                                    <td className="border px-4 py-2">₹300/Night</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div> */}

                <div className="grid grid-cols-2 gap-4 text-center text-xs">
                    <div className="border-t-2 border-gray-300 pt-2">
                        <p>Passenger Signature</p>
                        <div className="h-16 border-t border-dashed mt-8"></div>
                    </div>
                    <div className="border-t-2 border-gray-300 pt-2">
                        <p>Driver Signature</p>
                        <div className="h-16 border-t border-dashed mt-8"></div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Print Duty Slip
                </button>
            </div>
        </div>
    );
};

export default OneWayDutySlip;
